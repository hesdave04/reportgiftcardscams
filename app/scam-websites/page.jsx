import Link from "next/link";
import { listDomains, getDirectoryStats, getFacets, formatScamType, TYPE_COPY } from "@/lib/scamWebsites";
import DirectoryTable, { Pagination } from "./DirectoryTable";

export const revalidate = 3600;
const PAGE_SIZE = 50;

export const metadata = {
  title: "Scam Websites List — 100,000+ Reported Fraudulent Websites | ScamComplaints",
  description:
    "Searchable database of more than 100,000 reported scam websites — phishing, crypto investment, fake stores and impersonation sites. Check any domain's reports, trust score, registrar and hosting before you buy or invest.",
  keywords:
    "scam websites list, fake websites database, fraudulent websites, check if website is scam, scam website checker, reported scam sites, fake online stores list, phishing sites list",
  openGraph: {
    title: "Scam Websites List — Verified Fraudulent Sites",
    description: "Check any website against our database of 100,000+ reported scam sites. Updated daily.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/scam-websites" },
};

export default async function ScamWebsitesPage({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const [{ rows, total }, stats, types, tlds, recent] = await Promise.all([
    listDomains({ page: page - 1, pageSize: PAGE_SIZE }),
    getDirectoryStats(),
    getFacets("type", 12),
    getFacets("tld", 24),
    listDomains({ page: 0, pageSize: 10, orderBy: "latest_report" }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/50 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-orange-300 backdrop-blur">Scam Websites Database</div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Scam websites list.
            <br />
            <span className="text-orange-400">Check before you buy.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            {stats.total.toLocaleString()} domains reported for phishing, fraud, non-delivery and investment scams — each with its own report history, trust score, registration and hosting data.
            Not on the list? <Link href="/check-website" className="font-medium text-orange-400 underline underline-offset-2 hover:text-orange-300">Run the AI website checker</Link> or{" "}
            <Link href="/report-fraudulent-website" className="font-medium text-orange-400 underline underline-offset-2 hover:text-orange-300">report it</Link>.
          </p>
          <form action="/check-website" method="get" className="mt-6 flex max-w-xl gap-2">
            <input name="url" placeholder="Enter a website, e.g. example-shop.com" className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400" aria-label="Website to check" />
            <button className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">Check</button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4 py-6">
          <div className="text-center"><p className="text-2xl font-bold text-slate-900">{stats.total.toLocaleString()}</p><p className="text-xs text-slate-500">Reported domains</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-slate-900">{stats.reports.toLocaleString()}</p><p className="text-xs text-slate-500">Total reports</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-slate-900">{types.length}+</p><p className="text-xs text-slate-500">Scam categories</p></div>
          <div className="text-center"><p className="text-2xl font-bold text-orange-600">Live</p><p className="text-xs text-slate-500">Updated continuously</p></div>
        </div>
      </section>

      {/* Browse by */}
      <section className="mx-auto max-w-5xl px-4 pt-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Browse by scam type</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {types.map((t) => (
                <li key={t.value}>
                  <Link href={`/scam-websites/type/${t.value}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:border-red-300 hover:text-red-700">
                    {TYPE_COPY[t.value]?.title?.replace(" websites", "") || formatScamType(t.value)} <span className="text-xs text-slate-400">{t.n.toLocaleString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Browse by domain ending</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tlds.map((t) => (
                <li key={t.value}>
                  <Link href={`/scam-websites/tld/${t.value}`} className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:border-red-300 hover:text-red-700">
                    .{t.value} <span className="text-xs text-slate-400">{t.n.toLocaleString()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Latest */}
      {page === 1 && recent.rows.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pt-10">
          <h2 className="text-lg font-bold text-slate-900">Latest reported websites</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recent.rows.map((r) => (
              <li key={r.domain}><Link href={`/scam-websites/${encodeURIComponent(r.domain)}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:underline">{r.domain}</Link></li>
            ))}
          </ul>
        </section>
      )}

      {/* Table */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Most reported websites {page > 1 && <span className="text-sm font-normal text-slate-400">· page {page}</span>}</h2>
          <Link href="/report-fraudulent-website" className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700">+ Report a Website</Link>
        </div>
        <DirectoryTable rows={rows} />
        <Pagination base="/scam-websites?page={p}" page={page} total={total} pageSize={PAGE_SIZE} />
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How to check if a website is a scam</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>Before buying from any unfamiliar website, take 60 seconds to verify it. Search the domain on this page, then run it through our <Link href="/check-website" className="text-red-600 underline">AI website checker</Link>, which pulls the domain&apos;s registration date, registrar, hosting country, SSL certificate, blocklist status and our own report history. Scam sites are almost always less than a year old and hide their owner behind privacy protection.</p>
            <p>Check the prices. If a website is selling brand-name products at 70–90% off retail, it&apos;s either counterfeit or non-delivery. Check the payment methods: if they only accept wire transfer, cryptocurrency, or payment apps (and no credit card), walk away.</p>
            <p>Look at the website quality. Scam sites often have grammatical errors, stock photos, stolen product images, and privacy policies copy-pasted from other sites. An SSL padlock only means the connection is encrypted — scam sites have them too.</p>
            <p>If you&apos;ve already been scammed by a website, report it immediately — both here and with your credit card company (for chargeback). The faster you act, the better your chances of recovering your money.</p>
          </div>
        </div>
      </section>
    </>
  );
}
