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

    const from = (page - 1) * pageSize;

    // ── 1. Gift card reports ──
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

    const { data: gcData, count: gcCount } = await gcQuery.range(0, 999);

    const gcItems = (gcData || []).map((r) => ({
      id: r.id,
      type: 'report',
      retailer: r.retailer,
      gift_card_brand: r.gift_card_brand,
      card_last4: r.card_last4,
      amount: r.amount,
      notes: r.notes ? (r.notes.length > 220 ? r.notes.slice(0, 220) + '…' : r.notes) : null,
      created_at: r.created_at,
    }));

    // ── 2. Case intakes ──
    let ciQuery = supabase
      .from('case_intakes')
      .select(
        'id, suspect_name, suspect_email, suspect_phone, suspect_username, story, amount, scam_type, created_at',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false });

    if (q) {
      ciQuery = ciQuery.or(
        `suspect_name.ilike.%${q}%,suspect_email.ilike.%${q}%,suspect_phone.ilike.%${q}%,suspect_username.ilike.%${q}%,story.ilike.%${q}%`
      );
    }

    const { data: ciData, count: ciCount } = await ciQuery.range(0, 999);

    // Helper: deduplicate comma-separated or array-style values
    const dedup = (val) => {
      if (!val) return null;
      const items = val.split(/[,;]\s*/).map((s) => s.trim()).filter(Boolean);
      const unique = [...new Set(items)];
      const result = unique.join(', ');
      return result.length > 200 ? result.slice(0, 200) + '…' : result;
    };

    const ciItems = (ciData || []).map((r) => ({
      id: r.id,
      type: 'report',
      suspect_name: r.suspect_name,
      suspect_email: dedup(r.suspect_email),
      suspect_phone: dedup(r.suspect_phone),
      suspect_username: dedup(r.suspect_username),
      story: r.story ? (r.story.length > 220 ? r.story.slice(0, 220) + '…' : r.story) : null,
      scam_type: r.scam_type,
      amount: r.amount,
      created_at: r.created_at,
    }));

    // ── 3. Merge and sort by date ──
    const all = [...gcItems, ...ciItems].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    const total = all.length;
    const paged = all.slice(from, from + pageSize);

    return NextResponse.json(
      { total, items: paged },
      { headers: { 'cache-control': 'no-store' } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
