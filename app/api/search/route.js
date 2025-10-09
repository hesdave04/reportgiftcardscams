// app/api/search/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const url = new URL(request.url);
    const q = (url.searchParams.get('q') || '').trim();
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(url.searchParams.get('pageSize') || '20', 10), 1), 100);

    let query = supabase
      .from('giftcard_reports')
      .select('id, retailer, gift_card_brand, card_last4, amount, notes, created_at', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (q) {
      if (/^\d{2,6}$/.test(q)) {
        query = query.ilike('card_last4', `%${q.slice(-4)}%`);
      } else {
        query = query.or(`retailer.ilike.%${q}%,gift_card_brand.ilike.%${q}%,notes.ilike.%${q}%`);
      }
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query.range(from, to);
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    return NextResponse.json({
      items: (data || []).map((r) => ({
        id: r.id,
        retailer: r.retailer,
        gift_card_brand: r.gift_card_brand,
        card_last4: r.card_last4,
        amount: r.amount,
        notes: r.notes ? (r.notes.length > 220 ? r.notes.slice(0, 220) + '…' : r.notes) : null,
        created_at: r.created_at,
      })),
      page,
      pageSize,
      total: count || 0,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
