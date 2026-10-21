// Server Component — "Download the Caller ID app" banner.
// Renders nothing until NEXT_PUBLIC_CALLERID_APP_URL is set (App Store link at launch),
// so this can ship ahead of the app going live. Optional: NEXT_PUBLIC_CALLERID_PLAY_URL.
export default function CallerIDAppBadge() {
  const appStoreUrl = process.env.NEXT_PUBLIC_CALLERID_APP_URL;
  const playUrl = process.env.NEXT_PUBLIC_CALLERID_PLAY_URL;
  if (!appStoreUrl && !playUrl) return null;

  const utm = "utm_source=scamcomplaints.org&utm_medium=site_badge&utm_campaign=callerid_app";
  const withUtm = (u) => (u.includes("?") ? `${u}&${utm}` : `${u}?${utm}`);

  return (
    <section className="mx-auto max-w-6xl px-4 mt-12">
      <div className="flex flex-col gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <svg className="mt-0.5 h-8 w-8 shrink-0 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <div>
            <p className="text-base font-bold text-slate-900">
              Know who&rsquo;s calling &mdash; free Caller ID app
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Every number reported here is flagged in the app as <span className="font-semibold">listed on ScamComplaints.org</span>.
              Search any phone number, see the name behind it, and block scam calls and texts.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {appStoreUrl && (
            <a href={withUtm(appStoreUrl)} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/></svg>
              App Store
            </a>
          )}
          {playUrl && (
            <a href={withUtm(playUrl)} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              Google Play
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
