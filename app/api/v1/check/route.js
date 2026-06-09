// app/api/v1/check/route.js — Quick yes/no scam lookup
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { authenticateApiKey } from "@/lib/apiAuth";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/check?wallet=0x...&email=...&phone=...&url=...
 *
 * Quick lookup: is this identifier in our scam database?
 * Returns hit/miss with report count and scam types.
 * Checks all provided params (AND logic — any match counts).
 */
export async function GET(request) {
  // Authenticate
  const auth = await authenticateApiKey(request);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: auth.error },
      {
        status: auth.status,
        headers: auth.retryAfter
          ? { "Retry-After": String(auth.retryAfter) }
          : {},
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get("wallet")?.trim();
  const email = searchParams.get("email")?.trim().toLowerCase();
  const phone = searchParams.get("phone")?.trim();
  const url = searchParams.get("url")?.trim().toLowerCase();
  const name = searchParams.get("name")?.trim().toLowerCase();

  if (!wallet && !email && !phone && !url && !name) {
    return NextResponse.json(
      {
        error:
          "At least one search parameter required: wallet, email, phone, url, or name",
      },
      { status: 400 }
    );
  }

  const supa = getSupabaseAdmin();
  if (!supa) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const results = { found: false, matches: [] };

    // Build OR conditions for case_intakes
    const conditions = [];
    if (wallet) conditions.push(`suspect_wallet.ilike.%${wallet}%`);
    if (email) conditions.push(`suspect_email.ilike.%${email}%`);
    if (phone) conditions.push(`suspect_phone.ilike.%${phone}%`);
    if (url) conditions.push(`suspect_website.ilike.%${url}%`);
    if (name) conditions.push(`suspect_name.ilike.%${name}%`);

    if (conditions.length > 0) {
      const { data, error, count } = await supa
        .from("case_intakes")
        .select("id, scam_type, source, created_at", { count: "exact" })
        .or(conditions.join(","))
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error && data && data.length > 0) {
        results.found = true;
        results.totalMatches = count;
        results.matches = data.map((r) => ({
          id: r.id,
          scam_type: r.scam_type,
          source: r.source,
          reported_at: r.created_at,
        }));
      }
    }

    // Also check giftcard_reports if wallet looks like a card number
    // (for future use when gift card numbers are populated)

    return NextResponse.json(
      {
        query: { wallet, email, phone, url, name },
        found: results.found,
        total_matches: results.totalMatches || 0,
        matches: results.matches,
        checked_at: new Date().toISOString(),
        rate_limit: {
          remaining_today: auth.rateLimit.remaining,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Remaining": String(auth.rateLimit.remaining),
        },
      }
    );
  } catch (err) {
    console.error("Check API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
