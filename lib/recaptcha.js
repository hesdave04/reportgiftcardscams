const SECRET = process.env.RECAPTCHA_SECRET_KEY;

/**
 * Verify a reCAPTCHA v3 token against Google's siteverify endpoint.
 *
 * Returns { ok, score, action, errorCodes }.
 *   - ok: true if Google says success AND score >= threshold
 *   - score: 0.0–1.0 (1.0 = very likely human)
 *   - action: the action string passed from the frontend
 *
 * @param {string} token  - The reCAPTCHA response token from the client
 * @param {string} ip     - Client IP for additional validation
 * @param {object} opts
 * @param {number} opts.scoreThreshold - Min score to pass (default 0.3)
 * @param {string} opts.expectedAction - Expected action name
 * @returns {Promise<{ok: boolean, score?: number, action?: string, errorCodes?: string[]}>}
 */
export async function verifyRecaptcha(token, ip, opts = {}) {
  const { scoreThreshold = 0.3, expectedAction } = opts;

  if (!SECRET) {
    console.warn("[recaptcha] RECAPTCHA_SECRET_KEY is missing — skipping verification");
    return { ok: true, errorCodes: ["missing-secret-skipped"] };
  }

  if (!token) {
    return { ok: false, errorCodes: ["missing-token"] };
  }

  try {
    const params = new URLSearchParams();
    params.set("secret", SECRET);
    params.set("response", token);
    if (ip) params.set("remoteip", ip);

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: params,
    });

    const data = await res.json();

    // Log for debugging (no sensitive data)
    console.log("[recaptcha] siteverify response:", {
      success: data.success,
      score: data.score,
      action: data.action,
      errorCodes: data["error-codes"],
      hostname: data.hostname,
    });

    if (!data.success) {
      return {
        ok: false,
        score: data.score,
        action: data.action,
        errorCodes: data["error-codes"] || [],
      };
    }

    // v3: check score threshold
    if (typeof data.score === "number" && data.score < scoreThreshold) {
      console.warn(`[recaptcha] Score ${data.score} below threshold ${scoreThreshold}`);
      return {
        ok: false,
        score: data.score,
        action: data.action,
        errorCodes: ["score-too-low"],
      };
    }

    // v3: optionally check action matches
    if (expectedAction && data.action && data.action !== expectedAction) {
      console.warn(`[recaptcha] Action mismatch: expected "${expectedAction}", got "${data.action}"`);
      // Don't fail on action mismatch, just log it
    }

    return {
      ok: true,
      score: data.score,
      action: data.action,
      errorCodes: [],
    };
  } catch (err) {
    console.error("[recaptcha] Verification request failed:", err.message);
    return { ok: false, errorCodes: ["verify-request-failed"] };
  }
}

// Backward-compatible alias
export const verifyRecaptchaV2 = verifyRecaptcha;
