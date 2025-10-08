import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;

function digits(s=''){ return String(s).replace(/\D/g, ''); }
function cleanAmount(a){
  if (a === null || a === undefined) return null;
  const num = Number(String(a).replace(/[^0-9.]/g, ''));
  return Number.isNaN(num) ? null : num;
}
function normDate(d){
  if (!d) return null;
  const s = String(d).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const [mm, dd, yyyy] = s.split('/');
    return `${yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`;
  }
  return null;
}

export async function POST(request) {
  try {
    if (!ADMIN_BULK_KEY) return NextResponse.json({ error: 'Server missing ADMIN_BULK_KEY' }, { status: 500 });
    const k = request.headers.get('x-admin-bulk-key');
    if (k !== ADMIN_BULK_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { items } = await request.json();
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    const rows = items.map(x => ({
      gift_card_brand: x.gift_card_brand ?? null,
      retailer: x.retailer ?? null,
      card_number_plain: digits(x.cardNumber),
      amount: cleanAmount(x.amount),
      purchase_city: x.purchase_city ?? null,
      purchase_state: x.purchase_state ?? null,
      purchase_date: normDate(x.purchase_date),
      notes: x.notes ?? null,
      fraud_phone: x.fraud_phone ?? null,
      fraud_email: x.fraud_email ?? null,
      fraud_social: x.fraud_social ?? null,
      status: 'pending'
    })).filter(r => r.card_number_plain && /^\d{8,22}$/.test(r.card_number_plain));

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('giftcard_reports').insert(rows).select();
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Insert failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, inserted: data.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
