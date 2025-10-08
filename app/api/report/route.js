import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin'; // OR use getSupabaseAdmin if that's your helper
import { encrypt, hmacHex } from '@/lib/crypto';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({
  window: parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10),
  limit: parseInt(process.env.RATE_LIMIT_MAX || '20', 10),
});

function normalizeAmount(input) {
  if (input == null || input === '') return null;
  const cleaned = String(input).replace(/[^\d.]/g, '');
  const val = Number(cleaned);
  return Number.isFinite(val) ? val : null;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const { ok } = await limiter.check(ip);
    if (!ok) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();

    // NEW: fraudster fields
    const { fraud_phone, fraud_email, fraud_social } = body;

    const {
      gift_card_brand,
      retailer,
      cardNumber,
      amount,
      purchase_city,
      purchase_state,
      purchase_date,
      recipient_email,
      notes,
    } = body || {};

    // basic validation
    if (!cardNumber) {
      return NextResponse.json({ error: 'Missing card number' }, { status: 400 });
    }

    const normalizedCard = String(cardNumber).replace(/\s|-/g, '');
    if (!/^\d{8,19}$/.test(normalizedCard)) {
      return NextResponse.json({ error: 'Invalid card number format' }, { status: 400 });
    }

    const last4 = normalizedCard.slice(-4);
    const card_hash = hmacHex(normalizedCard);
    const encrypted_card = encrypt(normalizedCard);

    const insert = {
      gift_card_brand: gift_card_brand || null,
      retailer: retailer || null,
      amount: normalizeAmount(amount),
      encrypted_card,
      card_hash,
      card_last4: last4,
      purchase_city: purchase_city || null,
      purchase_state: purchase_state || null,
      purchase_date: purchase_date || null,
      recipient_email: recipient_email || null,
      reporter_email: null, // keep if you previously used it
      reporter_ip: ip,
      notes: notes || null,
      // NEW columns:
      fraud_phone: fraud_phone || null,
      fraud_email: fraud_email || null,
      fraud_social: fraud_social || null,
      status: 'pending',
    };

    const { data, error } = await supabaseAdmin
      .from('giftcard_reports')
      .insert(insert)
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    const publicView = {
      id: data.id,
      gift_card_brand: data.gift_card_brand,
      retailer: data.retailer,
      amount: data.amount,
      card_last4: data.card_last4,
      purchase_city: data.purchase_city,
      purchase_state: data.purchase_state,
      purchase_date: data.purchase_date,
      notes: data.notes ? (data.notes.length > 220 ? data.notes.slice(0, 220) + '…' : data.notes) : null,
      status: data.status,
      created_at: data.created_at
    };

    return NextResponse.json({ ok: true, report: publicView }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
