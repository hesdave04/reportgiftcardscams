// app/leaderboard/LeaderboardClient.jsx
"use client";

import { useEffect, useState } from "react";

/* ─── Tab config ─── */
const TABS = [
  { key: "states", label: "By State", icon: "🗺️", emoji: "📍" },
  { key: "giftCardBrands", label: "Gift Cards", icon: "🎁", emoji: "🎁" },
  { key: "financialInstitutions", label: "Financial Institutions", icon: "🏦", emoji: "💸" },
];

export default function LeaderboardClient() {
  const [days, setDays] = useState(365);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [activeTab, setActiveTab] = useState("states");

  useEffect(() => {
    let abort = false;
    setLoading(true);
    setErr("");

    fetch(`/api/stats/leaderboard?days=${days}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!abort) setData(json);
      })
      .catch((e) => {
        if (!abort) setErr(String(e.message || e));
      })
      .finally(() => {
        if (!abort) setLoading(false);
      });

    return () => { abort = true; };
  }, [days]);

  const items = data?.[activeTab] || [];
  const tabConfig = TABS.find((t) => t.key === activeTab);

  // Compute totals for summary bar
  const totalReports = items.reduce((s, i) => s + i.count, 0);
  const totalAmount = items.reduce((s, i) => s + (i.amount || 0), 0);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          🏆 Leaderboard
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Scam Leaderboard
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed">
          Ranked by report volume. See which states, gift card brands, and
          financial institutions are most frequently involved in scam reports.
        </p>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">
            Time range:
          </label>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 6 months</option>
            <option value={365}>Last 12 months</option>
            <option value={9999}>All time</option>
          </select>
        </div>

        {data?.meta && (
          <div className="flex gap-2 text-xs text-slate-400">
            <span className="rounded bg-slate-100 px-2 py-1">
              {(data.meta.totalGiftCardReports + data.meta.totalCaseIntakes).toLocaleString()} total reports
            </span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-xl bg-slate-100 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="hidden sm:inline">{tab.icon} </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {err && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* Summary bar */}
      {!loading && !err && items.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm">
            <span className="font-semibold text-slate-900">{totalReports.toLocaleString()}</span>{" "}
            <span className="text-slate-500">reports</span>
          </div>
          {totalAmount > 0 && (
            <div className="rounded-lg bg-red-50 px-3 py-1.5 text-sm">
              <span className="font-semibold text-red-700">${totalAmount.toLocaleString()}</span>{" "}
              <span className="text-red-600">reported lost</span>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard table */}
      <div className="mt-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">No data yet for this range.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5 sm:col-span-6">
                {activeTab === "states" ? "State" : activeTab === "giftCardBrands" ? "Brand" : "Institution"}
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">Reports</div>
              <div className="col-span-3 text-right">$ Lost</div>
            </div>

            {/* Rows */}
            {items.map((item, idx) => {
              const barWidth = Math.max((item.count / items[0].count) * 100, 3);
              const isTop3 = idx < 3;

              return (
                <div
                  key={item.name}
                  className={`group grid grid-cols-12 gap-2 items-center px-4 py-3 transition-colors hover:bg-slate-50 ${
                    idx < items.length - 1 ? "border-b border-slate-50" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex justify-center">
                    {isTop3 ? (
                      <span className="text-lg">
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Name + bar */}
                  <div className="col-span-5 sm:col-span-6 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm truncate ${isTop3 ? "text-slate-900" : "text-slate-700"}`}>
                        {activeTab === "states"
                          ? `${item.fullName || item.name}`
                          : item.name}
                      </span>
                      {activeTab === "states" && item.fullName && (
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          ({item.name})
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          activeTab === "states"
                            ? "bg-blue-500"
                            : activeTab === "giftCardBrands"
                            ? "bg-purple-500"
                            : "bg-amber-500"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Count */}
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <span className={`text-sm tabular-nums ${isTop3 ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>
                      {item.count.toLocaleString()}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="col-span-3 text-right">
                    {item.amount > 0 ? (
                      <span className={`text-sm tabular-nums ${isTop3 ? "font-bold text-red-600" : "font-medium text-red-500"}`}>
                        ${item.amount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Data Intelligence section ── */}
      {!loading && !err && data?.dataTypes?.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              📊 Data Intelligence
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Scammer Data Collected
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Identifying information extracted from reports — broken down by data type and source.
          </p>

          {/* Data type cards */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.dataTypes.map((dt) => (
              <div
                key={dt.key}
                className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl">{dt.icon}</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-900 tabular-nums">
                  {dt.total.toLocaleString()}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500 leading-tight">
                  {dt.label}
                </div>
              </div>
            ))}
          </div>

          {/* Source breakdown table */}
          {data.sources?.length > 0 && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  By Source
                </h3>
              </div>

              {/* Table header */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <th className="px-4 py-3 text-left">Source</th>
                      <th className="px-3 py-3 text-right">Reports</th>
                      {data.dataTypes.map((dt) => (
                        <th key={dt.key} className="px-3 py-3 text-right whitespace-nowrap">
                          <span className="hidden sm:inline">{dt.icon} </span>
                          {dt.label.split(" ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.sources.map((src, idx) => (
                      <tr
                        key={src.source}
                        className={`hover:bg-slate-50 transition-colors ${
                          idx < data.sources.length - 1 ? "border-b border-slate-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block h-2 w-2 rounded-full ${
                                src.source === "scf_verified"
                                  ? "bg-green-500"
                                  : src.source === "user_submitted"
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <span className="font-medium text-slate-700">
                              {src.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right font-semibold text-slate-900 tabular-nums">
                          {src.reports.toLocaleString()}
                        </td>
                        {data.dataTypes.map((dt) => {
                          const val = src[dt.key] || 0;
                          return (
                            <td
                              key={dt.key}
                              className={`px-3 py-3 text-right tabular-nums ${
                                val > 0 ? "font-medium text-slate-700" : "text-slate-300"
                              }`}
                            >
                              {val > 0 ? val.toLocaleString() : "—"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>

                  {/* Totals row */}
                  <tfoot>
                    <tr className="border-t-2 border-slate-200 bg-slate-50 font-bold">
                      <td className="px-4 py-3 text-slate-900">Total</td>
                      <td className="px-3 py-3 text-right text-slate-900 tabular-nums">
                        {data.sources.reduce((s, r) => s + r.reports, 0).toLocaleString()}
                      </td>
                      {data.dataTypes.map((dt) => (
                        <td key={dt.key} className="px-3 py-3 text-right text-slate-900 tabular-nums">
                          {dt.total.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Methodology note */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          About this data
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Rankings are based on reports submitted to ScamComplaints.org.
          State data reflects where gift cards were purchased.
          Financial institution data includes banks, payment apps (Venmo, PayPal, Cash App, Zelle),
          and cryptocurrency platforms mentioned in victim reports.
          Dollar amounts represent self-reported losses and may not reflect total fraud impact.
          Data intelligence metrics count individual identifying data points (emails, phone numbers, etc.)
          extracted from each report. Sources include SCF-verified investigations, user submissions,
          and third-party databases.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h3 className="text-lg font-bold text-slate-900">
          Been scammed? Report it.
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Your report strengthens this data and helps protect others.
        </p>
        <a
          href="/case-builder"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors"
        >
          File a Report
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </main>
  );
}
