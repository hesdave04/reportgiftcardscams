'use client';

import { useMemo, useState } from 'react';

export default function XmlSidebar() {
  const [apiKey, setApiKey] = useState('');
  const [retailer, setRetailer] = useState('');
  const [since, setSince] = useState('');

  const hasWindow = typeof window !== 'undefined';

  const urlWithQueryParam = useMemo(() => {
    const params = new URLSearchParams();
    if (apiKey) params.set('api_key', apiKey); // quick test path (less secure)
    if (retailer) params.set('retailer', retailer);
    if (since) params.set('since', since);
    const qs = params.toString();
    return `/api/xml${qs ? `?${qs}` : ''}`;
  }, [apiKey, retailer, since]);

  const curlCommand = useMemo(() => {
    const params = new URLSearchParams();
    if (retailer) params.set('retailer', retailer);
    if (since) params.set('since', since);
    const qs = params.toString();
    const origin = hasWindow ? `${window.location.protocol}//${window.location.host}` : 'https://YOUR-DOMAIN';
    const url = `${origin}/api/xml${qs ? `?${qs}` : ''}`;
    return `curl -H "x-api-key: ${apiKey || 'YOUR_XML_API_KEY'}" "${url}" -o giftcard_reports.xml`;
  }, [apiKey, retailer, since, hasWindow]);

  async function copyCurl() {
    try {
      await navigator.clipboard.writeText(curlCommand);
      alert('cURL command copied to clipboard.');
    } catch {
      alert('Could not copy. Select the command and copy manually.');
    }
  }

  function openInNewTab() {
    window.open(urlWithQueryParam, '_blank', 'noopener,noreferrer');
  }

  return (
    <aside id="xml" className="card p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-800">XML Export</h3>
      <p className="helper">
        Export reports as XML for law enforcement and retailers.
      </p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="form-label">API Key</label>
          <input
            className="form-input"
            placeholder="YOUR_XML_API_KEY"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="helper mt-1">Use header <code className="font-mono">x-api-key</code> in production.</p>
        </div>

        <div>
          <label className="form-label">Retailer (optional)</label>
          <input
            className="form-input"
            placeholder="e.g., Amazon"
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Since date (optional)</label>
          <input
            type="date"
            className="form-input"
            value={since}
            onChange={(e) => setSince(e.target.value)}
          />
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={openInNewTab}
            className="btn-primary"
            disabled={!apiKey}
            title="Opens /api/xml using an api_key query param (OK for quick tests)"
          >
            Open XML (query param)
          </button>

          <button
            type="button"
            onClick={copyCurl}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            disabled={!apiKey}
            title='Copies a cURL using header: -H "x-api-key: ..."' 
          >
            Copy cURL (with header)
          </button>
        </div>

        <div className="mt-3">
          <p className="helper">
            <strong>Tip:</strong> For security, prefer the header method in production. Query param is provided
            here only for quick testing.
          </p>
        </div>
      </div>
    </aside>
  );
}
