import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.warn('Supabase admin env vars are missing');
}

export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false },
});
