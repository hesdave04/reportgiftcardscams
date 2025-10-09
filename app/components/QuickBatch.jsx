"use client";

import { useMemo, useState } from "react";

const SAMPLE = `Retailer, Brand, Card Number, $Amount
CVS, Google Play, 1234567890123456, $200
Walmart, Apple, 9876543210987654, $100`;

export default function QuickBatch() {
  const [raw, setRaw] = useState(SAMPLE);
  const [rows, setRows] = useState([]);
  const [parsingErr, setParsingErr] = useState("");

  // Batch helpers
  const [batchDate, setBatchDate] = useState("");
  const [applyDateToAll, setApplyDateToAll] = useState(false);

  const [batchFraudPhone, setBatchFraudPhone] = useState("");
  const [batchFraudEmail, setBatchFraudEmail] = useState("");
  const [batchFraudSocial, setBatchFraudSocial] = useState("");
  const [applyFraudToAll, setApplyFraudToAll] = useState(false);

  const [saving, setSaving] = useState(false);
  const canSave = rows.length > 0 && !saving;

  function normalizeAmount(a) {
    if (!a) return null;
    const clean = String(a).replace(/[^0-9.]/g, "");
    return clean ? Number(clean) : null;
  }

  function parse() {
    setParsingErr("");
    const lines = raw
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setRows([]);
      return;
    }

    // Try to detect and drop header row if it contains non-numeric in 4th col or "amount"
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(/,|\t/).map((p) => p.trim());
      if (parts.length < 3) {
        // allow 3 or 4 columns: Retailer, Brand, Card, [$Amount]
        if (i === 0) continue; // skip weird header
        continue;
      }
      if (i === 0 && /amount/i.test(parts[3] || "")) {
        // header detected; skip and continue
        continue;
      }

      const retailer = parts[0] || "";
      const brand = parts[1] || "";
      const card = (parts[2] || "").replace(/\s|-/g, "");
      const amount = normalizeAmount(parts[3]);

      if (!card || !/^\d{8,19}$/.test(card)) {
        setParsingErr(
          `Line ${i + 1}: card number looks invalid (need 8–19 digits).`
        );
        return;
      }

      out.push({
        retailer,
        gift_card_brand: brand,
        card_number_plain: card,
        amount,
        purchase_date: "",
        fraud_phone: "",
        fraud_email: "",
        fraud_social: "",
      });
    }

    setRows(out);
  }

  function applyDateAll() {
    if (!batchDate) return;
    setRows((curr) => curr.map((r) => ({ ...r, purchase_date: batchDate })));
  }

  function applyFraudAll() {
    setRows((curr) =>
      curr.map((r) => ({
        ...r,
        fraud_phone: batchFraudPhone || r.fraud_phone,
        fraud_email: batchFraudEmail || r.fraud_email,
        fraud_social: batchFraudSocial || r.fraud_social,
      }))
    );
  }

  function updateRow(idx, patch) {
    setRows((curr) => {
      const copy = curr.slice();
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  }

  const totalAmount = useMemo(
    () =>
      rows.reduce(
        (acc, r) => acc + (r.amount != null ? Number(r.amount) : 0),
        0
      ),
    [rows]
  );

  async function submitAll() {
    if (!rows.length) return;
    setSaving(true);
    try {
      const results = [];
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        const payload = {
          retailer: r.retailer || null,
          gift_card_brand: r.gift_card_brand || null,
          card_number_plain: r.card_number_plain,
          amount: r.amount != null ? Number(r.amount) : null,
          purchase_date: r.purchase_date || null,
          fraud_phone: r.fraud_phone || null,
          fraud_email: r.fraud_email || null,
          fraud_social: r.fraud_social || null,
          notes: null,
        };
        const res = await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const txt = await res.text();
          results.push({ ok: false, idx: i, err: `HTTP ${res.status}: ${txt}` });
        } else {
          results.push({ ok: true, idx: i });
        }
      }

      const failed = results.filter((r) => !r.ok);
      if (failed.length) {
        alert(
          `Submitted with ${failed.length} error(s).\n` +
            failed
              .slice(0, 5)
              .map((f) => `Row ${f.idx + 1}: ${f.err}`)
              .join("\n")
        );
      } else {
        alert("All rows submitted successfully.");
      }
    } catch (e) {
      alert(`Unexpected error: ${String(e)}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Quick Batch Upload</h2>
      <p className="mt-1 text-sm text-slate-600">
        Paste one card per line in this format:&nbsp;
        <span className="font-mono">
          Retailer, Brand, CardNumber, $Amount
        </span>
        . Amounts like <span className="font-mono">$200</span> are accepted.
      </p>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Paste lines
          </label>
          <textarea
            className="h-40 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
          />
          {parsingErr && (
            <div className="mt-2 rounded border border-amber-300 bg-amber-50 p-2 text-sm text-amber-800">
              {parsingErr}
            </div>
          )}
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              onClick={parse}
            >
              Parse
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => {
                setRaw(SAMPLE);
                setRows([]);
                setParsingErr("");
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600">Parsed rows</div>
                <div className="text-2xl font-semibold text-slate-900">
                  {rows.length}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-600">Total amount</div>
                <div className="text-2xl font-semibold text-slate-900">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
            </div>

            {/* batch date */}
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Purchase Date (optional)
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={batchDate}
                  onChange={(e) => setBatchDate(e.target.value)}
                />
              </div>
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={applyDateToAll}
                    onChange={(e) => setApplyDateToAll(e.target.checked)}
                  />
                  Use this date for all rows
                </label>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={applyDateAll}
                  disabled={!batchDate}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* batch fraud info */}
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Fraudster Phone (apply to all, optional)
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={batchFraudPhone}
                  onChange={(e) => setBatchFraudPhone(e.target.value)}
                  placeholder="e.g., 903-319-1092"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Fraudster Email (apply to all, optional)
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={batchFraudEmail}
                  onChange={(e) => setBatchFraudEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Fraudster Social (apply to all, optional)
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={batchFraudSocial}
                  onChange={(e) => setBatchFraudSocial(e.target.value)}
                  placeholder="profile links, @handles"
                />
              </div>
              <div className="flex items-end justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={applyFraudToAll}
                    onChange={(e) => setApplyFraudToAll(e.target.checked)}
                  />
                  Use these fraud fields for all rows
                </label>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={applyFraudAll}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={submitAll}
              disabled={!canSave}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? "Submitting…" : "Submit All"}
            </button>
          </div>
        </div>
      </div>

      {/* Rows table */}
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-600">
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Retailer (where bought)</th>
              <th className="px-3 py-2">Gift Card Brand</th>
              <th className="px-3 py-2">Card Number</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Purchase Date</th>
              <th className="px-3 py-2">Fraud Phone</th>
              <th className="px-3 py-2">Fraud Email</th>
              <th className="px-3 py-2">Fraud Social</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">
                  <input
                    className="w-48 rounded border border-slate-300 px-2 py-1"
                    value={r.retailer}
                    onChange={(e) => updateRow(idx, { retailer: e.target.value })}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-48 rounded border border-slate-300 px-2 py-1"
                    value={r.gift_card_brand}
                    onChange={(e) =>
                      updateRow(idx, { gift_card_brand: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-56 rounded border border-slate-300 px-2 py-1 font-mono"
                    value={r.card_number_plain}
                    onChange={(e) =>
                      updateRow(idx, {
                        card_number_plain: e.target.value.replace(/\s|-/g, ""),
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-24 rounded border border-slate-300 px-2 py-1"
                    value={r.amount != null ? `$${Number(r.amount)}` : ""}
                    onChange={(e) =>
                      updateRow(idx, {
                        amount: normalizeAmount(e.target.value),
                      })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    className="w-40 rounded border border-slate-300 px-2 py-1"
                    value={r.purchase_date || ""}
                    onChange={(e) =>
                      updateRow(idx, { purchase_date: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-40 rounded border border-slate-300 px-2 py-1"
                    value={r.fraud_phone || ""}
                    onChange={(e) =>
                      updateRow(idx, { fraud_phone: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="email"
                    className="w-48 rounded border border-slate-300 px-2 py-1"
                    value={r.fraud_email || ""}
                    onChange={(e) =>
                      updateRow(idx, { fraud_email: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    className="w-56 rounded border border-slate-300 px-2 py-1"
                    value={r.fraud_social || ""}
                    onChange={(e) =>
                      updateRow(idx, { fraud_social: e.target.value })
                    }
                  />
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                    onClick={() =>
                      setRows((curr) => curr.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-slate-500" colSpan={10}>
                  No rows parsed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
