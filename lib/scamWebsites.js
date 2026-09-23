// lib/scamWebsites.js — shared data layer for /scam-websites/* pages.
//
// Source of truth for per-domain aggregates is the `scam_domains` table
// (one row per normalized domain, rebuilt nightly from case_intakes +
// website_checks). Individual reports still come from case_intakes.
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const SITE = "https://scamcomplaints.org";

export function normalizeDomain(input) {
  if (!input) return null;
  let clean = String(input).trim().toLowerCase().split(/[;, ]/)[0];
  if (!clean.startsWith("http")) clean = "https://" + clean;
  try {
    const host = new URL(clean).hostname.replace(/^www\./, "").replace(/\.$/, "");
    return host || null;
  } catch {
    return clean.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || null;
  }
}

export function formatScamType(t) {
  if (!t) return "Unknown";
  return String(t)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatMoney(n) {
  const v = Number(n) || 0;
  return v > 0 ? `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : null;
}

const SOURCE_LABELS = {
  "3p_chainabuse": "Chainabuse (TRM Labs) community reports",
  "3p_cryptolegal": "CryptoLegal scam-site registry",
  ScamHatersUnited: "ScamHaters United",
  "website-checker": "ScamComplaints automated website check",
  submitted: "victim report filed on ScamComplaints",
  user_submitted: "victim report filed on ScamComplaints",
  scf_verified: "Social Catfish investigator review",
  quick_report: "quick report filed on ScamComplaints",
};
export function sourceLabel(s) {
  return SOURCE_LABELS[s] || s || "unknown source";
}

/** External blocklist feeds (attribution required by their licences). */
export const FEED_META = {
  metamask_eth_phishing: { label: "MetaMask eth-phishing-detect", url: "https://github.com/MetaMask/eth-phishing-detect", kind: "Web3 phishing" },
  scamsniffer: { label: "Scam Sniffer blacklist", url: "https://github.com/scamsniffer/scam-database", kind: "Web3 phishing" },
  polkadot_phishing: { label: "polkadot-js phishing list", url: "https://github.com/polkadot-js/phishing", kind: "Web3 phishing" },
  jarelllama_scam_blocklist: { label: "jarelllama Scam Blocklist", url: "https://github.com/jarelllama/Scam-Blocklist", kind: "scam & phishing" },
  phishing_database_active: { label: "Phishing.Database", url: "https://github.com/Phishing-Database/Phishing.Database", kind: "active phishing" },
};
export function feedList(row) {
  return (row?.feed_sources || []).map((k) => FEED_META[k] || { label: k, url: null, kind: "" });
}

const LEGIT_CATEGORY_COPY = {
  government: "an official government website",
  platform: "a legitimate social or messaging platform",
  brand: "a legitimate company website",
  explorer: "a legitimate blockchain explorer",
  shortener: "a legitimate link-shortening service",
  hosting: "a legitimate web-hosting platform",
};
export function legitCategoryCopy(c) {
  return LEGIT_CATEGORY_COPY[c] || "a legitimate website";
}

/** Risk badge used across list + detail pages. */
export function riskBadge(row) {
  if (!row) return { label: "Unknown", bg: "bg-slate-100", text: "text-slate-700" };
  if (row.kind === "legit") return { label: "Legitimate site — impersonated by scammers", bg: "bg-sky-100", text: "text-sky-800" };
  if (row.kind === "checked_only") return { label: "Checked — no scam reports", bg: "bg-slate-100", text: "text-slate-700" };
  if (row.kind === "blocklisted") {
    const f = row.feed_count || 0;
    return f >= 3 || (row.trust_score != null && row.trust_score <= 25)
      ? { label: `High Risk — on ${f} security blocklists`, bg: "bg-red-100", text: "text-red-700" }
      : { label: `Blocklisted by ${f} security feeds`, bg: "bg-orange-100", text: "text-orange-700" };
  }
  const n = row.report_count || 0;
  if (n >= 5 || (row.trust_score != null && row.trust_score <= 25)) return { label: "High Risk", bg: "bg-red-100", text: "text-red-700" };
  if (n >= 2 || (row.trust_score != null && row.trust_score <= 40)) return { label: "Moderate Risk", bg: "bg-orange-100", text: "text-orange-700" };
  return { label: "Reported", bg: "bg-yellow-100", text: "text-yellow-700" };
}

/* ───────────────────────────── queries ───────────────────────────── */

export async function getDomainRow(domain) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase.from("scam_domains").select("*").eq("domain", domain).maybeSingle();
  return data || null;
}

/** Individual reports for a domain (exact host match after normalization). */
export async function getDomainReports(domain, limit = 20) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase
    .from("case_intakes")
    .select("id, suspect_website, scam_type, created_at, amount, story, suspect_name, suspect_email, suspect_phone, suspect_wallet, source, platforms, payment_methods")
    .ilike("suspect_website", `%${domain}%`)
    .order("created_at", { ascending: false })
    .limit(400);
  return (data || []).filter((r) => normalizeDomain(r.suspect_website) === domain).slice(0, limit);
}

/**
 * Fallback for domains that were reported after the last nightly rebuild:
 * derive a minimal aggregate straight from case_intakes.
 */
export async function buildRowFromReports(domain, reports) {
  if (!reports.length) return null;
  const types = {};
  let totalLost = 0;
  let first = reports[0].created_at;
  let latest = reports[0].created_at;
  const sources = new Set();
  for (const r of reports) {
    if (r.scam_type) types[r.scam_type] = (types[r.scam_type] || 0) + 1;
    totalLost += Number(r.amount) || 0;
    if (r.created_at < first) first = r.created_at;
    if (r.created_at > latest) latest = r.created_at;
    sources.add(r.source || "unknown");
  }
  const sorted = Object.entries(types).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  return {
    domain,
    tld: domain.split(".").pop(),
    report_count: reports.length,
    organic_count: reports.filter((r) => ["submitted", "user_submitted", "scf_verified", "quick_report"].includes(r.source)).length,
    sources: [...sources],
    scam_types: sorted,
    primary_scam_type: sorted[0] || null,
    total_lost: totalLost,
    first_reported: first,
    latest_report: latest,
    kind: "reported",
    indexable: false, // not enriched yet → keep out of the index until the nightly job runs
    _fresh: true,
  };
}

/** Similar / related websites: brand lookalikes, same infrastructure, same scam type. */
export async function getSimilarDomains(row, limit = 10) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !row) return { lookalikes: [], infrastructure: [], sameType: [] };
  const sel = "domain, report_count, feed_count, primary_scam_type, kind, trust_score, registrar, server_country";
  const notSelf = (q) => q.neq("domain", row.domain).neq("kind", "legit");

  const queries = [];
  // 1) brand lookalikes (same brand token, e.g. all the trezor* clones)
  queries.push(
    row.brand_token
      ? notSelf(supabase.from("scam_domains").select(sel).eq("brand_token", row.brand_token)).order("report_count", { ascending: false }).limit(limit)
      : Promise.resolve({ data: [] })
  );
  // 2) same infrastructure (registrar + nameserver overlap), only when we have checker data
  queries.push(
    row.registrar && row.nameservers?.length
      ? notSelf(supabase.from("scam_domains").select(sel).eq("registrar", row.registrar).overlaps("nameservers", row.nameservers)).order("report_count", { ascending: false }).limit(limit)
      : row.registrar
        ? notSelf(supabase.from("scam_domains").select(sel).eq("registrar", row.registrar)).order("report_count", { ascending: false }).limit(limit)
        : Promise.resolve({ data: [] })
  );
  // 3) same scam type + same TLD, most reported
  queries.push(
    row.primary_scam_type
      ? notSelf(supabase.from("scam_domains").select(sel).eq("primary_scam_type", row.primary_scam_type).eq("tld", row.tld).eq("indexable", true)).order("report_count", { ascending: false }).limit(limit)
      : Promise.resolve({ data: [] })
  );

  const [a, b, c] = await Promise.all(queries);
  const seen = new Set([row.domain]);
  const dedupe = (list) => (list?.data || []).filter((d) => (seen.has(d.domain) ? false : (seen.add(d.domain), true)));
  return { lookalikes: dedupe(a), infrastructure: dedupe(b), sameType: dedupe(c) };
}

/** Paged list of indexable domains, for the directory + sitemaps. */
export async function listDomains({ page = 0, pageSize = 50, tld, scamType, registrar, country, kind, orderBy = "report_count" } = {}) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { rows: [], total: 0 };
  let q = supabase.from("scam_domains").select("domain, report_count, organic_count, feed_count, primary_scam_type, kind, trust_score, risk_level, registrar, server_country, latest_report, total_lost, tld, updated_at", { count: "exact" });
  if (tld) q = q.eq("tld", tld);
  if (scamType) q = q.eq("primary_scam_type", scamType);
  if (registrar) q = q.eq("registrar", registrar);
  if (country) q = q.eq("server_country", country);
  if (kind) q = q.eq("kind", kind);
  else q = q.in("kind", ["reported", "blocklisted"]).eq("indexable", true); // legit + checked_only domains are not scam sites; unenriched blocklist rows are too thin to list
  q = q.order(orderBy, { ascending: false, nullsFirst: false }).order("domain", { ascending: true }).range(page * pageSize, page * pageSize + pageSize - 1);
  const { data, count } = await q;
  return { rows: data || [], total: count || 0 };
}

export async function listIndexableForSitemap(offset, limit) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  // PostgREST caps a single response at 1,000 rows — page through in batches.
  const out = [];
  for (let start = offset; start < offset + limit; start += 1000) {
    const end = Math.min(start + 999, offset + limit - 1);
    const { data } = await supabase
      .from("scam_domains")
      .select("domain, latest_report, updated_at")
      .eq("indexable", true)
      .order("domain", { ascending: true })
      .range(start, end);
    if (!data?.length) break;
    out.push(...data);
    if (data.length < end - start + 1) break;
  }
  return out;
}

export async function countIndexable() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return 0;
  const { count } = await supabase.from("scam_domains").select("domain", { count: "exact", head: true }).eq("indexable", true);
  return count || 0;
}

export async function getDirectoryStats() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return { total: 0, indexable: 0, reports: 0 };
  const [{ count: total }, { count: indexable }, { count: reports }] = await Promise.all([
    supabase.from("scam_domains").select("domain", { count: "exact", head: true }).in("kind", ["reported", "blocklisted"]),
    supabase.from("scam_domains").select("domain", { count: "exact", head: true }).eq("indexable", true),
    supabase.from("case_intakes").select("id", { count: "exact", head: true }).not("suspect_website", "is", null),
  ]);
  return { total: total || 0, indexable: indexable || 0, reports: reports || 0 };
}

/** Facet counts (type / tld / registrar / country) from the scam_domain_facets view. */
export async function getFacets(facet, limit = 40) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase.from("scam_domain_facets").select("value, n, reports").eq("facet", facet).order("n", { ascending: false }).limit(limit);
  return data || [];
}

export const TYPE_COPY = {
  phishing: { title: "Phishing websites", blurb: "Fake login, wallet-connect and 'verify your account' pages built to steal passwords, seed phrases and card numbers. Most are clones of well-known brands hosted on free platforms and abandoned within weeks." },
  crypto_investment_scam: { title: "Crypto & investment scam websites", blurb: "Fake trading platforms, 'AI trading bots' and mining pools that show fabricated profits and block withdrawals. Often introduced through dating apps or social media (pig butchering)." },
  fake_project: { title: "Fake crypto project websites", blurb: "Token launches, NFT drops and DeFi 'projects' whose only product is the investor deposit." },
  impersonation_scam: { title: "Impersonation scam websites", blurb: "Sites posing as government agencies, banks, shipping companies or celebrities to extract fees or personal data." },
  fake_returns: { title: "Fake-returns investment sites", blurb: "Guaranteed daily/weekly ROI schemes — classic Ponzi structures with a modern front end." },
  romance_scam: { title: "Romance scam websites", blurb: "Dating sites, profile pages and 'shipping company' fronts used in romance and military romance scams." },
  sextortion: { title: "Sextortion websites", blurb: "Domains used to host or threaten publication of intimate images and collect extortion payments." },
  recovery_scam: { title: "Recovery scam websites", blurb: "'Fund recovery' firms that target people who were already scammed — the second scam." },
  online_shopping_scam: { title: "Fake online store websites", blurb: "Non-delivery and counterfeit storefronts advertising brand-name products at 70–90% off." },
  suspicious_website: { title: "Suspicious websites", blurb: "Domains that scored 40/100 or lower on the ScamComplaints automated website safety check." },
  employment_scam: { title: "Employment scam websites", blurb: "Fake recruiters, task-based 'jobs' and equipment-fee schemes." },
  tech_support_scam: { title: "Tech support scam websites", blurb: "Fake virus warnings and 'call Microsoft now' pages." },
  gift_card_scam: { title: "Gift card scam websites", blurb: "Sites used to demand or launder gift-card payments." },
};
