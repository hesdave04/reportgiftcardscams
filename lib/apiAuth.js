// lib/apiAuth.js — API key authentication and rate limiting for partner API
import crypto from "crypto";
import { getSupabaseAdmin } from "./supabaseAdmin";

/**
 * Hash an API key for storage/lookup (never store raw keys).
 */
export function hashApiKey(rawKey) {
  return crypto.createHash("sha256").update(rawKey).digest("hex");
}

/**
 * Generate a new API key (prefix + random bytes).
 * Format: sc_live_<32 hex chars>
 */
export function generateApiKey() {
  const random = crypto.randomBytes(16).toString("hex");
  return `sc_live_${random}`;
}

// In-memory rate limit counters (per key)
const rateLimits = new Map();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimits.entries()) {
    if (now > data.dayResetAt + 3600000) rateLimits.delete(key);
  }
}, 600000);

/**
 * Tier-based rate limits.
 */
const TIER_LIMITS = {
  free: { perMinute: 10, perDay: 100 },
  basic: { perMinute: 100, perDay: 5000 },
  pro: { perMinute: 500, perDay: 50000 },
};

/**
 * Check rate limit for a given key hash + tier.
 * Returns { ok, remaining, resetAt } or { ok: false, retryAfter }.
 */
function checkRateLimit(keyHash, tier = "free") {
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  const now = Date.now();

  let data = rateLimits.get(keyHash);
  if (!data) {
    data = {
      minuteCount: 0,
      minuteResetAt: now + 60000,
      dayCount: 0,
      dayResetAt: now + 86400000,
    };
    rateLimits.set(keyHash, data);
  }

  // Reset minute window
  if (now > data.minuteResetAt) {
    data.minuteCount = 0;
    data.minuteResetAt = now + 60000;
  }

  // Reset day window
  if (now > data.dayResetAt) {
    data.dayCount = 0;
    data.dayResetAt = now + 86400000;
  }

  data.minuteCount += 1;
  data.dayCount += 1;

  if (data.minuteCount > limits.perMinute) {
    return {
      ok: false,
      error: "Rate limit exceeded (per-minute)",
      retryAfter: Math.ceil((data.minuteResetAt - now) / 1000),
      remaining: 0,
    };
  }

  if (data.dayCount > limits.perDay) {
    return {
      ok: false,
      error: "Daily rate limit exceeded",
      retryAfter: Math.ceil((data.dayResetAt - now) / 1000),
      remaining: 0,
    };
  }

  return {
    ok: true,
    remaining: limits.perDay - data.dayCount,
    minuteRemaining: limits.perMinute - data.minuteCount,
  };
}

/**
 * Authenticate a request using the x-api-key header.
 * Returns { authenticated, partner, tier, error, status, rateLimit }
 */
export async function authenticateApiKey(request) {
  const rawKey = request.headers.get("x-api-key");
  if (!rawKey) {
    return {
      authenticated: false,
      error: "Missing x-api-key header. Get your API key at scamcomplaints.org/api-docs",
      status: 401,
    };
  }

  if (!rawKey.startsWith("sc_live_")) {
    return {
      authenticated: false,
      error: "Invalid API key format",
      status: 401,
    };
  }

  const keyHash = hashApiKey(rawKey);
  const supa = getSupabaseAdmin();
  if (!supa) {
    return { authenticated: false, error: "Database not configured", status: 500 };
  }

  // Look up key
  const { data: keyRow, error } = await supa
    .from("api_keys")
    .select("id, partner_name, tier, is_active, permissions")
    .eq("key_hash", keyHash)
    .single();

  if (error || !keyRow) {
    return { authenticated: false, error: "Invalid API key", status: 401 };
  }

  if (!keyRow.is_active) {
    return { authenticated: false, error: "API key is disabled", status: 403 };
  }

  // Check rate limit
  const rl = checkRateLimit(keyHash, keyRow.tier);
  if (!rl.ok) {
    return {
      authenticated: false,
      error: rl.error,
      status: 429,
      retryAfter: rl.retryAfter,
    };
  }

  // Log usage (fire and forget — don't block the request)
  supa
    .from("api_usage")
    .insert({
      api_key_id: keyRow.id,
      endpoint: new URL(request.url).pathname,
      ip: request.headers.get("x-forwarded-for") || "0.0.0.0",
    })
    .then(() => {})
    .catch(() => {});

  return {
    authenticated: true,
    partner: keyRow.partner_name,
    tier: keyRow.tier,
    permissions: keyRow.permissions || [],
    rateLimit: rl,
  };
}
