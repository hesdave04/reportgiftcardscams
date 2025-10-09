"use client";

import { useState, useEffect } from "react";
import SearchSelect from "./SearchSelect";
import { BRANDS, RETAILERS } from "@/lib/prefill";

/**
 * Reusable filter bar.
 * Props:
 *  - initial: { brand?: string, retailer?: string, q?: string }
 *  - onApply: (filters) => void
 */
export default function FilterBar({ initial = {}, onApply }) {
  const [brand, setBrand] = useState(initial.brand || "");
  const [retailer, setRetailer] = useState(initial.retailer || "");
  const [q, setQ] = useState(initial.q || "");

  useEffect(() => {
    setBrand(initial.brand || "");
    setRetailer(initial.retailer || "");
    setQ(initial.q || "");
  }, [initial.brand, initial.retailer, initial.q]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <SearchSelect
          items={BRANDS}
          name="brand_filter"
          label="Gift Card Brand"
          placeholder="Apple, Google Play…"
          kind="brands"
          defaultValue={brand ? { label: brand } : undefined}
        />
        <SearchSelect
          items={RETAILERS}
          name="retailer_filter"
          label="Retailer (where bought)"
          placeholder="CVS, Walmart…"
          kind="retailers"
          defaultValue={retailer ? { label: retailer } : undefined}
        />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Keyword
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes, etc."
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          onClick={() => {
            const form = document.querySelector("input[name='brand_filter']").closest("form") || document;
            const brandVal = document.querySelector("input[name='brand_filter']")?.value || "";
            const retailerVal = document.querySelector("input[name='retailer_filter']")?.value || "";
            onApply({ brand: brandVal, retailer: retailerVal, q });
          }}
        >
          Apply Filters
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          onClick={() => onApply({ brand: "", retailer: "", q: "" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
