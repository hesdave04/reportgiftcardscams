'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ReportForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!executeRecaptcha) {
      setMessage({ type: 'error', text: 'reCAPTCHA not ready. Please try again.' });
      return;
    }

    // Ask Google for a v3 token with a named action
    const captchaToken = await executeRecaptcha('report_submit');
    if (!captchaToken) {
      setMessage({ type: 'error', text: 'reCAPTCHA failed. Please try again.' });
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.captchaToken = captchaToken;

    setSubmitting(true);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || 'Submission failed');
      }

      setMessage({ type: 'success', text: 'Report submitted. Thank you!' });
      e.currentTarget.reset();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="report-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Gift Card Brand (e.g., Target, Google Play)</label>
        <input name="retailer" required className="mt-1 w-full rounded border p-2" placeholder="Target, Google Play, etc." />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Gift Card Number</label>
        <input name="cardNumber" required className="mt-1 w-full rounded border p-2" placeholder="Digits only" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Purchase City (optional)</label>
          <input name="purchase_city" className="mt-1 w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Purchase State (optional)</label>
          <input name="purchase_state" className="mt-1 w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Purchase Date (optional)</label>
          <input type="date" name="purchase_date" className="mt-1 w-full rounded border p-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (optional)</label>
        <input name="amount" type="number" step="0.01" min="0" className="mt-1 w-full rounded border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Recipient Email (optional)</label>
        <input name="recipient_email" type="email" className="mt-1 w-full rounded border p-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Notes (optional)</label>
        <textarea name="notes" rows={4} className="mt-1 w-full rounded border p-2" />
      </div>

      {/* v3 has no visible widget */}
      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit Report'}
      </button>

      {message && (
        <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-700'}`}>{message.text}</p>
      )}
    </form>
  );
}
