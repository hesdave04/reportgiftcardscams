'use client';

import { useEffect, useState } from 'react';

const options = [
  { label: 'Last 90 days', value: '90' },
  { label: 'Last 180 days', value: '180' },
  { label: 'Last 365 days', value: '365' },
  { label: 'All time', value: 'all' },
];

function sinceFor(value) {
  if (value === 'all') return '';
  const days = parseInt(value, 10);
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function WallOfShameView() {
  const [range, setRange] = useState('180');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setData(null);
    try {
      const since = sinceFor(range);
      const qs = new URLSearchParams();
      qs.set('limit', '10');
      if (since) qs.set('since', since);
      const res = await fetch(`/api/stats/wall-of-shame?${qs.toString()}`, { cache: 'no-store' });
      const json = await res.json();
      setData(json);
    } catch (e) {
      setData({ ok: false, error: String(e) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="md:col-span-2 mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Top Offenders</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Gift card issuers */}
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Gift Cards Used Most in Scams</h3>
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && data?.ok && data.topGiftCardIssuers?.length === 0 && (
          <p className="text-sm text-slate-500">No data for this period.</p>
        )}
        {!loading && data?.ok && data.topGiftCardIssuers?.length > 0 && (
          <ol className="space-y-2">
            {data.topGiftCardIssuers.map((row, i) => (
              <li key={row.name} className="flex items-center justify-between">
                <span className="font-medium text-slate-800">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>{row.name}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{row.count}</span>
              </li>
            ))}
          </ol>
        )}
        {!loading && !data?.ok && <p className="text-sm text-red-600">{data?.error || 'Failed to load'}</p>}
      </div>

      {/* Retailers selling them */}
      <div className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">Retailers Selling the Most Scam Gift Cards</h3>
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && data?.ok && data.topSellingRetailers?.length === 0 && (
          <p className="text-sm text-slate-500">No data for this period.</p>
        )}
        {!loading && data?.ok && data.topSellingRetailers?.length > 0 && (
          <ol className="space-y-2">
            {data.topSellingRetailers.map((row, i) => (
              <li key={row.name} className="flex items-center justify-between">
                <span className="font-medium text-slate-800">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>{row.name}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{row.count}</span>
              </li>
            ))}
          </ol>
        )}
        {!loading && !data?.ok && <p className="text-sm text-red-600">{data?.error || 'Failed to load'}</p>}
      </div>
    </div>
  );
}
