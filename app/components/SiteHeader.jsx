'use client';

import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between overflow-hidden px-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Report Gift Card Scams"
            className="block h-16 w-auto select-none md:h-[4.55rem] lg:h-20"
            height={80}
          />
          <span className="sr-only">Report Gift Card Scams</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/xml" className="hover:text-slate-900">Download Data</Link>
        </nav>
      </div>
    </header>
  );
}
