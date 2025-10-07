// lib/supabaseAdmin.js
import { createClient } from '@supabase/supabase-js';

/**
 * Lazily create an admin client at request-time.
 * Never create the client during module load (build step).
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // Do NOT throw at import/build time. Let routes handle misconfig cleanly.
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
