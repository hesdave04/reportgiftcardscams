"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import Link from "next/link";

export default function DashboardPage() {
  const { user, reporter, loading: authLoading, signOut } = useAuth();
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const res = await fetch("/api/auth/my-reports");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setReports(data.reports || []);
        }
      } catch (e) {
        console.error("Load reports error:", e);
      } finally {
        setLoadingData(false);
      }
    }

    load();
  }, [user]);

  if (authLoading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="h-4 w-72 rounded bg-slate-100" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sign in required</h1>
          <p className="mt-2 text-slate-500">Please sign in to view your dashboard.</p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const isScambaiter = reporter?.role === "scambaiter" || reporter?.is_whitelisted;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {reporter?.display_name || user.email.split("@")[0]}
            </h1>
            {isScambaiter && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                Scambaiter
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">{user.email}</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/case-builder"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
          >
            Submit Report
          </Link>
          <button
            onClick={() => signOut().then(() => (window.location.href = "/"))}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Reports Submitted"
          value={stats?.totalReports ?? reporter?.reports_count ?? 0}
          icon="📋"
        />
        <StatCard
          label="Scammers Exposed"
          value={stats?.uniqueScammers ?? 0}
          icon="🎯"
        />
        <StatCard
          label="Account Status"
          value={isScambaiter ? "Verified Scambaiter" : "Reporter"}
          icon={isScambaiter ? "⭐" : "👤"}
          small
        />
      </div>

      {/* Recent Reports */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Your Reports</h2>

        {loadingData ? (
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : reports.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-slate-500">No reports yet.</p>
            <Link
              href="/case-builder"
              className="mt-3 inline-block text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Submit your first report →
            </Link>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {reports.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900 truncate">
                      {r.scam_type || "Scam Report"}
                    </span>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      r.status === "new" ? "bg-blue-100 text-blue-700" :
                      r.status === "reviewed" ? "bg-green-100 text-green-700" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {new Date(r.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    {r.suspect_name && ` · ${r.suspect_name}`}
                    {r.suspect_website && ` · ${r.suspect_website}`}
                  </p>
                </div>
                {r.trust_score != null && (
                  <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    r.trust_score >= 76 ? "bg-green-100 text-green-700" :
                    r.trust_score >= 51 ? "bg-blue-100 text-blue-700" :
                    r.trust_score >= 26 ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {r.trust_score}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value, icon, small }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
          <p className={`mt-0.5 font-bold text-slate-900 ${small ? "text-base" : "text-2xl"}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  );
}
