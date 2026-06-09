// app/api/v1/report/route.js — Submit a scam report via API
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { authenticateApiKey } from "@/lib/apiAuth";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/report
 *
 * Submit a scam report. Partners contribute data back to the database.
 * Body: { scam_type, story, suspect_name, suspect_email, suspect_phone,
 *         suspect_wallet, suspect_website, suspect_username, amount,
 *         platforms, payment_methods, state }
 */
export async function POST(request) {
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

  const supa = getSupabaseAdmin();
  if (!supa) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Validate: must have at least one identifying field
    const identifiers = [
      body.suspect_name,
      body.suspect_email,
      body.suspect_phone,
      body.suspect_wallet,
      body.suspect_website,
      body.suspect_username,
      body.story,
    ].filter(Boolean);

    if (identifiers.length === 0) {
      return NextResponse.json(
        {
          error:
            "At least one identifying field required: suspect_name, suspect_email, suspect_phone, suspect_wallet, suspect_website, suspect_username, or story",
        },
        { status: 400 }
      );
    }

    function truncate(s, max = 10000) {
      if (!s) return null;
      return String(s).slice(0, max);
    }

    function ensureArray(v) {
      if (Array.isArray(v)) return v;
      if (typeof v === "string" && v.trim()) return [v];
      return [];
    }

    function cleanAmount(a) {
      if (a === null || a === undefined) return null;
      const num = Number(String(a).replace(/[^0-9.]/g, ""));
      return Number.isNaN(num) ? null : num;
    }

    // Build the partner source tag
    const partnerSource = `api_${auth.partner
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .slice(0, 30)}`;

    const row = {
      story: truncate(body.story),
      scam_type: body.scam_type || null,
      platforms: ensureArray(body.platforms),
      amount: cleanAmount(body.amount),
      payment_methods: ensureArray(body.payment_methods),
      suspect_name: truncate(body.suspect_name, 500),
      suspect_email: truncate(body.suspect_email, 500),
      suspect_phone: truncate(body.suspect_phone, 100),
      suspect_username: truncate(body.suspect_username, 500),
      suspect_wallet: truncate(body.suspect_wallet, 500),
      suspect_website: truncate(body.suspect_website, 1000),
      state: truncate(body.state, 10),
      source: partnerSource,
      status: "submitted",
    };

    const { data, error } = await supa
      .from("case_intakes")
      .insert(row)
      .select("id, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json(
      {
        ok: true,
        report_id: data.id,
        created_at: data.created_at,
        source: partnerSource,
        message: "Report submitted successfully. Thank you for contributing.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Report API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
