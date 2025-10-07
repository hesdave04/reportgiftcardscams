'use client';

import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReportForm() {
  const [form, setForm] = useState({
    retailer: '',
    cardNumber: '',
    amount: '',
    recipient_name: '',
    recipient_email: '',
    reporter_email: '',
    notes: '',
  });

  // Prefer build-time NEXT_PUBLIC_ value if present; otherwise fetch at runtime
  const [siteKey, setSiteKey] = useState(
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  );
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const recaptchaRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    async function loadSiteKey() {
      if (siteKey) return;
      try {
        const res = await fetch('/api/config/recaptcha', { cache: 'no-store' });
        const json = await res.json();
        if (!ignore && json?.siteKey) setSiteKey(json.siteKey);
      } catch {
        // ignore; UI below will hint if siteKey is still missing
      }
    }
    loadSiteKey();
    return () => { ignore = true; };
  }, [siteKey]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!captchaToken) {
      setMsg({ type: 'error', text: 'Please complete the CAPTCHA.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ ...form, captcha: captchaToken }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Submission failed');

      setMsg({ type: 'success', text: 'Report submitted. Thank you!' });
      setForm({
        retailer: '',
        cardNumber: '',
        amount: '',
        recipient_name: '',
        recipient_email: '',
        reporter_email: '',
        notes: '',
      });

      if (recaptchaRef.current) recaptchaRef.current.reset();
      setCaptchaToken(null);
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {msg && (
        <div
          className={`rounded-lg px-3 py-2 text-sm ${
            msg.type === 'success'
              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
              : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Retailer</label>
          <input
            name="retailer"
            value={form.retailer}
            onChange={onChange}
            required
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
            placeholder="e.g., Amazon"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Amount (USD)</label>
          <input
            name="amount"
            value={form.amount}
            onChange={onChange}
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
            placeholder="e.g., 200"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Full gift card number</label>
        <input
          name="cardNumber"
          value={form.cardNumber}
          onChange={onChange}
          required
          inputMode="numeric"
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          placeholder="Digits only"
        />
        <p className="mt-1 text-xs text-slate-500">
          Public stream only shows the last 4 digits. Full number is encrypted.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Recipient name</label>
          <input
            name="recipient_name"
            value={form.recipient_name}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
            placeholder="Person / handle"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Recipient email</label>
          <input
            name="recipient_email"
            type="email"
            value={form.recipient_email}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
            placeholder="name@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Your email (for follow-up)</label>
          <input
            name="reporter_email"
            type="email"
            value={form.reporter_email}
            onChange={onChange}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Notes / context</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/80"
          placeholder="Any additional details you want to share…"
        />
      </div>

      {/* Visible reCAPTCHA v2 checkbox */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        {siteKey ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
            hl="en"
          />
        ) : (
          <div className="text-xs text-amber-700">
            Loading CAPTCHA… (If this persists, ensure your server env var
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 font-mono">RECAPTCHA_SITE_KEY</code>
            or
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 font-mono">NEXT_PUBLI_RECAPTCHA_SITE_KEY</code>
            is set.)
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting || !captchaToken || !siteKey}
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit report'}
      </button>
    </form>
  );
}
