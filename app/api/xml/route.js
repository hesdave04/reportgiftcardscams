// app/api/xml/route.js
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';

// Make sure this is never statically analyzed/prerendered
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ---- Config ----
const TABLE = 'giftcard_reports';

// Allow one or many keys: XML_API_KEYS="key1,key2" or XML_API_KEY="key"
function isAuthorized(request) {
  const headerKey = (request.headers.get('x-api-key') || '').trim();
  const keysEnv = (process.env.XML_API_KEYS || process.env.XML_API_KEY || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  return headerKey && keysEnv.includes(headerKey);
}

// Minimal XML escaper
function x(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toXml(rows, meta = {}) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>`;
  const openRoot = `<giftcardReports generated_at="${x(new Date().toISOString())}" total="${rows.length}" version="1.0">`;
  const closeRoot = `</giftcardReports>`;
  const metaNode = `<meta><source>${x(meta.source || 'reportgiftcardscams')}</source></meta>`;

  const items = rows
    .map(r => {
      return [
        `<report id="${x(r.id)}">`,
        `<retailer>${x(r.retailer)}</retailer>`,
        r.amount !== null && r.amount !== undefined ? `<amount>${x(r.amount)}</amount>` : `<amount/>`,
        `<card_last4>${x(r.card_last4)}</card_last4>`,
        `<card_hash>${x(r.card_hash)}</card_hash>`,
        r.encrypted_card ? `<encrypted_card>${x(r.encrypted_card)}</encrypted_card>` : `<encrypted_card/>`,
        r.recipient_name ? `<recipient_name>${x(r.recipient_name)}</recipient_name>` : `<recipient_name/>`,
        r.recipient_email ? `<recipient_email>${x(r.recipient_email)}</recipient_email>` : `<recipient_email/>`,
        r.reporter_email ? `<reporter_email>${x(r.reporter_email)}</reporter_email>` : `<reporter_email/>`,
        r.status ? `<status>${x(r.status)}</status>` : `<status/>`,
        r.created_at ? `<created_at>${x(r.created_at)}</created_at>` : `<created_at/>`,
        r.notes ? `<notes>${x(r.notes)}</notes>` : `<notes/>`,
        `</report>`
      ].join('');
    })
    .join('');

  return [header, openRoot, metaNode, items, closeRoot].join('');
}

// GET /api/xml?limit=500&since=2024-01-01&retailer=Amazon&page=1&page_size=500&status=approved
export async function GET(request) {
  try {
    if (!isAuthorized(request)) {
      return new NextResponse('Unauthorized', { status: 401, headers: { 'content-type': 'text/plain' } });
    }

    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      console.error('Supabase admin env vars missing');
      return new NextResponse('Server misconfiguration', { status: 500, headers: { 'content-type': 'text/plain' } });
    }

    const { searchParams } = new URL(request.url);

    const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10), 2000);
    const pageSize = Math.min(parseInt(searchParams.get('page_size') || String(limit), 10), 2000);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const since = searchParams.get('since') || null;       // ISO date
    const retailer = searchParams.get('retailer') || null; // exact match
    const status = searchParams.get('status') || null;

    let query = supabaseAdmin.from(TABLE).select('*').order('created_at', { ascending: false });

    if (since) query = query.gte('created_at', since);
    if (retailer) query = query.eq('retailer', retailer);
    if (status) query = query.eq('status', status);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
      console.error('XML feed query error:', error);
      return new NextResponse('Server error', { status: 500, headers: { 'content-type': 'text/plain' } });
    }

    const xml = toXml(data || [], { source: 'reportgiftcardscams' });
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'private, max-age=60'
      }
    });
  } catch (e) {
    console.error('XML feed exception:', e);
    return new NextResponse('Server error', { status: 500, headers: { 'content-type': 'text/plain' } });
  }
}
