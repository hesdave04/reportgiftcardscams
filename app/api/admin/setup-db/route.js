// One-time setup endpoint to create the case_intakes table
// DELETE THIS FILE after table is created
import { NextResponse } from "next/server";
import pg from "pg";

export async function POST(request) {
  try {
    const authKey = request.headers.get("x-admin-key");
    const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!authKey || authKey !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json();

    // Build connection string using Supabase pooler with JWT auth
    const ref = process.env.SUPABASE_URL?.match(
      /https:\/\/(.+)\.supabase\.co/
    )?.[1];
    if (!ref) {
      return NextResponse.json(
        { error: "Cannot parse SUPABASE_URL" },
        { status: 500 }
      );
    }

    const databaseUrl =
      process.env.DATABASE_URL ||
      `postgres://postgres.${ref}:${expectedKey}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

    const client = new pg.Client({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    if (action === "create_table") {
      await client.query(`
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
      `);

      // Create index on source for filtering
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_case_intakes_source ON case_intakes(source);
        CREATE INDEX IF NOT EXISTS idx_case_intakes_status ON case_intakes(status);
        CREATE INDEX IF NOT EXISTS idx_case_intakes_created_at ON case_intakes(created_at);
      `);

      // Enable RLS but allow service role full access
      await client.query(`
        ALTER TABLE case_intakes ENABLE ROW LEVEL SECURITY;
        
        DO $$ BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'case_intakes' AND policyname = 'service_role_all'
          ) THEN
            CREATE POLICY service_role_all ON case_intakes
              FOR ALL
              TO service_role
              USING (true)
              WITH CHECK (true);
          END IF;
        END $$;

        DO $$ BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE tablename = 'case_intakes' AND policyname = 'anon_read'
          ) THEN
            CREATE POLICY anon_read ON case_intakes
              FOR SELECT
              TO anon
              USING (true);
          END IF;
        END $$;
      `);

      // Notify PostgREST to reload schema cache
      await client.query("NOTIFY pgrst, 'reload schema'");

      await client.end();
      return NextResponse.json({
        ok: true,
        message: "case_intakes table created with RLS policies",
      });
    }

    if (action === "check") {
      const result = await client.query(`
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name
      `);
      await client.end();
      return NextResponse.json({
        tables: result.rows.map((r) => r.table_name),
      });
    }

    await client.end();
    return NextResponse.json(
      { error: 'Unknown action. Use "create_table" or "check"' },
      { status: 400 }
    );
  } catch (e) {
    console.error("Setup error:", e);
    return NextResponse.json(
      { error: e.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
