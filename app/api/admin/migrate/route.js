// app/api/admin/migrate/route.js
// Temporary migration endpoint — remove after use
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;

export async function POST(request) {
  try {
    if (!ADMIN_BULK_KEY) {
      return NextResponse.json({ error: "No ADMIN_BULK_KEY" }, { status: 500 });
    }
    const k = request.headers.get("x-admin-bulk-key");
    if (k !== ADMIN_BULK_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // Add state column to case_intakes if it doesn't exist
    const { data, error } = await supabase.rpc("exec_sql", {
      query: "ALTER TABLE case_intakes ADD COLUMN IF NOT EXISTS state TEXT;",
    });

    if (error) {
      // If RPC doesn't exist, try a different approach:
      // Just try to select state and see what happens
      const check = await supabase
        .from("case_intakes")
        .select("state")
        .limit(1);

      if (check.error && check.error.message.includes("does not exist")) {
        return NextResponse.json({
          status: "column_missing",
          message: "The 'state' column does not exist. Please run in Supabase SQL editor: ALTER TABLE case_intakes ADD COLUMN state TEXT;",
          rpc_error: error.message,
        });
      } else if (!check.error) {
        return NextResponse.json({
          status: "already_exists",
          message: "The 'state' column already exists in case_intakes.",
        });
      } else {
        return NextResponse.json({
          status: "error",
          rpc_error: error.message,
          check_error: check.error.message,
        });
      }
    }

    return NextResponse.json({
      status: "migrated",
      message: "state column added to case_intakes",
    });
  } catch (e) {
    return NextResponse.json({ error: String(e.message || e) }, { status: 500 });
  }
}
