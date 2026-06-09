import axios from 'axios';

const SECRET = process.env.RECAPTCHA_SECRET_KEY;

/**
 * Verify a reCAPTCHA v2 checkbox token.
 * @param {string} token
 * @param {string} ip
 * @returns {Promise<{ok: boolean, errorCodes?: string[]}>}
 */
export async function verifyRecaptchaV2(token, ip) {
  if (!SECRET) {
    console.warn('RECAPTCHA_SECRET_KEY is missing');
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

    return { ok: !!data?.success, errorCodes: data?.['error-codes'] || [] };
  } catch {
    return { ok: false, errorCodes: ['verify-failed'] };
  }
}
