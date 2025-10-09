// app/components/Stream.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Stream() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const queryKey = useMemo(() => `${q}|${page}|${pageSize}`, [q, page, pageSize]);

  useEffect(() => {
    let abort = false;
    async function run() {
      setLoading(true);
      setErr("");
      try {
        const url = new URL("/api/search", window.location.origin);
        if (q) url.searchParams.set("q", q);
        url.searchParams.set("page", String(page));
        url.searchParams.set("pageSize", String(pageSize));
        const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text.slice(0, 140)}`);
        }
        const json = await res.json();
        if (!abort) {
          setItems(json.items || []);
          setTotal(json.total || 0);
        }
      } catch (e) {
        if (!abort) setErr(String(e.message || e));
      } finally {
        if (!abort) setLoading(false);
      }
    }
    run();
    return () => { abort = true; };
  }, [queryKey]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {err && (
        <div className="mb-3 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          <strong>Error:</strong> {err}
        </div>
      )}

      {loading ? (
        <p className="text-slate-500 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-slate-500 text-sm">No reports yet.</p>
      ) : (
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it.id} className="py-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">
                    {it.retailer || "Unknown"} · {it.gift_card_brand || "Unknown"}
                  </div>
                  <div className="text-slate-600">
                    • Last 4: <span className="font-mono">{it.card_last4}</span>
                    {it.amount != null ? <> · ${Number(it.amount).toFixed(2)}</> : null}
                  </div>
                  {it.notes && (
                    <div className="mt-1 text-slate-500">{it.notes}</div>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(it.created_at).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="mt-3 flex items-center justify-between text-sm text-slate-700">
        <span>
          Page {page} of {totalPages} · {total} total
        </span>
        <div className="flex gap-2">
          <button
            className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="rounded border border-slate-300 px-3 py-1 hover:bg-slate-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
