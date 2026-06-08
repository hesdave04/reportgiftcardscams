import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;

export async function POST(request) {
  try {
    if (!ADMIN_BULK_KEY) return NextResponse.json({ error: 'Server missing ADMIN_BULK_KEY' }, { status: 500 });
    const k = request.headers.get('x-admin-bulk-key');
    if (k !== ADMIN_BULK_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { items } = await request.json();
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }

    const rows = items.map(x => ({
      story: x.story || null,
      scam_type: x.scam_type || null,
      platforms: Array.isArray(x.platforms) ? x.platforms : [],
      sent_money: x.sent_money ?? null,
      sent_personal_info: x.sent_personal_info ?? null,
      amount: x.amount ? Number(x.amount) : null,
      payment_methods: Array.isArray(x.payment_methods) ? x.payment_methods : [],
      start_date: x.start_date || null,
      payment_date: x.payment_date || null,
      realized_date: x.realized_date || null,
      suspect_name: x.suspect_name || null,
      suspect_email: x.suspect_email || null,
      suspect_phone: x.suspect_phone || null,
      suspect_username: x.suspect_username || null,
      suspect_wallet: x.suspect_wallet || null,
      suspect_website: x.suspect_website || null,
      evidence_urls: Array.isArray(x.evidence_urls) ? x.evidence_urls : [],
      full_payload: x.full_payload || x,
      status: 'new',
    }));

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Insert in batches of 50
    let totalInserted = 0;
    const errors = [];
    for (let i = 0; i < rows.length; i += 50) {
      const batch = rows.slice(i, i + 50);
      const { data, error } = await supabase.from('case_intakes').insert(batch).select('id');
      if (error) {
        errors.push({ batch: i, error: error.message });
      } else {
        totalInserted += data.length;
      }
    }

    return NextResponse.json({ ok: true, inserted: totalInserted, total: rows.length, errors });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
