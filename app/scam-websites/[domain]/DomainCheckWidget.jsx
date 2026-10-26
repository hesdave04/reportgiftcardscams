"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Embedded AI website checker, prefilled with the page's domain.
 * Shows the cached trust score if we already have one; the button
 * re-runs the live check via /api/website-check.
 */
export default function DomainCheckWidget({ domain, cachedScore, cachedRisk, checkedAt }) {
  const [state, setState] = useState({ loading: false, result: null, error: "" });

  async function run() {
    setState({ loading: true, result: null, error: "" });
    try {
      const res = await fetch(`/api/website-check?url=${encodeURIComponent(domain)}`);
      const data = await res.json();
      if (!res.ok) setState({ loading: false, result: null, error: data.error || "Check failed" });
      else setState({ loading: false, result: data, error: "" });
    } catch {
      setState({ loading: false, result: null, error: "Check failed. Please try again." });
    }
  }

  const score = state.result?.trust_score ?? cachedScore;
  const label = state.result?.risk_label ?? (cachedRisk ? cachedRisk.replace(/_/g, " ") : null);
  const color = score == null ? "text-slate-400" : score <= 25 ? "text-red-600" : score <= 40 ? "text-orange-600" : score <= 60 ? "text-yellow-600" : "text-green-600";

  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
      <h3 className="text-sm font-semibold text-sky-900">AI Website Safety Check</h3>
      <div className="mt-3 flex items-center gap-4">
        <div className="text-center">
          <p className={`text-3xl font-extrabold ${color}`}>{score == null ? "—" : score}</p>
          <p className="text-[11px] text-slate-500">trust score /100</p>
        </div>
        <div className="text-sm text-slate-700">
          {label ? <p className="font-medium capitalize">{label}</p> : <p>Not scanned yet.</p>}
          {checkedAt && !state.result && <p className="text-xs text-slate-500">Last scanned {new Date(checkedAt).toLocaleDateString("en-US")}</p>}
          {state.result && <p className="text-xs text-slate-500">Live result · {state.result.flags?.length || 0} flag(s)</p>}
        </div>
      </div>
      {state.result?.flags?.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-slate-700">
          {state.result.flags.slice(0, 6).map((f, i) => (
            <li key={i}>• {f}</li>
          ))}
        </ul>
      )}
      {state.error && <p className="mt-2 text-xs text-red-600">{state.error}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={run}
          disabled={state.loading}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {state.loading ? "Scanning…" : cachedScore != null ? "Re-scan now" : `Scan ${domain}`}
        </button>
        <Link href={`/check-website?url=${encodeURIComponent(domain)}`} className="rounded-lg border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-white">
          Full report
        </Link>
      </div>
    </div>
  );
}
