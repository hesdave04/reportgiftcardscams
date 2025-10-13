// app/components/SiteHeader.jsx
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="mb-6">
      {/* Top banner */}
      <div className="w-full bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-sm">
          <span>Made by</span>
          <a
            href="https://socialcatfish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-2 hover:underline"
          >
            SocialCatfish.com
          </a>
          <span>with ❤️</span>
        </div>
      </div>

      {/* Logo + Nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        {/* Logo (30% larger) */}
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          {/* If you added the wide SVG to /public as logo-badge-wide.svg, use it here */}
          <img
            src="/logo-badge-wide.svg"
            alt="ReportGiftCardScams"
            className="h-14 w-auto md:h-[4.25rem]" /* ~30% larger than typical h-10 */
            loading="eager"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <Link href="/xml" className="hover:text-slate-900">
            Download Data
          </Link>
          <Link href="/wall-of-shame" className="hover:text-slate-900">
            Wall of Shame Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
