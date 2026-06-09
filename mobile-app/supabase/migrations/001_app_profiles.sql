-- App Profiles — stores mobile app user data and search quotas
CREATE TABLE IF NOT EXISTS app_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  is_socialcatfish_customer BOOLEAN DEFAULT FALSE,
  socialcatfish_email TEXT,
  monthly_search_limit INTEGER DEFAULT 10, -- -1 = unlimited
  searches_used_this_month INTEGER DEFAULT 0,
  search_reset_date TIMESTAMPTZ DEFAULT (date_trunc('month', now()) + interval '1 month'),
  verified_at TIMESTAMPTZ,
  push_token TEXT,
  push_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_app_profiles_user_id ON app_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_app_profiles_email ON app_profiles(email);

-- Add reporter_user_id to case_intakes if not exists
DO $$ BEGIN
  ALTER TABLE case_intakes ADD COLUMN IF NOT EXISTS reporter_user_id UUID;
EXCEPTION WHEN undefined_table THEN
  NULL;
END $$;

-- RLS policies
ALTER TABLE app_profiles ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own profile
CREATE POLICY "Users can view own profile"
  ON app_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON app_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON app_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON app_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Function to increment search count atomically
CREATE OR REPLACE FUNCTION increment_search_count(uid UUID)
RETURNS void AS $$
BEGIN
  UPDATE app_profiles
  SET searches_used_this_month = searches_used_this_month + 1,
      updated_at = now()
  WHERE user_id = uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_app_profiles_updated_at
  BEFORE UPDATE ON app_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
