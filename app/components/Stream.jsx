"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterBar from "./FilterBar";

export default function Stream() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initial = useMemo(() => {
    return {
      brand: searchParams.get("brand") || "",
      retailer: searchParams.get("retailer") || "",
      q: searchParams.get("q") || "",
    };
  }, [searchParams]);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const pageSize = 20;

  async function load(p = page) {
    const params = new URLSearchParams({
      page: String(p),
      pageSize: String(pageSize),
    });
    if (initial.brand) params.set("brand", initial.brand);
    if (initial.retailer) params.set("retailer", initial.retailer);
    if (initial.q) params.set("q", initial.q);

    const res = await fetch(`/api/search?${params.toString()}`);
    const json = await res.json();
    setItems(json.items || []);
    setTotal(json.total || 0);
  }

  useEffect(() => {
    setPage(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial.brand, initial.retailer, initial.q, page]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  function applyFilters(f) {
    const params = new URLSearchParams();
    if (f.brand) params.set("brand", f.brand);
    if (f.retailer) params.set("retailer", f.retailer);
    if (f.q) params.set("q", f.q);
    params.set("page", "1");
    router.push(`/?${params.toString()}#recent`);
  }

  return (
    <section id="recent">
      <FilterBar initial={initial} onApply={applyFilters} />

      <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b px-4 py-3 text-sm text-slate-600">
          {total} result{total === 1 ? "" : "s"}
        </div>
        <ul className="divide-y">
          {items.map((it) => (
            <li key={it.id} className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-slate-900">
                  <span className="font-semibold">{it.retailer || "—"}</span>{" "}
                  → <span className="font-semibold">{it.gift_card_brand || "—"}</span>{" "}
                  · ****{it.card_last4 || "????"} · ${it.amount ?? "—"}
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(it.created_at).toLocaleString()}
                </div>
              </div>
              {it.notes && (
                <div className="mt-1 text-sm text-slate-700">{it.notes}</div>
              )}
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-4 py-6 text-center text-slate-500">
              No results. Try different filters.
            </li>
          )}
        </ul>

        {/* pagination */}
        {pageCount > 1 && (
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => router.push(updateParam("page", String(page - 1)))}
            >
              ← Prev
            </button>
            <div className="text-sm text-slate-600">
              Page {page} of {pageCount}
            </div>
            <button
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
              disabled={page >= pageCount}
              onClick={() => router.push(updateParam("page", String(page + 1)))}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );

  function updateParam(key, val) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, val);
    return `/?${params.toString()}#recent`;
    }
}
