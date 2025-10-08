import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    // Normalize + basic validation
    const rows = items
      .map((i) => {
        const number = String(i.cardNumber || '').replace(/\D/g, '');
        if (!number || !/^\d{8,19}$/.test(number)) return null;
        return {
          retailer: i.retailer || null,
          amount: i.amount ? Number(i.amount) : null,
          purchase_city: i.purchase_city || null,
          purchase_state: i.purchase_state || null,
          purchase_date: i.purchase_date || null,
          card_last4: number.slice(-4),
          notes: i.notes || null,
          status: 'pending'
        };
      })
      .filter(Boolean);

    if (!rows.length) {
      return NextResponse.json({ error: 'All rows invalid' }, { status: 400 });
    }

    const { data, error } = await supabase.from('giftcard_reports').insert(rows).select();
    if (error) {
      return NextResponse.json({ error: 'Bulk insert failed' }, { status: 500 });
    }

    return NextResponse.json({ inserted: data?.length || 0, duplicates: 0 });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Unexpected error' }, { status: 500 });
  }
}
