import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { encrypt, hmacHex } from '@/lib/crypto';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({ window: 60, limit: 5 });

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '0.0.0.0';

    // Rate limiting (stricter for bulk)
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const rows = items
      .map((i) => {
        const number = String(i.cardNumber || '').replace(/\D/g, '');
        if (!number || !/^\d{8,22}$/.test(number)) return null;

        // Encrypt if available
        let cardEncrypted = null;
        let cardHash = null;
        try {
          cardEncrypted = encrypt(number);
          cardHash = hmacHex(number);
        } catch (e) {
          // Fall back to plaintext if encryption not configured
        }

        const row = {
          retailer: i.retailer || null,
          gift_card_brand: i.gift_card_brand || null,
          card_number_plain: cardEncrypted || number,
          card_last4: number.slice(-4),
          amount: i.amount ? Number(i.amount) : null,
          purchase_city: i.purchase_city || null,
          purchase_state: i.purchase_state || null,
          purchase_date: i.purchase_date || null,
          notes: i.notes || null,
          fraud_phone: i.fraud_phone || null,
          fraud_email: i.fraud_email || null,
          fraud_social: i.fraud_social || null,
          status: 'pending'
        };

        if (cardHash) row.card_hash = cardHash;
        return row;
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
