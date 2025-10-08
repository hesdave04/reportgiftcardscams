'use client';

import { useState } from 'react';
import { parseMany } from '@/utils/parseMany';

export default function QuickBatch() {
  const [batch, setBatch] = useState([]);
  const [sticky, setSticky] = useState({
    retailer: '',
    purchase_city: '',
    purchase_state: '',
    purchase_date: ''
  });
  const [pasteText, setPasteText] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function addEmptyRow() {
    setBatch((b) => [
      ...b,
      {
        retailer: sticky.retailer,
        cardNumber: '',
        amount: '',
        purchase_city: sticky.purchase_city,
        purchase_state: sticky.purchase_state,
        purchase_date: sticky.purchase_date
      }
    ]);
  }

  function applyPaste() {
    const rows = parseMany(pasteText);
    const mapped = rows.map((r) => ({
      retailer: r.brand || sticky.retailer || '',
      cardNumber: r.number || '',
      amount: r.amount ?? '',
      purchase_city: sticky.purchase_city || '',
      purchase_state: sticky.purchase_state || '',
      purchase_date: sticky.purchase_date || '',
      _error: r._error || null
    }));
    setBatch((b) => [...b, ...mapped]);
    setPasteText('');
  }

  function applyStickyDateToAll() {
    if (!sticky.purchase_date) return;
    setBatch((b) => b.map((r) => ({ ...r, purchase_date: sticky.purchase_date })));
  }

  async function submitAll() {
    if (!batch.length) return;
    setSaving(true);
    setMsg(null);

    try {
      const res = await fetch('/api/report/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: batch.map((r) => ({
            retailer: r.retailer || null,
            cardNumber: r.cardNumber,
            amount: r.amount,
            purchase_city: r.purchase_city || null,
            purchase_state: r.purchase_state || null,
            purchase_date: r.purchase_date || null,
            notes: r.notes || null
          }))
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Bulk submit failed');

      setMsg({ ok: true, text: `Submitted ${json.inserted} item(s). Duplicates: ${json.duplicates || 0}` });
      setBatch([]);
    } catch (e) {
      setMsg({ ok: false, text: e.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Batch mode (Paste many)</h3>
        {msg && (
          <span className={`text-sm ${msg.ok ? 'text-emerald-700' : 'text-red-600'}`}>
            {msg.text}
          </span>
        )}
      </div>

      {/* Sticky fields apply to all NEW rows */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4">
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Retailer (sticky)"
          value={sticky.retailer}
          onChange={(e) => setSticky((s) => ({ ...s, retailer: e.target.value }))}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Purchase city (sticky)"
          value={sticky.purchase_city}
          onChange={(e) => setSticky((s) => ({ ...s, purchase_city: e.target.value }))}
        />
        <input
          className="rounded border border-slate-300 p-2"
          placeholder="Purchase state (sticky)"
          value={sticky.purchase_state}
          onChange={(e) => setSticky((s) => ({ ...s, purchase_state: e.target.value }))}
        />
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded border border-slate-300 p-2"
            type="date"
            value={sticky.purchase_date}
            onChange={(e) => setSticky((s) => ({ ...s, purchase_date: e.target.value }))}
          />
          <button
            type="button"
            onClick={applyStickyDateToAll}
            className="whitespace-nowrap rounded border border-slate-300 px-3 py-2 text-xs hover:bg-slate-50"
            title="Set this date for all rows below"
          >
            Use this date for all rows
          </button>
        </div>
      </div>

      {/* Paste-many */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <textarea
            className="h-28 w-full rounded border border-slate-300 p-2"
            placeholder={`Paste your list. One card per line, like:
603488******1234, $100
489514******9988 $50
Target, 603488******1234, $100`}
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
          />
          <p className="mt-2 text-xs text-slate-500">
            Tip: Write the money with a <strong>$</strong> sign. You can also include the brand at the start
            (for example: <em>Target, 6034..., $100</em>).
          </p>
          <p className="text-xs text-slate-500">
            After you add the cards, you can change the date for any row in the table below.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <button
            onClick={applyPaste}
            className="rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
            type="button"
          >
            Add these cards
          </button>
          <button
            onClick={addEmptyRow}
            className="rounded border border-slate-300 px-4 py-2 hover:bg-slate-50"
            type="button"
          >
            Add blank row
          </button>
        </div>
      </div>

      {/* Table */}
      {batch.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-2 text-left">Retailer</th>
                <th className="p-2 text-left">Card #</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">City</th>
                <th className="p-2 text-left">State</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {batch.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">
                    <input
                      className="w-40 rounded border border-slate-300 p-1"
                      value={row.retailer}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) => (idx === i ? { ...r, retailer: e.target.value } : r))
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="w-52 rounded border border-slate-300 p-1"
                      inputMode="numeric"
                      value={row.cardNumber}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) => (idx === i ? { ...r, cardNumber: e.target.value } : r))
                        )
                      }
                    />
                    {row._error && <div className="text-xs text-red-600">{row._error}</div>}
                  </td>
                  <td className="p-2">
                    <input
                      className="w-24 rounded border border-slate-300 p-1"
                      inputMode="decimal"
                      placeholder="$"
                      value={row.amount}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) => (idx === i ? { ...r, amount: e.target.value } : r))
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="w-32 rounded border border-slate-300 p-1"
                      value={row.purchase_city || ''}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) =>
                            idx === i ? { ...r, purchase_city: e.target.value } : r
                          )
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="w-24 rounded border border-slate-300 p-1"
                      value={row.purchase_state || ''}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) =>
                            idx === i ? { ...r, purchase_state: e.target.value } : r
                          )
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="w-36 rounded border border-slate-300 p-1"
                      type="date"
                      value={row.purchase_date || ''}
                      onChange={(e) =>
                        setBatch((b) =>
                          b.map((r, idx) =>
                            idx === i ? { ...r, purchase_date: e.target.value } : r
                          )
                        )
                      }
                    />
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      type="button"
                      onClick={() => setBatch((b) => b.filter((_, idx) => idx !== i))}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={submitAll}
          disabled={!batch.length || saving}
          className="rounded bg-emerald-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
          type="button"
        >
          {saving ? 'Submitting…' : `Submit all (${batch.length})`}
        </button>
        <span className="text-xs text-slate-500">
          Tip: keep retailer/city/state/date filled above — they auto-apply to new rows.
        </span>
      </div>
    </section>
  );
}
