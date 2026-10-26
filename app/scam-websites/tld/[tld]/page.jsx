import Link from "next/link";
import { notFound } from "next/navigation";
import { listDomains, getFacets, formatScamType, TYPE_COPY, SITE } from "@/lib/scamWebsites";
import DirectoryTable, { Pagination } from "../../DirectoryTable";

export const revalidate = 3600;
const PAGE_SIZE = 50;

const TLD_NOTES = {
  dev: "Almost all of these are free Cloudflare Pages (pages.dev) sub-sites — scammers spin up hundreds of phishing clones a day on free hosting.",
  app: "Mostly free Vercel / Netlify / Firebase sub-sites hosting wallet-drainer and fake-login pages.",
  com: "The most common ending for fake stores and investment platforms because it looks trustworthy.",
  io: "Popular with fake crypto exchanges and 'DeFi' projects.",
  ai: "Heavily used by fake 'AI trading' platforms and Framer-hosted phishing pages.",
  top: "A cheap TLD favoured by phishing kits and throwaway fake stores.",
  vip: "Frequently used by fake investment 'VIP' platforms targeting Asian and US victims.",
  xyz: "Cheap, anonymous registrations make .xyz a phishing favourite.",
  cc: "Often used by fake shopping sites and Chinese-run investment scams.",
  shop: "A natural home for non-delivery and counterfeit storefronts.",
};

export async function generateMetadata({ params, searchParams }) {
  const tld = decodeURIComponent(params.tld).toLowerCase();
  const page = parseInt(searchParams?.page || "1", 10) || 1;
  return {
    title: `Scam websites ending in .${tld} — reported domains list${page > 1 ? ` (page ${page})` : ""} | ScamComplaints`,
    description: `Every .${tld} domain reported to ScamComplaints for phishing, fraud or investment scams, with report counts, trust scores and hosting data. ${TLD_NOTES[tld] || ""}`.trim(),
    alternates: { canonical: `/scam-websites/tld/${tld}${page > 1 ? `?page=${page}` : ""}` },
    robots: { index: true, follow: true },
  };
}

export default async function TldHub({ params, searchParams }) {
  const tld = decodeURIComponent(params.tld).toLowerCase();
  const page = Math.max(1, parseInt(searchParams?.page || "1", 10) || 1);
  const [{ rows, total }, types] = await Promise.all([
    listDomains({ page: page - 1, pageSize: PAGE_SIZE, tld }),
    getFacets("type", 12),
  ]);
  if (!total) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Scam websites ending in .${tld}`,
    url: `${SITE}/scam-websites/tld/${tld}`,
    isPartOf: { "@type": "WebSite", name: "ScamComplaints", url: SITE },
    mainEntity: { "@type": "ItemList", numberOfItems: total, itemListElement: rows.slice(0, 20).map((r, i) => ({ "@type": "ListItem", position: i + 1 + (page - 1) * PAGE_SIZE, url: `${SITE}/scam-websites/${r.domain}`, name: r.domain })) },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <nav className="text-xs text-slate-400"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/scam-websites" className="hover:text-white">Scam Websites</Link> / <span className="text-slate-300">.{tld}</span></nav>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Scam websites ending in .{tld}</h1>
          <p className="mt-3 max-w-3xl text-slate-300"><strong className="text-white">{total.toLocaleString()}</strong> reported .{tld} domains. {TLD_NOTES[tld] || ""}</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <DirectoryTable rows={rows} />
        <Pagination base={`/scam-websites/tld/${tld}?page={p}`} page={page} total={total} pageSize={PAGE_SIZE} />
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Browse by scam type</h2>
          <ul className="mt-3 flex flex-wrap gap-2">{types.map((t) => <li key={t.value}><Link href={`/scam-websites/type/${t.value}`} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 hover:border-red-300 hover:text-red-700">{TYPE_COPY[t.value]?.title?.replace(" websites", "") || formatScamType(t.value)} <span className="text-xs text-slate-400">{t.n.toLocaleString()}</span></Link></li>)}</ul>
        </div>
      </section>
    </>
  );
}
