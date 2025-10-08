import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase admin env missing' }, { status: 500 });
    }

    // Basic “contains” search on brand/retailer or exact last4
    let query = supabase.from('giftcard_reports').select(`
      id, gift_card_brand, retailer, amount, card_last4, notes, created_at, purchase_city, purchase_state, purchase_date
    `).order('created_at', { ascending: false }).limit(50);

    if (q) {
      if (/^\d{4}$/.test(q)) {
        query = query.eq('card_last4', q);
      } else {
        query = query.or(`gift_card_brand.ilike.%${q}%,retailer.ilike.%${q}%`);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    return NextResponse.json({ results: data || [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
