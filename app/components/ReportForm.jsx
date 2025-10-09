"use client";

import { useState } from "react";
import SearchSelect from "./SearchSelect";
import { BRANDS, RETAILERS } from "@/lib/prefill";

export default function ReportForm() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    // normalize amount
    if (payload.amount) {
      const n = String(payload.amount).replace(/[^0-9.]/g, "");
      payload.amount = n ? Number(n) : null;
    }

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      e.currentTarget.reset();
      setMessage("Report submitted. Thank you for helping others!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="report-form" onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SearchSelect
          items={BRANDS}
          name="gift_card_brand"
          label="Gift Card Brand"
          placeholder="Start typing (e.g., Apple, Google Play)…"
          kind="brands"
          allowFreeText
        />

        <SearchSelect
          items={RETAILERS}
          name="retailer"
          label="Retailer (where you bought the card)"
          placeholder="Start typing (e.g., CVS, Walmart)…"
          kind="retailers"
          allowFreeText
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Gift Card Number
        </label>
        <input
          name="card_number_plain"
          inputMode="numeric"
          placeholder="Digits only"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          We only show the last 4 publicly. Full numbers help investigators and
          card issuers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Purchase City (optional)
          </label>
          <input
            name="purchase_city"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="e.g., University Park"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Purchase State (optional)
          </label>
          <input
            name="purchase_state"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            placeholder="e.g., FL"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Purchase Date (optional)
          </label>
          <input
            name="purchase_date"
            type="date"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Amount (optional)
          </label>
          <input
            name="amount"
            inputMode="decimal"
            placeholder="$200"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Fraudster Phone (optional)
          </label>
          <input
            name="fraud_phone"
            placeholder="e.g., 903-319-1092"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Fraudster Email (optional)
          </label>
          <input
            name="fraud_email"
            type="email"
            placeholder="name@example.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Fraudster Social (optional)
        </label>
        <input
          name="fraud_social"
          placeholder="Links or @handles"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Notes (optional)
        </label>
        <textarea
          name="notes"
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="Any extra details (keep factual; no sensitive personal data)."
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Report"}
        </button>
      </div>

      {message && (
        <div className="text-sm text-slate-700" role="status">
          {message}
        </div>
      )}
    </form>
  );
}
