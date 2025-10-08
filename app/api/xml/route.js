import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

const XML_KEY = process.env.XML_API_KEY; // keep this

function toXml(rows) {
  const items = rows.map(r => `
    <report>
      <id>${r.id}</id>
      <gift_card_brand>${r.gift_card_brand ?? ''}</gift_card_brand>
      <retailer>${r.retailer ?? ''}</retailer>
      <card_number>${r.card_number_plain ?? ''}</card_number>
      <card_last4>${r.card_last4 ?? ''}</card_last4>
      <amount>${r.amount ?? ''}</amount>
      <purchase_city>${r.purchase_city ?? ''}</purchase_city>
      <purchase_state>${r.purchase_state ?? ''}</purchase_state>
      <purchase_date>${r.purchase_date ?? ''}</purchase_date>
      <fraud_phone>${r.fraud_phone ?? ''}</fraud_phone>
      <fraud_email>${r.fraud_email ?? ''}</fraud_email>
      <fraud_social>${r.fraud_social ?? ''}</fraud_social>
      <notes>${(r.notes ?? '').replace(/[<&>]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[s]))}</notes>
      <created_at>${r.created_at}</created_at>
    </report>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
<giftcard_reports>${items}
</giftcard_reports>`;
}

export async function GET(request) {
  try {
    if (!XML_KEY) {
      return NextResponse.json({ error: 'XML key missing' }, { status: 500 });
    }
    const authHeader = request.headers.get('x-api-key');
    if (authHeader !== XML_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Supabase admin env missing' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('giftcard_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Query failed' }, { status: 500 });
    }

    const xml = toXml(data || []);
    return new NextResponse(xml, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
