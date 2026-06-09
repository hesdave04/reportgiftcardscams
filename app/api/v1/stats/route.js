// app/api/v1/stats/route.js — Public aggregate stats (no API key required)
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/stats
 *
 * Public endpoint — no API key required.
 * Returns aggregate statistics about the scam database.
 */
export async function GET() {
  const supa = getSupabaseAdmin();
  if (!supa) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    // Total counts (parallel)
    const [totalIntakes, totalGiftCards, ...fieldCounts] = await Promise.all([
      supa
        .from("case_intakes")
        .select("id", { count: "exact", head: true }),
      supa
        .from("giftcard_reports")
        .select("id", { count: "exact", head: true }),
      // Field counts
      ...["suspect_name", "suspect_email", "suspect_phone", "suspect_wallet", "suspect_username", "suspect_website"].map(
        (field) =>
          supa
            .from("case_intakes")
            .select("id", { count: "exact", head: true })
            .not(field, "is", null)
            .neq(field, "")
      ),
    ]);

    const fields = [
      "suspect_names",
      "email_addresses",
      "phone_numbers",
      "crypto_wallets",
      "usernames",
      "websites",
    ];

    const dataPoints = {};
    let totalDataPoints = 0;
    fields.forEach((label, i) => {
      const c = fieldCounts[i]?.count || 0;
      dataPoints[label] = c;
      totalDataPoints += c;
    });

    // Source breakdown
    const knownSources = [
      "submitted",
      "scf_verified",
      "3p_chainabuse",
      "3p_cryptolegal",
      "user_submitted",
    ];
    const sourceResults = await Promise.all(
      knownSources.map((src) =>
        supa
          .from("case_intakes")
          .select("id", { count: "exact", head: true })
          .eq("source", src)
      )
    );

    const sourceLabels = {
      submitted: "User Submitted",
      user_submitted: "User Submitted",
      scf_verified: "SCF Verified",
      "3p_chainabuse": "ChainAbuse",
      "3p_cryptolegal": "CryptoLegal",
    };

    const sources = {};
    knownSources.forEach((src, i) => {
      const c = sourceResults[i]?.count || 0;
      if (c > 0) {
        sources[sourceLabels[src] || src] = c;
      }
    });

    return NextResponse.json(
      {
        total_reports: (totalIntakes.count || 0) + (totalGiftCards.count || 0),
        case_intakes: totalIntakes.count || 0,
        gift_card_reports: totalGiftCards.count || 0,
        data_points: dataPoints,
        total_data_points: totalDataPoints,
        sources,
        last_updated: new Date().toISOString(),
        api_version: "1.0",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
