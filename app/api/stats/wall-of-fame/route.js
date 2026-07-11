// app/api/stats/wall-of-fame/route.js
// Returns top reporters by report count for the Wall of Fame.
// Only includes reporters who have opted into public display (display_name set).
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let limit = parseInt(searchParams.get('limit') || '25', 10);
    if (!Number.isFinite(limit) || limit <= 0) limit = 25;
    if (limit > 100) limit = 100;

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Fetch top reporters ordered by reports_count
    // Only include those with a display_name and reports_count > 0
    const { data: reporters, error } = await supa
      .from('reporters')
      .select('id, display_name, role, is_whitelisted, reports_count, created_at')
      .gt('reports_count', 0)
      .not('display_name', 'is', null)
      .neq('display_name', '')
      .order('reports_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Wall of Fame query error:', error);
      return NextResponse.json(
        { error: 'Database query failed' },
        { status: 500 }
      );
    }

    // Shape the response — never expose email or user_id
    const leaderboard = (reporters || []).map((r, idx) => ({
      rank: idx + 1,
      displayName: r.display_name,
      reportsCount: r.reports_count,
      isScambaiter: r.role === 'scambaiter' || r.is_whitelisted,
      memberSince: r.created_at,
    }));

    // Also get overall stats
    const { count: totalReporters } = await supa
      .from('reporters')
      .select('id', { count: 'exact', head: true })
      .gt('reports_count', 0);

    const { count: totalScambaiters } = await supa
      .from('reporters')
      .select('id', { count: 'exact', head: true })
      .or('role.eq.scambaiter,is_whitelisted.eq.true')
      .gt('reports_count', 0);

    return NextResponse.json(
      {
        leaderboard,
        meta: {
          totalReporters: totalReporters || 0,
          totalScambaiters: totalScambaiters || 0,
        },
      },
      { headers: { 'cache-control': 'public, max-age=300' } }
    );
  } catch (err) {
    console.error('Wall of Fame error:', err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
