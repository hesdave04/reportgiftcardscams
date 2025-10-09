// app/api/xml/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

function esc(x = '') {
  return String(x)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function GET(request) {
  try {
    const apiKey = process.env.XML_API_KEY || '';
    const headerKey = request.headers.get('x-api-key') || '';
    if (!apiKey || headerKey !== apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const url = new URL(request.url);
    const brand = (url.searchParams.get('brand') || '').trim();
    const retailer = (url.searchParams.get('retailer') || '').trim();
    const q = (url.searchParams.get('q') || '').trim();
    const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '5000', 10), 1), 20000);

    let query = supabase
      .from('giftcard_reports')
      .select(
        'id, retailer, gift_card_brand, card_number_plain, card_last4, amount, purchase_date, fraud_phone, fraud_email, fraud_social, notes, created_at'
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (brand) query = query.ilike('gift_card_brand', `%${brand}%`);
    if (retailer) query = query.ilike('retailer', `%${retailer}%`);
    if (q) query = query.or(`retailer.ilike.%${q}%,gift_card_brand.ilike.%${q}%,notes.ilike.%${q}%`);

    const { data, error } = await query;
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    const now = new Date().toISOString();
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<giftcardReports generated="${esc(now)}">\n`;
    for (const r of data || []) {
      xml += `  <report id="${esc(r.id)}">\n`;
      xml += `    <retailer>${esc(r.retailer || '')}</retailer>\n`;
      xml += `    <brand>${esc(r.gift_card_brand || '')}</brand>\n`;
      xml += `    <cardNumber>${esc(r.card_number_plain || '')}</cardNumber>\n`;
      xml += `    <last4>${esc(r.card_last4 || '')}</last4>\n`;
      xml += `    <amount>${r.amount != null ? Number(r.amount) : ''}</amount>\n`;
      xml += `    <purchaseDate>${esc(r.purchase_date || '')}</purchaseDate>\n`;
      xml += `    <fraudPhone>${esc(r.fraud_phone || '')}</fraudPhone>\n`;
      xml += `    <fraudEmail>${esc(r.fraud_email || '')}</fraudEmail>\n`;
      xml += `    <fraudSocial>${esc(r.fraud_social || '')}</fraudSocial>\n`;
      xml += `    <notes>${esc(r.notes || '')}</notes>\n`;
      xml += `    <createdAt>${esc(r.created_at || '')}</createdAt>\n`;
      xml += `  </report>\n`;
    }
    xml += `</giftcardReports>\n`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
