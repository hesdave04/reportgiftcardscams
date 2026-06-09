import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const ADMIN_BULK_KEY = process.env.ADMIN_BULK_KEY;

function cleanAmount(a) {
  if (a === null || a === undefined) return null;
  const num = Number(String(a).replace(/[^0-9.]/g, ''));
  return Number.isNaN(num) ? null : num;
}

function normDate(d) {
  if (!d) return null;
  const s = String(d).trim();
  // ISO 8601
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  // MM/DD/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const [mm, dd, yyyy] = s.split('/');
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  return null;
}

function truncate(s, max = 10000) {
  if (!s) return null;
  return String(s).slice(0, max);
}

function ensureArray(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.trim()) return [v];
  return [];
}

export async function POST(request) {
  try {
    // Auth check
    if (!ADMIN_BULK_KEY) {
      return NextResponse.json({ error: 'Server missing ADMIN_BULK_KEY' }, { status: 500 });
    }
    const k = request.headers.get('x-admin-bulk-key');
    if (k !== ADMIN_BULK_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items, source } = await request.json();
    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Cap at 500 per request to avoid timeouts
    if (items.length > 500) {
      return NextResponse.json({ error: 'Max 500 items per request' }, { status: 400 });
    }

    const rows = items.map(x => {
      const row = {
        story: truncate(x.story),
        scam_type: x.scam_type || x.scamType || null,
        platforms: ensureArray(x.platforms),
        sent_money: x.sent_money ?? x.sentMoney ?? null,
        sent_personal_info: x.sent_personal_info ?? x.sentPersonalInfo ?? null,
        amount: cleanAmount(x.amount),
        payment_methods: ensureArray(x.payment_methods || x.paymentMethods),
        start_date: normDate(x.start_date || x.startDate),
        payment_date: normDate(x.payment_date || x.paymentDate),
        realized_date: normDate(x.realized_date || x.realizedDate),
        suspect_name: truncate(x.suspect_name || x.suspectName, 500),
        suspect_email: truncate(x.suspect_email || x.suspectEmail, 500),
        suspect_phone: truncate(x.suspect_phone || x.suspectPhone, 100),
        suspect_username: truncate(x.suspect_username || x.suspectUsername, 500),
        suspect_wallet: truncate(x.suspect_wallet || x.suspectWallet, 500),
        suspect_website: truncate(x.suspect_website || x.suspectWebsite, 1000),
        evidence_urls: ensureArray(x.evidence_urls || x.evidenceUrls),
        full_payload: x,
        status: 'imported',
      };
      return row;
    });

    const supabase = getSupabaseAdmin();

    // Insert in sub-batches of 100 to avoid payload limits
    const results = { inserted: 0, errors: 0 };
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      const { data, error } = await supabase
        .from('case_intakes')
        .insert(batch)
        .select('id');

      if (error) {
        console.error(`Bulk intake batch error at offset ${i}:`, error);
        results.errors += batch.length;
      } else {
        results.inserted += data.length;
      }
    }

    return NextResponse.json({
      ok: true,
      inserted: results.inserted,
      errors: results.errors,
      source: source || 'bulk-import',
    });
  } catch (e) {
    console.error('Bulk intake error:', e);
    return NextResponse.json({ error: 'Unexpected error', details: e.message }, { status: 500 });
  }
}
