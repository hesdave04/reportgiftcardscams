"use client";

import { useMemo, useState } from "react";
import SearchSelect from "./SearchSelect";
import { BRANDS, RETAILERS } from "@/lib/prefill";

export default function QuickBatch() {
  const [rows, setRows] = useState([]);
  const [saving, setSaving] = useState(false);

  // sticky fields (auto-applied)
  const [sticky, setSticky] = useState({
    brand: "",
    retailer: "",
    city: "",
    state: "",
    dateAll: "",
  });

  function addBlank() {
    setRows((r) => [
      ...r,
      {
        brand: sticky.brand,
        retailer: sticky.retailer,
        card_number_plain: "",
        amount: "",
        purchase_city: sticky.city,
        purchase_state: sticky.state,
        purchase_date: sticky.dateAll,
      },
    ]);
  }

  function parseAndAdd(text) {
    // lines like:
    // 603488******1234, $100
    // Target, 603488******1234, $100
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    const parsed = lines.map((l) => {
      const amtMatch = l.match(/\$?\s*([0-9]+(?:\.[0-9]{1,2})?)/);
      const digits = l.replace(/\D/g, "");
      const brandHint =
        BRANDS.find((b) => l.toLowerCase().includes(b.name.toLowerCase()))
          ?.name || sticky.brand;
      const retailerHint =
        RETAILERS.find((r) => l.toLowerCase().includes(r.name.toLowerCase()))
          ?.name || sticky.retailer;

      return {
        brand: brandHint || "",
        retailer: retailerHint || "",
        card_number_plain: digits || "",
        amount: amtMatch ? amtMatch[1] : "",
        purchase_city: sticky.city || "",
        purchase_state: sticky.state || "",
        purchase_date: sticky.dateAll || "",
      };
    });

    setRows((r) => [...r, ...parsed]);
  }

  async function submitAll() {
    if (!rows.length) return;
    setSaving(true);
    try {
      const res = await fetch("/api/report/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows }),
      });
      if (!res.ok) throw new Error(await res.text());
      setRows([]);
      alert("Uploaded!");
    } catch (e) {
      alert(`Error: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  function setRow(i, updates) {
    setRows((r) => {
      const clone = r.slice();
      clone[i] = { ...clone[i], ...updates };
      return clone;
    });
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-slate-900">
        Batch mode (Paste many)
      </h3>

      {/* sticky toolbar */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <SearchSelect
          items={BRANDS}
          name="sticky_brand"
          label="Gift Card Brand (sticky)"
          placeholder="Apple, Google Play…"
          kind="brands"
          allowFreeText
          defaultValue={sticky.brand ? { label: sticky.brand } : undefined}
        />
        <SearchSelect
          items={RETAILERS}
          name="sticky_retailer"
          label="Retailer (sticky)"
          placeholder="CVS, Walmart…"
          kind="retailers"
          allowFreeText
          defaultValue={sticky.retailer ? { label: sticky.retailer } : undefined}
        />
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Purchase city (sticky)
          </label>
          <input
            value={sticky.city}
            onChange={(e) => setSticky((s) => ({ ...s, city: e.target.value }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Purchase state (sticky)
          </label>
          <input
            value={sticky.state}
            onChange={(e) =>
              setSticky((s) => ({ ...s, state: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Use this date for all rows
          </label>
          <input
            type="date"
            value={sticky.dateAll}
            onChange={(e) =>
              setSticky((s) => ({ ...s, dateAll: e.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-2">
        <textarea
          rows={5}
          placeholder={`Paste your list. One card per line, like:\n603488******1234, $100\nTarget, 603488******1234, $100`}
          className="col-span-1 rounded-lg border border-slate-300 px-3 py-2 font-mono text-[13px]"
          onPaste={(e) => {
            // allow paste → parse & add quickly
          }}
          id="batchPaste"
        />
        <button
          type="button"
          className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          onClick={() => {
            const el = document.getElementById("batchPaste");
            parseAndAdd(el.value);
            el.value = "";
          }}
        >
          Add these cards
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          onClick={addBlank}
        >
          Add blank row
        </button>
      </div>

      {/* rows table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Retailer</th>
              <th className="px-3 py-2">Card #</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">City</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b">
                <td className="px-3 py-2">
                  <input
                    value={r.brand}
                    onChange={(e) => setRow(i, { brand: e.target.value })}
                    className="w-40 rounded border border-slate-300 px-2 py-1"
                    placeholder="Apple"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.retailer}
                    onChange={(e) => setRow(i, { retailer: e.target.value })}
                    className="w-40 rounded border border-slate-300 px-2 py-1"
                    placeholder="CVS"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.card_number_plain}
                    onChange={(e) =>
                      setRow(i, { card_number_plain: e.target.value })
                    }
                    className="w-56 rounded border border-slate-300 px-2 py-1"
                    placeholder="digits only"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.amount}
                    onChange={(e) => setRow(i, { amount: e.target.value })}
                    className="w-24 rounded border border-slate-300 px-2 py-1"
                    placeholder="$200"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.purchase_city}
                    onChange={(e) => setRow(i, { purchase_city: e.target.value })}
                    className="w-36 rounded border border-slate-300 px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.purchase_state}
                    onChange={(e) =>
                      setRow(i, { purchase_state: e.target.value })
                    }
                    className="w-20 rounded border border-slate-300 px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    value={r.purchase_date}
                    onChange={(e) =>
                      setRow(i, { purchase_date: e.target.value })
                    }
                    className="rounded border border-slate-300 px-2 py-1"
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="rounded border border-slate-300
