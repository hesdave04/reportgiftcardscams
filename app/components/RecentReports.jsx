// app/components/RecentReports.jsx
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
        const res = await fetch('/api/search?pageSize=10', { cache: 'no-store' });
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
            if (r.type === 'investigation') {
              return (
                <li key={r.id ?? i} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-slate-900">
                      <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 mr-2">
                        Investigation
                      </span>
                      {r.suspect_name || 'Unknown Suspect'}
                      {r.identity_verified && (
                        <span className="ml-2 text-slate-400 text-xs">
                          {r.identity_verified}
                        </span>
                      )}
                    </div>
                    <div className="truncate text-xs text-slate-500">
                      {r.suspect_email || r.suspect_phone || r.suspect_username
                        ? (r.suspect_email || r.suspect_phone || '').slice(0, 40)
                        : 'No contact info'}
                      {r.amount ? ` · $${Number(r.amount).toLocaleString()}` : ''}
                      {r.created_at ? ` · ${new Date(r.created_at).toLocaleDateString()}` : ''}
                    </div>
                  </div>
                </li>
              );
            }

            // Gift card report (original rendering)
            const brand =
              r.gift_card_brand || r.brand || r.card_brand || 'Unknown Brand';
            const retailer = r.retailer || r.seller || 'Unknown Retailer';
            const last4 =
              r.card_number_last4 ||
              r.last4 ||
              r.card_last4 ||
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
