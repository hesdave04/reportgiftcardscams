// app/api/auth/my-reports/route.js
// Returns the authenticated user's reports and stats.
// Uses Supabase auth token from the request to identify the user.
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Get access token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Verify the user's JWT with Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const supabaseAuth = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    // Get reporter profile
    const { data: reporter } = await supa
      .from('reporters')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!reporter) {
      return NextResponse.json({
        stats: { totalReports: 0, uniqueScammers: 0 },
        reports: [],
      });
    }

    // Get reports by this reporter
    const { data: reports, error: reportsError } = await supa
      .from('case_intakes')
      .select('id, scam_type, status, created_at, suspect_name, suspect_website, trust_score')
      .eq('reporter_id', reporter.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (reportsError) {
      console.error('Reports fetch error:', reportsError);
    }

    // Compute stats
    const reportsList = reports || [];
    const uniqueScammers = new Set();
    for (const r of reportsList) {
      if (r.suspect_name) uniqueScammers.add(r.suspect_name.toLowerCase());
      if (r.suspect_website) uniqueScammers.add(r.suspect_website.toLowerCase());
    }

    return NextResponse.json({
      stats: {
        totalReports: reporter.reports_count || reportsList.length,
        uniqueScammers: uniqueScammers.size,
      },
      reports: reportsList,
    });
  } catch (e) {
    console.error('my-reports error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
