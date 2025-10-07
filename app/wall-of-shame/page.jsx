'use client';

import { useEffect, useState } from 'react';

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function List({ items, emptyLabel }) {
  if (!items?.length) {
    return <p className="text-sm text-slate-500">{emptyLabel}</p>;
  }
  return (
    <ol className="space-y-2">
      {items.map((row, i) => (
        <li
          key={row.name + i}
          className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-3"
        >
          <span className="font-medium text-slate-900">
            {i + 1}. {row.name}
          </span>
          <span className="text-sm text-slate-600">{row.count}</span>
        </li>
      ))}
    </ol>
  );
}

export default function WallOfShamePage() {
  const [days, setDays] = useState(180);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [data, setData] = useState({ topGiftCards: [], topRetailers: [] });

  async function load(d) {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/stats/wall-of-shame?days=${d}`, { cache: 'no-store' });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        // Try to read text for a better message
        const txt = await res.text();
        throw new Error(txt || `Request failed with ${res.status}`);
      }
      if (!contentType.includes('application/json')) {
        const txt = await res.text();
        throw new Error(`Expected JSON, got: ${txt.slice(0, 120)}…`);
      }
      const json = await res.json();
      setData({ topGiftCards: json.topGiftCards || [], topRetailers: json.topRetailers || [] });
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Wall of Shame</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        Ranked lists based on recent reports: which gift card brands are most abused and which retailers
        are selling the most scam-related cards.
      </p>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Top Offenders</h2>

        <label className="text-sm text-slate-700">
          <span className="mr-2">Range</span>
          <select
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={180}>Last 180 days</option>
            <option value={365}>Last 365 days</option>
          </select>
        </label>
      </div>

      {err && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {err}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Gift Cards Used Most in Scams">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : (
            <List items={data.topGiftCards} emptyLabel="No data yet for this range." />
          )}
        </Card>

        <Card title="Retailers Selling the Most Scam Gift Cards">
          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : (
            <List items={data.topRetailers} emptyLabel="No data yet for this range." />
          )}
        </Card>
      </div>
    </main>
  );
}
