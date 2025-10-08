'use client';

import { useState } from 'react';

function normalizeAmount(input) {
  if (input == null || input === '') return null;
  const cleaned = String(input).replace(/[^\d.]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function parseLine(line) {
  // Accept lines like:
  //   603488******1234, $100
  //   Target, 603488******1234, $100
  //   Google Play 489514******9988 $50
  //   Target 6034..., 100
  const raw = line.trim();
  if (!raw) return null;

  // Card-like number
  const numMatch = raw.match(/(\d[\d*\-\s]{6,}\d)/);
  if (!numMatch) return null;

  const cardNumRaw = numMatch[1].replace(/\s|-/g, '');
  const last4 = cardNumRaw.replace(/[^\d]/g, '').slice(-4);

  // Amount
  let amount = null;
  const amtMatch = raw.match(/\$?\s*([\d,]+(?:\.\d{1,2})?)\s*$/);
  if (amtMatch) amount = normalizeAmount(amtMatch[1]);

  // Brand before number
  const brandBefore = raw.slice(0, numMatch.index).trim().replace(/[,]+$/, '').trim();
  const brand = brandBefore && /[a-z]/i.test(brandBefore) ? brandBefore : null;

  return { cardNumber: cardNumRaw, card_last4: last4, amount, gift_card_brand: brand };
}

export default function QuickBatch() {
  // Sticky helpers
  const [stickyBrand, setStickyBrand] = useState('');
  const [stickyRetailer, setStickyRetailer] = useState('');
  const [stickyCity, setStickyCity] = useState('');
  const [stickyState, setStickyState] = useState('');
  const [stickyDate, setStickyDate] = useState('');
  const [useDateForAll, setUseDateForAll] = useState(true);

  // NEW: fraudster sticky
  const [fraud_phone, setFraudPhone] = useState('');
  const [fraud_email, setFraudEmail] = useState('');
  const [fraud_social, setFraudSocial] = useState('');

  // Paste
  const [text, setText] = useState('');

  // Parsed rows
  const [rows, setRows] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const addRowsFromText = () => {
    const next = [];
    text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .forEach((line) => {
        const parsed = parseLine(line);
        if (parsed) {
          next.push({
            id: crypto.randomUUID(),
            gift_card_brand: parsed.gift_card_brand || stickyBrand || '',
            retailer: stickyRetailer || '',
            purchase_city: stickyCity || '',
            purchase_state: stickyState || '',
            purchase_date: useDateForAll ? stickyDate || '' : '',
            cardNumber: parsed.cardNumber,
            card_last4: parsed.card_last4,
            amount: parsed.amount ?? '',
            notes: '',
          });
        }
      });

    if (next.length) {
      setRows((prev) => [...next, ...prev]);
      setText('');
    }
  };

  const addBlankRow = () => {
    setRows((prev) => [
      {
        id: crypto.randomUUID(),
        gift_card_brand: stickyBrand || '',
        retailer: stickyRetailer || '',
        purchase_city: stickyCity || '',
        purchase_state: stickyState || '',
        purchase_date: stickyDate || '',
        cardNumber: '',
        card_last4: '',
        amount: '',
        notes: '',
      },
      ...prev,
    ]);
  };

  const updateRow = (id, patch) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRow = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const submitAll = async () => {
    if (!rows.length || saving) return;
    setSaving(true);
    setMsg(null);

    try {
      for (const r of rows) {
        const payload = {
          gift_card_brand: r.gift_card_brand || stickyBrand || null,
          retailer: r.retailer || stickyRetailer || null,
          cardNumber: r.cardNumber,
          amount: normalizeAmount(r.amount),
          purchase_city: r.purchase_city || stickyCity || null,
          purchase_state: r.purchase_state || stickyState || null,
          purchase_date: r.purchase_date || (useDateForAll ? stickyDate || null : null),
          notes: r.notes || null,
          // NEW: fraudster sticky (applies to all rows in this batch)
          fraud_phone: fraud_phone || null,
          fraud_email: fraud_email || null,
          fraud_social: fraud_social || null,
        };

        const res = await fetch('/api/report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || 'Failed to submit some rows');
        }
      }

      setRows([]);
      setMsg('All rows submitted. Thank you!');
    } catch (err) {
      console.error(err);
      setMsg(err.message || 'There was a problem submitting some rows.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Batch mode (Paste many)</h3>

      {/* Sticky helpers (top row) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <input
          value={stickyBrand}
          onChange={(e) => setStickyBrand(e.target.value)}
          className="col-span-12 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-3"
          placeholder="Gift card brand (sticky) — e.g., Target, Google Play"
          aria-label="Gift card brand sticky"
        />
        <input
          value={stickyRetailer}
          onChange={(e) => setStickyRetailer(e.target.value)}
          className="col-span-12 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-3"
          placeholder="Retailer (where you bought the card)"
          aria-label="Retailer sticky"
        />
        <input
          value={stickyCity}
          onChange={(e) => setStickyCity(e.target.value)}
          className="col-span-6 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          placeholder="Purchase city"
          aria-label="Purchase city sticky"
        />
        <input
          value={stickyState}
          onChange={(e) => setStickyState(e.target.value)}
          className="col-span-6 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-2"
          placeholder="Purchase state"
          aria-label="Purchase state sticky"
        />
        <div className="col-span-12 flex items-center gap-2 md:col-span-2">
          <input
            value={stickyDate}
            onChange={(e) => setStickyDate(e.target.value)}
            type="date"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            aria-label="Purchase date sticky"
          />
          <label className="flex items-center gap-2 whitespace-nowrap text-xs text-slate-600">
            <input
              type="checkbox"
              checked={useDateForAll}
              onChange={(e) => setUseDateForAll(e.target.checked)}
            />
            Use this date for all rows
          </label>
        </div>
      </div>

      {/* Fraudster sticky row */}
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
        <input
          value={fraud_phone}
          onChange={(e) => setFraudPhone(e.target.value)}
          className="col-span-12 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-3"
          placeholder="Fraudster's phone (applies to all rows)"
          aria-label="Fraudster phone"
        />
        <input
          value={fraud_email}
          onChange={(e) => setFraudEmail(e.target.value)}
          className="col-span-12 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-4"
          placeholder="Fraudster's email (applies to all rows)"
          aria-label="Fraudster email"
        />
        <input
          value={fraud_social}
          onChange={(e) => setFraudSocial(e.target.value)}
          className="col-span-12 rounded border border-slate-300 px-3 py-2 text-sm md:col-span-5"
          placeholder="Fraudster’s social profile link(s) (applies to all rows)"
          aria-label="Fraudster social"
        />
      </div>

      {/* Paste box + buttons */}
      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="col-span-12 min-h-[140px] rounded border border-slate-300 px-3 py-2 text-sm font-mono"
          placeholder={`Paste your list. One card per line, like:
603488******1234, $100
489514******9988 $50
Target, 603488******1234, $100

Tip: Write the money with a $ sign. You can also include the brand at the start.`}
          aria-label="Paste many"
        />
        <div className="col-span-12 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={addRowsFromText}
            className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black/85"
          >
            Add these cards
          </button>
          <button
            type="button"
            onClick={addBlankRow}
            className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Add blank row
          </button>
        </div>
      </div>

      {/* Rows table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full
