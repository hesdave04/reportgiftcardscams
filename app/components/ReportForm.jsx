'use client';

import { useState } from 'react';

function normalizeAmount(input) {
  if (input == null || input === '') return null;
  const cleaned = String(input).replace(/[^\d.]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export default function ReportForm() {
  const [gift_card_brand, setBrand] = useState('');
  const [retailer, setRetailer] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');

  const [purchase_city, setCity] = useState('');
  const [purchase_state, setStateCode] = useState('');
  const [purchase_date, setDate] = useState('');

  const [recipient_email, setRecipientEmail] = useState('');
  const [notes, setNotes] = useState('');

  // NEW fraudster fields
  const [fraud_phone, setFraudPhone] = useState('');
  const [fraud_email, setFraudEmail] = useState('');
  const [fraud_social, setFraudSocial] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMsg(null);

    try {
      const payload = {
        gift_card_brand: gift_card_brand || null,
        retailer: retailer || null,
        cardNumber: cardNumber,
        amount: normalizeAmount(amount),
        purchase_city: purchase_city || null,
        purchase_state: purchase_state || null,
        purchase_date: purchase_date || null,
        recipient_email: recipient_email || null,
        notes: notes || null,
        // NEW:
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
        throw new Error(j.error || 'Failed to submit');
      }

      setMsg('Report submitted. Thank you!');
      // clear most fields, keep brand/retailer to ease repeated entries
      setCardNumber('');
      setAmount('');
      setCity('');
      setStateCode('');
      setDate('');
      setRecipientEmail('');
      setNotes('');
      setFraudPhone('');
      setFraudEmail('');
      setFraudSocial('');
    } catch (err) {
      console.error(err);
      setMsg(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">Submit a Gift Card</h2>
      <p className="mb-4 text-sm text-slate-600">
        Only the last 4 digits are displayed publicly. Full numbers are protected and used for verification.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Gift card brand */}
        <input
          value={gift_card_brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Gift Card Brand (e.g., Target, Google Play)"
          aria-label="Gift card brand"
        />

        {/* Retailer */}
        <input
          value={retailer}
          onChange={(e) => setRetailer(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Retailer (where you bought the card)"
          aria-label="Retailer where purchased"
        />

        {/* Card number */}
        <input
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="col-span-1 sm:col-span-2 rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Gift Card Number (digits only)"
          aria-label="Gift Card Number"
        />

        {/* City/state/date */}
        <input
          value={purchase_city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Purchase City (optional)"
          aria-label="Purchase city"
        />
        <input
          value={purchase_state}
          onChange={(e) => setStateCode(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Purchase State (optional)"
          aria-label="Purchase state"
        />

        <input
          value={purchase_date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Purchase Date (optional)"
          aria-label="Purchase date"
        />
        {/* Amount */}
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Amount (e.g., $100)"
          aria-label="Amount"
        />

        {/* Fraudster fields */}
        <input
          value={fraud_phone}
          onChange={(e) => setFraudPhone(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Fraudster's phone (optional)"
          aria-label="Fraudster phone"
        />
        <input
          value={fraud_email}
          onChange={(e) => setFraudEmail(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Fraudster's email (optional)"
          aria-label="Fraudster email"
        />
        <input
          value={fraud_social}
          onChange={(e) => setFraudSocial(e.target.value)}
          className="col-span-1 sm:col-span-2 rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Fraudster's social profile link(s) (optional)"
          aria-label="Fraudster social"
        />

        {/* Recipient email */}
        <input
          value={recipient_email}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="col-span-1 sm:col-span-2 rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Recipient Email (optional)"
          aria-label="Recipient email"
        />

        {/* Notes */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="col-span-1 sm:col-span-2 min-h-[96px] rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Notes (optional)"
          aria-label="Notes"
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          disabled={submitting}
          className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          type="submit"
        >
          {submitting ? 'Submitting…' : 'Submit Report'}
        </button>
        {msg && <span className="text-sm text-slate-700">{msg}</span>}
      </div>
    </form>
  );
}
