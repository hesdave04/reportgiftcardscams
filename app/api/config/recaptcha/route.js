import { NextResponse } from 'next/server';

// Always serve at request-time (avoid static caching)
export const dynamic = 'force-dynamic';

export async function GET() {
  // Accept any of these so your current var keeps working:
  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    process.env.RECAPTCHA_SITE_KEY ||
    process.env.NEXT_PUBLI_RECAPTCHA_SITE_KEY || // your current var
    '';

  return NextResponse.json(
    { siteKey: siteKey || null },
    { headers: { 'cache-control': 'no-store, max-age=0' } }
  );
}
