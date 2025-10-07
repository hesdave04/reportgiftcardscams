import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import { decrypt } from '../../../lib/crypto';

// minimal XML escape
function x(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&apos;');
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const apiKey = request.headers.get('x-api-key') || url.searchParams.get('api_key');
    if (!apiKey || apiKey !== process.env.XML_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const retailer = url.searchParams.get('retailer') || undefined;
    const since = url.searchParams.get('since') || undefined;

    let query = supabaseAdmin
      .from('giftcard_reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (retailer) query = query.eq('retailer', retailer);
    if (since) query = query.gte('created_at', since);

    const { data, error } = await query;
    if (error) return NextResponse.json({ error: 'Database read failed' }, { status: 500 });

    const rows = (data || []).map(r => ({
      id: r.id,
      retailer: r.retailer,
      amount: r.amount,
      card_number: (() => { try { return decrypt(r.encrypted_card); } catch { return null; } })(),
      card_last4: r.card_last4,
      recipient_name: r.recipient_name,
      recipient_email: r.recipient_email,
      reporter_email: r.reporter_email,
      reporter_ip: r.reporter_ip,
      notes: r.notes,
      status: r.status,
      created_at: r.created_at
    }));

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<GiftCardReports>';
    for (const r of rows) {
      xml += '\n  <Report>';
      xml += `\n    <ID>${x(r.id)}</ID>`;
      xml += `\n    <Retailer>${x(r.retailer)}</Retailer>`;
      xml += `\n    <Amount>${r.amount != null ? x(r.amount) : ''}</Amount>`;
      xml += `\n    <CardNumber>${x(r.card_number)}</CardNumber>`;
      xml += `\n    <CardLast4>${x(r.card_last4)}</CardLast4>`;
      xml += `\n    <RecipientName>${x(r.recipient_name)}</RecipientName>`;
      xml += `\n    <RecipientEmail>${x(r.recipient_email)}</RecipientEmail>`;
      xml += `\n    <ReporterEmail>${x(r.reporter_email)}</ReporterEmail>`;
      xml += `\n    <ReporterIP>${x(r.reporter_ip)}</ReporterIP>`;
      xml += `\n    <Notes>${x(r.notes)}</Notes>`;
      xml += `\n    <Status>${x(r.status)}</Status>`;
      xml += `\n    <CreatedAt>${x(new Date(r.created_at).toISOString())}</CreatedAt>`;
      xml += '\n  </Report>';
    }
    xml += '\n</GiftCardReports>\n';

    // best-effort audit
    try {
      await supabaseAdmin.from('xml_exports').insert({
        api_key: String(apiKey).slice(0, 8),
        ip: request.headers.get('x-forwarded-for') || '0.0.0.0',
        query: { retailer: retailer || null, since: since || null }
      });
    } catch {}

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Content-Disposition': `attachment; filename="giftcard_reports_${Date.now()}.xml"`
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
