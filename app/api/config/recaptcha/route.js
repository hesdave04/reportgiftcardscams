import { NextResponse } from 'next/server';

// Ensure we don't prerender; we want freshest env every deploy
export const dynamic = 'force-dynamic';

export async function GET() {
  // Accept ANY of these env names so your current var keeps working:
  const siteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
    process.env.RECAPTCHA_SITE_KEY ||
    process.env.NEXT_PUBLI_RECAPTCHA_SITE_KEY || // your current typo'd var
    '';

  return NextResponse.json(
    { siteKey: siteKey || null },
    {
      headers: {
        'cache-control': 'no-store, max-age=0',
      },
    }
  );
}
