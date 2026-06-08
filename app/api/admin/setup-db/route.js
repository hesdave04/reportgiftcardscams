// One-time setup endpoint to create the case_intakes table
// DELETE THIS FILE after table is created
import { NextResponse } from "next/server";
import pg from "pg";

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS case_intakes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story TEXT,
    scam_type TEXT,
    platforms TEXT[] DEFAULT '{}',
    sent_money TEXT,
    sent_personal_info TEXT,
    amount NUMERIC,
    payment_methods TEXT[] DEFAULT '{}',
    start_date DATE,
    payment_date DATE,
    realized_date DATE,
    suspect_name TEXT,
    suspect_email TEXT,
    suspect_phone TEXT,
    suspect_username TEXT,
    suspect_wallet TEXT,
    suspect_website TEXT,
    evidence_urls TEXT[] DEFAULT '{}',
    full_payload JSONB DEFAULT '{}',
    status TEXT DEFAULT 'new',
    source TEXT,
    client_name TEXT,
    date_of_report DATE,
    identity_verified TEXT,
    risk_level TEXT,
    conclusions TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  CREATE INDEX IF NOT EXISTS idx_case_intakes_source ON case_intakes(source);
  CREATE INDEX IF NOT EXISTS idx_case_intakes_status ON case_intakes(status);
  CREATE INDEX IF NOT EXISTS idx_case_intakes_created_at ON case_intakes(created_at);
  ALTER TABLE case_intakes ENABLE ROW LEVEL SECURITY;
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='case_intakes' AND policyname='service_role_all') THEN
      CREATE POLICY service_role_all ON case_intakes FOR ALL TO service_role USING (true) WITH CHECK (true);
    END IF;
  END $$;
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='case_intakes' AND policyname='anon_read') THEN
      CREATE POLICY anon_read ON case_intakes FOR SELECT TO anon USING (true);
    END IF;
  END $$;
  NOTIFY pgrst, 'reload schema';
`;

export async function POST(request) {
  try {
    const authKey = request.headers.get("x-admin-key");
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!authKey || authKey !== serviceKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, database_url } = await request.json();
    const ref = process.env.SUPABASE_URL?.match(/https:\/\/(.+)\.supabase\.co/)?.[1];

    // Try connection methods in order
    const connStrings = [];
    if (database_url) connStrings.push({ label: "provided", url: database_url });
    if (process.env.DATABASE_URL) connStrings.push({ label: "env", url: process.env.DATABASE_URL });
    if (ref) {
      connStrings.push({ label: "direct", url: `postgres://postgres:${serviceKey}@db.${ref}.supabase.co:5432/postgres` });
      connStrings.push({ label: "pooler-tx-6543", url: `postgres://postgres.${ref}:${serviceKey}@aws-0-us-east-1.pooler.supabase.com:6543/postgres` });
      connStrings.push({ label: "pooler-session-5432", url: `postgres://postgres.${ref}:${serviceKey}@aws-0-us-east-1.pooler.supabase.com:5432/postgres` });
    }

    let connected = false;
    let client;
    const errors = [];

    for (const { label, url } of connStrings) {
      try {
        client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 10000 });
        await client.connect();
        connected = true;
        errors.push({ label, status: "connected" });
        break;
      } catch (e) {
        errors.push({ label, error: e.message?.slice(0, 120) });
        try { await client?.end(); } catch {}
      }
    }

    if (!connected) {
      return NextResponse.json({ error: "All connection methods failed", attempts: errors }, { status: 500 });
    }

    if (action === "create_table") {
      await client.query(CREATE_TABLE_SQL);
      await client.end();
      return NextResponse.json({ ok: true, message: "case_intakes table created", connection: errors });
    }

    if (action === "check") {
      const result = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
      await client.end();
      return NextResponse.json({ tables: result.rows.map(r => r.table_name), connection: errors });
    }

    await client.end();
    return NextResponse.json({ error: "Unknown action", attempts: errors }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e.message || "Unexpected error" }, { status: 500 });
  }
}
