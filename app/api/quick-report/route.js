import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { computeTrustScore, trustTier } from '@/lib/trustScore';
import crypto from 'crypto';
import rateLimit from '@/utils/rate-limit';
import { createClient } from '@supabase/supabase-js';

const limiter = rateLimit({ window: 60, limit: 10 });

const HMAC_KEY = process.env.HMAC_KEY
  ? Buffer.from(process.env.HMAC_KEY, 'base64')
  : null;

function verifyProof(proof) {
  if (!proof || !HMAC_KEY) return null;
  const [b64, sig] = proof.split('.');
  if (!b64 || !sig) return null;
  const expected = crypto
    .createHmac('sha256', HMAC_KEY)
    .update(b64)
    .digest('base64url');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(b64, 'base64url').toString());
    if (!payload.verified || Date.now() > payload.exp) return null;
    return payload.email;
  } catch {
    return null;
  }
}

/**
 * POST /api/quick-report
 *
 * Accepts quick-submit reports for:
 *   - website_report
 *   - crypto_wallet_report
 *   - social_media_report
 *
 * Stores in case_intakes with proper source tagging.
 * Requires a valid email verification proof token.
 */
export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '0.0.0.0';
    const { ok: withinLimit } = await limiter.check(ip);
    if (!withinLimit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { reportType, emailProof, recaptchaToken } = body;

    // Verify reCAPTCHA (non-blocking — still saves report if captcha fails)
    let captchaStatus = "skipped";
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey && recaptchaToken) {
      const result = await verifyRecaptcha(recaptchaToken, ip, { scoreThreshold: 0.3 });
      captchaStatus = result.ok ? "passed" : `failed:${(result.errorCodes || []).join(",")}`;
      if (result.score !== undefined) captchaStatus += `:score=${result.score}`;
    } else if (secretKey) {
      captchaStatus = "no-token";
    }

    // Verify email proof OR authenticated session
    let verifiedEmail = verifyProof(emailProof);

    // If no email proof, check for authenticated user via Authorization header
    if (!verifiedEmail && body.isLoggedIn && body.reporterId) {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && supabaseKey) {
        const authClient = createClient(supabaseUrl, supabaseKey);
        // Verify the reporter exists and get their email
        const { data: reporterRow } = await authClient
          .from('reporters')
          .select('email')
          .eq('id', body.reporterId)
          .single();
        if (reporterRow?.email) {
          verifiedEmail = reporterRow.email;
        }
      }
    }

    if (!verifiedEmail) {
      return NextResponse.json(
        { error: 'Email verification required. Please verify your email first.' },
        { status: 400 }
      );
    }

    // Validate report type
    const validTypes = [
      'website_report',
      'crypto_wallet_report',
      'social_media_report',
      'scam_type_report',
    ];
    if (!validTypes.includes(reportType)) {
      return NextResponse.json(
        { error: 'Invalid report type' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database unavailable' },
        { status: 500 }
      );
    }

    // Build the case_intakes payload based on report type
    let payload = {
      source: reportType,
      status: 'new',
      client_name: verifiedEmail,
      full_payload: {
        ...body,
        reporter_email: verifiedEmail,
        reporter_ip: ip,
        submitted_at: new Date().toISOString(),
        submission_type: 'quick_report',
        _captchaStatus: captchaStatus,
      },
    };

    if (reportType === 'website_report') {
      const { url: fraudUrl, scamType, description, additionalUrls } = body;
      if (!fraudUrl) {
        return NextResponse.json(
          { error: 'Fraudulent URL is required' },
          { status: 400 }
        );
      }
      payload.suspect_website = fraudUrl;
      payload.scam_type = scamType || 'fraudulent_website';
      payload.story = description || null;
      payload.platforms = ['website'];
      if (additionalUrls) {
        payload.full_payload.additional_urls = additionalUrls;
      }
    }

    if (reportType === 'crypto_wallet_report') {
      const {
        walletAddress,
        blockchain,
        associatedDomain,
        scamType,
        description,
        amountLost,
        currency,
      } = body;
      if (!walletAddress) {
        return NextResponse.json(
          { error: 'Wallet address is required' },
          { status: 400 }
        );
      }
      payload.suspect_wallet = walletAddress;
      payload.suspect_website = associatedDomain || null;
      payload.scam_type = scamType || 'crypto_fraud';
      payload.story = description || null;
      payload.amount = amountLost ? Number(amountLost) : null;
      payload.payment_methods = [blockchain || 'crypto'];
      payload.platforms = ['crypto'];
      if (currency) {
        payload.full_payload.currency = currency;
      }
    }

    if (reportType === 'social_media_report') {
      const {
        profileUrl,
        platform,
        fakeName,
        realPersonName,
        scamType,
        description,
      } = body;
      if (!profileUrl) {
        return NextResponse.json(
          { error: 'Profile URL is required' },
          { status: 400 }
        );
      }
      payload.suspect_username = profileUrl;
      payload.suspect_name = fakeName || null;
      payload.scam_type = scamType || 'fake_profile';
      payload.story = description || null;
      payload.platforms = [platform || 'social_media'];
      if (realPersonName) {
        payload.full_payload.real_person_name = realPersonName;
      }
    }

    if (reportType === 'scam_type_report') {
      const { scamTypeValue, description } = body;
      if (!description) {
        return NextResponse.json(
          { error: 'A description of what happened is required' },
          { status: 400 }
        );
      }
      payload.scam_type = scamTypeValue || 'other';
      payload.story = description;
      payload.suspect_name = body.fakeName || body.companyName || body.impersonated || null;
      payload.suspect_website = body.websiteUrl || body.platformUrl || body.tradingPlatform || body.sellerProfile || null;
      payload.suspect_wallet = body.walletAddress || null;
      payload.suspect_phone = body.phoneNumber || null;
      payload.amount = body.amountLost ? Number(body.amountLost) : null;
      payload.platforms = body.platform ? [body.platform] : [];
      payload.payment_methods = body.paymentMethod ? [body.paymentMethod] : [];
    }

    // Remove fields the API route sets
    delete payload.full_payload.emailProof;
    delete payload.full_payload.recaptchaToken;

    // ── Reporter linkage (authenticated users) ──
    let reporterId = null;
    let reporterRole = null;
    let isWhitelisted = false;
    let priorReportCount = 0;
    const isLoggedIn = body.isLoggedIn === true;

    if (body.reporterId) {
      // Verify reporter exists
      const { data: reporterRow } = await supabase
        .from('reporters')
        .select('id, role, is_whitelisted, reports_count')
        .eq('id', body.reporterId)
        .single();

      if (reporterRow) {
        reporterId = reporterRow.id;
        reporterRole = reporterRow.role;
        isWhitelisted = reporterRow.is_whitelisted;
        priorReportCount = reporterRow.reports_count || 0;
        payload.reporter_id = reporterId;
        payload.reporter_role = reporterRole;
      }
    }

    // ── Compute trust score ──
    let recaptchaNum = null;
    if (captchaStatus.includes('score=')) {
      const m = captchaStatus.match(/score=([\d.]+)/);
      if (m) recaptchaNum = parseFloat(m[1]);
    }

    const { score: trustScore, factors: trustFactors } = computeTrustScore({
      story: payload.story,
      evidenceUrls: payload.evidence_urls,
      amount: payload.amount,
      paymentMethods: payload.payment_methods,
      suspectPhone: payload.suspect_phone,
      suspectEmail: payload.full_payload?.fraud_email,
      suspectWallet: payload.suspect_wallet,
      suspectWebsite: payload.suspect_website,
      suspectName: payload.suspect_name,
      suspectUsername: payload.suspect_username,
      emailVerified: !!verifiedEmail,
      isLoggedIn,
      reporterRole,
      isWhitelisted,
      priorReportCount,
      recaptchaScore: recaptchaNum,
    });

    payload.trust_score = trustScore;
    payload.trust_tier = trustTier(trustScore);
    payload.full_payload._trustFactors = trustFactors;

    const { data, error } = await supabase
      .from('case_intakes')
      .insert([payload])
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Quick report insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save report' },
        { status: 500 }
      );
    }

    // Increment reporter's report count (fire and forget)
    if (reporterId) {
      supabase.rpc('increment_reporter_count', { reporter_row_id: reporterId })
        .then(() => {})
        .catch(() => {
          // Fallback: direct update
          supabase
            .from('reporters')
            .update({ reports_count: priorReportCount + 1 })
            .eq('id', reporterId)
            .then(() => {})
            .catch(() => {});
        });
    }

    return NextResponse.json({
      ok: true,
      reportId: data.id,
      createdAt: data.created_at,
    });
  } catch (e) {
    console.error('Quick report error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
