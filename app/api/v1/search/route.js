// app/api/v1/search/route.js — Full search across scam database
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { authenticateApiKey } from "@/lib/apiAuth";
import { isPhoneLike, toDigits } from "@/utils/phoneNormalize";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/search?q=<query>&type=wallet|email|phone|url|name|all&page=1&limit=25
 *
 * Full-text search across all scam report fields.
 * Returns matching reports with details.
 */
export async function GET(request) {
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
  const q = searchParams.get("q")?.trim();
  const type = searchParams.get("type") || "all";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "25", 10)));
  const offset = (page - 1) * limit;

  if (!q || q.length < 2) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required (min 2 characters)" },
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
    const phoneQuery = isPhoneLike(q);

    // Build search conditions based on type
    // When the query looks like a phone number, search the digits-only
    // normalized column so any formatting variation matches.
    const typeFieldMap = {
      wallet: ["suspect_wallet"],
      email: ["suspect_email"],
      phone: ["phone_normalized"],
      url: ["suspect_website"],
      name: ["suspect_name"],
      username: ["suspect_username"],
      all: phoneQuery
        ? ["phone_normalized", "suspect_wallet", "suspect_email", "suspect_website", "suspect_name", "suspect_username"]
        : ["suspect_wallet", "suspect_email", "suspect_phone", "suspect_website", "suspect_name", "suspect_username"],
    };

    const fields = typeFieldMap[type] || typeFieldMap.all;

    // For phone-related fields, use digits-only matching
    const searchValue = (field) => {
      if (field === "phone_normalized") return toDigits(q);
      return q;
    };

    const conditions = fields.map((f) => `${f}.ilike.%${searchValue(f)}%`);

    const { data, error, count } = await supa
      .from("case_intakes")
      .select(
        "id, scam_type, suspect_name, suspect_email, suspect_phone, suspect_wallet, suspect_username, suspect_website, amount, platforms, payment_methods, source, state, created_at",
        { count: "exact" }
      )
      .or(conditions.join(","))
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const results = (data || []).map((r) => ({
      id: r.id,
      scam_type: r.scam_type,
      suspect: {
        name: r.suspect_name,
        email: r.suspect_email,
        phone: r.suspect_phone,
        wallet: r.suspect_wallet,
        username: r.suspect_username,
        website: r.suspect_website,
      },
      amount_lost: r.amount,
      platforms: r.platforms,
      payment_methods: r.payment_methods,
      source: r.source,
      state: r.state,
      reported_at: r.created_at,
    }));

    return NextResponse.json(
      {
        query: q,
        type,
        page,
        limit,
        total: count || 0,
        total_pages: Math.ceil((count || 0) / limit),
        results,
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
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
