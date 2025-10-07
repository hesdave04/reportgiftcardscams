'use client';

import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Using <img> for SVG keeps it simple. The file lives in /public */}
          <img
            src="/logo.svg"
            alt="Report Gift Card Scams"
            className="h-8 w-auto"
            height={32}
          />
          <span className="sr-only">Report Gift Card Scams</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/trust" className="hover:text-slate-900">Trust & Security</Link>
        </nav>
      </div>
    </header>
  );
}
