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
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-
