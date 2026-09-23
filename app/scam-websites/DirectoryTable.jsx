import Link from "next/link";
import { formatScamType, formatMoney, riskBadge } from "@/lib/scamWebsites";

function timeSince(dateStr) {
  if (!dateStr) return "—";
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

/** Shared table for the directory + hub pages (server component). */
export default function DirectoryTable({ rows }) {
  if (!rows?.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-500">
        No websites match this filter yet.{" "}
        <Link href="/report-fraudulent-website" className="font-medium text-red-600 underline">Report a fraudulent website</Link>.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
            <th className="px-4 py-3">Website</th>
            <th className="px-4 py-3 text-center">Reports</th>
            <th className="hidden px-4 py-3 sm:table-cell">Scam Type</th>
            <th className="hidden px-4 py-3 text-center md:table-cell">Trust Score</th>
            <th className="hidden px-4 py-3 md:table-cell">Hosting</th>
            <th className="hidden px-4 py-3 text-right lg:table-cell">Latest Report</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((w) => {
            const badge = riskBadge(w);
            return (
              <tr key={w.domain} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/scam-websites/${encodeURIComponent(w.domain)}`} className="font-medium text-red-600 hover:text-red-700 hover:underline break-all">
                    {w.domain}
                  </Link>
                  {w.kind === "legit" && <span className="ml-2 rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800">legit · impersonated</span>}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-semibold ${badge.bg} ${badge.text}`}>{w.report_count}</span>
                </td>
                <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{w.primary_scam_type ? formatScamType(w.primary_scam_type) : "—"}</td>
                <td className="hidden px-4 py-3 text-center md:table-cell">{w.trust_score != null ? <span className={`font-semibold ${w.trust_score <= 40 ? "text-red-600" : "text-slate-700"}`}>{w.trust_score}</span> : <span className="text-slate-300">—</span>}</td>
                <td className="hidden px-4 py-3 text-slate-500 md:table-cell">{w.server_country || "—"}</td>
                <td className="hidden px-4 py-3 text-right text-slate-400 lg:table-cell">{timeSince(w.latest_report)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ base, page, total, pageSize }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  // `base` is a template containing {p}; page 1 links to the clean URL.
  const href = (p) => (p === 1 ? base.replace(/[?&]page=\{p\}$/, "").replace("{p}", "") : base.replace("{p}", String(p)));
  const window = [];
  for (let p = Math.max(1, page - 2); p <= Math.min(pages, page + 2); p++) window.push(p);
  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm" aria-label="Pagination">
      {page > 1 && <Link rel="prev" href={href(page - 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">← Prev</Link>}
      {window[0] > 1 && <><Link href={href(1)} className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">1</Link><span className="text-slate-400">…</span></>}
      {window.map((p) => (
        <Link key={p} href={href(p)} aria-current={p === page ? "page" : undefined} className={`rounded-lg border px-3 py-1.5 ${p === page ? "border-red-600 bg-red-600 text-white" : "border-slate-200 hover:bg-slate-50"}`}>{p}</Link>
      ))}
      {window[window.length - 1] < pages && <><span className="text-slate-400">…</span><Link href={href(pages)} className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">{pages.toLocaleString()}</Link></>}
      {page < pages && <Link rel="next" href={href(page + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">Next →</Link>}
    </nav>
  );
}
