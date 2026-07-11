"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

export default function Nav() {
  const { user, reporter, signOut, loading: authLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const moreRef = useRef(null);
  const toolsRef = useRef(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const mainLinks = [
    {
      href: "/state-of-scams-2026",
      label: "State of Scams",
      icon: (
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
    },
    {
      href: "/wall-of-shame",
      label: "Wall of Shame",
      icon: (
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: (
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.04 6.04 0 01-2.021 1.054 5.96 5.96 0 01-4.498 0 6.04 6.04 0 01-2.021-1.054" />
        </svg>
      ),
    },
    {
      href: "/scams",
      label: "Resources",
      icon: (
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      href: "/about",
      label: "About",
      icon: (
        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      ),
    },
  ];

  const toolsLinks = [
    {
      href: "/check-website",
      label: "Website Checker",
      desc: "Scan any URL",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      href: "/search",
      label: "Search Scammers",
      desc: "Look up reports",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      href: "/scam-websites",
      label: "Scam Websites",
      desc: "Known bad sites",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>
      ),
    },
    {
      href: "/browser-extension",
      label: "Browser Extension",
      desc: "Real-time protection",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
  ];

  const moreLinks = [
    { href: "/how-to-identify-a-scam", label: "How to Identify a Scam" },
    { href: "/what-to-do-if-scammed", label: "What to Do If Scammed" },
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
          {/* Tools dropdown */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.84-3.37a1 1 0 00-1.5.86v6.68a1 1 0 001.5.86l5.84-3.37a1 1 0 000-1.72zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tools
              <svg
                className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {toolsOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                {toolsLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setToolsOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

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

          {/* Auth + CTA */}
          {!authLoading && (
            user ? (
              <div className="ml-2 flex items-center gap-2">
                <a
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  {reporter?.display_name || "Dashboard"}
                  {(reporter?.role === "scambaiter" || reporter?.is_whitelisted) && (
                    <span className="ml-0.5 inline-block h-2 w-2 rounded-full bg-amber-400" title="Verified Scambaiter" />
                  )}
                </a>
                <a
                  href="/case-builder"
                  className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 transition-colors"
                >
                  Submit a Report
                </a>
              </div>
            ) : (
              <div className="ml-2 flex items-center gap-2">
                <a
                  href="/login"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/case-builder"
                  className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-800 transition-colors"
                >
                  Submit a Report
                </a>
              </div>
            )
          )}
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
        <div className="fixed left-0 right-0 bottom-0 top-[57px] z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div className="relative h-full overflow-y-auto bg-white pb-8 shadow-xl">
            <div className="mx-auto max-w-lg px-5 pt-4">

              {/* ── CTA ── */}
              <a
                href="/case-builder"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-[15px] font-semibold text-white shadow-sm active:scale-[0.98] transition-transform"
              >
                <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submit a Report
              </a>

              {/* ── Auth ── */}
              {!authLoading && (
                user ? (
                  <a
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-[15px] font-medium text-slate-700 active:bg-slate-100 transition-colors"
                  >
                    <svg className="h-[18px] w-[18px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {reporter?.display_name || "My Dashboard"}
                    {(reporter?.role === "scambaiter" || reporter?.is_whitelisted) && (
                      <span className="inline-block h-2 w-2 rounded-full bg-amber-400" title="Verified Scambaiter" />
                    )}
                  </a>
                ) : (
                  <a
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-[15px] font-medium text-slate-700 active:bg-slate-100 transition-colors"
                  >
                    <svg className="h-[18px] w-[18px] text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    Sign In / Create Account
                  </a>
                )
              )}

              {/* ── Tools grid ── */}
              <div className="mt-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Tools
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {toolsLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-3.5 text-center transition-colors hover:bg-slate-100 active:bg-slate-100"
                    >
                      <span className="text-sky-600">{l.icon}</span>
                      <span className="text-[13px] font-medium text-slate-800 leading-tight">{l.label}</span>
                      <span className="text-[11px] text-slate-400 leading-tight">{l.desc}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Main links ── */}
              <div className="mt-5">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Explore
                </p>
                <div className="flex flex-col">
                  {mainLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        {l.icon}
                      </span>
                      <span className="text-[15px] font-medium">{l.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── More / Resources ── */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                  {moreLinks.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-2.5 py-2 text-[13px] text-slate-400 transition-colors hover:text-slate-600 active:bg-slate-50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
