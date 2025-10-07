'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ReportForm() {
  const [form, setForm] = useState({
    retailer: '',
    cardNumber: '',
    amount: '',
    recipient_name: '',
    recipient_email: '',
    reporter_email: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const recaptchaRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const on = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setMsg(null);

    if (!siteKey) {
      setMsg({ type: 'error', text: 'CAPTCHA not configured. Admin must set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.' });
      return;
    }
    if (!captchaToken) {
      setMsg({ type: 'error', text: 'Please complete the CAPTCHA.' });
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, recaptchaToken: captchaToken };
      await axios.post('/api/report', payload);

      setMsg({ type: 'success', text: 'Report submitted.' });
      setForm({
        retailer: '', cardNumber: '', amount: '',
        recipient_name: '', recipient_email: '', reporter_email: '', notes: ''
      });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.error || err.message });
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Report a Gift Card</h2>
        <p className="helper mt-1">We’ll only show the last 4 digits publicly.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="form-label">Retailer<span className="text-rose-600">*</span></label>
          <input className="form-input" required placeholder="e.g., Amazon, Walmart" value={form.retailer} onChange={on('retailer')} />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label">Gift card number<span className="text-rose-600">*</span></label>
          <input className="form-input" required placeholder="Numbers only" value={form.cardNumber} onChange={on('cardNumber')} inputMode="numeric" />
        </div>

        <div>
          <label className="form-label">Amount</label>
          <input className="form-input" placeholder="e.g., 100.00" value={form.amount} onChange={on('amount')} inputMode="decimal" />
        </div>

        <div>
          <label className="form-label">Recipient name</label>
          <input className="form-input" value={form.recipient_name} onChange={on('recipient_name')} />
        </div>

        <div>
          <label className="form-label">Recipient email</label>
          <input className="form-input" type="email" value={form.recipient_email} onChange={on('recipient_email')} />
        </div>

        <div>
          <label className="form-label">Your email (optional)</label>
          <input className="form-input" type="email" value={form.reporter_email} onChange={on('reporter_email')} />
        </div>

        <div className="sm:col-span-2">
          <label className="form-label">Notes</label>
          <textarea className="form-textarea" value={form.notes} onChange={on('notes')}
            placeholder="What happened? Where did you share it? Any context that helps." />
        </div>
      </div>

      <div className="mt-3">
        {siteKey ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={siteKey}
              onChange={(t) => setCaptchaToken(t)}
              onExpired={() => setCaptchaToken(null)}
              onErrored={() => setCaptchaToken(null)}
              theme="light"
            />
          </div>
        ) : (
          <div className="badge badge-error mt-1">CAPTCHA unavailable — set env var and redeploy</div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button type="submit" disabled={loading || !captchaToken || !siteKey} className="btn-primary">
          {loading ? 'Submitting…' : 'Submit report'}
        </button>

        {msg && (
          <span
            className={`badge ${msg.type === 'error' ? 'badge-error' : 'badge-success'}`}
            title={msg.text}
          >
            {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}
