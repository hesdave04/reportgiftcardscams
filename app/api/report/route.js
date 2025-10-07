export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { encrypt, hmacHex } from '../../../lib/crypto';
import rateLimit from '../../../utils/rate-limit';

const limiter = rateLimit({
  window: parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10),
  limit: parseInt(process.env.RATE_LIMIT_MAX || '20', 10),
});

/**
 * Verify Google reCAPTCHA v2 (checkbox) token.
 * Env needed: RECAPTCHA_SECRET_KEY
 */
async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, errors: ['server_misconfig:RECAPTCHA_SECRET_KEY'] };
  }
  if (!token) {
    return { ok: false, errors: ['missing_token'] };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    // remoteip is optional but helps Google risk signals
    remoteip: ip || '',
  }).toString();

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    // no-cache to avoid any proxy weirdness
    cache: 'no-store',
  });

  // If Google is unreachable, fail closed
  if (!res.ok) return { ok: false, errors: ['recaptcha_http_' + res.status] };

  const data = await res.json();
  return { ok: !!data.success, errors: data['error-codes'] || [] };
}

export async function POST(request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Server not configured: missing SUPABASE_URL or SERVICE_ROLE_KEY' },
        { status: 500 }
      );
    }

    // Basic IP rate-limit (MVP); replace with Redis for production
    const rawIp = request.headers.get('x-forwarded-for') || '';
    const ip = rawIp.split(',')[0]?.trim() || '0.0.0.0';
    const { ok: underLimit } = await limiter.check(ip);
    if (!underLimit) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Parse body
    const body = await request.json();
    const {
      retailer,
      cardNumber,
      amount,
      recipient_name,
      recipient_email,
      reporter_email,
      notes,
      recaptchaToken, // <-- sent from client
    } = body || {};

    // 1) Verify reCAPTCHA first
    const cap = await verifyRecaptcha(recaptchaToken, ip);
    if (!cap.ok) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed', details: cap.errors },
        { status: 400 }
      );
    }

    // 2) Validate inputs
    if (!retailer || !cardNumber) {
      return NextResponse.json({ error: 'Missing retailer or cardNumber' }, { status: 400 });
    }

    const normalized = String(cardNumber).replace(/\s|-/g, '');
    if (!/^\d{8,19}$/.test(normalized)) {
      return NextResponse.json({ error: 'Invalid card number format' }, { status: 400 });
    }

    // 3) Prepare secure fields
    const last4 = normalized.slice(-4);
    const card_hash = hmacHex(normalized);
    const encrypted_card = encrypt(normalized);

    // 4) Insert
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
      console.error('supabase insert error:', error);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    // 5) Public response (no sensitive fields)
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
    console.error('report route error:', e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
