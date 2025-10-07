import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(0, parseInt(searchParams.get('page') || '0', 10));
    const pageSize = Math.min(100, parseInt(searchParams.get('pageSize') || '20', 10));
    const q = (searchParams.get('q') || '').trim();

    let query = supabaseAdmin
      .from('giftcard_reports')
      .select('id, retailer, amount, card_last4, notes, status, created_at')
      .order('created_at', { ascending: false });

    if (q) {
      query = query.or(`retailer.ilike.%${q}%,card_last4.ilike.%${q}%,notes.ilike.%${q}%`);
    }

    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await query.range(from, to);
    if (error) return NextResponse.json({ error: 'Database search failed' }, { status: 500 });

    return NextResponse.json({ page, pageSize, results: data || [] });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
