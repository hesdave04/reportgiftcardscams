// lib/dnsbl.js — DNS blocklist answer classification for the website checker.

/**
 * Classify a DNS blocklist answer. Blocklists answer *errors* with A records too — Spamhaus returns
 * 127.255.255.x for queries from public/cloud resolvers (every Vercel lookup), SURBL/URIBL return
 * 127.0.0.1 when they refuse the query — so "any A record" is not a listing.
 *   spamhaus: listed = 127.0.1.2–127.0.1.199; surbl/uribl: listed = 127.0.0.2–127.0.0.255 (bitmask)
 */
export function dnsblVerdict(list, records) {
  if (!records || records.length === 0) return "clean";
  const listed = records.some((ip) => {
    const m = /^127\.0\.(\d+)\.(\d+)$/.exec(ip);
    if (!m) return false;
    const [third, last] = [Number(m[1]), Number(m[2])];
    return list === "spamhaus" ? third === 1 && last >= 2 && last <= 199 : third === 0 && last >= 2;
  });
  return listed ? "listed" : "unavailable";
}
