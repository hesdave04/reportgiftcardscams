// app/search/SearchClient.jsx
"use client";

import { useState, useCallback } from "react";

/* ── Scam type label formatter ── */
const SCAM_TYPE_LABELS = {
  romance_scam: "Romance Scam",
  crypto_scam: "Crypto / Investment Scam",
  tech_support: "Tech Support Scam",
  phishing: "Phishing",
  impersonation: "Impersonation",
  employment_scam: "Employment Scam",
  shopping_scam: "Shopping / Marketplace Scam",
  government_scam: "Government Impersonation",
  lottery_scam: "Lottery / Prize Scam",
  other: "Other",
};

function formatScamType(raw) {
  if (!raw) return null;
  if (SCAM_TYPE_LABELS[raw]) return SCAM_TYPE_LABELS[raw];
  // Convert snake_case to Title Case
  return raw
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const pageSize = 20;

  const search = useCallback(
    async (pg = 1) => {
      if (!query.trim()) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}&page=${pg}&pageSize=${pageSize}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setResults(json.items || []);
        setTotal(json.total || 0);
        setPage(pg);
        setSearched(true);
      } catch (e) {
        setError(String(e.message || e));
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          🔍 Search Reports
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Search Scam Reports
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Search 253,000+ reports by scammer name, email, phone number, crypto wallet, platform, or keywords.
        </p>
      </div>

      {/* Search form */}
      <div className="mt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(1);
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. name, email, phone, crypto wallet, platform..."
            className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {searched && !error && (
        <div className="mt-8">
          <p className="mb-4 text-sm text-slate-500">
            {total.toLocaleString()} result{total !== 1 ? "s" : ""} found
          </p>

          {results.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-500">No reports match your search.</p>
              <p className="mt-2 text-sm text-slate-400">
                Try different keywords or a broader search.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {results.map((r, i) => (
                  <div
                    key={`${r.type}-${r.id ?? i}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900">
                            {r.title}
                          </span>
                          {r.scam_type && (
                            <span className="inline-flex rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                              {formatScamType(r.scam_type)}
                            </span>
                          )}
                          {r.type === "gift_card" && (
                            <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Gift Card
                            </span>
                          )}
                        </div>
                        {r.card_last4 && (
                          <p className="mt-1 text-xs text-slate-500">
                            Card ending in •••• {r.card_last4}
                          </p>
                        )}
                        {r.platforms && r.platforms.length > 0 && (
                          <p className="mt-1 text-xs text-slate-500">
                            Platform: {r.platforms.join(", ")}
                          </p>
                        )}
                        {r.summary && (
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                            {r.summary}
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        {r.amount && (
                          <span className="text-sm font-semibold text-red-600">
                            ${Number(r.amount).toLocaleString()}
                          </span>
                        )}
                        {r.created_at && (
                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(r.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => search(page - 1)}
                    disabled={page <= 1 || loading}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <span className="px-3 text-sm text-slate-500">
                    Page {page} of {totalPages.toLocaleString()}
                  </span>
                  <button
                    onClick={() => search(page + 1)}
                    disabled={page >= totalPages || loading}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}
