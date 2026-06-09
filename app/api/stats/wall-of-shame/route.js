// app/api/stats/wall-of-shame/route.js
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

// Make this route dynamic so Vercel doesn't try to prerender it
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let days = parseInt(searchParams.get('days') || '180', 10);
    if (!Number.isFinite(days) || days <= 0) days = 180;

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json(
        { error: 'Supabase admin client not configured (check env vars).' },
        { status: 500 }
      );
    }

    // Cutoff: now - N days
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffISO = cutoff.toISOString();

    // Pull minimal columns and filter by purchase_date OR created_at
    const { data, error } = await supa
      .from('giftcard_reports')
      .select('gift_card_brand, retailer, purchase_date, created_at')
      .or(`purchase_date.gte.${cutoffISO},created_at.gte.${cutoffISO}`)
      .limit(50000); // generous but safe cap

    if (error) throw error;

    const brandCounts = new Map();
    const sellerCounts = new Map();

    for (const row of data || []) {
      const brand = (row.gift_card_brand || 'Unknown').trim();
      const seller = (row.retailer || 'Unknown').trim();

      brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      sellerCounts.set(seller, (sellerCounts.get(seller) || 0) + 1);
    }

    const topify = (map) =>
      Array.from(map.entries())
        .filter(([k]) => k && k.toLowerCase() !== 'other')
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([name, count]) => ({ name, count }));

    return NextResponse.json(
      { brands: topify(brandCounts), sellers: topify(sellerCounts) },
      { headers: { 'cache-control': 'no-store' } }
    );
  } catch (err) {
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
