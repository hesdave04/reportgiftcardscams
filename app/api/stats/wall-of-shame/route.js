import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

// GET /api/stats/wall-of-shame?days=180
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const days = Math.max(
      1,
      Math.min(365, parseInt(url.searchParams.get('days') || '180', 10))
    );

    const since = new Date();
    since.setDate(since.getDate() - days);

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    // Pull the minimum fields we need, then aggregate in memory.
    const { data, error } = await supabase
      .from('giftcard_reports')
      .select('gift_card_brand, seller_retailer, created_at')
      .gte('created_at', since.toISOString())
      .limit(50000); // safety

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const brandCounts = {};
    const sellerCounts = {};

    for (const row of data || []) {
      const brand = (row.gift_card_brand || 'Unknown').trim();
      const seller = (row.seller_retailer || 'Unknown').trim();
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
      sellerCounts[seller] = (sellerCounts[seller] || 0) + 1;
    }

    const toTop = (obj) =>
      Object.entries(obj)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

    return NextResponse.json({
      brands: toTop(brandCounts),
      sellers: toTop(sellerCounts),
      total: data?.length || 0,
      range_days: days,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e.message || e) }, { status: 500 });
  }
}
