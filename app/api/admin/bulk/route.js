// app/api/admin/bulk/route.js
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { encrypt, hmacHex } from '@/lib/crypto';

/**
 * POST /api/admin/bulk
 * Headers: X-Admin-Bulk-Key: <ADMIN_BULK_KEY>
 * Body: { items: [{ gift_card_brand, retailer, cardNumber, amount, purchase_city, purchase_state, purchase_date, notes, fraud_phone, fraud_email, fraud_social }] }
 */
export async function POST(req) {
  try {
    const adminKey = req.headers.get('x-admin-bulk-key') || '';
    if (!adminKey || adminKey !== process.env.ADMIN_BULK_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const rows = [];
    for (const it of items) {
      const n = String(it.cardNumber || '').replace(/\s|-/g, '');
      if (!/^\d{8,19}$/.test(n)) {
        rows.push({ ok: false, error: 'Invalid card number', original: it });
        continue;
      }
      const record = {
        gift_card_brand: it.gift_card_brand || null,
        retailer: it.retailer || null,
        amount: it.amount != null ? Number(it.amount) : null,
        purchase_city: it.purchase_city || null,
        purchase_state: it.purchase_state || null,
        purchase_date: it.purchase_date || null,
        notes: it.notes || null,
        fraud_phone: it.fraud_phone || null,
        fraud_email: it.fraud_email || null,
        fraud_social: it.fraud_social || null,
        reporter_ip: 'bulk-admin',
        status: 'pending',
        // sensitive derived
        encrypted_card: encrypt(n),
        card_hash: hmacHex(n),
        card_last4: n.slice(-4),
      };
      rows.push({ ok: true, record });
    }

    const toInsert = rows.filter(r => r.ok).map(r => r.record);
    if (toInsert.length) {
      const { data, error } = await supabaseAdmin
        .from('giftcard_reports')
        .insert(toInsert)
        .select();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      inserted: toInsert.length,
      skipped: rows.filter(r => !r.ok).length,
      skippedItems: rows.filter(r => !r.ok).map(r => ({ error: r.error, original: r.original })),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
