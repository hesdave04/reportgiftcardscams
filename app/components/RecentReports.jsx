'use client';

import { useEffect, useState } from 'react';

export default function RecentReports() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let abort = false;

    (async () => {
      setLoading(true);
      setErr('');
      try {
        // Works with either {items: [...]}, {results: [...]}, {data: [...]}, or a plain array.
        const res = await fetch('/api/search?limit=10', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = Array.isArray(json)
          ? json
          : json.items || json.results || json.data || [];

        if (!abort) setRows(items);
      } catch (e) {
        if (!abort) setErr(String(e.message || e));
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {loading && <p className="text-slate-500 text-sm">Loading…</p>}
      {err && (
        <p className="text-red-600 text-sm">
          Error loading recent reports: {err}
        </p>
      )}
      {!loading && !err && rows.length === 0 && (
        <p className="text-slate-500 text-sm">No recent reports yet.</p>
      )}

      {rows.length > 0 && (
        <ul className="divide-y divide-slate-100">
          {rows.map((r, i) => {
            // Try to normalize fields from different API shapes
            const brand =
              r.gift_card_brand || r.brand || r.card_brand || 'Unknown Brand';
            const retailer = r.retailer || r.seller || 'Unknown Retailer';
            const last4 =
              r.card_number_last4 ||
              r.last4 ||
              (typeof r.card_number === 'string'
                ? r.card_number.slice(-4)
                : undefined);
            const amount = r.amount ?? r.value ?? null;
            const dt =
              r.purchase_date ||
              r.created_at ||
              r.createdAt ||
              r.date ||
              null;

            return (
              <li key={r.id ?? i} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {brand}{' '}
                    <span className="text-slate-400">
                      · {retailer}
                    </span>
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {last4 ? `•••• ${last4}` : 'Card ••••'}
                    {amount ? ` · $${Number(amount).toFixed(2)}` : ''}
                    {dt ? ` · ${new Date(dt).toLocaleDateString()}` : ''}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
