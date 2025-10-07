'use client';

import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

export default function ReportForm() {
  const [form, setForm] = useState({
    retailer: '',
    cardNumber: '',
    amount: '',
    recipient_name: '',
    recipient_email: '',
    reporter_email: '',
    notes: '',
    // NEW:
    purchase_retailer: '',
    purchase_city: '',
    purchase_state: '',
    purchase_date: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  function setField(k, v) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setOkMsg('');
    setErrMsg('');

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, captcha })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setOkMsg('Report submitted. Thank you.');
      setForm({
        retailer: '',
        cardNumber: '',
        amount: '',
        recipient_name: '',
        recipient_email: '',
        reporter_email: '',
        notes: '',
        purchase_retailer: '',
        purchase_city: '',
        purchase_state: '',
        purchase_date: ''
      });
      if (RECAPTCHA_SITE_KEY) setCaptcha('');
    } catch (err) {
      setErrMsg(String(err.message || err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} id="report-form" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-900">Report a Gift Card</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Gift card details */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Gift Card Retailer (issuer)</label>
          <input
            required
            value={form.retailer}
            onChange={(e) => setField('retailer', e.target.value)}
            placeholder="Target, Google Play, Apple, etc."
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Card Number</label>
          <input
            required
            inputMode="numeric"
            value={form.cardNumber}
            onChange={(e) => setField('cardNumber', e.target.value)}
            placeholder="#### #### #### ####"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Amount (USD)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={form.amount}
            onChange={(e) => setField('amount', e.target.value)}
            placeholder="100"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        {/* NEW: purchase info */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Purchased At (retailer)</label>
          <input
            value={form.purchase_retailer}
            onChange={(e) => setField('purchase_retailer', e.target.value)}
            placeholder="CVS, Walgreens, Staples, Walmart…"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Purchase City</label>
          <input
            value={form.purchase_city}
            onChange={(e) => setField('purchase_city', e.target.value)}
            placeholder="City"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">State (2-letter)</label>
          <input
            maxLength={2}
            value={form.purchase_state}
            onChange={(e) => setField('purchase_state', e.target.value.toUpperCase())}
            placeholder="CA"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm uppercase focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Purchase Date</label>
          <input
            type="date"
            value={form.purchase_date}
            onChange={(e) => setField('purchase_date', e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        {/* Recipient / notes */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Recipient Name (optional)</label>
          <input
            value={form.recipient_name}
            onChange={(e) => setField('recipient_name', e.target.value)}
            placeholder="Person you gave the number to"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Recipient Email (optional)</label>
          <input
            type="email"
            value={form.recipient_email}
            onChange={(e) => setField('recipient_email', e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Your Email (optional)</label>
          <input
            type="email"
            value={form.reporter_email}
            onChange={(e) => setField('reporter_email', e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Notes (optional)</label>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => setField('notes', e.target.value)}
            placeholder="Any additional context (keep factual; avoid sensitive personal data)."
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* reCAPTCHA (visible) */}
      {RECAPTCHA_SITE_KEY && (
        <div className="mt-4">
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptcha} />
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center rounded-lg bg-[#0B2340] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit Report'}
        </button>
        {okMsg && <span className="text-sm text-green-700">{okMsg}</span>}
        {errMsg && <span className="text-sm text-red-600">{errMsg}</span>}
      </div>
    </form>
  );
}
