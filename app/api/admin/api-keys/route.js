// app/api/admin/api-keys/route.js — Generate and manage partner API keys
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { generateApiKey, hashApiKey } from "@/lib/apiAuth";

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;

/**
 * POST /api/admin/api-keys
 *
 * Generate a new API key for a partner.
 * Body: { partner_name, contact_email, tier?, permissions? }
 * Auth: x-admin-bulk-key header
 *
 * Returns the raw API key (only shown once — not stored).
 */
export async function POST(request) {
  const k = request.headers.get("x-admin-bulk-key");
  if (!ADMIN_BULK_KEY || k !== ADMIN_BULK_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const { partner_name, contact_email, tier, permissions } = body;

    if (!partner_name) {
      return NextResponse.json(
        { error: "partner_name is required" },
        { status: 400 }
      );
    }

    // Generate key
    const rawKey = generateApiKey();
    const keyHash = hashApiKey(rawKey);

    // Store
    const { data, error } = await supa
      .from("api_keys")
      .insert({
        key_hash: keyHash,
        key_prefix: rawKey.slice(0, 12) + "...",
        partner_name,
        contact_email: contact_email || null,
        tier: tier || "free",
        permissions: permissions || ["check", "search", "report", "stats"],
        is_active: true,
      })
      .select("id, partner_name, tier, created_at")
      .single();

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      api_key: rawKey, // ⚠️ Only shown once — store securely!
      key_id: data.id,
      partner_name: data.partner_name,
      tier: data.tier,
      created_at: data.created_at,
      warning: "Store this API key securely. It cannot be retrieved again.",
      endpoints: {
        check: "GET /api/v1/check?wallet=...&email=...&phone=...&url=...&name=...",
        search: "GET /api/v1/search?q=...&type=all&page=1&limit=25",
        report: "POST /api/v1/report",
        stats: "GET /api/v1/stats (no key required)",
      },
    });
  } catch (err) {
    console.error("API key generation error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/api-keys
 *
 * List all API keys (hashed, never raw).
 * Auth: x-admin-bulk-key header
 */
export async function GET(request) {
  const k = request.headers.get("x-admin-bulk-key");
  if (!ADMIN_BULK_KEY || k !== ADMIN_BULK_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supa = getSupabaseAdmin();
  if (!supa) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supa
      .from("api_keys")
      .select("id, key_prefix, partner_name, contact_email, tier, is_active, permissions, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ keys: data });
  } catch (err) {
    console.error("API keys list error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
