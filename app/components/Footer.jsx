// Server Component
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-200 bg-navy-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/shield.png" alt="" className="h-9 sm:h-10 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                  Scam<span className="text-sky-600">Complaints</span>
                  <span className="text-slate-400 font-semibold">.org</span>
                </span>
                <span className="mt-0.5 text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  Report Scams · Protect Others
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              A free public service helping victims report scams, expose fraud, and support investigations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Resources
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/case-builder" className="text-slate-600 hover:text-slate-900">Report a Scam</a></li>
              <li><a href="/wall-of-shame" className="text-slate-600 hover:text-slate-900">Wall of Shame</a></li>
              <li><a href="/leaderboard" className="text-slate-600 hover:text-slate-900">Leaderboard</a></li>
              <li><a href="/search" className="text-slate-600 hover:text-slate-900">Search Reports</a></li>
              <li><a href="/trust" className="text-slate-600 hover:text-slate-900">Trust & Security</a></li>
              <li><a href="/about" className="text-slate-600 hover:text-slate-900">About</a></li>
              <li><a href="/privacy" className="text-slate-600 hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="/xml" className="text-slate-600 hover:text-slate-900">XML Data Access</a></li>
              <li><a href="/api-docs" className="text-slate-600 hover:text-slate-900">Partner API</a></li>
            </ul>
          </div>

          {/* Attribution */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Made By
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Built by{" "}
              <a
                href="https://socialcatfish.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900 hover:decoration-slate-500"
              >
                SocialCatfish.com
              </a>{" "}
              — online identity verification and scam prevention since 2015.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} ScamComplaints.org · All rights reserved
        </div>
      </div>
    </footer>
  );
}
