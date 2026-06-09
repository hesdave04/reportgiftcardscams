// app/wall-of-shame/page.jsx
'use client';

import { useEffect, useState } from 'react';

export default function WallOfShamePage() {
  const [days, setDays] = useState(180);
  const [brands, setBrands] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let abort = false;

    async function load() {
      setLoading(true);
      setErr('');
      try {
        const res = await fetch(`/api/stats/wall-of-shame?days=${days}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 140)}`);
        }
        const json = await res.json();
        if (!abort) {
          setBrands(json.brands || []);
          setSellers(json.sellers || []);
        }
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
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          🚨 Community Data
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Wall of Shame
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed">
          The most-reported scam methods and platforms, ranked by community reports.
          This data helps law enforcement and researchers identify emerging fraud patterns.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm font-medium text-slate-600">Time range:</label>
        <select
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={180}>Last 180 days</option>
          <option value={365}>Last 365 days</option>
        </select>
      </div>

      {err && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>Error loading data:</strong> {err}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Gift cards used in scams */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            🎁 Gift Cards Used in Scams
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Brands most frequently exploited by scammers
          </p>
          <div className="mt-4">
            {loading ? (
              <p className="text-slate-400 text-sm">Loading…</p>
            ) : brands.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-6 text-center">
                <p className="text-slate-500 text-sm">No data yet for this range.</p>
                <p className="mt-1 text-xs text-slate-400">Reports will appear here as they are filed.</p>
              </div>
            ) : (
              <ol className="space-y-2">
                {brands.map((row, idx) => (
                  <li
                    key={`${row.name}-${idx}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800">{row.name}</span>
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {row.count} reports
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* Retailers */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            🏪 Retailers Where Scam Cards Are Purchased
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Stores where victims most often buy scam-related gift cards
          </p>
          <div className="mt-4">
            {loading ? (
              <p className="text-slate-400 text-sm">Loading…</p>
            ) : sellers.length === 0 ? (
              <div className="rounded-xl bg-slate-50 p-6 text-center">
                <p className="text-slate-500 text-sm">No data yet for this range.</p>
                <p className="mt-1 text-xs text-slate-400">Reports will appear here as they are filed.</p>
              </div>
            ) : (
              <ol className="space-y-2">
                {sellers.map((row, idx) => (
                  <li
                    key={`${row.name}-${idx}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800">{row.name}</span>
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {row.count} reports
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h3 className="text-lg font-bold text-slate-900">Help expose more scammers</h3>
        <p className="mt-1 text-sm text-slate-600">
          Every report makes the data stronger and helps protect future victims.
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
