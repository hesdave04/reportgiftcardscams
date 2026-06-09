import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { encrypt, hmacHex } from '@/lib/crypto';
import { verifyRecaptcha } from '@/lib/recaptcha';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({ window: 60, limit: 10 });

function normalizeDigits(str = '') {
  return String(str).replace(/\D/g, '');
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';

    // Rate limiting
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const {
      gift_card_brand,
      retailer,
      cardNumber,
      amount,
      purchase_city,
      purchase_state,
      purchase_date,
      recipient_email,
      reporter_email,
      notes,
      fraud_phone,
      fraud_email,
      fraud_social,
      recaptchaToken
    } = body || {};

    // Verify reCAPTCHA (non-blocking — still saves report if captcha fails)
    let captchaStatus = "skipped";
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey && recaptchaToken) {
      const result = await verifyRecaptcha(recaptchaToken, ip, { scoreThreshold: 0.3 });
      captchaStatus = result.ok ? "passed" : `failed:${(result.errorCodes || []).join(",")}`;
      if (result.score !== undefined) captchaStatus += `:score=${result.score}`;
    } else if (secretKey) {
      captchaStatus = "no-token";
    }

    if (!cardNumber) {
      return NextResponse.json({ error: 'Missing cardNumber' }, { status: 400 });
    }

    const digits = normalizeDigits(cardNumber);
    if (!/^\d{8,22}$/.test(digits)) {
      return NextResponse.json({ error: 'Invalid card number' }, { status: 400 });
    }

    // Normalise amount like "$200", "200", "200.00"
    let amt = null;
    if (amount !== undefined && amount !== null && String(amount).trim() !== '') {
      const num = Number(String(amount).replace(/[^0-9.]/g, ''));
      if (!Number.isNaN(num)) amt = num;
    }

    // Normalise date
    let dt = null;
    if (purchase_date) {
      const m = String(purchase_date).trim();
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

    // Encrypt the full card number, store hash for lookups
    let cardEncrypted = null;
    let cardHash = null;
    try {
      cardEncrypted = encrypt(digits);
      cardHash = hmacHex(digits);
    } catch (e) {
      // If encryption keys aren't configured, fall back to plaintext
      console.warn('Encryption not configured, storing plaintext:', e.message);
    }

    const insert = {
      gift_card_brand: gift_card_brand || null,
      retailer: retailer || null,
      card_number_plain: cardEncrypted || digits, // encrypted if available, else plaintext
      card_last4: digits.slice(-4),
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

    // Add hash if available
    if (cardHash) {
      insert.card_hash = cardHash;
    }

    const { data, error } = await supabase
      .from('giftcard_reports')
      .insert(insert)
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Database insert failed' }, { status: 500 });
    }

    // Public-safe response (mask full number)
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
