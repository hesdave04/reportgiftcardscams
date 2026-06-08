// app/api/search/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({ window: 60, limit: 30 });

export async function GET(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }

    const url = new URL(request.url);
    const q = (url.searchParams.get('q') || '').trim();
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(url.searchParams.get('pageSize') || '20', 10), 1), 100);
    const source = url.searchParams.get('source') || 'all'; // 'all', 'reports', 'investigations'

    const from = (page - 1) * pageSize;

    // ── 1. Gift card reports ──
    let gcItems = [];
    let gcCount = 0;

    if (source === 'all' || source === 'reports') {
      let gcQuery = supabase
        .from('giftcard_reports')
        .select('id, retailer, gift_card_brand, card_last4, amount, notes, created_at', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (q) {
        if (/^\d{2,6}$/.test(q)) {
          gcQuery = gcQuery.ilike('card_last4', `%${q.slice(-4)}%`);
        } else {
          gcQuery = gcQuery.or(`retailer.ilike.%${q}%,gift_card_brand.ilike.%${q}%,notes.ilike.%${q}%`);
        }
      }

      const { data, error, count } = await gcQuery.range(from, from + pageSize - 1);
      if (!error) {
        gcItems = (data || []).map((r) => ({
          id: r.id,
          type: 'giftcard',
          retailer: r.retailer,
          gift_card_brand: r.gift_card_brand,
          card_last4: r.card_last4,
          amount: r.amount,
          notes: r.notes ? (r.notes.length > 220 ? r.notes.slice(0, 220) + '…' : r.notes) : null,
          created_at: r.created_at,
        }));
        gcCount = count || 0;
      }
    }

    // ── 2. Investigation cases ──
    let ciItems = [];
    let ciCount = 0;

    if (source === 'all' || source === 'investigations') {
      let ciQuery = supabase
        .from('case_intakes')
        .select(
          'id, suspect_name, suspect_email, suspect_phone, suspect_username, suspect_wallet, story, conclusions, amount, scam_type, client_name, date_of_report, identity_verified, source, created_at',
          { count: 'exact' }
        )
        .order('created_at', { ascending: false });

      if (q) {
        ciQuery = ciQuery.or(
          `suspect_name.ilike.%${q}%,suspect_email.ilike.%${q}%,suspect_phone.ilike.%${q}%,suspect_username.ilike.%${q}%,story.ilike.%${q}%,conclusions.ilike.%${q}%,client_name.ilike.%${q}%`
        );
      }

      const { data, error, count } = await ciQuery.range(from, from + pageSize - 1);
      if (!error) {
        ciItems = (data || []).map((r) => ({
          id: r.id,
          type: 'investigation',
          suspect_name: r.suspect_name,
          suspect_email: r.suspect_email,
          suspect_phone: r.suspect_phone,
          suspect_username: r.suspect_username,
          suspect_wallet: r.suspect_wallet,
          story: r.story ? (r.story.length > 300 ? r.story.slice(0, 300) + '…' : r.story) : null,
          conclusions: r.conclusions ? (r.conclusions.length > 220 ? r.conclusions.slice(0, 220) + '…' : r.conclusions) : null,
          amount: r.amount,
          scam_type: r.scam_type,
          identity_verified: r.identity_verified,
          source_tag: r.source,
          created_at: r.created_at,
        }));
        ciCount = count || 0;
      }
    }

    // ── 3. Merge and sort by created_at ──
    const allItems = [...gcItems, ...ciItems]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, pageSize);

    const totalCount = gcCount + ciCount;

    return NextResponse.json({
      items: allItems,
      page,
      pageSize,
      total: totalCount,
      counts: { giftcard: gcCount, investigation: ciCount },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
