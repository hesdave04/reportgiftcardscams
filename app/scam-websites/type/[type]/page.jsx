import Link from "next/link";
import { notFound } from "next/navigation";
import { listDomains, getFacets, formatScamType, TYPE_COPY, SITE } from "@/lib/scamWebsites";
import DirectoryTable, { Pagination } from "../../DirectoryTable";

export const revalidate = 3600;
const PAGE_SIZE = 50;

export async function generateMetadata({ params, searchParams }) {
  const type = decodeURIComponent(params.type);
  const copy = TYPE_COPY[type];
  const name = copy?.title || `${formatScamType(type)} websites`;
  const page = parseInt(searchParams?.page || "1", 10) || 1;
  return {
    title: `${name} — reported domains list${page > 1 ? ` (page ${page})` : ""} | ScamComplaints`,
    description: `${copy?.blurb || `Websites reported to ScamComplaints for ${formatScamType(type).toLowerCase()}.`} Browse every reported domain with report counts, trust scores and hosting data.`,
    alternates: { canonical: `/scam-websites/type/${type}${page > 1 ? `?page=${page}` : ""}` },
    robots: { index: true, follow: true },
  };
}

export default async function TypeHub({ params, searchParams }) {
  const type = decodeURIComponent(params.type);
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const [{ rows, total }, tlds] = await Promise.all([
    listDomains({ page: page - 1, pageSize: PAGE_SIZE, scamType: type }),
    getFacets("tld", 15),
  ]);
  if (!total) notFound();
  const copy = TYPE_COPY[type];
  const name = copy?.title || `${formatScamType(type)} websites`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${SITE}/scam-websites/type/${type}`,
    description: copy?.blurb,
    isPartOf: { "@type": "WebSite", name: "ScamComplaints", url: SITE },
    mainEntity: { "@type": "ItemList", numberOfItems: total, itemListElement: rows.slice(0, 20).map((r, i) => ({ "@type": "ListItem", position: i + 1 + (page - 1) * PAGE_SIZE, url: `${SITE}/scam-websites/${r.domain}`, name: r.domain })) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <nav className="text-xs text-slate-400"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/scam-websites" className="hover:text-white">Scam Websites</Link> / <span className="text-slate-300">{formatScamType(type)}</span></nav>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">{name}</h1>
          <p className="mt-3 max-w-3xl text-slate-300">{copy?.blurb || `Domains reported to ScamComplaints for ${formatScamType(type).toLowerCase()}.`} <strong className="text-white">{total.toLocaleString()}</strong> reported domains.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <DirectoryTable rows={rows} />
        <Pagination base={`/scam-websites/type/${type}?page={p}`} page={page} total={total} pageSize={PAGE_SIZE} />
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Browse by domain ending</h2>
          <ul className="mt-3 flex flex-wrap gap-2">{tlds.map((t) => <li key={t.value}><Link href={`/scam-websites/tld/${t.value}`} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:border-red-300 hover:text-red-700">.{t.value} <span className="text-xs text-slate-400">{t.n.toLocaleString()}</span></Link></li>)}</ul>
        </div>
      </section>
    </>
  );
}
