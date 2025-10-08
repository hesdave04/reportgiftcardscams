import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function normalizeDigits(str = '') {
  return String(str).replace(/\D/g, '');
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const body = await request.json();
    const {
      gift_card_brand,       // e.g., "Apple", "Google Play"
      retailer,              // e.g., "CVS", "Staples"
      cardNumber,            // full digits now
      amount,                // number or string "$200"
      purchase_city,
      purchase_state,
      purchase_date,         // "YYYY-MM-DD" or "MM/DD/YYYY"
      recipient_email,       // optional legacy
      reporter_email,        // optional legacy
      notes,
      fraud_phone,
      fraud_email,
      fraud_social
    } = body || {};

    if (!cardNumber) {
      return NextResponse.json({ error: 'Missing cardNumber' }, { status: 400 });
    }

    const digits = normalizeDigits(cardNumber);
    if (!/^\d{8,22}$/.test(digits)) {
      return NextResponse.json({ error: 'Invalid card number' }, { status: 400 });
    }

    // normalise amount like "$200", "200", "200.00"
    let amt = null;
    if (amount !== undefined && amount !== null && String(amount).trim() !== '') {
      const num = Number(String(amount).replace(/[^0-9.]/g, ''));
      if (!Number.isNaN(num)) amt = num;
    }

    // normalise date
    let dt = null;
    if (purchase_date) {
      const m = String(purchase_date).trim();
      // accept YYYY-MM-DD or MM/DD/YYYY
      if (/^\d{4}-\d{2}-\d{2}$/.test(m)) dt = m;
      else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(m)) {
        const [mm, dd, yyyy] = m.split('/');
        dt = `${yyyy}-${mm.padStart(2,'0')}-${dd.padStart(2,'0')}`;
      }
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase admin env missing' }, { status: 500 });
    }

    const insert = {
      gift_card_brand: gift_card_brand || null,
      retailer: retailer || null,
      card_number_plain: digits,   // <-- store full number
      amount: amt,
      purchase_city: purchase_city || null,
      purchase_state: purchase_state || null,
      purchase_date: dt,
      recipient_email: recipient_email || null,
      reporter_email: reporter_email || null,
      reporter_ip: ip,
      notes: notes || null,
      fraud_phone: fraud_phone || null,
      fraud_email: fraud_email || null,
      fraud_social: fraud_social || null,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('giftcard_reports')
      .insert(insert)
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    // public-safe response (mask full number)
    const publicView = {
      id: data.id,
      gift_card_brand: data.gift_card_brand,
      retailer: data.retailer,
      amount: data.amount,
      card_last4: data.card_last4,
      notes: data.notes ? (data.notes.length > 220 ? data.notes.slice(0, 220) + '…' : data.notes) : null,
      status: data.status,
      created_at: data.created_at,
      purchase_city: data.purchase_city,
      purchase_state: data.purchase_state,
      purchase_date: data.purchase_date
    };

    return NextResponse.json({ ok: true, report: publicView }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
