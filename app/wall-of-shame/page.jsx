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

    async function run() {
      setLoading(true);
      setErr('');
      try {
        // IMPORTANT: absolute path (leading slash)
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

    run();
    return () => {
      abort = true;
    };
  }, [days]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Wall of Shame</h1>
      <p className="text-slate-600 mt-2">
        Ranked lists of the most abused gift card brands and the retailers selling the most scam-related gift cards.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm text-slate-600">Range:</label>
        <select
          className="border rounded-md px-3 py-2 text-sm"
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
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-4 text-red-700">
          <strong>Error:</strong> {err}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Gift Cards Used Most in Scams</h2>
          <div className="mt-3">
            {loading ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : brands.length === 0 ? (
              <p className="text-slate-500 text-sm">No data yet for this range.</p>
            ) : (
              <ol className="mt-2 space-y-2">
                {brands.map((row, idx) => (
                  <li key={row.name} className="flex items-center justify-between border-b py-2 last:border-b-0">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{row.name}</span>
                    </span>
                    <span className="text-slate-600">{row.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Retailers Selling the Most Scam Gift Cards</h2>
          <div className="mt-3">
            {loading ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : sellers.length === 0 ? (
              <p className="text-slate-500 text-sm">No data yet for this range.</p>
            ) : (
              <ol className="mt-2 space-y-2">
                {sellers.map((row, idx) => (
                  <li key={row.name} className="flex items-center justify-between border-b py-2 last:border-b-0">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{row.name}</span>
                    </span>
                    <span className="text-slate-600">{row.count}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
