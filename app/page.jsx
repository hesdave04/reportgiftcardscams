// app/page.jsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import dynamicImport from "next/dynamic";
import HowItWorks from "./components/HowItWorks";
import QuickReport from "./components/QuickReport";

const RecentReports = dynamicImport(() => import("./components/RecentReports"), {
  ssr: false,
  loading: () => (
    <div className="text-slate-500 text-sm">Loading stream…</div>
  ),
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand to-brand-dark">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-accent" />
              Free public service by SocialCatfish.com
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Report a scam.
              <br />
              <span className="text-brand-accent">Protect someone else.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed sm:text-xl">
              ScamComplaints.org helps you document fraud clearly and completely.
              Your report helps investigators, protects other victims, and
              exposes scam networks.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/case-builder"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-accent/25 hover:bg-brand-accent-hover transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Build Your Report
              </a>
              <a
                href="#report-form"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur hover:bg-white/10 transition-colors"
              >
                Quick Report
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { label: "Scam Types Covered", value: "10+" },
              { label: "Guided Steps", value: "8" },
              { label: "Voice Input", value: "✓" },
              { label: "Law Enforcement Ready", value: "XML" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* How It Works */}
        <HowItWorks />

        {/* Quick Report Form */}
        <section id="report-form" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Quick Report</h2>
          <p className="mt-2 text-slate-600">
            Report any type of scam in under 2 minutes. Just the essentials — every detail helps investigators.
            For a more thorough report,{" "}
            <a href="/case-builder" className="font-medium text-brand-accent hover:text-brand-accent-hover underline underline-offset-2">
              use the guided Case Builder
            </a>.
          </p>
          <div className="mt-6">
            <QuickReport />
          </div>
        </section>

        {/* Recent Reports */}
        <section id="reports" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">Recent Reports</h2>
          <p className="mt-2 text-slate-600">
            Latest scam reports from the community. Card numbers are masked for safety.
          </p>
          <div className="mt-6">
            <Suspense
              fallback={
                <div className="text-slate-500 text-sm">Loading stream…</div>
              }
            >
              <RecentReports />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
