// app/xml/page.jsx
import XmlDownloader from '../components/XmlDownloader';

export const metadata = {
  title: 'XML Feed | Report Gift Card Scams',
  description: 'Authenticated XML export for law enforcement and verified partners.',
};

export default function XmlFeedPage() {
  return (
    <div className="mx-auto max-w-4xl py-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">XML Feed Access</h1>
      <p className="mb-6 text-slate-600">
        This endpoint provides an authenticated XML export for law enforcement, gift card issuers and verified resellers.
        Access requires an <code className="rounded bg-slate-100 px-1">x-api-key</code>.
      </p>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-xl font-semibold text-slate-900">Endpoint</h2>
        <pre className="overflow-auto rounded bg-slate-50 p-3 text-sm text-slate-800">
{`GET /api/xml
Headers:
  x-api-key: YOUR_XML_API_KEY

Query Params (optional):
  limit        (default 500, max 2000)
  page         (default 1)
  page_size    (default = limit, max 2000)
  since        ISO date, e.g. 2024-01-01
  retailer     exact match filter
  status       e.g. approved

Example:
  curl -H "x-api-key: YOUR_XML_API_KEY" \\
       "https://<your-domain>/api/xml?limit=500&since=2024-01-01"`}
        </pre>
      </div>

      <XmlDownloader />
    </div>
  );
}
