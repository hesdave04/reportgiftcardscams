"use client";

import { useEffect, useState } from "react";

/**
 * Wall of Fame — top verified reporters leaderboard.
 * Embeddable component, used on the Wall of Shame page.
 */
export default function WallOfFame() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let abort = false;

    fetch("/api/stats/wall-of-fame?limit=25", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!abort) setData(json);
      })
      .catch(() => {})
      .finally(() => {
        if (!abort) setLoading(false);
      });

    return () => {
      abort = true;
    };
  }, []);

  const leaderboard = data?.leaderboard || [];
  const displayList = expanded ? leaderboard : leaderboard.slice(0, 10);

  if (!loading && leaderboard.length === 0) return null;

  return (
    <section className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.27.308 6.023 6.023 0 01-2.27-.308" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Wall of Fame</h2>
          <p className="text-sm text-slate-500">
            Top reporters protecting others from fraud
          </p>
        </div>
      </div>

      {/* Stats bar */}
      {data?.meta && (
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="rounded-lg bg-emerald-100 px-3 py-1.5 text-sm">
            <span className="font-semibold text-emerald-800">
              {data.meta.totalReporters.toLocaleString()}
            </span>{" "}
            <span className="text-emerald-600">active reporters</span>
          </div>
          {data.meta.totalScambaiters > 0 && (
            <div className="rounded-lg bg-amber-100 px-3 py-1.5 text-sm">
              <span className="font-semibold text-amber-800">
                {data.meta.totalScambaiters.toLocaleString()}
              </span>{" "}
              <span className="text-amber-600">verified scambaiters</span>
            </div>
          )}
        </div>
      )}

      {/* Leaderboard */}
      <div className="mt-5">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {displayList.map((reporter) => (
              <div
                key={reporter.rank}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-emerald-50/60 transition-colors"
              >
                {/* Rank badge */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    reporter.rank === 1
                      ? "bg-amber-400 text-amber-900 shadow-sm"
                      : reporter.rank === 2
                      ? "bg-slate-300 text-slate-700"
                      : reporter.rank === 3
                      ? "bg-amber-600 text-amber-100"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {reporter.rank <= 3
                    ? ["🥇", "🥈", "🥉"][reporter.rank - 1]
                    : reporter.rank}
                </span>

                {/* Name + badge */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-900 truncate">
                      {reporter.displayName}
                    </span>
                    {reporter.isScambaiter && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                        <svg
                          className="h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                          />
                        </svg>
                        Scambaiter
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Member since{" "}
                    {new Date(reporter.memberSince).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Report count */}
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-emerald-700">
                    {reporter.reportsCount}
                  </span>
                  <p className="text-[10px] text-slate-400">reports</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Expand / collapse */}
        {leaderboard.length > 10 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 w-full rounded-lg bg-slate-100 py-2 text-center text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {expanded
              ? "Show top 10"
              : `Show all ${leaderboard.length} reporters`}
          </button>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
        <p className="text-sm font-medium text-emerald-900">
          Want to appear on the Wall of Fame?
        </p>
        <p className="mt-1 text-xs text-emerald-600">
          Create an account and start reporting scams to climb the leaderboard.
        </p>
        <a
          href="/signup"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Create Account
        </a>
      </div>
    </section>
  );
}
