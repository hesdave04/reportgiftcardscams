import Constants from 'expo-constants';
import { supabase } from './supabase';

const API_BASE = Constants.expoConfig?.extra?.apiBaseUrl || 'https://scamcomplaints.org';

/**
 * Authenticated fetch wrapper — attaches user JWT to requests.
 */
async function authFetch(path, options = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = {
    'Content-Type': 'application/json',
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

// ── Reports ──

export async function submitReport(reportData) {
  return authFetch('/api/report', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
}

export async function submitQuickReport(reportData) {
  return authFetch('/api/quick-report', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
}

export async function submitCaseIntake(data) {
  return authFetch('/api/intake', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ── Search ──

export async function searchScams(query, page = 1, pageSize = 20) {
  const params = new URLSearchParams({ q: query, page: String(page), pageSize: String(pageSize) });
  return authFetch(`/api/search?${params}`);
}

// ── User profile & quotas ──

export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('app_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist — create one
    const { data: newProfile, error: createErr } = await supabase
      .from('app_profiles')
      .insert({
        user_id: user.id,
        email: user.email,
        display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        is_socialcatfish_customer: false,
        monthly_search_limit: 10,
        searches_used_this_month: 0,
        search_reset_date: getNextResetDate(),
      })
      .select()
      .single();

    if (createErr) throw createErr;
    return newProfile;
  }
  if (error) throw error;
  return data;
}

export async function updateProfile(updates) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('app_profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function verifySocialCatfishCustomer(email) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // For now, mark the user as a Social Catfish customer by email verification.
  // Later this will call the SCF API for real validation.
  const { data, error } = await supabase
    .from('app_profiles')
    .update({
      is_socialcatfish_customer: true,
      socialcatfish_email: email,
      monthly_search_limit: -1, // -1 = unlimited
      verified_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ── Search quota ──

export async function checkSearchQuota() {
  const profile = await getProfile();

  // Reset monthly counter if past reset date
  if (new Date(profile.search_reset_date) <= new Date()) {
    const updated = await updateProfile({
      searches_used_this_month: 0,
      search_reset_date: getNextResetDate(),
    });
    return {
      remaining: updated.monthly_search_limit === -1 ? Infinity : updated.monthly_search_limit,
      limit: updated.monthly_search_limit,
      unlimited: updated.monthly_search_limit === -1,
    };
  }

  const remaining = profile.monthly_search_limit === -1
    ? Infinity
    : Math.max(0, profile.monthly_search_limit - profile.searches_used_this_month);

  return {
    remaining,
    limit: profile.monthly_search_limit,
    used: profile.searches_used_this_month,
    unlimited: profile.monthly_search_limit === -1,
    resetDate: profile.search_reset_date,
  };
}

export async function consumeSearch() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Get current profile
  const profile = await getProfile();

  // Unlimited users skip quota
  if (profile.monthly_search_limit === -1) return { ok: true, remaining: Infinity };

  // Check if reset is needed
  if (new Date(profile.search_reset_date) <= new Date()) {
    await updateProfile({
      searches_used_this_month: 1,
      search_reset_date: getNextResetDate(),
    });
    return { ok: true, remaining: profile.monthly_search_limit - 1 };
  }

  if (profile.searches_used_this_month >= profile.monthly_search_limit) {
    return { ok: false, remaining: 0, resetDate: profile.search_reset_date };
  }

  const { data } = await supabase.rpc('increment_search_count', { uid: user.id });
  return {
    ok: true,
    remaining: profile.monthly_search_limit - profile.searches_used_this_month - 1,
  };
}

// ── My reports ──

export async function getMyReports(page = 1, pageSize = 20) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('case_intakes')
    .select('*', { count: 'exact' })
    .eq('reporter_user_id', user.id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { data, total: count, page, pageSize };
}

// ── Account deletion ──

export async function deleteAccount() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Delete profile
  await supabase.from('app_profiles').delete().eq('user_id', user.id);

  // Anonymize reports (keep data, remove user link)
  await supabase
    .from('case_intakes')
    .update({ reporter_user_id: null, reporter_email: null })
    .eq('reporter_user_id', user.id);

  // Sign out (actual user deletion requires admin/edge function)
  await supabase.auth.signOut();
}

// ── Helpers ──

function getNextResetDate() {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next.toISOString();
}
