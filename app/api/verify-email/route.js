import { NextResponse } from 'next/server';
import crypto from 'crypto';
import rateLimit from '@/utils/rate-limit';

const limiter = rateLimit({ window: 60, limit: 5 });

const HMAC_KEY = process.env.HMAC_KEY
  ? Buffer.from(process.env.HMAC_KEY, 'base64')
  : null;

function signToken(payload) {
  const json = JSON.stringify(payload);
  const b64 = Buffer.from(json).toString('base64url');
  const sig = crypto
    .createHmac('sha256', HMAC_KEY)
    .update(b64)
    .digest('base64url');
  return `${b64}.${sig}`;
}

function verifyToken(token) {
  const [b64, sig] = token.split('.');
  if (!b64 || !sig) return null;
  const expected = crypto
    .createHmac('sha256', HMAC_KEY)
    .update(b64)
    .digest('base64url');
  if (sig !== expected) return null;
  try {
    return JSON.parse(Buffer.from(b64, 'base64url').toString());
  } catch {
    return null;
  }
}

/**
 * POST /api/verify-email
 *
 * action: "send"  → generates a 6-digit code, returns a signed token
 * action: "check" → validates the code against the token
 *
 * The token is a signed JWT-like string containing {email, code, exp}.
 * No database table needed.
 */
export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    if (!HMAC_KEY || HMAC_KEY.length < 16) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'send') {
      const email = (body.email || '').trim().toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
      }

      const code = String(Math.floor(100000 + Math.random() * 900000));
      const exp = Date.now() + 15 * 60 * 1000; // 15 minutes

      const token = signToken({ email, code, exp });

      // Send verification email via Brevo SMTP API or fallback
      const brevoKey = process.env.BREVO_API_KEY;
      if (brevoKey) {
        try {
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': brevoKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: { name: 'ScamComplaints', email: 'noreply@scamcomplaints.org' },
              to: [{ email }],
              subject: `Your verification code: ${code}`,
              htmlContent: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <div style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #dc2626; border-radius: 12px; color: white; font-weight: bold; font-size: 18px;">!</div>
                  </div>
                  <h2 style="text-align: center; color: #0f172a; margin: 0 0 8px;">Verify your email</h2>
                  <p style="text-align: center; color: #64748b; font-size: 15px; margin: 0 0 24px;">Use the code below to verify your email on ScamComplaints.org</p>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                    <span style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #0f172a;">${code}</span>
                  </div>
                  <p style="color: #94a3b8; font-size: 13px; text-align: center;">This code expires in 15 minutes. If you didn't request this, you can ignore this email.</p>
                </div>
              `,
            }),
          });
        } catch (e) {
          console.error('Brevo email error:', e.message);
        }
      }

      return NextResponse.json({
        ok: true,
        token,
        // Include code in dev/preview so it works without Brevo
        ...(process.env.NODE_ENV !== 'production' ? { code } : {}),
      });
    }

    if (action === 'check') {
      const { token, code } = body;
      if (!token || !code) {
        return NextResponse.json(
          { error: 'Token and code required' },
          { status: 400 }
        );
      }

      const payload = verifyToken(token);
      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 400 }
        );
      }

      if (Date.now() > payload.exp) {
        return NextResponse.json(
          { error: 'Code expired. Please request a new one.' },
          { status: 400 }
        );
      }

      if (payload.code !== String(code).trim()) {
        return NextResponse.json(
          { error: 'Incorrect code' },
          { status: 400 }
        );
      }

      // Generate a verified proof token (valid 30 minutes)
      const proofExp = Date.now() + 30 * 60 * 1000;
      const proof = signToken({
        email: payload.email,
        verified: true,
        exp: proofExp,
      });

      return NextResponse.json({ ok: true, email: payload.email, proof });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e) {
    console.error('verify-email error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
