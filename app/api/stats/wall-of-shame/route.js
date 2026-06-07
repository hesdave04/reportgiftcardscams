// app/api/stats/wall-of-shame/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let days = parseInt(searchParams.get("days") || "180", 10);
    if (!Number.isFinite(days) || days <= 0) days = 180;

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json(
        { error: "Supabase admin client not configured (check env vars)." },
        { status: 500 }
      );
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffISO = cutoff.toISOString();

    // Pull from both tables in parallel
    const [gcResult, intakeResult] = await Promise.all([
      supa
        .from("giftcard_reports")
        .select("gift_card_brand, retailer, purchase_date, created_at")
        .or(`purchase_date.gte.${cutoffISO},created_at.gte.${cutoffISO}`)
        .limit(50000),
      supa
        .from("case_intakes")
        .select("scam_type, platforms, payment_methods, amount, created_at")
        .gte("created_at", cutoffISO)
        .limit(50000),
    ]);

    // Gift card brand/seller counts (legacy)
    const brandCounts = new Map();
    const sellerCounts = new Map();

    for (const row of gcResult.data || []) {
      const brand = (row.gift_card_brand || "Unknown").trim();
      const seller = (row.retailer || "Unknown").trim();
      brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      sellerCounts.set(seller, (sellerCounts.get(seller) || 0) + 1);
    }

    // Case intake breakdowns
    const scamTypeCounts = new Map();
    const platformCounts = new Map();
    const paymentMethodCounts = new Map();
    let totalReports = (gcResult.data || []).length;
    let totalAmountLost = 0;

    for (const row of intakeResult.data || []) {
      totalReports++;

      const scamType = (row.scam_type || "").trim();
      if (scamType) {
        scamTypeCounts.set(scamType, (scamTypeCounts.get(scamType) || 0) + 1);
      }

      const platforms = Array.isArray(row.platforms) ? row.platforms : [];
      for (const p of platforms) {
        const name = (p || "").trim();
        if (name) platformCounts.set(name, (platformCounts.get(name) || 0) + 1);
      }

      const methods = Array.isArray(row.payment_methods) ? row.payment_methods : [];
      for (const m of methods) {
        const name = (m || "").trim();
        if (name && name !== "No Money Sent") {
          paymentMethodCounts.set(name, (paymentMethodCounts.get(name) || 0) + 1);
        }
      }

      if (row.amount && Number(row.amount) > 0) {
        totalAmountLost += Number(row.amount);
      }
    }

    // Add gift card reports to totals
    for (const row of gcResult.data || []) {
      scamTypeCounts.set(
        "Gift Card Scam",
        (scamTypeCounts.get("Gift Card Scam") || 0) + 1
      );
    }

    const topify = (map, limit = 15) =>
      Array.from(map.entries())
        .filter(([k]) => k && k.toLowerCase() !== "other" && k.toLowerCase() !== "unknown")
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));

    return NextResponse.json(
      {
        // Legacy gift card data
        brands: topify(brandCounts),
        sellers: topify(sellerCounts),
        // New breakdowns
        scamTypes: topify(scamTypeCounts),
        platforms: topify(platformCounts),
        paymentMethods: topify(paymentMethodCounts),
        // Summary stats
        totalReports,
        totalAmountLost: Math.round(totalAmountLost),
      },
      { headers: { "cache-control": "no-store" } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
