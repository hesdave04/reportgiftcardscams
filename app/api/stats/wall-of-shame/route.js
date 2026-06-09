// app/api/stats/wall-of-shame/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

/* ── Normalise snake_case → human labels ── */
const SCAM_TYPE_NORM = {
  romance_scam: "Romance Scam",
  crypto_scam: "Crypto / Investment Scam",
  tech_support: "Tech Support Scam",
  phishing: "Banking / Phishing Scam",
  impersonation: "Impersonation Scam",
  employment_scam: "Employment Scam",
  shopping_scam: "Online Shopping Scam",
  government_scam: "Government Impersonation",
  lottery_scam: "Lottery / Prize Scam",
  other: "Other",
};

const PLATFORM_NORM = {
  facebook: "Facebook",
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  tinder: "Tinder",
  phone_call: "Phone Call",
  text_sms: "Text / SMS",
  email: "Email",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  dating_app: "Dating App",
  snapchat: "Snapchat",
};

const PAYMENT_NORM = {
  gift_card: "Gift Card",
  bank_transfer: "Bank / Wire Transfer",
  wire_transfer: "Bank / Wire Transfer",
  cryptocurrency: "Cryptocurrency",
  crypto_btc: "Cryptocurrency",
  cash_app: "Cash App",
  cashapp: "Cash App",
  venmo: "Venmo",
  paypal: "PayPal",
  zelle: "Zelle",
  cash: "Cash",
  check: "Check",
};

function normalize(raw, normMap) {
  if (!raw) return raw;
  const key = raw.trim().toLowerCase();
  return normMap[key] || raw.trim();
}

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

    // Gift card brand/seller counts
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

      const scamType = normalize(row.scam_type || "", SCAM_TYPE_NORM);
      if (scamType) {
        scamTypeCounts.set(scamType, (scamTypeCounts.get(scamType) || 0) + 1);
      }

      const platforms = Array.isArray(row.platforms) ? row.platforms : [];
      for (const p of platforms) {
        const name = normalize(p, PLATFORM_NORM);
        if (name) platformCounts.set(name, (platformCounts.get(name) || 0) + 1);
      }

      const methods = Array.isArray(row.payment_methods) ? row.payment_methods : [];
      for (const m of methods) {
        const name = normalize(m, PAYMENT_NORM);
        if (name && name !== "No Money Sent") {
          paymentMethodCounts.set(name, (paymentMethodCounts.get(name) || 0) + 1);
        }
      }

      if (row.amount && Number(row.amount) > 0) {
        totalAmountLost += Number(row.amount);
      }
    }

    // Add gift card reports to scam type counts
    if ((gcResult.data || []).length > 0) {
      scamTypeCounts.set(
        "Gift Card Scam",
        (scamTypeCounts.get("Gift Card Scam") || 0) + (gcResult.data || []).length
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
        brands: topify(brandCounts),
        sellers: topify(sellerCounts),
        scamTypes: topify(scamTypeCounts),
        platforms: topify(platformCounts),
        paymentMethods: topify(paymentMethodCounts),
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
