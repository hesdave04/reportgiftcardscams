// app/api/search/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import rateLimit from '@/utils/rate-limit';
import { isPhoneLike, toDigits } from '@/utils/phoneNormalize';

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

    const phoneQuery = isPhoneLike(q);

    // ── Query both tables in parallel ──

    // 1. Gift card reports (original table)
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

    // 2. Case intakes (main reports table)
    // For phone-like queries, search the normalized digits column so any
    // formatting variation ("+234 705 824 0576", "2347058240576", etc.) matches.
    let ciQuery = supabase
      .from('case_intakes')
      .select('id, scam_type, platforms, story, suspect_name, suspect_email, suspect_phone, suspect_username, suspect_wallet, suspect_website, amount, created_at', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (q) {
      if (phoneQuery) {
        const digits = toDigits(q);
        // Search the digits-only normalized column + fall back to story/name
        // in case the phone number appears in the narrative text too
        ciQuery = ciQuery.or(
          `phone_normalized.ilike.%${digits}%,story.ilike.%${q}%,suspect_name.ilike.%${q}%`
        );
      } else {
        ciQuery = ciQuery.or(
          `story.ilike.%${q}%,scam_type.ilike.%${q}%,suspect_name.ilike.%${q}%,suspect_email.ilike.%${q}%,suspect_phone.ilike.%${q}%,suspect_username.ilike.%${q}%,suspect_wallet.ilike.%${q}%,suspect_website.ilike.%${q}%`
        );
      }
    }

    // Fetch both in parallel — get enough rows to fill one page
    const [gcResult, ciResult] = await Promise.all([
      gcQuery.range(0, 999),
      ciQuery.range(0, 999),
    ]);

    if (gcResult.error) console.error('giftcard_reports search error:', gcResult.error);
    if (ciResult.error) console.error('case_intakes search error:', ciResult.error);

    // ── Merge and unify results ──

    const gcItems = (gcResult.data || []).map((r) => ({
      id: r.id,
      type: 'gift_card',
      title: [r.gift_card_brand, r.retailer].filter(Boolean).join(' · ') || 'Gift Card Report',
      scam_type: 'Gift Card Scam',
      card_last4: r.card_last4,
      amount: r.amount,
      summary: r.notes ? (r.notes.length > 220 ? r.notes.slice(0, 220) + '…' : r.notes) : null,
      created_at: r.created_at,
    }));

    const ciItems = (ciResult.data || []).map((r) => {
      const identifiers = [r.suspect_name, r.suspect_email, r.suspect_phone, r.suspect_username, r.suspect_website]
        .filter(Boolean)
        .slice(0, 2)
        .join(' · ');
      return {
        id: r.id,
        type: 'case_intake',
        title: identifiers || r.scam_type || 'Scam Report',
        scam_type: r.scam_type || null,
        platforms: Array.isArray(r.platforms) ? r.platforms : [],
        amount: r.amount,
        summary: r.story ? (r.story.length > 220 ? r.story.slice(0, 220) + '…' : r.story) : null,
        created_at: r.created_at,
      };
    });

    // Combine and sort by date
    const allItems = [...gcItems, ...ciItems].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const total = allItems.length;
    const from = (page - 1) * pageSize;
    const paged = allItems.slice(from, from + pageSize);

    return NextResponse.json({
      items: paged,
      page,
      pageSize,
      total,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
