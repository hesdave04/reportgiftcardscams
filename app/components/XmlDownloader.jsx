// app/components/XmlDownloader.jsx
'use client';

import { useState } from 'react';

export default function XmlDownloader() {
  const [apiKey, setApiKey] = useState('');
  const [since, setSince] = useState('');
  const [limit, setLimit] = useState('500');
  const [retailer, setRetailer] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  async function handleDownload(e) {
    e.preventDefault();
    setLoading(true);
    setPreview('');

    try {
      const qs = new URLSearchParams();
      if (limit) qs.set('limit', limit);
      if (since) qs.set('since', since);
      if (retailer) qs.set('retailer', retailer);
      if (status) qs.set('status', status);

      const res = await fetch(`/api/xml?${qs.toString()}`, {
        headers: { 'x-api-key': apiKey || '' }
      });

      const text = await res.text();

      if (!res.ok) {
        setPreview(text || `Request failed with status ${res.status}`);
        setLoading(false);
        return;
      }

      setPreview(text.slice(0, 1200) + (text.length > 1200 ? '\n...\n' : ''));

      const blob = new Blob([text], { type: 'application/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `giftcard-reports-${Date.now()}.xml`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setPreview(String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="mb-3 text-xl font-semibold text-slate-900">Try It Here</h2>
      <form onSubmit={handleDownload} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">API Key (x-api-key)</label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="YOUR_XML_API_KEY"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Since (ISO date)</label>
          <input
            type="date"
            value={since}
            onChange={e => setSince(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Limit (max 2000)</label>
          <input
            type="number"
            min="1"
            max="2000"
            value={limit}
            onChange={e => setLimit(e.target.value)}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Retailer (exact)</label>
          <input
            type="text"
            value={retailer}
            onChange={e => setRetailer(e.target.value)}
            placeholder="Amazon"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <input
            type="text"
            value={status}
            onChange={e => setStatus(e.target.value)}
            placeholder="approved"
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-lg bg-[#0B2340] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-60"
          >
            {loading ? 'Fetching…' : 'Download XML'}
          </button>
        </div>
      </form>

      {preview && (
        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">Preview (truncated)</label>
          <pre className="max-h-80 overflow-auto rounded bg-slate-50 p-3 text-xs text-slate-800">{preview}</pre>
        </div>
      )}
    </div>
  );
}
