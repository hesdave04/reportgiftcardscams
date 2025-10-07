import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { decrypt } from '@/lib/crypto';
import { create } from 'xmlbuilder2';

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
    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Database read failed' }, { status: 500 });
    }

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

    const doc = create({ version: '1.0', encoding: 'UTF-8' }).ele('GiftCardReports');
    for (const r of rows) {
      const e = doc.ele('Report');
      e.ele('ID').txt(r.id || '');
      e.ele('Retailer').txt(r.retailer || '');
      e.ele('Amount').txt(r.amount != null ? String(r.amount) : '');
      e.ele('CardNumber').txt(r.card_number || '');
      e.ele('CardLast4').txt(r.card_last4 || '');
      e.ele('RecipientName').txt(r.recipient_name || '');
      e.ele('RecipientEmail').txt(r.recipient_email || '');
      e.ele('ReporterEmail').txt(r.reporter_email || '');
      e.ele('ReporterIP').txt(r.reporter_ip || '');
      e.ele('Notes').txt(r.notes || '');
      e.ele('Status').txt(r.status || '');
      e.ele('CreatedAt').txt(new Date(r.created_at).toISOString());
    }
    const xml = doc.end({ prettyPrint: true });

    // Best-effort audit (don’t block response if it fails)
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
