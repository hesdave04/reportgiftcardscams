// app/wall-of-shame/page.jsx
"use client";

import { useEffect, useState } from "react";

export default function WallOfShamePage() {
  const [days, setDays] = useState(180);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let abort = false;

    async function load() {
      setLoading(true);
      setErr("");
      try {
        const res = await fetch(`/api/stats/wall-of-shame?days=${days}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 140)}`);
        }
        const json = await res.json();
        if (!abort) setData(json);
      } catch (e) {
        if (!abort) setErr(String(e.message || e));
      } finally {
        if (!abort) setLoading(false);
      }
    }

    load();
    return () => {
      abort = true;
    };
  }, [days]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">Wall of Shame</h1>
        <p className="text-slate-600 mt-2">
          A transparent look at the most common scam types, platforms scammers
          use, and payment methods they exploit — based on real reports from
          victims and professional investigations.
        </p>
      </div>

      {/* Controls + Summary Stats */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Time range:</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 180 days</option>
            <option value={365}>Last 365 days</option>
            <option value={9999}>All time</option>
          </select>
        </div>

        {data && data.totalReports > 0 && (
          <div className="flex flex-wrap gap-3">
            <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm">
              <span className="font-semibold text-slate-900">
                {data.totalReports.toLocaleString()}
              </span>{" "}
              <span className="text-slate-500">reports</span>
            </div>
            {data.investigationCount > 0 && (
              <div className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm">
                <span className="font-semibold text-amber-800">
                  {data.investigationCount.toLocaleString()}
                </span>{" "}
                <span className="text-amber-600">investigations</span>
              </div>
            )}
            {data.totalAmountLost > 0 && (
              <div className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm">
                <span className="font-semibold text-brand">
                  ${data.totalAmountLost.toLocaleString()}
                </span>{" "}
                <span className="text-brand-accent">total reported lost</span>
              </div>
            )}
          </div>
        )}
      </div>

      {err && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          <strong>Error:</strong> {err}
        </div>
      )}

      {/* Investigation Cases Section */}
      {data?.topSuspects?.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔍</span>
            <h2 className="text-lg font-semibold text-slate-900">From Professional Investigations</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.topSuspects.slice(0, 6).map((s, i) => (
              <div key={i} className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate">{s.name}</p>
                    {s.email && (
                      <p className="text-xs text-slate-500 font-mono truncate mt-0.5">{s.email}</p>
                    )}
                  </div>
                  <span className={`shrink-0 ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    s.verified
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {s.verified ? 'Unverified ID' : 'Under Review'}
                  </span>
                </div>
                {s.story && (
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2">{s.story}</p>
                )}
              </div>
            ))}
          </div>
          {data.investigationCount > 6 && (
            <div className="mt-3 text-center">
              <a
                href="/search?source=investigations"
                className="text-sm text-brand-accent hover:text-brand-accent-hover font-medium"
              >
                View all {data.investigationCount} investigation cases →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Main grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Scam Types */}
        <RankingCard
          title="Most Reported Scam Types"
          icon="🎯"
          items={data?.scamTypes}
          loading={loading}
          color="red"
        />

        {/* Platforms */}
        <RankingCard
          title="Platforms Scammers Use Most"
          icon="📱"
          items={data?.platforms}
          loading={loading}
          color="blue"
        />

        {/* Payment Methods */}
        <RankingCard
          title="Most Exploited Payment Methods"
          icon="💸"
          items={data?.paymentMethods}
          loading={loading}
          color="amber"
        />

        {/* Gift Card Brands (if any legacy data) */}
        {data?.brands?.length > 0 && (
          <RankingCard
            title="Gift Card Brands Used in Scams"
            icon="🎁"
            items={data?.brands}
            loading={loading}
            color="purple"
          />
        )}

        {/* Retailers (if any legacy data) */}
        {data?.sellers?.length > 0 && (
          <RankingCard
            title="Where Scam Gift Cards Were Bought"
            icon="🏪"
            items={data?.sellers}
            loading={loading}
            color="slate"
          />
        )}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 text-center sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Been scammed? Report it.
        </h2>
        <p className="mt-2 text-slate-600 max-w-lg mx-auto">
          Your report helps expose scam patterns, warn others, and support
          investigations. It takes about 3 minutes.
        </p>
        <a
          href="/case-builder"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all"
        >
          Build Your Report
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>
    </main>
  );
}

/* ─── Ranking Card ─── */

const colorMap = {
  red: {
    bg: "bg-navy-50",
    badge: "bg-navy-100 text-brand",
    bar: "bg-brand-accent",
  },
  blue: {
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-800",
    bar: "bg-blue-500",
  },
  amber: {
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-800",
    bar: "bg-amber-500",
  },
  purple: {
    bg: "bg-purple-50",
    badge: "bg-purple-100 text-purple-800",
    bar: "bg-purple-500",
  },
  slate: {
    bg: "bg-slate-50",
    badge: "bg-slate-200 text-slate-700",
    bar: "bg-slate-500",
  },
};

function RankingCard({ title, icon, items, loading, color = "slate" }) {
  const c = colorMap[color] || colorMap.slate;
  const maxCount = items?.[0]?.count || 1;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : !items || items.length === 0 ? (
          <p className="text-slate-500 text-sm py-4 text-center">
            No data yet for this range.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((row, idx) => (
              <div key={`${row.name}-${idx}`} className="group">
                <div className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                      idx < 3 ? c.badge : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm text-slate-800 truncate">
                        {row.name}
                      </span>
                      <span className="text-xs text-slate-500 shrink-0 tabular-nums">
                        {row.count} {row.count === 1 ? "report" : "reports"}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.bar} transition-all duration-500`}
                        style={{
                          width: `${Math.max((row.count / maxCount) * 100, 3)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
