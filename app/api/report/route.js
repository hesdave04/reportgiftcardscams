import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { encrypt, hmacHex } from '@/lib/crypto';
import rateLimit from '@/utils/rate-limit';
import { verifyRecaptchaV2 } from '@/lib/recaptcha';

const limiter = rateLimit({
  window: parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10),
  limit: parseInt(process.env.RATE_LIMIT_MAX || '20', 10),
});

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';

    // rate limit
    const { ok: allowed } = await limiter.check(ip);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();
    const {
      retailer,
      cardNumber,
      amount,
      recipient_name,
      recipient_email,
      reporter_email,
      notes,
      captcha, // token from client
    } = body || {};

    // Verify CAPTCHA
    const captchaRes = await verifyRecaptchaV2(captcha, ip);
    if (!captchaRes.ok) {
      return NextResponse.json(
        { error: 'captcha_failed', details: captchaRes.errorCodes || [] },
        { status: 400 }
      );
    }

    if (!retailer || !cardNumber) {
      return NextResponse.json({ error: 'Missing retailer or cardNumber' }, { status: 400 });
    }

    const normalized = String(cardNumber).replace(/\s|-/g, '');
    if (!/^\d{8,19}$/.test(normalized)) {
      return NextResponse.json({ error: 'Invalid card number format' }, { status: 400 });
    }

    const last4 = normalized.slice(-4);
    const card_hash = hmacHex(normalized);
    const encrypted_card = encrypt(normalized);

    const insert = {
      retailer,
      amount: amount ? Number(amount) : null,
      encrypted_card,
      card_hash,
      card_last4: last4,
      recipient_name: recipient_name || null,
      recipient_email: recipient_email || null,
      reporter_email: reporter_email || null,
      reporter_ip: ip,
      notes: notes || null,
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
      retailer: data.retailer,
      amount: data.amount,
      card_last4: data.card_last4,
      notes: data.notes ? (data.notes.length > 220 ? data.notes.slice(0, 220) + '…' : data.notes) : null,
      status: data.status,
      created_at: data.created_at,
    };

    return NextResponse.json({ ok: true, report: publicView }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
