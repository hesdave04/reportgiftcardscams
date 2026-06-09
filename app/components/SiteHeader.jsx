// app/components/SiteHeader.jsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SiteHeader() {
  return (
    <>
      {/* Top banner */}
      <div className="w-full bg-slate-900 py-2 text-center text-xs text-white">
        Made by{' '}
        <a
          href="https://www.socialcatfish.com"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-slate-300 hover:text-slate-100"
        >
          SocialCatfish.com
        </a>{' '}
        with ❤️
      </div>

      {/* Main header */}
      <header className="flex items-center justify-between border-b bg-white px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="ReportGiftCardScams"
            width={190}
            height={44}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/xml" className="hover:text-slate-900">
            Download Data
          </Link>
          <Link href="/wall-of-shame" className="hover:text-slate-900">
            Wall of Shame
          </Link>
        </nav>
      </header>
    </>
  );
}
