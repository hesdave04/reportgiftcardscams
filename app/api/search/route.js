// app/api/search/route.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({ window: 60, limit: 30 });

// Public attribution for imported (third-party) reports. Our own reports carry no label.
const SOURCE_LABELS = {
  '3p_bbb_scamtracker': 'Scam Tracker',
  '3p_chainabuse': 'Chainabuse',
  '3p_cryptolegal': 'CryptoLegal',
  ScamHatersUnited: 'ScamHaters United',
};

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
    let ciQuery = supabase
      .from('case_intakes')
      .select('id, scam_type, platforms, story, suspect_name, suspect_email, suspect_phone, suspect_username, suspect_wallet, suspect_website, amount, created_at, date_of_report, source, source_url:full_payload->>source_url', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (q) {
      // Phone numbers are stored in many formats ("(715) 254-3132", "715-254-3132", "+17152543132"):
      // a digits-only query also matches the same digits with any separators in between.
      const digits = q.replace(/\D/g, '');
      const isPhone = /^[\d\s().+-]+$/.test(q) && (digits.length === 10 || (digits.length === 11 && digits[0] === '1'));
      const d10 = isPhone ? digits.slice(-10) : '';
      const phoneOr = isPhone ? `,suspect_phone.ilike.%${d10.slice(0, 3)}%${d10.slice(3, 6)}%${d10.slice(6)}%` : '';
      // PostgREST or() syntax breaks on ( ) , " \ — strip them from the free-text terms.
      const t = q.replace(/[(),"\\]/g, ' ').replace(/\s+/g, ' ').trim();
      const textOr = t
        ? `story.ilike.%${t}%,scam_type.ilike.%${t}%,suspect_name.ilike.%${t}%,suspect_email.ilike.%${t}%,suspect_phone.ilike.%${t}%,suspect_username.ilike.%${t}%,suspect_wallet.ilike.%${t}%,suspect_website.ilike.%${t}%`
        : '';
      ciQuery = ciQuery.or(isPhone ? phoneOr.slice(1) : textOr);
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
        // Imported Scam Tracker rows carry a calendar date only; pin it to noon UTC so it renders on the same day in US time zones.
        created_at: r.source === '3p_bbb_scamtracker' && /^\d{4}-\d{2}-\d{2}$/.test(String(r.date_of_report || ''))
          ? `${r.date_of_report}T12:00:00+00:00`
          : r.created_at,
        source_label: SOURCE_LABELS[r.source] || null,
        source_url: r.source === '3p_bbb_scamtracker' && /^https:\/\/www\.bbb\.org\/scamtracker\//.test(r.source_url || '') ? r.source_url : null,
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
