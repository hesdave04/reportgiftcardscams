"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/case-builder", label: "Build Report", primary: true },
    { href: "/wall-of-shame", label: "Wall of Shame" },
    { href: "/search", label: "Search" },
    { href: "/about", label: "About" },
    { href: "/trust", label: "Trust" },
    { href: "/xml", label: "Data Access" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-navy-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/shield.png" alt="" className="h-11 sm:h-12 md:h-14 w-auto" />
          <div className="flex flex-col leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-brand">
              <span className="text-[1.15em]">S</span>CAM{" "}
              <span className="text-[1.15em]">C</span>OMPLAINTS<span className="text-brand-accent">.ORG</span>
            </span>
            <span className="mt-0.5 text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400" style={{ fontFamily: "system-ui, sans-serif" }}>
              Report Scams. Protect Others. Create Change.
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 text-sm lg:flex">
          {links.map((l) =>
            l.primary ? (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg bg-brand px-4 py-2 font-medium text-white hover:bg-brand-light transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) =>
              l.primary ? (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-brand px-4 py-3 text-center font-medium text-white hover:bg-brand-light"
                >
                  {l.label}
                </a>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-slate-700 hover:bg-slate-100"
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
