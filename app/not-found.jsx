// app/not-found.jsx — Custom 404 page
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      {/* Warning icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <svg
          className="h-10 w-10 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      <h1 className="mt-6 text-4xl font-bold text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Go Home
        </a>
        <a
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Search Reports
        </a>
        <a
          href="/case-builder"
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-700 hover:bg-red-100 transition-colors"
        >
          Report a Scam
        </a>
      </div>

      {/* Helpful links */}
      <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Popular pages
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <a href="/case-builder" className="text-red-600 hover:text-red-700 font-medium">
            Submit a Report
          </a>
          <a href="/wall-of-shame" className="text-red-600 hover:text-red-700 font-medium">
            Wall of Shame
          </a>
          <a href="/search" className="text-red-600 hover:text-red-700 font-medium">
            Search Reports
          </a>
          <a href="/about" className="text-red-600 hover:text-red-700 font-medium">
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}
