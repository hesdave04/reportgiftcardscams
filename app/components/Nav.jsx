"use client";

import { useState, useRef, useEffect } from "react";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  /* Close "More" dropdown on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const mainLinks = [
    { href: "/wall-of-shame", label: "Wall of Shame" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/search", label: "Search" },
    { href: "/scams", label: "Resources" },
    { href: "/about", label: "About" },
  ];

  const moreLinks = [
    { href: "/scam-websites", label: "Scam Websites List" },
    { href: "/trust", label: "Trust & Security" },
    { href: "/xml", label: "Data Access" },
    { href: "/api-docs", label: "Partner API" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* ── Logo ── */}
        <a href="/" className="flex items-center gap-2.5 group">
          <img src="/shield.png" alt="" className="h-9 sm:h-10 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] sm:text-lg font-extrabold tracking-tight text-slate-900">
              Scam<span className="text-sky-600">Complaints</span>
              <span className="text-slate-400 font-semibold">.org</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">
              Report Scams · Protect Others
            </span>
          </div>
        </a>

        {/* ── Desktop links ── */}
        <div className="hidden items-center gap-1 text-sm lg:flex">
          {mainLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              More
              <svg
                className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                {moreLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="/case-builder"
            className="ml-2 rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Submit a Report
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <a
              href="/case-builder"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-slate-900 px-4 py-3 text-center font-medium text-white hover:bg-slate-800"
            >
              Submit a Report
            </a>
            {mainLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 border-t border-slate-100 pt-1">
              {moreLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
