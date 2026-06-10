"use client";

import { useState, useRef } from "react";

/* ── Score ring SVG ── */
function ScoreRing({ score, color, size = 160 }) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colorMap = {
    red: { ring: "#ef4444", bg: "#fef2f2", text: "#991b1b" },
    orange: { ring: "#f97316", bg: "#fff7ed", text: "#9a3412" },
    yellow: { ring: "#eab308", bg: "#fefce8", text: "#854d0e" },
    green: { ring: "#22c55e", bg: "#f0fdf4", text: "#166534" },
    emerald: { ring: "#10b981", bg: "#ecfdf5", text: "#065f46" },
  };
  const c = colorMap[color] || colorMap.green;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={c.ring} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-extrabold" style={{ color: c.text }}>{score}</span>
        <span className="text-xs font-medium text-slate-400">/100</span>
      </div>
    </div>
  );
}

/* ── Category card ── */
function CategoryCard({ title, icon, score, max, pct, details, flags }) {
  const [open, setOpen] = useState(false);
  const barColor =
    pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-yellow-500" : "bg-red-500";

  const detailEntries = Object.entries(details || {}).filter(
    ([k, v]) => v !== null && v !== undefined && v !== "" && !k.endsWith("_error")
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 truncate">{title}</h3>
            <span className="shrink-0 text-xs font-bold text-slate-500">
              {score}/{max}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100">
            <div
              className={`h-1.5 rounded-full ${barColor} transition-all duration-700`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/50">
          {detailEntries.length > 0 && (
            <dl className="space-y-2 text-xs">
              {detailEntries.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt className="text-slate-500 capitalize">{k.replace(/_/g, " ")}</dt>
                  <dd className="text-right font-medium text-slate-700 max-w-[60%] truncate">
                    {Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "Yes ✓" : "No ✗") : String(v)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {flags && flags.length > 0 && (
            <div className="mt-3 space-y-1">
              {flags.map((f, i) => (
                <p key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                  <span className="mt-0.5">⚠️</span> {f}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */
export default function CheckWebsiteClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  async function handleCheck(e) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/website-check?url=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to check website. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const categories = result
    ? [
        { key: "domain_registration", title: "Domain & Registration", icon: "📋" },
        { key: "ssl_security", title: "SSL / Security", icon: "🔒" },
        { key: "blacklist_reputation", title: "Blacklist & Reputation", icon: "🛡️" },
        { key: "server_infrastructure", title: "Server & Infrastructure", icon: "🖥️" },
        { key: "content_trust", title: "Content & Trust Signals", icon: "📄" },
      ]
    : [];

  // Extract flags relevant to each category
  function flagsForCategory(key) {
    if (!result) return [];
    const check = result.checks?.[key];
    // We embed flags at the top level — match by category keywords
    const categoryKeywords = {
      domain_registration: ["domain", "registration", "registr", "whois"],
      ssl_security: ["ssl", "certificate", "hsts", "https", "http only"],
      blacklist_reputation: ["blacklist", "blocklist", "scamcomplaints", "safe browsing", "surbl", "spamhaus", "uribl", "phish"],
      server_infrastructure: ["dns", "server", "hosting", "ip ", "mx ", "unreachable", "offline", "a records"],
      content_trust: ["contact", "privacy", "terms", "social media", "search engine", "content", "favicon", "parked"],
    };
    const keywords = categoryKeywords[key] || [];
    return (result.flags || []).filter((f) =>
      keywords.some((kw) => f.toLowerCase().includes(kw))
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/50 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Website Safety Checker
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Is this website{" "}
            <span className="text-sky-400">safe?</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
            Check any website&apos;s trust score before you buy, sign up, or share
            personal information. We analyze domain age, SSL, blacklists, and 20+ signals.
          </p>

          {/* Search form */}
          <form onSubmit={handleCheck} className="mt-8 mx-auto max-w-xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter a website (e.g. example.com)"
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-slate-400 text-base backdrop-blur focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="rounded-xl bg-sky-500 px-6 py-3.5 font-semibold text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Checking…
                  </>
                ) : (
                  "Check"
                )}
              </button>
            </div>
          </form>
          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
        </div>
      </section>

      {/* Results */}
      {result && (
        <>
          {/* Score overview */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-4xl px-4 py-10">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
                <ScoreRing score={result.trust_score} color={result.risk_color} />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-extrabold text-slate-900 break-all">
                    {result.domain}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
                        result.risk_color === "red"
                          ? "bg-red-100 text-red-700"
                          : result.risk_color === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : result.risk_color === "yellow"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {result.risk_emoji} {result.risk_label}
                    </span>
                    {result.cached && (
                      <span className="text-xs text-slate-400">cached result</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Trust score based on {Object.keys(result.checks).length} categories
                    and 20+ signals. Checked{" "}
                    {new Date(result.checked_at).toLocaleString()}.
                  </p>
                  {result.in_scamcomplaints_db && (
                    <div className="mt-3 rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-800">
                      ⚠️ This website has <strong>{result.scamcomplaints_reports}</strong> scam
                      report{result.scamcomplaints_reports !== 1 ? "s" : ""} in our database.{" "}
                      <a
                        href={`/scam-websites/${encodeURIComponent(result.domain)}`}
                        className="font-semibold underline hover:text-red-900"
                      >
                        View reports →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Flags */}
          {result.flags && result.flags.length > 0 && (
            <section className="border-b border-slate-200 bg-amber-50/50">
              <div className="mx-auto max-w-4xl px-4 py-6">
                <h3 className="text-sm font-semibold text-amber-900 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {result.flags.length} Warning{result.flags.length !== 1 ? "s" : ""} Found
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {result.flags.map((f, i) => (
                    <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Category breakdown */}
          <section className="mx-auto max-w-4xl px-4 py-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Detailed Breakdown</h3>
            <div className="space-y-3">
              {categories.map(({ key, title, icon }) => {
                const check = result.checks[key];
                return (
                  <CategoryCard
                    key={key}
                    title={title}
                    icon={icon}
                    score={check.score}
                    max={check.max}
                    pct={check.pct}
                    details={check.details}
                    flags={flagsForCategory(key)}
                  />
                );
              })}
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-4xl px-4 py-10 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Was this website a scam?
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                If you were scammed by this website, report it to help warn others.
              </p>
              <a
                href="/report-fraudulent-website"
                className="mt-4 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
              >
                Report This Website
              </a>
            </div>
          </section>
        </>
      )}

      {/* SEO content (shown when no result) */}
      {!result && !loading && (
        <section className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900">
              How our website safety checker works
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "📋",
                  title: "Domain & Registration",
                  desc: "We check domain age, registration length, WHOIS visibility, and registrar reputation. New domains with hidden details are a major red flag.",
                },
                {
                  icon: "🔒",
                  title: "SSL / Security",
                  desc: "We verify the SSL certificate type, expiration, HSTS headers, and security configurations. No SSL means your data isn't encrypted.",
                },
                {
                  icon: "🛡️",
                  title: "Blacklist & Reputation",
                  desc: "We cross-reference against Google Safe Browsing, SURBL, Spamhaus, and our own database of 25,000+ scam reports.",
                },
                {
                  icon: "🖥️",
                  title: "Server & Infrastructure",
                  desc: "We analyze DNS records, server location, CDN usage, email configuration, and hosting quality.",
                },
                {
                  icon: "📄",
                  title: "Content & Trust Signals",
                  desc: "We check for contact information, privacy policy, terms of service, social media presence, and content depth.",
                },
                {
                  icon: "⚡",
                  title: "Instant Results",
                  desc: "Get a 0–100 trust score in seconds, matching the same methodology used by ScamAdviser and other leading checkers.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-5 text-base leading-relaxed text-slate-700">
              <h3 className="text-xl font-bold text-slate-900">Why check a website before you buy?</h3>
              <p>
                Online shopping scams cost consumers billions of dollars every year. Fake
                websites impersonate real brands, sell counterfeit products, or simply take
                your money and never ship. Our website safety checker helps you make informed
                decisions by analyzing the same signals security professionals use.
              </p>
              <p>
                Unlike other checkers, ScamComplaints cross-references every domain against
                our database of 25,000+ scam reports filed by real victims. If someone has
                already been scammed by a website, you&apos;ll know before you become the next victim.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
