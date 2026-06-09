import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const metadata = {
  title: "Scam Websites List — Verified Fraudulent Websites Database | ScamComplaints",
  description:
    "Searchable database of reported scam websites. Check any website before you buy or invest. Updated daily with new reports from victims and investigators.",
  keywords:
    "scam websites list, fake websites database, fraudulent websites, check if website is scam, scam website checker, reported scam sites, fake online stores list",
  openGraph: {
    title: "Scam Websites List — Verified Fraudulent Sites",
    description:
      "Check any website against our database of reported scam sites. Updated daily.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/scam-websites" },
};

function extractDomain(url) {
  if (!url) return null;
  try {
    let clean = url.trim().toLowerCase();
    if (!clean.startsWith("http")) clean = "https://" + clean;
    const u = new URL(clean);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();
  }
}

async function getScamWebsites() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  // Fetch reported websites from case_intakes
  const { data, error } = await supabase
    .from("case_intakes")
    .select("id, suspect_website, scam_type, created_at, amount, story")
    .not("suspect_website", "is", null)
    .order("created_at", { ascending: false })
    .limit(500);

  if (error || !data) return [];

  // Group by domain
  const domainMap = {};
  for (const row of data) {
    const domain = extractDomain(row.suspect_website);
    if (!domain || domain.length < 4) continue;

    if (!domainMap[domain]) {
      domainMap[domain] = {
        domain,
        reports: 0,
        scamTypes: new Set(),
        totalLost: 0,
        firstReported: row.created_at,
        latestReport: row.created_at,
      };
    }
    const d = domainMap[domain];
    d.reports += 1;
    if (row.scam_type) d.scamTypes.add(row.scam_type);
    if (row.amount) d.totalLost += Number(row.amount) || 0;
    if (row.created_at > d.latestReport) d.latestReport = row.created_at;
    if (row.created_at < d.firstReported) d.firstReported = row.created_at;
  }

  return Object.values(domainMap)
    .map((d) => ({ ...d, scamTypes: [...d.scamTypes] }))
    .sort((a, b) => b.reports - a.reports);
}

function formatScamType(t) {
  return (t || "unknown")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export const revalidate = 3600; // revalidate every hour

export default async function ScamWebsitesPage() {
  const websites = await getScamWebsites();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/50 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-orange-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Scam Websites Database
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Scam websites list.
            <br />
            <span className="text-orange-400">Check before you buy.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            A public, searchable database of websites reported for fraud, non-delivery,
            phishing, and other scams. Updated continuously as new reports come in. If a
            website you&apos;re considering buying from is on this list — or if it&apos;s not but
            it should be —&nbsp;
            <a
              href="/report-fraudulent-website"
              className="font-medium text-orange-400 underline decoration-orange-400/30 underline-offset-2 hover:text-orange-300"
            >
              report it here
            </a>
            .
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4 py-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">{websites.length.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Reported domains</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              {websites.reduce((s, w) => s + w.reports, 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Total reports</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900">
              ${Math.round(websites.reduce((s, w) => s + w.totalLost, 0)).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Total reported losses</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">Live</p>
            <p className="text-xs text-slate-500">Updated continuously</p>
          </div>
        </div>
      </section>

      {/* Website list */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Most reported websites
          </h2>
          <a
            href="/report-fraudulent-website"
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
          >
            + Report a Website
          </a>
        </div>

        {websites.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-sm text-slate-500">
              No scam websites reported yet. Be the first to{" "}
              <a href="/report-fraudulent-website" className="font-medium text-red-600 underline">
                report a fraudulent website
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Website</th>
                  <th className="px-4 py-3 text-center">Reports</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Scam Type</th>
                  <th className="hidden px-4 py-3 text-right md:table-cell">Total Lost</th>
                  <th className="hidden px-4 py-3 text-right lg:table-cell">Latest Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {websites.slice(0, 100).map((w) => (
                  <tr key={w.domain} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/scam-websites/${encodeURIComponent(w.domain)}`}
                        className="font-medium text-red-600 hover:text-red-700 hover:underline"
                      >
                        {w.domain}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-100 px-2 text-xs font-semibold text-red-700">
                        {w.reports}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                      {w.scamTypes.slice(0, 2).map(formatScamType).join(", ")}
                    </td>
                    <td className="hidden px-4 py-3 text-right font-medium text-slate-900 md:table-cell">
                      {w.totalLost > 0 ? `$${w.totalLost.toLocaleString()}` : "—"}
                    </td>
                    <td className="hidden px-4 py-3 text-right text-slate-400 lg:table-cell">
                      {timeSince(w.latestReport)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            How to check if a website is a scam
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Before buying from any unfamiliar website, take 60 seconds to verify
              it. Start by searching the domain name on this page and on Google
              followed by the word &quot;scam.&quot; Check the domain&apos;s age using a WHOIS
              lookup — scam sites are almost always less than a year old. Look for
              a real physical address, phone number, and company registration. If
              the only contact option is a web form, that&apos;s a red flag.
            </p>
            <p>
              Check the prices. If a website is selling brand-name products at
              70–90% off retail, it&apos;s either counterfeit or non-delivery. No
              legitimate retailer can sustain those margins. Check the payment
              methods: if they only accept wire transfer, cryptocurrency, or
              payment apps (and no credit card), walk away.
            </p>
            <p>
              Look at the website quality. Scam sites often have grammatical errors,
              stock photos, stolen product images, and privacy policies copy-pasted
              from other sites. Check for an SSL certificate (the padlock icon), but
              know that scam sites have them too — SSL means the connection is
              encrypted, not that the business is legitimate.
            </p>
            <p>
              If you&apos;ve already been scammed by a website, report it immediately — both
              here and with your credit card company (for chargeback). The faster you
              act, the better your chances of recovering your money.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
