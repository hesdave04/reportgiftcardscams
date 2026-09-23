import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE,
  normalizeDomain,
  formatScamType,
  formatDate,
  formatMoney,
  sourceLabel,
  legitCategoryCopy,
  riskBadge,
  feedList,
  getDomainRow,
  getDomainReports,
  buildRowFromReports,
  getSimilarDomains,
} from "@/lib/scamWebsites";
import DomainCheckWidget from "./DomainCheckWidget";

export const revalidate = 86400; // rebuilt nightly by the enrichment job anyway
export const dynamicParams = true;

/* ───────────────────────── data ───────────────────────── */

async function loadPage(domainParam) {
  const domain = normalizeDomain(decodeURIComponent(domainParam));
  if (!domain || !domain.includes(".")) return null;
  const [rowFromTable, reports] = await Promise.all([getDomainRow(domain), getDomainReports(domain, 20)]);
  const row = rowFromTable || (await buildRowFromReports(domain, reports));
  if (!row) return null;
  const similar = await getSimilarDomains(row, 8);
  return { domain, row, reports, similar };
}

function isBoilerplateStory(story) {
  if (!story) return true;
  const s = story.trim();
  return (
    s.length < 40 ||
    s.startsWith("Reported scammer identifier from") ||
    s.startsWith("Data submited by") ||
    s.startsWith("Data submitted by") ||
    s.startsWith("The PhishFort Detection System") ||
    s.startsWith("Automated website trust check")
  );
}

/* ───────────────────────── metadata ───────────────────────── */

export async function generateMetadata({ params }) {
  const domain = normalizeDomain(decodeURIComponent(params.domain));
  const row = domain ? await getDomainRow(domain) : null;
  const n = row?.report_count || 0;
  const canonical = `/scam-websites/${domain}`;

  if (row?.kind === "legit") {
    const what = legitCategoryCopy(row.legit_category);
    return {
      title: `${domain} Scams — How Scammers Impersonate This Site | ScamComplaints`,
      description: `${domain} is ${what}. It appears in ${n} scam report${n === 1 ? "" : "s"} because scammers impersonate it or use it to reach victims. Learn the warning signs and how to verify you're on the real site.`,
      alternates: { canonical },
      robots: row.indexable ? { index: true, follow: true } : { index: false, follow: true },
      openGraph: { title: `${domain} scams: how impersonators use this site`, description: `${n} report${n === 1 ? "" : "s"} mention ${domain}. It is ${what} — here's how to tell the real one from a fake.`, siteName: "ScamComplaints", type: "article" },
    };
  }

  if (row?.kind === "checked_only") {
    return {
      title: `${domain} safety report — trust score ${row.trust_score ?? "—"}/100 | ScamComplaints`,
      description: `Is ${domain} safe? No victim reports yet. Automated check: trust score ${row.trust_score ?? "—"}/100${row.registration_date ? `, registered ${formatDate(row.registration_date)}` : ""}${row.server_country ? `, hosted in ${row.server_country}` : ""}. Registrar, SSL, blocklists and report search.`,
      alternates: { canonical },
      robots: { index: false, follow: true },
    };
  }
  if (row?.kind === "blocklisted") {
    const f = row.feed_count || 0;
    const names = feedList(row).map((x) => x.label).slice(0, 3).join(", ");
    const bl = [];
    if (row.registration_date) bl.push(`registered ${formatDate(row.registration_date)}`);
    if (row.server_country) bl.push(`hosted in ${row.server_country}`);
    if (row.trust_score != null) bl.push(`trust score ${row.trust_score}/100`);
    return {
      title: `Is ${domain} a Scam? Flagged by ${f} Phishing Blocklists | ScamComplaints`,
      description: `${domain} is listed on ${f} independent scam/phishing blocklists (${names}).${bl.length ? ` ${bl.join(", ")}.` : ""} See registration data, hosting, similar scam sites and how to report it.`,
      alternates: { canonical },
      robots: row.indexable ? { index: true, follow: true } : { index: false, follow: true },
      openGraph: { title: `Is ${domain} a scam? — ScamComplaints`, description: `Flagged by ${f} security blocklists${bl.length ? ` · ${bl.join(", ")}` : ""}`, siteName: "ScamComplaints", type: "article" },
    };
  }
  const facts = [];
  if (row?.registration_date) facts.push(`registered ${formatDate(row.registration_date)}`);
  if (row?.server_country) facts.push(`hosted in ${row.server_country}`);
  if (row?.trust_score != null) facts.push(`trust score ${row.trust_score}/100`);
  const factStr = facts.length ? ` ${facts.join(", ")}.` : "";
  const type = row?.primary_scam_type ? formatScamType(row.primary_scam_type).toLowerCase() : "scam";
  return {
    title: n > 0 ? `Is ${domain} a Scam? ${n} Report${n === 1 ? "" : "s"}, Trust Score & Reviews | ScamComplaints` : `Is ${domain} a Scam? Trust Score & Reviews | ScamComplaints`,
    description: `${domain} has ${n} ${type} report${n === 1 ? "" : "s"} on ScamComplaints.${factStr} See who reported it, domain registration data, hosting, blocklist status and similar scam websites.`,
    alternates: { canonical },
    robots: row?.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: `Is ${domain} a scam? — ScamComplaints`, description: `${n} report${n === 1 ? "" : "s"} · ${formatScamType(row?.primary_scam_type)}${factStr}`, siteName: "ScamComplaints", type: "article" },
  };
}

/* ───────────────────────── components ───────────────────────── */

function Breadcrumbs({ domain, row }) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Scam Websites", href: "/scam-websites" },
    ...(row?.primary_scam_type ? [{ name: formatScamType(row.primary_scam_type), href: `/scam-websites/type/${row.primary_scam_type}` }] : []),
    { name: domain, href: `/scam-websites/${domain}` },
  ];
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span>/</span>}
            {i < crumbs.length - 1 ? (
              <Link href={c.href} className="hover:text-white">{c.name}</Link>
            ) : (
              <span className="text-slate-300 break-all">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Fact({ label, value, warn }) {
  if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div>
      <dt className="text-xs font-medium text-slate-400">{label}</dt>
      <dd className={`text-sm break-words ${warn ? "font-semibold text-red-700" : "text-slate-800"}`}>{Array.isArray(value) ? value.join(", ") : value}</dd>
    </div>
  );
}

function DomainList({ title, items, subtitle }) {
  if (!items?.length) return null;
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
        {items.map((d) => (
          <li key={d.domain} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            <Link href={`/scam-websites/${d.domain}`} className="truncate font-medium text-slate-800 hover:text-red-700">{d.domain}</Link>
            <span className="shrink-0 text-xs text-slate-400">{d.kind === "blocklisted" ? `${d.feed_count} blocklist${d.feed_count === 1 ? "" : "s"}` : `${d.report_count} rpt${d.report_count === 1 ? "" : "s"}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── narrative ───────────────────────── */

function buildVerdict(domain, row) {
  const n = row.report_count || 0;
  const bits = [];
  if (row.kind === "legit") {
    bits.push(`${domain} is ${legitCategoryCopy(row.legit_category)}, not a scam website. It appears in ${n} report${n === 1 ? "" : "s"} because scammers impersonate it, link to it, or use it to contact victims.`);
    bits.push(`Always type the address yourself or use a bookmark; never follow a link from a message you did not expect.`);
    return bits;
  }
  if (row.kind === "checked_only") {
    bits.push(`${domain} has not been reported as a scam by any victim. It is listed because someone ran it through our automated website safety check${row.trust_score != null ? `, which scored it ${row.trust_score}/100${row.risk_level ? ` (${row.risk_level.replace(/_/g, " ")})` : ""}` : ""}.`);
    if (row.registration_date) bits.push(`The domain was registered on ${formatDate(row.registration_date)}${row.registrar ? ` through ${row.registrar}` : ""}${row.server_country ? ` and is hosted in ${row.server_country}` : ""}.`);
    bits.push(`A check result is not a verdict — review the domain intelligence below and search our reports before you buy.`);
    return bits;
  }
  if (row.kind === "blocklisted") {
    const f = row.feed_count || 0;
    const feeds = feedList(row);
    bits.push(`${domain} is flagged as a scam or phishing site by ${f} independent security blocklist${f === 1 ? "" : "s"} maintained by security researchers (${feeds.map((x) => x.label).join(", ")}). It has not been reported by a victim on ScamComplaints yet.`);
    if (feeds.some((x) => x.kind === "Web3 phishing")) bits.push(`Blocklists of this kind track fake wallet-connect pages, token airdrops and exchange clones designed to drain crypto wallets — the domain is blocked inside wallets such as MetaMask for that reason.`);
  }
  if (n > 0) bits.push(`${domain} has been reported ${n} time${n === 1 ? "" : "s"} to ScamComplaints${row.primary_scam_type ? `, most often as a ${formatScamType(row.primary_scam_type).toLowerCase()}` : ""}.`);
  if (row.total_lost > 0) bits.push(`Victims reported combined losses of ${formatMoney(row.total_lost)}.`);
  if (row.registration_date) {
    const age = row.domain_age_days != null ? (row.domain_age_days < 365 ? `only ${Math.max(1, Math.round(row.domain_age_days / 30))} month${Math.round(row.domain_age_days / 30) === 1 ? "" : "s"} old` : `${Math.floor(row.domain_age_days / 365)} year${Math.floor(row.domain_age_days / 365) === 1 ? "" : "s"} old`) : null;
    bits.push(`The domain was registered on ${formatDate(row.registration_date)}${age ? ` (${age})` : ""}${row.registrar ? ` through ${row.registrar}` : ""}${row.server_country ? ` and is hosted in ${row.server_country}${row.server_isp ? ` (${row.server_isp})` : ""}` : ""}.`);
  } else if (row.server_country) {
    bits.push(`The site is hosted in ${row.server_country}${row.server_isp ? ` (${row.server_isp})` : ""}.`);
  }
  if (row.rdap_status === "not_registered") bits.push(`The domain is no longer registered — it has been dropped or taken down, which is typical of short-lived scam sites. Watch for the same operators re-appearing under a new name.`);
  if (row.trust_score != null) bits.push(`Our automated safety check gave it a trust score of ${row.trust_score}/100${row.risk_level ? ` (${row.risk_level.replace(/_/g, " ")})` : ""}.`);
  if (!bits.length) bits.push(`${domain} is listed in the ScamComplaints scam-website database.`);
  return bits;
}

/** Plain-English explanation of where the records came from. */
function sourceNotes(row, reports) {
  const notes = [];
  const src = new Set(row.sources || []);
  const n = row.report_count || 0;
  if (src.has("3p_chainabuse")) notes.push(`${n === 1 ? "The record" : "Most records"} for ${row.domain} ${n === 1 ? "was" : "were"} submitted to Chainabuse, the community scam-reporting platform run by TRM Labs, ${reports.some((r) => r.story?.includes("PhishFort")) ? "including automated detections by PhishFort's phishing-detection system" : reports.some((r) => /Intelligence for good/i.test(r.story || "")) ? "including data contributed by the non-profit Intelligence for Good" : "by users and security researchers"}. Chainabuse reports typically involve crypto wallets, fake token projects and wallet-drainer phishing pages.`);
  if (src.has("3p_cryptolegal")) notes.push(`${row.domain} is listed in the CryptoLegal registry of fraudulent crypto trading and investment platforms.`);
  if (src.has("ScamHatersUnited")) notes.push(`ScamHaters United, a volunteer anti-romance-scam group, published ${row.domain} in connection with scammer profiles they exposed.`);
  if (src.has("website-checker")) notes.push(`Our automated website checker scanned ${row.domain}${row.trust_score != null ? ` and scored it ${row.trust_score}/100` : ""}.`);
  if (row.organic_count > 0) notes.push(`${row.organic_count} report${row.organic_count === 1 ? " was" : "s were"} filed directly on ScamComplaints by ${row.organic_count === 1 ? "a victim" : "victims"}.`);
  return notes;
}

/** Attribution block for external blocklists (their licences require it). */
function FeedAttribution({ row }) {
  const feeds = feedList(row);
  if (!feeds.length) return null;
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">Security blocklists flagging {row.domain}</h2>
      <p className="mt-1 text-sm text-slate-500">Open-source threat feeds maintained by independent security researchers. A listing means the feed's maintainers classified the domain as malicious; it is not a ScamComplaints victim report.</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {feeds.map((f) => (
          <li key={f.label} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
            <span className="font-medium text-slate-800">{f.url ? <a href={f.url} target="_blank" rel="noopener nofollow" className="hover:text-red-700">{f.label}</a> : f.label}</span>
            <span className="shrink-0 text-xs text-slate-400">{f.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function buildFaq(domain, row) {
  const n = row.report_count || 0;
  if (row.kind === "legit") {
    return [
      { q: `Is ${domain} a scam?`, a: `No. ${domain} is ${legitCategoryCopy(row.legit_category)}. It shows up in ${n} scam report${n === 1 ? "" : "s"} because criminals impersonate it or use it as a channel — the site itself is genuine.` },
      { q: `How do scammers use ${domain}?`, a: `Common patterns: fake profiles or pages hosted on the platform, messages that claim to come from ${domain}, and lookalike domains with a similar name. Verify the exact spelling of the address and never share codes, passwords or payment details in response to an unsolicited message.` },
      { q: `I was scammed by someone using ${domain}. What should I do?`, a: `Report the profile or page to ${domain} directly, file a report on ScamComplaints with screenshots, contact your bank if money was sent, and report to the FTC (reportfraud.ftc.gov) and FBI IC3 (ic3.gov).` },
    ];
  }
  if (row.kind === "checked_only") {
    return [
      { q: `Is ${domain} a scam?`, a: `No victim has reported ${domain} to ScamComplaints. Our automated check scored it ${row.trust_score ?? "—"}/100${row.risk_level ? ` (${row.risk_level.replace(/_/g, " ")})` : ""}. Use the domain intelligence on this page — registration date, registrar, hosting and blocklist status — to judge for yourself, and pay by credit card so you can dispute the charge.` },
      { q: `Who owns ${domain}?`, a: row.registrar ? `Public registration records show ${domain} was registered${row.registration_date ? ` on ${formatDate(row.registration_date)}` : ""} through ${row.registrar}.` : `Run the AI Website Safety Check above to pull live registration, hosting and SSL data for ${domain}.` },
      { q: `I had a bad experience with ${domain}. What should I do?`, a: `File a report using the button on this page with the details of what happened. If you paid, contact your bank or card issuer right away, and report to the FTC (reportfraud.ftc.gov).` },
    ];
  }
  if (row.kind === "blocklisted") {
    const f = row.feed_count || 0;
    return [
      { q: `Is ${domain} a scam?`, a: `${domain} is listed on ${f} independent scam and phishing blocklists${row.trust_score != null ? ` and scored ${row.trust_score}/100 on our automated safety check` : ""}. Security researchers flag a domain only after classifying it as malicious, so treat it as unsafe: do not connect a wallet, enter passwords or send money.` },
      { q: `Why is ${domain} blocked in my wallet or browser?`, a: `Wallets such as MetaMask and many browser extensions subscribe to the same blocklists. When a domain is added to one, users see a warning page or are blocked outright. The feeds flagging ${domain} are listed on this page.` },
      { q: `Who owns ${domain}?`, a: row.registrar ? `Public registration records show ${domain} was registered${row.registration_date ? ` on ${formatDate(row.registration_date)}` : ""} through ${row.registrar}.${row.rdap_status === "not_registered" ? " The registration has since lapsed — the domain was dropped or taken down." : ""}` : `Run the AI Website Safety Check above to pull live registration, hosting and SSL data for ${domain}.` },
      { q: `I interacted with ${domain}. What should I do?`, a: `If you connected a crypto wallet, revoke token approvals (revoke.cash) and move remaining funds to a fresh wallet. If you entered a password, change it everywhere you reused it. If you paid, contact your bank or exchange immediately, then file a report here and with the FTC (reportfraud.ftc.gov) and FBI IC3 (ic3.gov).` },
    ];
  }
  return [
    { q: `Is ${domain} a scam?`, a: n > 0 ? `${domain} has ${n} scam report${n === 1 ? "" : "s"} in the ScamComplaints database${row.primary_scam_type ? `, mainly for ${formatScamType(row.primary_scam_type).toLowerCase()}` : ""}${row.trust_score != null ? `, and an automated trust score of ${row.trust_score}/100` : ""}. We recommend you do not send money or personal information to this website.` : `${domain} is listed in our database${row.trust_score != null ? ` with a trust score of ${row.trust_score}/100` : ""}. Treat it with caution.` },
    { q: `Who owns ${domain}?`, a: row.registrar ? `Public registration records show ${domain} was registered${row.registration_date ? ` on ${formatDate(row.registration_date)}` : ""} through ${row.registrar}. The registrant identity is ${row.whois_visibility === "public" ? "public" : "hidden behind privacy protection, which is common for scam sites"}.` : `Registration records for ${domain} are not yet available. Run the AI Website Safety Check above to pull live WHOIS/RDAP, hosting and SSL data.` },
    { q: `I sent money to ${domain}. Can I get it back?`, a: `Act fast. Call your bank or card issuer and ask for a chargeback or wire recall, report the transaction to the payment app or crypto exchange you used, file a report here with your evidence, and report to the FTC and FBI IC3. Beware of "recovery services" that promise to get your money back for a fee — that is a second scam.` },
    { q: `How do I report ${domain}?`, a: `Use the "Report This Website" button on this page. Include screenshots, the exact URL, how you were contacted, and any names, emails, phone numbers or wallet addresses used. Every report strengthens the record against this site.` },
  ];
}

/* ───────────────────────── page ───────────────────────── */

export default async function DomainPage({ params }) {
  const data = await loadPage(params.domain);
  if (!data) notFound();
  const { domain, row, reports, similar } = data;
  const badge = riskBadge(row);
  const isLegit = row.kind === "legit";
  const isBlocklisted = row.kind === "blocklisted";
  const verdict = buildVerdict(domain, row);
  const faq = buildFaq(domain, row);
  const realStories = reports.filter((r) => !isBoilerplateStory(r.story));
  const sources = (row.sources || []).map(sourceLabel);
  // Identifiers only from human-filed reports — scraped feeds carry post titles, not names.
  const human = reports.filter((r) => ["submitted", "user_submitted", "scf_verified", "quick_report"].includes(r.source));
  const names = [...new Set(human.map((r) => r.suspect_name).filter(Boolean))].slice(0, 5);
  const emails = [...new Set(human.map((r) => r.suspect_email).filter(Boolean))].slice(0, 5);
  const phones = [...new Set(human.map((r) => r.suspect_phone).filter(Boolean))].slice(0, 5);
  const wallets = [...new Set(reports.map((r) => r.suspect_wallet).filter(Boolean))].slice(0, 3);
  const pageUrl = `${SITE}/scam-websites/${domain}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Scam Websites", item: `${SITE}/scam-websites` },
        { "@type": "ListItem", position: 3, name: domain, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: isLegit ? `${domain} scams — how scammers impersonate this site` : `Is ${domain} a scam?`,
      url: pageUrl,
      dateModified: row.updated_at || row.latest_report || undefined,
      isPartOf: { "@type": "WebSite", name: "ScamComplaints", url: SITE },
      about: { "@type": "WebSite", url: `https://${domain}`, name: domain },
      publisher: { "@type": "Organization", name: "ScamComplaints.org", url: SITE },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800`}>
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${isLegit ? "from-sky-900/60" : "from-red-900/50"} via-transparent to-transparent`} />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <Breadcrumbs domain={domain} row={row} />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl break-all">
              {isLegit ? `${domain} scams` : row.kind === "checked_only" ? `${domain} safety report` : `Is ${domain} a scam?`}
            </h1>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge.bg} ${badge.text}`}>{isLegit ? "✅" : row.kind === "checked_only" ? "🔍" : "⚠️"} {badge.label}</span>
          </div>
          <p className="mt-4 max-w-3xl text-base text-slate-300">{verdict[0]}</p>
          {row.latest_report && (
            <p className="mt-2 text-xs text-slate-400">
              First seen {formatDate(row.first_reported)} · Latest report {formatDate(row.latest_report)}
              {sources.length > 0 && <> · Sources: {sources.join("; ")}</>}
              {row.feed_count > 0 && <> · Also on {row.feed_count} security blocklist{row.feed_count === 1 ? "" : "s"}</>}
            </p>
          )}
          {isBlocklisted && (
            <p className="mt-2 text-xs text-slate-400">
              Flagged by {feedList(row).map((f) => f.label).join(", ")} · Added to our database {formatDate(row.feed_added_at)}
            </p>
          )}
        </div>
      </section>

      {/* Summary cards */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className={`text-2xl font-bold ${isLegit ? "text-slate-900" : "text-red-600"}`}>{row.kind === "checked_only" ? row.organic_count : isBlocklisted ? row.feed_count : row.report_count}</p>
            <p className="text-xs text-slate-500">{isLegit ? "Reports mentioning it" : row.kind === "checked_only" ? "Victim reports" : isBlocklisted ? "Security blocklists" : "Reports Filed"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{row.trust_score != null ? `${row.trust_score}/100` : "—"}</p>
            <p className="text-xs text-slate-500">Trust Score</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-lg font-bold text-slate-900 leading-tight">{row.primary_scam_type ? formatScamType(row.primary_scam_type) : "—"}</p>
            <p className="text-xs text-slate-500">Primary Scam Type</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-lg font-bold text-slate-900 leading-tight">{row.registration_date ? formatDate(row.registration_date) : formatMoney(row.total_lost) || "—"}</p>
            <p className="text-xs text-slate-500">{row.registration_date ? "Domain Registered" : "Total Reported Losses"}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            {/* Verdict */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">{isLegit ? `Why ${domain} appears in scam reports` : `What we know about ${domain}`}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">
                {row.ai_summary ? row.ai_summary.split(/\n\s*\n/).map((s, i) => <p key={`ai-${i}`}>{s}</p>) : verdict.map((s, i) => <p key={i}>{s}</p>)}
                {row.kind === "reported" && !row.ai_summary && sourceNotes(row, reports).map((s, i) => <p key={`src-${i}`}>{s}</p>)}
                {row.kind === "reported" && !row.ai_summary && row.feed_count > 0 && <p>Independently, {row.domain} also appears on {row.feed_count} open-source security blocklist{row.feed_count === 1 ? "" : "s"} ({feedList(row).map((f) => f.label).join(", ")}), which corroborates the victim reports.</p>}
                {isLegit && (
                  <p>
                    Genuine {domain} pages never ask you to send money, gift cards or cryptocurrency to a stranger, and the real address is exactly <strong>{domain}</strong> — watch for extra words, hyphens or a different ending (for example <em>{domain.split(".")[0]}-support.com</em>).
                  </p>
                )}
              </div>
            </div>

            {/* Domain intelligence */}
            {(row.registrar || row.server_country || row.ssl_issuer || row.page_title || row.nameservers?.length || row.rdap_status) && (
              <div>
                <h2 className="text-xl font-bold text-slate-900">Domain intelligence</h2>
                <p className="mt-1 text-sm text-slate-500">Pulled from public registration (RDAP/WHOIS), DNS, TLS and hosting records{row.checked_at ? ` on ${formatDate(row.checked_at)}` : ""}.</p>
                <dl className="mt-4 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
                  <Fact label="Registered" value={row.registration_date ? `${formatDate(row.registration_date)}${row.domain_age_days != null ? ` · ${row.domain_age_days < 365 ? `${Math.max(1, Math.round(row.domain_age_days / 30))} months old` : `${Math.floor(row.domain_age_days / 365)} yrs old`}` : ""}` : null} warn={row.domain_age_days != null && row.domain_age_days < 180} />
                  <Fact label="Registrar" value={row.registrar} />
                  <Fact label="Expires" value={row.expiration_date ? formatDate(row.expiration_date) : null} />
                  <Fact label="Registration status" value={row.rdap_status === "not_registered" ? "No longer registered — domain dropped or taken down" : row.rdap_status === "ok" ? "Active registration" : null} warn={false} />
                  <Fact label="Hosting country" value={row.server_country} />
                  <Fact label="Hosting provider" value={row.server_isp} />
                  <Fact label="Nameservers" value={row.nameservers} />
                  <Fact label="SSL certificate issuer" value={row.ssl_issuer} />
                  <Fact label="Page title" value={row.page_title} />
                  <Fact label="Risk level" value={row.risk_level ? row.risk_level.replace(/_/g, " ") : null} warn={row.risk_level === "high_risk" || row.risk_level === "danger"} />
                </dl>
              </div>
            )}

            {(isBlocklisted || row.feed_count > 0) && <FeedAttribution row={row} />}

            {/* Reports */}
            {row.kind !== "checked_only" && (
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isLegit ? `Reports that mention ${domain}` : `Victim reports`} ({row.report_count})
              </h2>
              {realStories.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {realStories.slice(0, 20).map((r, i) => (
                    <article key={r.id || i} className="rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {r.scam_type && <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">{formatScamType(r.scam_type)}</span>}
                          {r.amount > 0 && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Lost ${Number(r.amount).toLocaleString()}</span>}
                          {r.platforms?.length > 0 && <span className="text-xs text-slate-400">via {r.platforms.slice(0, 3).join(", ")}</span>}
                        </div>
                        <time className="shrink-0 text-xs text-slate-400">{formatDate(r.created_at)}</time>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-6">{r.story}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                  {isBlocklisted ? (
                    <p>No victim has filed a report about {domain} on ScamComplaints yet — it is listed because {row.feed_count} security blocklist{row.feed_count === 1 ? "" : "s"} classified it as a scam or phishing site.</p>
                  ) : (
                  <p>
                    {row.report_count} record{row.report_count === 1 ? "" : "s"} for {domain} {row.report_count === 1 ? "comes" : "come"} from {sources.length ? sources.join(" and ") : "partner data"}
                    {reports.some((r) => r.story?.includes("PhishFort")) ? " — an automated phishing-detection feed that flagged this domain as a threat." : "."} No written victim story has been submitted yet.
                  </p>
                  )}
                  <p className="mt-2">
                    Have you dealt with {domain}? <Link href={`/report-fraudulent-website?website=${encodeURIComponent(domain)}`} className="font-medium text-red-600 underline">Be the first to tell your story.</Link>
                  </p>
                </div>
              )}
              {realStories.length > 20 && <p className="mt-3 text-sm text-slate-400">Showing 20 of {realStories.length} written reports.</p>}
            </div>
            )}

            {/* Similar */}
            {(similar.lookalikes.length || similar.infrastructure.length || similar.sameType.length) > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Similar websites</h2>
                <DomainList title={`Lookalike names`} subtitle={`Other reported domains built around “${row.brand_token}”`} items={similar.lookalikes} />
                <DomainList title="Same infrastructure" subtitle={`Reported sites sharing the registrar${row.nameservers?.length ? " and nameservers" : ""} (${row.registrar})`} items={similar.infrastructure} />
                <DomainList title={`Other ${formatScamType(row.primary_scam_type).toLowerCase()} sites on .${row.tld}`} items={similar.sameType} />
              </div>
            )}

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {faq.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-slate-900">{f.q}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              <DomainCheckWidget domain={domain} cachedScore={row.trust_score} cachedRisk={row.risk_level} checkedAt={row.checked_at} />

              <div className={`rounded-xl border-2 p-5 text-center ${isLegit ? "border-slate-200 bg-slate-50" : "border-red-200 bg-red-50"}`}>
                <h3 className={`font-semibold ${isLegit ? "text-slate-900" : "text-red-900"}`}>{isLegit ? `Scammed by someone using ${domain}?` : `Were you scammed by ${domain}?`}</h3>
                <p className={`mt-2 text-sm ${isLegit ? "text-slate-600" : "text-red-700"}`}>Add your report to warn others and build a stronger case.</p>
                <Link href={`/report-fraudulent-website?website=${encodeURIComponent(domain)}`} className={`mt-3 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold text-white ${isLegit ? "bg-slate-800 hover:bg-slate-900" : "bg-red-600 hover:bg-red-700"}`}>
                  {isLegit ? "Report the scammer" : "Report This Website"}
                </Link>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Search our reports</h3>
                <p className="mt-1 text-xs text-slate-500">Names, emails, phones and wallets linked to {domain}.</p>
                <form action="/search" method="get" className="mt-3 flex gap-2">
                  <input name="q" defaultValue={domain} className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm" aria-label="Search reports" />
                  <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Search</button>
                </form>
                {(names.length || emails.length || phones.length || wallets.length) > 0 && (
                  <dl className="mt-4 space-y-3 text-sm">
                    <Fact label="Associated names" value={names} />
                    <Fact label="Associated emails" value={emails} />
                    <Fact label="Associated phones" value={phones} />
                    <Fact label="Crypto wallets" value={wallets} />
                  </dl>
                )}
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">If you already paid</h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-800">
                  <li>• Call your bank or card issuer now and request a chargeback</li>
                  <li>• Crypto: report the wallet to the exchange you sent from</li>
                  <li>• Change passwords you reused on this site</li>
                  <li>• Report to <a href="https://reportfraud.ftc.gov" className="underline" target="_blank" rel="noopener">FTC</a> and <a href="https://ic3.gov" className="underline" target="_blank" rel="noopener">FBI IC3</a></li>
                  <li>• Ignore anyone offering to “recover” your funds for a fee</li>
                </ul>
              </div>

              <div className="text-xs text-slate-400">
                <Link href="/scam-websites" className="hover:text-slate-600">← All scam websites</Link>
                {row.tld && <> · <Link href={`/scam-websites/tld/${row.tld}`} className="hover:text-slate-600">.{row.tld} sites</Link></>}
                {row.primary_scam_type && <> · <Link href={`/scam-websites/type/${row.primary_scam_type}`} className="hover:text-slate-600">{formatScamType(row.primary_scam_type)}</Link></>}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
