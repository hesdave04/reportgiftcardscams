import axios from 'axios';

const SECRET = process.env.RECAPTCHA_SECRET_KEY;

/**
 * Verify a reCAPTCHA token (works for both v2 and v3).
 * @param {string} token
 * @param {string} ip
 * @returns {Promise<{ok: boolean, score?: number, errorCodes?: string[]}>}
 */
export async function verifyRecaptcha(token, ip) {
  if (!SECRET) {
    console.warn('RECAPTCHA_SECRET_KEY is missing — skipping verification');
    return { ok: false, errorCodes: ['missing-secret'] };
  }
  try {
    const params = new URLSearchParams();
    params.set('secret', SECRET);
    params.set('response', token);
    if (ip) params.set('remoteip', ip);

    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      params
    );

    return {
      ok: !!data?.success,
      score: data?.score,
      errorCodes: data?.['error-codes'] || [],
    };
  } catch {
    return { ok: false, errorCodes: ['verify-failed'] };
  }
}

// Backwards-compatible alias
export const verifyRecaptchaV2 = verifyRecaptcha;
