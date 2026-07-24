// utils/phoneNormalize.js — Phone number normalization for search
//
// Strips a query to digits only and detects whether a query
// looks like a phone number so the search can match any formatting
// variation (e.g. "+234 705 824 0576" ↔ "2347058240576").

/**
 * Returns true when `q` looks like a phone number:
 * at least 7 digits and composed almost entirely of digits,
 * spaces, dashes, dots, parentheses, or a leading "+".
 */
export function isPhoneLike(q) {
  if (!q) return false;
  const cleaned = q.trim();
  // Must look like a phone pattern (digits + phone punctuation)
  if (!/^[\d\s\+\-\(\)\.]+$/.test(cleaned)) return false;
  // Must have at least 7 digits
  const digits = cleaned.replace(/\D/g, '');
  return digits.length >= 7;
}

/**
 * Strips everything except digits from a string.
 * "  +234 705-824 0576  " → "2347058240576"
 */
export function toDigits(q) {
  return (q || '').replace(/\D/g, '');
}
