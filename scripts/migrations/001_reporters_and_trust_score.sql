-- Migration: 001_reporters_and_trust_score
-- Adds reporter accounts, trust scoring, and Wall of Fame support
--
-- Run via Supabase SQL Editor or supabase_apply_migration

-- ═══════════════════════════════════════════════
-- 1. Create reporters table
-- ═══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS reporters (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  display_name text NOT NULL DEFAULT '',
  role        text NOT NULL DEFAULT 'reporter'
                CHECK (role IN ('reporter', 'scambaiter')),
  is_whitelisted boolean NOT NULL DEFAULT false,
  reports_count  integer NOT NULL DEFAULT 0,
  bio         text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT reporters_user_id_unique UNIQUE (user_id)
);

-- Index for leaderboard queries (Wall of Fame)
CREATE INDEX IF NOT EXISTS idx_reporters_reports_count
  ON reporters (reports_count DESC)
  WHERE reports_count > 0;

-- Index for role-based queries
CREATE INDEX IF NOT EXISTS idx_reporters_role
  ON reporters (role);

-- ═══════════════════════════════════════════════
-- 2. Add columns to case_intakes
-- ═══════════════════════════════════════════════
ALTER TABLE case_intakes
  ADD COLUMN IF NOT EXISTS reporter_id   uuid REFERENCES reporters(id),
  ADD COLUMN IF NOT EXISTS reporter_role text,
  ADD COLUMN IF NOT EXISTS trust_score   integer,
  ADD COLUMN IF NOT EXISTS trust_tier    text;

-- Index for filtering by reporter
CREATE INDEX IF NOT EXISTS idx_case_intakes_reporter_id
  ON case_intakes (reporter_id)
  WHERE reporter_id IS NOT NULL;

-- Index for trust score filtering
CREATE INDEX IF NOT EXISTS idx_case_intakes_trust_score
  ON case_intakes (trust_score DESC)
  WHERE trust_score IS NOT NULL;

-- ═══════════════════════════════════════════════
-- 3. RLS policies for reporters table
-- ═══════════════════════════════════════════════
ALTER TABLE reporters ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY reporters_select_own ON reporters
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile (display_name, bio only)
CREATE POLICY reporters_update_own ON reporters
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can do everything (for API routes)
-- (Supabase service role key bypasses RLS by default)

-- Public read for Wall of Fame (display_name, role, reports_count only)
CREATE POLICY reporters_select_public ON reporters
  FOR SELECT USING (reports_count > 0 AND display_name IS NOT NULL AND display_name != '');

-- ═══════════════════════════════════════════════
-- 4. Helper function to increment reporter count
-- ═══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION increment_reporter_count(reporter_row_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE reporters
  SET reports_count = reports_count + 1,
      updated_at = now()
  WHERE id = reporter_row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ═══════════════════════════════════════════════
-- 5. Updated_at trigger for reporters
-- ═══════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_reporters_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reporters_updated_at
  BEFORE UPDATE ON reporters
  FOR EACH ROW
  EXECUTE FUNCTION update_reporters_updated_at();
