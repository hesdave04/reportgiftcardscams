// lib/trustScore.js — Internal trust scoring engine for scam reports
//
// Computes a 0–100 score at submission time.
// Higher = more trustworthy / actionable report.

/**
 * @param {object} opts
 * @param {string}  opts.story             - Free-text description
 * @param {string[]} opts.evidenceUrls     - Uploaded evidence URLs
 * @param {number|null} opts.amount        - Financial loss amount
 * @param {string[]} opts.paymentMethods   - Payment methods reported
 * @param {string|null} opts.suspectPhone  - Scammer phone
 * @param {string|null} opts.suspectEmail  - Scammer email
 * @param {string|null} opts.suspectWallet - Scammer crypto wallet
 * @param {string|null} opts.suspectWebsite - Scammer website
 * @param {string|null} opts.suspectName   - Scammer name/alias
 * @param {string|null} opts.suspectUsername - Scammer social profile
 * @param {boolean} opts.emailVerified     - Reporter verified their email
 * @param {boolean} opts.isLoggedIn        - Reporter is authenticated
 * @param {string|null} opts.reporterRole  - 'reporter' | 'scambaiter'
 * @param {boolean} opts.isWhitelisted     - Reporter is whitelisted
 * @param {number}  opts.priorReportCount  - Number of previous reports by this reporter
 * @param {number|null} opts.recaptchaScore - reCAPTCHA v3 score (0.0–1.0)
 * @returns {{ score: number, factors: object }}
 */
export function computeTrustScore(opts = {}) {
  const factors = {};
  let score = 0;

  // ── Email verification (baseline) ──
  if (opts.emailVerified) {
    factors.email_verified = 10;
    score += 10;
  }

  // ── Story depth ──
  const storyLen = (opts.story || '').trim().length;
  if (storyLen > 500) {
    factors.detailed_story = 15;
    score += 15;
  } else if (storyLen > 200) {
    factors.detailed_story = 10;
    score += 10;
  } else if (storyLen > 100) {
    factors.detailed_story = 5;
    score += 5;
  }

  // ── Evidence / receipts uploaded ──
  const evidenceCount = Array.isArray(opts.evidenceUrls) ? opts.evidenceUrls.filter(Boolean).length : 0;
  if (evidenceCount >= 3) {
    factors.evidence_uploaded = 20;
    score += 20;
  } else if (evidenceCount >= 1) {
    factors.evidence_uploaded = 12;
    score += 12;
  }

  // ── Financial details ──
  const hasAmount = opts.amount && Number(opts.amount) > 0;
  const hasPayment = Array.isArray(opts.paymentMethods) && opts.paymentMethods.length > 0;
  if (hasAmount && hasPayment) {
    factors.financial_details = 10;
    score += 10;
  } else if (hasAmount || hasPayment) {
    factors.financial_details = 5;
    score += 5;
  }

  // ── Scammer identifiers (up to +20) ──
  let idPoints = 0;
  const identifiers = [
    opts.suspectPhone,
    opts.suspectEmail,
    opts.suspectWallet,
    opts.suspectWebsite,
    opts.suspectName,
    opts.suspectUsername,
  ];
  for (const id of identifiers) {
    if (id && String(id).trim().length > 0) {
      idPoints += 5;
    }
  }
  idPoints = Math.min(idPoints, 20);
  if (idPoints > 0) {
    factors.scammer_identifiers = idPoints;
    score += idPoints;
  }

  // ── Authenticated user ──
  if (opts.isLoggedIn) {
    factors.logged_in = 10;
    score += 10;
  }

  // ── Whitelisted scambaiter ──
  if (opts.isWhitelisted || opts.reporterRole === 'scambaiter') {
    factors.whitelisted_scambaiter = 30;
    score += 30;
  }

  // ── Repeat reporter (prior reports, max +15) ──
  const priorCount = opts.priorReportCount || 0;
  if (priorCount > 0) {
    const priorPoints = Math.min(priorCount * 5, 15);
    factors.repeat_reporter = priorPoints;
    score += priorPoints;
  }

  // ── reCAPTCHA score adjustment ──
  if (opts.recaptchaScore != null) {
    const captcha = Number(opts.recaptchaScore);
    if (captcha >= 0.7) {
      factors.recaptcha = 5;
      score += 5;
    } else if (captcha < 0.3) {
      factors.recaptcha = -10;
      score -= 10;
    }
  }

  // Clamp to 0–100
  score = Math.max(0, Math.min(100, score));

  return { score, factors };
}

/**
 * Returns a human-readable tier label for a trust score.
 */
export function trustTier(score) {
  if (score >= 76) return 'trusted';
  if (score >= 51) return 'high';
  if (score >= 26) return 'medium';
  return 'low';
}
