import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const TABLE = 'giftcard_reports';

// Basic rate-limit shim (IP bucket) — optional, safe no-op if you remove
const WINDOW_S = parseInt(process.env.RATE_LIMIT_WINDOW || '60', 10);
const LIMIT = parseInt(process.env.RATE_LIMIT_MAX || '20', 10);
const bucket = new Map();
function rateCheck(ip) {
  const now = Date.now();
  const key = ip || '0.0.0.0';
  const arr = (bucket.get(key) || []).filter(t => now - t < WINDOW_S * 1000);
  arr.push(now);
  bucket.set(key, arr);
  return arr.length <= LIMIT;
}

// Trivial HMAC-less hash (use your existing crypto if you have it)
import crypto from 'node:crypto';
function hmacHex(s) {
  const secret = process.env.HASH_SECRET || 'change-me';
  return crypto.createHmac('sha256', secret).update(String(s)).digest('hex');
}

// "Encrypt" placeholder — replace with real encryption if you had one before
function encrypt(s) {
  const key = process.env.ENCRYPTION_KEY || 'unset';
  // do NOT ship real numbers if you don’t have encryption sorted; mask instead
  return `enc:${hmacHex(s).slice(0, 32)}`;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    if (!rateCheck(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const body = await request.json();
    const {
      retailer,            // GIFT CARD ISSUER (Target, Google Play, etc.)
      cardNumber,
      amount,
      recipient_name,
      recipient_email,
      reporter_email,
      notes,
      // NEW FIELDS:
      purchase_retailer,   // STORE WHERE CARD WAS PURCHASED (CVS, Staples, etc.)
      purchase_city,
      purchase_state,
      purchase_date        // YYYY-MM-DD
    } = body || {};

    if (!retailer || !cardNumber) {
      return NextResponse.json({ error: 'Missing retailer or cardNumber' }, { status: 400 });
    }

    const normalized = String(cardNumber).replace(/\s|-/g, '');
    if (!/^\d{8,19}$/.test(normalized)) {
      return NextResponse.json({ error: 'Invalid card number format' }, { status: 400 });
    }

    // Validate optional purchase fields (best-effort)
    let safe_state = purchase_state ? String(purchase_state).toUpperCase().trim() : null;
    if (safe_state && !/^[A-Z]{2}$/.test(safe_state)) safe_state = null;

    let safe_date = null;
    if (purchase_date) {
      const d = new Date(purchase_date);
      if (!isNaN(d.getTime())) {
        const now = new Date();
        if (d <= now) {
          safe_date = d.toISOString().slice(0, 10); // YYYY-MM-DD
        }
      }
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
      // NEW FIELDS
      purchase_retailer: purchase_retailer || null,
      purchase_city: purchase_city || null,
      purchase_state: safe_state,
      purchase_date: safe_date
    };

    const { data, error } = await supabase
      .from(TABLE)
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
      // show purchase summary (non-sensitive)
      purchase_retailer: data.purchase_retailer,
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
