'use client';

import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      {/* Increased header height to fit a wider logo */}
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          {/* Make the logo readable: control width, keep aspect ratio */}
          <img
            src="/logo.svg"
            alt="ReportGiftCardScams"
            className="block h-auto w-[200px] md:w-[260px] lg:w-[300px]"
          />
          <span className="sr-only">Report Gift Card Scams</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/trust" className="hover:text-slate-900">Trust &amp; Security</Link>
        </nav>
      </div>
    </header>
  );
}
