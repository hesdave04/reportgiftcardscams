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
            // Unified rendering for all report types
            const title = r.suspect_name || r.gift_card_brand || r.scam_type || 'Scam Report';
            const subtitle = r.suspect_email || r.suspect_phone || r.retailer || '';
            const amount = r.amount;
            const dt = r.created_at || r.purchase_date || null;
            const last4 = r.card_last4;

            return (
              <li key={r.id ?? i} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-slate-900">
                    {title}
                    {r.scam_type && !r.gift_card_brand && (
                      <span className="ml-2 text-xs text-slate-400">
                        {r.scam_type}
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {last4 ? `•••• ${last4}` : subtitle ? subtitle.slice(0, 40) : 'Report submitted'}
                    {amount ? ` · $${Number(amount).toLocaleString()}` : ''}
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
