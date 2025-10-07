import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TABLE = 'giftcard_reports';

// normalize names for grouping
function norm(s) {
  if (!s) return null;
  const t = String(s).trim();
  if (!t) return null;
  return t;
}
function titleCase(s) {
  return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);
    const since = searchParams.get('since'); // YYYY-MM-DD or ISO, optional
    // Pull a bounded dataset (defaults to ~6 months if since not provided)
    const defaultSince = new Date();
    defaultSince.setMonth(defaultSince.getMonth() - 6);
    const sinceISO = since ? new Date(since).toISOString() : defaultSince.toISOString();

    let query = supabase
      .from(TABLE)
      .select('retailer, purchase_retailer, created_at')
      .order('created_at', { ascending: false });

    if (sinceISO) query = query.gte('created_at', sinceISO);

    // NOTE: This fetches recent rows and aggregates in Node.
    // For huge datasets, move this to SQL functions (RPC).
    const { data, error } = await query.limit(20000);
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    const issuerCounts = new Map();
    const storeCounts  = new Map();

    for (const r of data || []) {
      const issuer = norm(r.retailer);
      const store  = norm(r.purchase_retailer);

      if (issuer) issuerCounts.set(issuer, (issuerCounts.get(issuer) || 0) + 1);
      if (store)  storeCounts.set(store,  (storeCounts.get(store)  || 0) + 1);
    }

    const topIssuers = [...issuerCounts.entries()]
      .sort((a,b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));

    const topStores = [...storeCounts.entries()]
      .sort((a,b) => b[1] - a[1])
      .slice(0, limit)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      ok: true,
      since: sinceISO,
      topGiftCardIssuers: topIssuers,
      topSellingRetailers: topStores
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
