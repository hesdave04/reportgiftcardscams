// app/api/stats/wall-of-shame/route.js
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function countBy(arr) {
  const map = new Map();
  for (const key of arr) {
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function GET(req) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase admin env vars missing' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const days = Math.max(1, Math.min(365, Number(searchParams.get('days') || 180)));
    const since = new Date();
    since.setDate(since.getDate() - days);

    // Pull the minimum set of columns, then aggregate in memory.
    // We support both existing and new column names:
    // - gift card brand: prefer gift_card_brand, else retailer
    // - merchant (place purchased): prefer purchase_retailer, else retailer_merchant, retailer_store
    const { data, error } = await supabase
      .from('giftcard_reports')
      .select('gift_card_brand, retailer, purchase_retailer, retailer_merchant, retailer_store, created_at')
      .gte('created_at', since.toISOString())
      .limit(10000); // put a sane cap for now

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Normalize fields
    const brands = [];
    const merchants = [];

    for (const row of data || []) {
      const brand = row.gift_card_brand || row.retailer || null;
      const merchant =
        row.purchase_retailer || row.retailer_merchant || row.retailer_store || null;

      if (brand) brands.push(brand.trim());
      if (merchant) merchants.push(merchant.trim());
    }

    const topGiftCards = countBy(brands).slice(0, 10);
    const topRetailers = countBy(merchants).slice(0, 10);

    return NextResponse.json({ days, topGiftCards, topRetailers }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
