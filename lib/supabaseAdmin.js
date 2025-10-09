// lib/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

/**
 * Lazily create an admin client at request-time.
 * Prevents build-time failures when env vars aren't available.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
