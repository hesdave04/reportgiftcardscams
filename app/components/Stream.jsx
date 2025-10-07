'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 20;
const DEBOUNCE_MS = 400;

function Badge({ children, type = 'default' }) {
  const base =
    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset';
  const map = {
    default: 'bg-slate-50 text-slate-700 ring-slate-600/20',
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    warn: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    error: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  };
  return <span className={`${base} ${map[type]}`}>{children}</span>;
}

function Money({ value }) {
  if (value === null || value === undefined || value === '') return <span className="text-slate-400">—</span>;
  try {
    const n = Number(value);
    return <span className="font-semibold">{n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</span>;
  } catch {
    return <span className="text-slate-400">—</span>;
  }
}

function MaskLast4({ last4 }) {
  if (!last4) return <span className="text-slate-400">—</span>;
  return <code className="font-mono text-xs">•••• {last4}</code>;
}

export default function Stream() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // for debounce
  const typingRef = useRef(null);

  // fetch list
  useEffect(() => {
    const ac = new AbortController();
    async function run() {
      setLoading(true);
      setErr(null);
      try {
        const url = `/api/search?page=${page}&pageSize=${PAGE_SIZE}&q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { signal: ac.signal, cache: 'no-store' });
        if (!res.ok) throw new Error(`Search failed (${res.status})`);
        const json = await res.json();
        setItems(json?.results || []);
      } catch (e) {
        if (e.name !== 'AbortError') setErr(e.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    run();
    return () => ac.abort();
  }, [q, page]);

  // debounce search input
  const onChangeQ = (e) => {
    const v = e.target.value;
    window.clearTimeout(typingRef.current);
    typingRef.current = window.setTimeout(() => {
      setPage(0);
      setQ(v.trim());
    }, DEBOUNCE_MS);
  };

  const onRefresh = () => {
    setPage(0);
    setQ((prev) => prev); // trigger effect via setPage
  };

  const canPrev = page > 0;
  const canNext = items.length === PAGE_SIZE; // if less than page size, probably end

  const header = useMemo(
    () => (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4a6 6 0 014.472 9.985l4.771 4.772a1 1 0 01-1.415 1.414l-4.771-4.771A6 6 0 1110 4zm0 2a4 4 0 100 8 4 4 0 000-8z"/></svg>
          </span>
          <input
            onChange={onChangeQ}
            placeholder="Search retailer, last 4, or notes…"
            className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/70"
            defaultValue=""
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev || loading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-600">Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext || loading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>

          <button
            onClick={onRefresh}
            className="ml-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>
    ),
    [canNext, canPrev, loading, page]
  );

  return (
    <div className="space-y-4">
      {header}

      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* states */}
        {loading && (
          <div className="p-6 text-sm text-slate-600">Loading…</div>
        )}
        {err && !loading && (
          <div className="p-6 text-sm text-rose-700">Error: {err}</div>
        )}
        {!loading && !err && items.length === 0 && (
          <div className="p-6 text-sm text-slate-600">No results.</div>
        )}

        {/* list */}
        {!loading &&
          !err &&
          items.map((r) => (
            <article key={r.id} className="p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="truncate text-base font-semibold text-slate-900">
                      {r.retailer || 'Unknown retailer'}
                    </h4>
                    <Badge type={r.status === 'approved' ? 'success' : r.status === 'rejected' ? 'error' : 'default'}>
                      {r.status || 'pending'}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-3.309 0-6 2.014-6 4.5S8.691 16 12 16s6-2.014 6-4.5S15.309 7 12 7zm0 7c-2.206 0-4-.896-4-2s1.794-2 4-2 4 .896 4 2-1.794 2-4 2z"/><path d="M12 2C6.486 2 2 5.589 2 10s4.486 8 10 8 10-3.589 10-8S17.514 2 12 2zM4 10c0-3.309 3.589-6 8-6s8 2.691 8 6-3.589 6-8 6-8-2.691-8-6z"/></svg>
                      <MaskLast4 last4={r.card_last4} />
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c5.421 0 10-3.589 10-8s-4.579-8-10-8S2 9.589 2 14s4.579 8 10 8zM7 11h10v6H7v-6z"/><path d="M9 13h2v2H9zM13 13h2v2h-2z"/></svg>
                      <Money value={r.amount} />
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm10-8a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM5 12a1 1 0 01-1 1H2a1 1 0 110-2h2a1 1 0 011 1zm12.364 7.778a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 011.414-1.414l1.414 1.414a1 1 0 010 1.414zM8.464 6.636a1 1 0 01-1.414 0L5.636 5.222A1 1 0 117.05 3.808l1.414 1.414a1 1 0 010 1.414zm9.9-1.414a1 1 0 010 1.414L16.95 8.05a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM7.05 16.95a1 1 0 010-1.414l1.414-1.414A1 1 0 119.878 15.5L8.464 16.95a1 1 0 01-1.414 0z"/></svg>
                      <time dateTime={r.created_at}>
                        {new Date(r.created_at).toLocaleString()}
                      </time>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {/* placeholder for actions if needed */}
                </div>
              </div>

              {r.notes && (
                <p className="mt-3 text-sm text-slate-700">
                  {r.notes}
                </p>
              )}
            </article>
          ))}
      </div>

      {/* bottom controls duplicate for long lists */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Showing up to {PAGE_SIZE} results per page
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev || loading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-600">Page {page + 1}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext || loading}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
