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

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setMsg(null);

    if (!captchaToken) {
      setMsg({ type: 'error', text: 'Please complete the CAPTCHA.' });
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form, recaptchaToken: captchaToken };
      const { data } = await axios.post('/api/report', payload);

      setMsg({ type: 'success', text: 'Report submitted.' });
      setForm({
        retailer: '', cardNumber: '', amount: '',
        recipient_name: '', recipient_email: '', reporter_email: '', notes: ''
      });
      setCaptchaToken(null);
      // reset the visible checkbox
      recaptchaRef.current?.reset();
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.error || err.message });
      // force user to solve again if server rejected it
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <h3 style={{ margin: '0 0 12px', fontWeight: 700 }}>Report a Gift Card</h3>

      <label>Retailer*</label>
      <input required value={form.retailer} onChange={handle('retailer')}
             placeholder="e.g., Amazon, Walmart" style={inputStyle} />

      <label>Gift card number*</label>
      <input required value={form.cardNumber} onChange={handle('cardNumber')}
             placeholder="Numbers only" style={inputStyle} />

      <label>Amount</label>
      <input value={form.amount} onChange={handle('amount')} placeholder="e.g., 100.00" style={inputStyle} />

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Recipient name</label>
          <input value={form.recipient_name} onChange={handle('recipient_name')} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label>Recipient email</label>
          <input value={form.recipient_email} onChange={handle('recipient_email')} style={inputStyle} />
        </div>
      </div>

      <label>Your email (optional)</label>
      <input value={form.reporter_email} onChange={handle('reporter_email')} style={inputStyle} />

      <label>Notes</label>
      <textarea value={form.notes} onChange={handle('notes')} rows={4} style={textareaStyle}
                placeholder="What happened? Where did you share it? Any context that helps." />

      {/* Visible reCAPTCHA checkbox */}
      <div style={{ margin: '8px 0 12px' }}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey ?? ''}
          onChange={(token) => setCaptchaToken(token)}
          onExpired={() => setCaptchaToken(null)}
          onErrored={() => setCaptchaToken(null)}
          theme="light"  // or "dark"
        />
      </div>

      <button disabled={loading || !captchaToken} type="submit" style={buttonStyle}>
        {loading ? 'Submitting…' : 'Submit report'}
      </button>

      {msg && (
        <div style={{ marginTop: 8, color: msg.type === 'error' ? '#b00020' : '#0b7a0b' }}>
          {msg.text}
        </div>
      )}

      <p style={{ fontSize: 12, color: '#666', marginTop: 12 }}>
        We will only show the last 4 digits publicly. Full numbers are encrypted and accessible only to verified parties.
      </p>
    </form>
  );
}

const inputStyle = {
  width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', margin: '6px 0 12px'
};
const textareaStyle = { ...inputStyle, resize: 'vertical' };
const buttonStyle = {
  padding: '10px 14px', borderRadius: 6, border: '1px solid #333', background: '#111', color: '#fff', cursor: 'pointer'
};
