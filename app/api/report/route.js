import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function getIP(req) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0';
}

export async function POST(request) {
  try {
    const ip = getIP(request);
    const body = await request.json();

    const {
      retailer,
      cardNumber,
      amount,
      recipient_email,
      notes,
      purchase_city,
      purchase_state,
      purchase_date,
      captchaToken
    } = body || {};

    if (!retailer || !cardNumber) {
      return NextResponse.json({ error: 'Missing retailer or cardNumber' }, { status: 400 });
    }

    // --- reCAPTCHA v3 verification ---
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Server CAPTCHA not configured' }, { status: 500 });
    }
    if (!captchaToken) {
      return NextResponse.json({ error: 'CAPTCHA is required' }, { status: 400 });
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: captchaToken,
        remoteip: ip
      })
    });
    const verify = await verifyRes.json();

    if (!verify?.success) {
      return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
    }
    const actionOk = !verify.action || verify.action === 'report_submit';
    const scoreOk = typeof verify.score === 'number' ? verify.score >= 0.5 : true;

    if (!actionOk || !scoreOk) {
      return NextResponse.json({ error: 'CAPTCHA score too low' }, { status: 400 });
    }
    // ----------------------------------

    const normalized = String(cardNumber).replace(/\s|-/g, '');
    if (!/^\d{8,19}$/.test(normalized)) {
      return NextResponse.json({ error: 'Invalid card number format' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const insertRow = {
      retailer,
      amount: amount ? Number(amount) : null,
      recipient_email: recipient_email || null,
      notes: notes || null,
      purchase_city: purchase_city || null,
      purchase_state: purchase_state || null,
      purchase_date: purchase_date || null,
      card_last4: normalized.slice(-4),
      reporter_ip: ip,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('giftcard_reports')
      .insert(insertRow)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
