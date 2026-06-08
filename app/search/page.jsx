// app/search/page.jsx
"use client";

import { useState, useCallback } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [source, setSource] = useState("all");
  const pageSize = 20;

  const doSearch = useCallback(
    async (q, p = 1, src = source) => {
      if (!q.trim()) return;
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ q: q.trim(), page: p, pageSize, source: src });
        const res = await fetch(`/api/search?${params}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        setResults(data);
        setPage(p);
      } catch (err) {
        setError(err.message || "Search failed");
        setResults(null);
      } finally {
        setLoading(false);
      }
    },
    [source]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(query, 1, source);
  };

  const handleSourceChange = (newSource) => {
    setSource(newSource);
    if (query.trim()) {
      doSearch(query, 1, newSource);
    }
  };

  const totalPages = results ? Math.ceil(results.total / pageSize) : 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 min-h-[calc(100vh-160px)]">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-4">
          🔍 SEARCH REPORTS
        </span>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Search Scam Reports
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Search scam reports and investigation case files by name, email, phone number,
          username, gift card brand, or keywords.
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by name, email, phone, keyword…'
              className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="rounded-xl bg-brand px-6 py-3.5 font-medium text-white hover:bg-brand-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Searching
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {/* Source filter tabs */}
      <div className="mb-6 flex gap-2">
        {[
          { key: "all", label: "All" },
          { key: "reports", label: "Scam Reports" },
          { key: "investigations", label: "Investigation Cases" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleSourceChange(tab.key)}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              source === tab.key
                ? "bg-brand text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
            {results?.counts && tab.key !== "all" && (
              <span className="ml-1.5 text-xs opacity-75">
                ({results.counts[tab.key === "reports" ? "giftcard" : "investigation"] || 0})
              </span>
            )}
            {results?.counts && tab.key === "all" && (
              <span className="ml-1.5 text-xs opacity-75">
                ({results.total || 0})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {results.total === 0
                ? "No reports found"
                : `${results.total} result${results.total === 1 ? "" : "s"} found`}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-slate-500">
                Page {page} of {totalPages}
              </p>
            )}
          </div>

          {results.items.length > 0 ? (
            <div className="space-y-3">
              {results.items.map((item) =>
                item.type === "investigation" ? (
                  <InvestigationCard key={item.id} item={item} />
                ) : (
                  <GiftCardCard key={item.id} item={item} />
                )
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
              <p className="text-lg font-medium text-slate-600">No matching reports</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search term, or{" "}
                <a href="/case-builder" className="text-brand-accent hover:text-brand-accent-hover underline">
                  submit a report
                </a>{" "}
                to help others.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => doSearch(query, page - 1, source)}
                disabled={page <= 1 || loading}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => doSearch(query, page + 1, source)}
                disabled={page >= totalPages || loading}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!results && !error && !loading && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <svg className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-slate-600">Search scam reports & investigations</p>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Search by suspect name, email, phone number, username, gift card brand,
            retailer, or keyword to find matching scam reports and investigation case files.
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl bg-slate-900 p-8 text-center text-white">
        <h2 className="text-xl font-bold">Been scammed? Report it.</h2>
        <p className="mt-2 text-sm text-slate-300">
          Your report helps expose scam patterns, warn others, and support investigations.
        </p>
        <a
          href="/case-builder"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-medium text-white hover:bg-brand-accent-hover transition-colors"
        >
          Build Your Report →
        </a>
      </div>
    </div>
  );
}

/* ── Gift Card Report Card ── */
function GiftCardCard({ item }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            🎁 Gift Card Report
          </span>
          {item.gift_card_brand && (
            <span className="inline-flex items-center rounded-lg bg-navy-50 px-2.5 py-1 text-xs font-medium text-brand">
              {item.gift_card_brand}
            </span>
          )}
          {item.retailer && (
            <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              🏪 {item.retailer}
            </span>
          )}
          {item.amount && (
            <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              💰 ${Number(item.amount).toLocaleString()}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 shrink-0">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
          })}
        </span>
      </div>
      {item.card_last4 && (
        <p className="text-sm text-slate-600 mb-2">
          Card ending in <span className="font-mono font-medium text-slate-900">••••{item.card_last4}</span>
        </p>
      )}
      {item.notes && (
        <p className="text-sm text-slate-600 leading-relaxed">{item.notes}</p>
      )}
    </div>
  );
}

/* ── Investigation Case Card ── */
function InvestigationCard({ item }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-5 hover:border-amber-300 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
            🔍 Investigation Case
          </span>
          {item.identity_verified && (
            <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
              item.identity_verified.includes('✅') || item.identity_verified.toLowerCase().includes('verified')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {item.identity_verified}
            </span>
          )}
          {item.amount && (
            <span className="inline-flex items-center rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
              💰 ${Number(item.amount).toLocaleString()} lost
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400 shrink-0">
          {new Date(item.created_at).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
          })}
        </span>
      </div>

      {/* Suspect info */}
      {(item.suspect_name || item.suspect_email || item.suspect_phone || item.suspect_username) && (
        <div className="mb-3 rounded-lg bg-white/80 border border-amber-100 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Suspect Info</p>
          <div className="space-y-1">
            {item.suspect_name && (
              <p className="text-sm text-slate-800">
                <span className="text-slate-500">Name:</span>{" "}
                <span className="font-medium">{item.suspect_name}</span>
              </p>
            )}
            {item.suspect_email && (
              <p className="text-sm text-slate-800">
                <span className="text-slate-500">Email:</span>{" "}
                <span className="font-mono text-xs">{item.suspect_email}</span>
              </p>
            )}
            {item.suspect_phone && (
              <p className="text-sm text-slate-800">
                <span className="text-slate-500">Phone:</span>{" "}
                <span className="font-mono text-xs">{item.suspect_phone}</span>
              </p>
            )}
            {item.suspect_username && (
              <p className="text-sm text-slate-800">
                <span className="text-slate-500">Profiles:</span>{" "}
                <span className="text-xs break-all">{item.suspect_username.length > 120 ? item.suspect_username.slice(0, 120) + '…' : item.suspect_username}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Story / Summary */}
      {item.story && (
        <p className="text-sm text-slate-700 leading-relaxed mb-2">{item.story}</p>
      )}

      {/* Conclusions */}
      {item.conclusions && !item.story && (
        <p className="text-sm text-slate-600 leading-relaxed">{item.conclusions}</p>
      )}
    </div>
  );
}
