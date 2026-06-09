"use client";

import { useState } from "react";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/check",
    title: "Quick Check",
    description:
      "Instant hit/miss lookup — is this wallet, email, or phone number in the scam database?",
    auth: true,
    params: [
      { name: "wallet", type: "string", desc: "Crypto wallet address" },
      { name: "email", type: "string", desc: "Email address" },
      { name: "phone", type: "string", desc: "Phone number" },
      { name: "url", type: "string", desc: "Website URL" },
      { name: "name", type: "string", desc: "Suspect name" },
    ],
    example: {
      request: 'curl -H "x-api-key: sc_live_YOUR_KEY" \\\n  "https://scamcomplaints.org/api/v1/check?wallet=0x123..."',
      response: `{
  "query": { "wallet": "0x123..." },
  "found": true,
  "total_matches": 3,
  "matches": [
    {
      "id": "abc-123",
      "scam_type": "Cryptocurrency",
      "source": "3p_chainabuse",
      "reported_at": "2025-03-15T12:00:00Z"
    }
  ],
  "checked_at": "2026-06-08T00:00:00Z",
  "rate_limit": { "remaining_today": 97 }
}`,
    },
  },
  {
    method: "GET",
    path: "/api/v1/search",
    title: "Full Search",
    description:
      "Search across all scam reports with filtering and pagination.",
    auth: true,
    params: [
      { name: "q", type: "string", desc: "Search query (required, min 2 chars)", required: true },
      {
        name: "type",
        type: "string",
        desc: "Field to search: wallet, email, phone, url, name, username, or all (default: all)",
      },
      { name: "page", type: "number", desc: "Page number (default: 1)" },
      { name: "limit", type: "number", desc: "Results per page (1-100, default: 25)" },
    ],
    example: {
      request: 'curl -H "x-api-key: sc_live_YOUR_KEY" \\\n  "https://scamcomplaints.org/api/v1/search?q=example@email.com&type=email"',
      response: `{
  "query": "example@email.com",
  "type": "email",
  "page": 1,
  "limit": 25,
  "total": 2,
  "total_pages": 1,
  "results": [
    {
      "id": "abc-123",
      "scam_type": "Romance / Catfishing",
      "suspect": {
        "name": "John Smith",
        "email": "example@email.com",
        "phone": null,
        "wallet": null,
        "username": null,
        "website": null
      },
      "amount_lost": 15000,
      "platforms": ["Instagram"],
      "source": "user_submitted",
      "reported_at": "2025-06-01T00:00:00Z"
    }
  ]
}`,
    },
  },
  {
    method: "POST",
    path: "/api/v1/report",
    title: "Submit Report",
    description:
      "Contribute a scam report to the database. Help protect others.",
    auth: true,
    params: [
      { name: "story", type: "string", desc: "Description of the scam" },
      { name: "scam_type", type: "string", desc: 'Type of scam (e.g. "Cryptocurrency", "Romance / Catfishing")' },
      { name: "suspect_name", type: "string", desc: "Scammer's name" },
      { name: "suspect_email", type: "string", desc: "Scammer's email" },
      { name: "suspect_phone", type: "string", desc: "Scammer's phone" },
      { name: "suspect_wallet", type: "string", desc: "Scammer's crypto wallet" },
      { name: "suspect_website", type: "string", desc: "Scammer's website" },
      { name: "suspect_username", type: "string", desc: "Scammer's username" },
      { name: "amount", type: "number", desc: "Amount lost in USD" },
      { name: "platforms", type: "array", desc: "Platforms used (e.g. [\"Instagram\", \"WhatsApp\"])" },
      { name: "payment_methods", type: "array", desc: 'Payment methods (e.g. ["Bitcoin", "Wire Transfer"])' },
      { name: "state", type: "string", desc: "US state abbreviation (e.g. \"CA\", \"TX\")" },
    ],
    example: {
      request: `curl -X POST \\
  -H "x-api-key: sc_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "suspect_wallet": "0xabc123...",
    "scam_type": "Cryptocurrency",
    "amount": 5000,
    "story": "Promised 10x returns on DeFi investment..."
  }' \\
  "https://scamcomplaints.org/api/v1/report"`,
      response: `{
  "ok": true,
  "report_id": "def-456",
  "created_at": "2026-06-08T00:00:00Z",
  "source": "api_partner_name",
  "message": "Report submitted successfully."
}`,
    },
  },
  {
    method: "GET",
    path: "/api/v1/stats",
    title: "Database Stats",
    description:
      "Public endpoint — no API key required. Returns aggregate statistics.",
    auth: false,
    params: [],
    example: {
      request: 'curl "https://scamcomplaints.org/api/v1/stats"',
      response: `{
  "total_reports": 253158,
  "case_intakes": 253157,
  "gift_card_reports": 1,
  "data_points": {
    "suspect_names": 19651,
    "email_addresses": 468,
    "crypto_wallets": 116423,
    "websites": 137218
  },
  "total_data_points": 274332,
  "api_version": "1.0"
}`,
    },
  },
];

function MethodBadge({ method }) {
  const colors = {
    GET: "bg-green-100 text-green-800 border-green-300",
    POST: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-bold rounded border ${
        colors[method] || "bg-gray-100 text-gray-800"
      }`}
    >
      {method}
    </span>
  );
}

function EndpointCard({ endpoint }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <MethodBadge method={endpoint.method} />
        <code className="text-sm font-mono text-gray-700 flex-1">
          {endpoint.path}
        </code>
        <span className="text-sm text-gray-500">{endpoint.title}</span>
        <span className="text-gray-400 text-lg">{expanded ? "▼" : "▶"}</span>
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-gray-100 space-y-4">
          <p className="text-gray-600 mt-4">{endpoint.description}</p>

          {endpoint.auth && (
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs font-medium">
                🔑 Requires API Key
              </span>
              <span className="text-gray-400">
                Header: <code className="text-gray-600">x-api-key</code>
              </span>
            </div>
          )}

          {endpoint.params.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Parameters
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Type</th>
                      <th className="py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.params.map((p) => (
                      <tr key={p.name} className="border-b border-gray-50">
                        <td className="py-2 pr-4">
                          <code className="text-red-600 text-xs">
                            {p.name}
                          </code>
                          {p.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-gray-400 text-xs">
                          {p.type}
                        </td>
                        <td className="py-2 text-gray-600">{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Example Request
            </h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
              {endpoint.example.request}
            </pre>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Example Response
            </h4>
            <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg text-xs overflow-x-auto">
              {endpoint.example.response}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ApiDocsClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            ScamComplaints API
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Free access to the world&apos;s largest open scam database.
            <br />
            Check wallets, emails, and phone numbers against{" "}
            <strong>250,000+</strong> scam reports.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🚀 Quick Start
          </h2>
          <ol className="space-y-3 text-gray-600">
            <li>
              <strong>1.</strong> Contact us to get your free API key
            </li>
            <li>
              <strong>2.</strong> Add{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                x-api-key: sc_live_YOUR_KEY
              </code>{" "}
              header to all requests
            </li>
            <li>
              <strong>3.</strong> Start querying! Try the{" "}
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">
                /api/v1/check
              </code>{" "}
              endpoint for quick lookups
            </li>
          </ol>
        </div>

        {/* Rate Limits */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            ⏱️ Rate Limits
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4">Tier</th>
                  <th className="py-2 pr-4">Per Minute</th>
                  <th className="py-2 pr-4">Per Day</th>
                  <th className="py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-2 pr-4 font-medium">🆓 Free</td>
                  <td className="py-2 pr-4">10</td>
                  <td className="py-2 pr-4">100</td>
                  <td className="py-2 text-green-600 font-medium">Free</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-2 pr-4 font-medium">📊 Basic</td>
                  <td className="py-2 pr-4">100</td>
                  <td className="py-2 pr-4">5,000</td>
                  <td className="py-2 text-gray-400">Coming soon</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">⚡ Pro</td>
                  <td className="py-2 pr-4">500</td>
                  <td className="py-2 pr-4">50,000</td>
                  <td className="py-2 text-gray-400">Coming soon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            🔐 Authentication
          </h2>
          <p className="text-gray-600 mb-3">
            Include your API key in the <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">x-api-key</code> header of every request:
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
            {`curl -H "x-api-key: sc_live_YOUR_KEY" \\
  "https://scamcomplaints.org/api/v1/check?wallet=0x123..."`}
          </pre>
          <p className="text-gray-500 text-sm mt-3">
            The <code className="text-gray-600">/api/v1/stats</code> endpoint is public and doesn&apos;t require authentication.
          </p>
        </div>

        {/* Endpoints */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">📡 Endpoints</h2>
        <div className="space-y-3 mb-12">
          {ENDPOINTS.map((ep) => (
            <EndpointCard key={ep.path + ep.method} endpoint={ep} />
          ))}
        </div>

        {/* Use Cases */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            💡 Use Cases
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              🏦 <strong>Exchanges & Wallets</strong> — Flag suspicious wallet
              addresses before processing transactions
            </li>
            <li>
              🛡️ <strong>Fintech & Payment Apps</strong> — Screen recipients
              against known scammer emails and phone numbers
            </li>
            <li>
              📱 <strong>Dating Apps</strong> — Cross-reference user profiles
              against reported romance scammers
            </li>
            <li>
              🔍 <strong>Investigation Tools</strong> — Enrich case files with
              scam report data
            </li>
            <li>
              📊 <strong>Research</strong> — Access aggregate scam trends and
              statistics
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            📩 Get Your API Key
          </h2>
          <p className="text-gray-600">
            Contact us at{" "}
            <a
              href="mailto:api@socialcatfish.com"
              className="text-red-600 hover:underline font-medium"
            >
              api@socialcatfish.com
            </a>{" "}
            with your company name, use case, and expected volume.
            <br />
            Free tier keys are typically issued within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
