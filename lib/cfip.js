// lib/cfip.js — client for CFIP, the Central Fraud Intelligence Platform (shared scam intelligence for every
// Social Catfish app). Server-side only: the app key never reaches the browser.
//
// lookup() returns CFIP's `response` object ({ risk_level, confidence, evidence_status, explanation,
// reported_patterns, report_count, ... }) or null when CFIP is not configured, slow, or errored — callers
// must fall back to their local data so a CFIP outage never breaks a page.

const DEFAULT_URL = "https://cfip-api.vercel.app";

export function cfipEnabled() {
  return Boolean(process.env.CFIP_API_KEY) && process.env.CFIP_ENABLED !== "false";
}

export async function cfipLookup(identifierType, identifier, purpose, timeoutMs = 2500) {
  if (!cfipEnabled() || !identifier) return null;
  const base = (process.env.CFIP_API_URL || DEFAULT_URL).replace(/\/$/, "");
  const url = `${base}/v1/lookup/${identifierType}/${encodeURIComponent(identifier)}?purpose=${encodeURIComponent(purpose)}`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.CFIP_API_KEY}`, "User-Agent": "scamcomplaints/cfip" },
      signal: ctrl.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn(`cfip lookup ${identifierType} -> HTTP ${res.status}`);
      return null;
    }
    const body = await res.json();
    return body && typeof body.response === "object" && body.response ? body.response : null;
  } catch (err) {
    console.warn("cfip lookup failed:", err?.name || String(err));
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Website checker scoring from a CFIP domain rating. Pure function (unit-tested).
// Returns { delta, flag, listed, reports } — delta is applied to the blacklist baseline (max 20).
// `listed` drives the "N scam reports in our database" banner, so it is only true when victims actually
// reported the domain; feed-only (blocklist) ratings still cost points and get a flag.
export function domainRatingImpact(r) {
  const reports = Number(r?.report_count || 0);
  const why = (r?.explanation || "").trim();
  switch (r?.risk_level) {
    case "high":
      return { delta: -12, listed: reports > 0, reports,
               flag: `Confirmed scam website in ScamComplaints intelligence — high risk. ${why}`.trim() };
    case "elevated":
      return { delta: reports >= 5 ? -12 : -8, listed: reports > 0, reports,
               flag: `Flagged in ScamComplaints intelligence${reports >= 5 ? " — high risk" : ""}. ${why}`.trim() };
    case "guarded":
      return { delta: -5, listed: reports > 0, reports, flag: `Reported in ScamComplaints intelligence. ${why}`.trim() };
    default: // low (known legitimate brand/government), unknown (no reports / shared platform)
      return { delta: 0, listed: false, reports: r?.risk_level === "low" ? 0 : reports, flag: null };
  }
}
