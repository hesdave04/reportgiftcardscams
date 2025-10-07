// Server Component (no client JS needed)
export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold">GC</div>
          <span className="text-sm font-semibold text-slate-900">Gift Card Reporter</span>
        </a>

        <div className="flex items-center gap-3 text-sm">
          <a href="/" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Home</a>
          <a href="#xml" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">XML</a>
          <a href="#reports" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100">Reports</a>
        </div>
      </div>
    </nav>
  );
}
