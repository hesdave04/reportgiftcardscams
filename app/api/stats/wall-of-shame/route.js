// app/api/stats/wall-of-shame/route.js
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * GET /api/stats/wall-of-shame?days=180
 * Returns:
 * {
 *   brands:  [{ name: "Amazon", count: 12, total_amount: 2400.00 }, ...],
 *   sellers: [{ name: "CVS (in-store)", count: 8, total_amount: 1600.00 }, ...]
 * }
 */
export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const url = new URL(request.url);
    const daysParam = parseInt(url.searchParams.get('days') || '180', 10);
    const days = Number.isFinite(daysParam) ? Math.min(Math.max(daysParam, 1), 3650) : 180;
    const sinceISO = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Page through rows to avoid huge single requests (cap ~10k)
    const batchSize = 1000;
    let from = 0;
    let all = [];

    for (;;) {
      const { data, error } = await supabase
        .from('giftcard_reports')
        .select('gift_card_brand, retailer, amount, created_at')
        .gte('created_at', sinceISO)
        .order('created_at', { ascending: false })
        .range(from, from + batchSize - 1);

      if (error) {
        console.error(error);
        return NextResponse.json({ error: 'Query failed' }, { status: 500 });
      }
      if (!data || data.length === 0) break;

      all = all.concat(data);
      if (data.length < batchSize || all.length >= 10000) break;
      from += batchSize;
    }

    // Aggregate in memory
    const byBrand = new Map();
    const bySeller = new Map();

    for (const r of all) {
      const brand = (r.gift_card_brand || '').trim() || 'Unknown';
      const seller = (r.retailer || '').trim() || 'Unknown';
      const amt = r.amount != null ? Number(r.amount) : 0;

      const bAgg = byBrand.get(brand) || { name: brand, count: 0, total_amount: 0 };
      bAgg.count += 1;
      bAgg.total_amount += amt;
      byBrand.set(brand, bAgg);

      const sAgg = bySeller.get(seller) || { name: seller, count: 0, total_amount: 0 };
      sAgg.count += 1;
      sAgg.total_amount += amt;
      bySeller.set(seller, sAgg);
    }

    const sortAgg = (arr) =>
      arr.sort((a, b) => b.count - a.count || b.total_amount - a.total_amount).slice(0, 50);

    const brands = sortAgg(Array.from(byBrand.values()));
    const sellers = sortAgg(Array.from(bySeller.values()));

    return NextResponse.json({ brands, sellers });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
