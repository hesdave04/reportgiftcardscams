import Link from "next/link";
import {
  STATES_TOTAL, STATES_PERCAP, TOP25, METROS, AGE_GROUPS,
  STATE_ABBREV, STATE_POP,
  getAllStateSlugs, slugToState, getStateData, stateToSlug,
  fmt, fmtFull, fmtPop,
} from "@/lib/scam-data";

/* ═══════════════════════════════════════════════════════════════════
   Generate static params for all 51 states/DC
   ═══════════════════════════════════════════════════════════════════ */
export function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ state: slug }));
}

/* ═══════════════════════════════════════════════════════════════════
   Dynamic metadata — local SEO optimized per state
   ═══════════════════════════════════════════════════════════════════ */
export function generateMetadata({ params }) {
  const stateName = slugToState(params.state);
  if (!stateName) {
    return { title: "State Not Found | ScamComplaints.org" };
  }
  const data = getStateData(stateName);
  const abbrev = data.abbrev;
  const losses = fmt(data.total.y25);
  const rank = data.total.rank;

  const percapRank = data.percap?.rank || "N/A";

  return {
    title: `Scams in ${stateName} (2025–2026): ${losses} Lost, #${rank} in the U.S. | Fraud Statistics`,
    description: `How much money did ${stateName} (${abbrev}) lose to scams in 2025? ${fmtFull(data.total.y25)} in reported fraud — ${data.yoyChange > 0 ? "up" : "down"} ${Math.abs(data.yoyChange).toFixed(0)}% from 2024. See ${stateName} scam rankings, top fraud types, metro area breakdown, and how to report a scam in ${stateName}.`,
    keywords: `scams in ${stateName}, ${stateName} scam statistics, ${stateName} fraud report, how to report a scam in ${stateName}, ${stateName} internet crime, ${stateName} online fraud, ${abbrev} scam losses, ${stateName} identity theft, ${stateName} consumer protection`,
    alternates: { canonical: `/state-of-scams-2026-${params.state}` },
    openGraph: {
      title: `Scams in ${stateName}: ${losses} Lost to Fraud in 2025 — Full Report`,
      description: `${stateName} ranks #${rank} in total scam losses and #${percapRank} per capita. FBI IC3 & FTC data, top scam types, metro areas, and protection tips.`,
      type: "article",
    },
  };
}

/* ── Reusable components ────────────────────────────────────────── */
function StatCard({ number, label, change, changeColor }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-red-600 sm:text-3xl">{number}</div>
      <div className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</div>
      {change && (
        <div className={`mt-1 text-xs font-semibold ${changeColor || "text-red-600"}`}>{change}</div>
      )}
    </div>
  );
}

function SectionH2({ id, children }) {
  return (
    <h2 id={id} className="mt-16 scroll-mt-20 border-b-2 border-red-500 pb-2 text-2xl font-bold text-slate-900 sm:text-3xl">
      {children}
    </h2>
  );
}

function Callout({ emoji, title, children, variant = "default" }) {
  const border =
    variant === "warning" ? "border-amber-400 bg-amber-50"
    : variant === "info" ? "border-sky-400 bg-sky-50"
    : "border-red-400 bg-red-50";
  return (
    <div className={`my-6 rounded-lg border-l-4 ${border} p-5`}>
      <p className="font-semibold text-slate-800">{emoji} {title}</p>
      <div className="mt-2 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

/* ── Top scam descriptions per state (contextual) ───────────────── */
const SCAM_DESCRIPTIONS = {
  "Investment Fraud (incl. Pig Butchering)": "Fraudulent crypto and forex platforms — often preceded by weeks of friendly texting or dating-app conversation — where victims watch fabricated returns pile up before the scammer vanishes with their money.",
  "Business Email Compromise (BEC)": "A spoofed email from the CEO or a trusted vendor lands in an employee's inbox requesting an urgent wire transfer. By the time anyone notices, the money's in an overseas account.",
  "Tech / Customer Support Scams": "A pop-up freezes your screen. A fake Microsoft or Apple rep calls. Older adults sometimes get talked into converting savings to gold bars and handing them to a courier who shows up at the front door.",
  "Personal Data Breach": "When hackers or insiders expose sensitive records — Social Security numbers, medical data, financial accounts — the downstream identity theft can linger for years.",
  "Confidence / Romance Scams": "Weeks of emotional bonding with someone who isn't real, followed by an invented emergency that requires cash. AI-generated photos and deepfake video calls make these harder to spot than ever.",
  "Government Impersonation": "'This is the IRS. There's a warrant for your arrest.' Robocalls and spoofed caller IDs make the threat feel genuine — and victims pay before thinking twice.",
  "Employment / Job Scams": "Fake remote-work listings, bogus recruiters, and 'task scams' that pay small amounts for simple online tasks before asking victims to invest larger sums into platforms that don't exist.",
  "Credit Card / Check Fraud": "Stolen card numbers, counterfeit checks, and card-not-present fraud that drains accounts before alerts even fire.",
  "Real Estate Fraud": "A single spoofed email during closing can redirect a down payment to a scammer's account. Title theft and fake rental listings round out a category that hit $275M nationally.",
  "Phishing / Spoofing": "The most-reported scam by volume. One stolen password can cascade into a drained bank account, a hijacked email, or a full-blown identity theft case.",
  "Lottery / Sweepstakes / Inheritance": "You didn't win anything. The 'prize' notification is bait — victims pay fees, taxes, or 'processing charges' for a windfall that never arrives.",
  "Identity Theft": "Stolen personal details used to open credit lines, file bogus tax returns, or commit crimes under someone else's name — damage that can take years to untangle.",
  "Extortion / Sextortion": "Threats to release real or fabricated compromising images unless the victim pays up. Increasingly targeting teenagers through social media with AI-generated content.",
};

/* ═══════════════════════════════════════════════════════════════════
   State Page Component
   ═══════════════════════════════════════════════════════════════════ */
export default function StatePage({ params }) {
  const stateName = slugToState(params.state);

  if (!stateName) {
    return (
      <article className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-900">State Not Found</h1>
        <p className="mt-4 text-slate-600">
          Sorry, we don&rsquo;t have data for this state.{" "}
          <Link href="/state-of-scams-2026" className="text-red-600 underline">
            View the full national report →
          </Link>
        </p>
      </article>
    );
  }

  const data = getStateData(stateName);
  const { abbrev, pop, total, percap, metros, yoyChange, percapYoyChange, shareOfNational, nationalTotal25 } = data;
  const yoyDir = yoyChange >= 0 ? "↑" : "↓";
  const yoySign = yoyChange >= 0 ? "+" : "";
  const percapDir = percapYoyChange >= 0 ? "↑" : "↓";

  // Determine neighboring states (by rank) for context
  const rankIdx = total.rank - 1;
  const aboveState = rankIdx > 0 ? STATES_TOTAL[rankIdx - 1] : null;
  const belowState = rankIdx < STATES_TOTAL.length - 1 ? STATES_TOTAL[rankIdx + 1] : null;

  // Top scams nationally (for state context section)
  const topScamsForDisplay = TOP25.slice(0, 10);

  // Structured data for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Scams in ${stateName}: ${fmt(total.y25)} Lost to Online Fraud in 2025`,
    description: `${stateName} residents reported ${fmtFull(total.y25)} in scam losses in 2025 — ranked #${total.rank} nationally. Full fraud statistics, metro area breakdown, and how to report a scam in ${stateName}.`,
    datePublished: "2026-07-03",
    dateModified: "2026-07-03",
    author: { "@type": "Organization", name: "Social Catfish", url: "https://socialcatfish.com" },
    publisher: { "@type": "Organization", name: "ScamComplaints.org", url: "https://scamcomplaints.org" },
    about: {
      "@type": "Place",
      name: stateName,
      address: { "@type": "PostalAddress", addressRegion: abbrev, addressCountry: "US" },
    },
    mainEntityOfPage: `https://scamcomplaints.org/state-of-scams-2026-${params.state}`,
    isPartOf: {
      "@type": "Article",
      name: "State of Scams 2026",
      url: "https://scamcomplaints.org/state-of-scams-2026",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much money did ${stateName} lose to scams in 2025?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${stateName} residents reported ${fmtFull(total.y25)} in losses to the FBI's Internet Crime Complaint Center in 2025, ranking #${total.rank} nationally.`,
        },
      },
      {
        "@type": "Question",
        name: `What are the most common scams in ${stateName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The biggest threats nationally are investment fraud ($8.65B), business email compromise ($3.05B), tech support scams ($2.13B), and romance scams ($929M). Phishing is the most common by volume.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I report a scam in ${stateName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Report to the FBI IC3 at ic3.gov, the FTC at reportfraud.ftc.gov, the ${stateName} Attorney General's consumer protection office, or ScamComplaints.org.`,
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://scamcomplaints.org" },
      { "@type": "ListItem", position: 2, name: "State of Scams 2026", item: "https://scamcomplaints.org/state-of-scams-2026" },
      { "@type": "ListItem", position: 3, name: `${stateName} Scams`, item: `https://scamcomplaints.org/state-of-scams-2026-${params.state}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {/* ── Breadcrumb ───────────────────────────────────────── */}
        <nav className="mb-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/state-of-scams-2026" className="hover:text-slate-600">State of Scams 2026</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{stateName}</span>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Scams in {stateName}: 2025–2026 Fraud Statistics &amp;&nbsp;Report
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
          According to the FBI&rsquo;s latest IC3 filing, {stateName} residents lost{" "}
          <strong className="text-red-600">{fmtFull(total.y25)}</strong> to internet scams in 2025 &mdash;{" "}
          {yoyChange >= 0 ? "a" : "a"}{" "}
          <strong>{Math.abs(yoyChange).toFixed(1)}%</strong>{" "}
          {yoyChange >= 0 ? "jump" : "drop"} from the prior year.
          That puts {stateName} at <strong>#{total.rank}</strong> nationally for total losses
          and <strong>#{percap?.rank || "N/A"}</strong> when you adjust for population.
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Published July 2026 · Data from FBI IC3 & FTC Consumer Sentinel · By{" "}
          <a href="https://socialcatfish.com" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">
            Social Catfish
          </a>{" "}Research
        </p>

        {/* ── Key stat cards ───────────────────────────────────── */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            number={fmt(total.y25)}
            label={`Total Losses in ${abbrev} (2025)`}
            change={`${yoyDir} ${yoySign}${yoyChange.toFixed(1)}% from 2024`}
          />
          <StatCard
            number={`#${total.rank}`}
            label="National Rank (Total Losses)"
          />
          <StatCard
            number={`#${percap?.rank || "N/A"}`}
            label="Per Capita Rank"
            change={percap ? `${percapDir} ${percapYoyChange > 0 ? "+" : ""}${percapYoyChange.toFixed(1)}% YoY` : undefined}
          />
          <StatCard
            number={`${shareOfNational.toFixed(1)}%`}
            label="Share of National Losses"
          />
        </div>

        {/* ── TOC ──────────────────────────────────────────────── */}
        <nav className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">📋 In This Report</h3>
          <ol className="mt-3 list-inside list-decimal space-y-1 text-sm">
            {[
              ["snapshot", `${stateName} at a Glance`],
              ["trends", "Year-Over-Year Trends"],
              ["rankings", `How ${stateName} Compares`],
              ...(metros.length > 0 ? [["metros", `${stateName} Metro Areas`]] : []),
              ["top-scams", `Most Dangerous Scams in ${stateName}`],
              ["protect", `How ${stateName} Residents Can Protect Themselves`],
              ["report", `How to Report a Scam in ${stateName}`],
              ["faq", `FAQ: Scams in ${stateName}`],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-red-600">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ═══════════ 1. SNAPSHOT ═══════════ */}
        <SectionH2 id="snapshot">1. {stateName} at a Glance</SectionH2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-4 py-3">Metric</th>
                <th className="px-4 py-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {[
                ["Total Scam Losses (2025)", fmtFull(total.y25)],
                ["Total Scam Losses (2024)", fmtFull(total.y24)],
                ["Year-Over-Year Change", `${yoySign}${yoyChange.toFixed(1)}%`],
                ["National Rank (Total Losses)", `#${total.rank} of 51`],
                ["National Rank (Per Capita)", `#${percap?.rank || "N/A"} of 51`],
                ["Per Capita Losses (2025)", percap ? `$${(percap.y25 / 100000).toFixed(0)} per 100K residents` : "N/A"],
                ["Population (2024 est.)", fmtPop(pop)],
                ["Share of U.S. Total", `${shareOfNational.toFixed(1)}%`],
              ].map(([metric, value], i) => (
                <tr key={i} className="even:bg-slate-50 hover:bg-slate-100">
                  <td className="px-4 py-2 font-medium text-slate-800">{metric}</td>
                  <td className="px-4 py-2 text-right font-semibold text-slate-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ═══════════ 2. TRENDS ═══════════ */}
        <SectionH2 id="trends">2. Year-Over-Year Trends</SectionH2>

        <div className="mt-4 space-y-4 leading-relaxed text-slate-700">
          <p>
            In 2024, {stateName} residents reported {fmtFull(total.y24)} in losses to the FBI&rsquo;s IC3.
            A year later that number moved to {fmtFull(total.y25)} &mdash; a{" "}
            <strong className={yoyChange >= 0 ? "text-red-600" : "text-emerald-600"}>
              {Math.abs(yoyChange).toFixed(1)}%
            </strong>{" "}
            {yoyChange >= 0 ? "climb" : "decline"} that {yoyChange >= 0 ? "tracks above" : "bucks"} the national trend.
          </p>

          {yoyChange > 30 && (
            <Callout emoji="🚨" title={`${stateName} losses growing faster than the national average`}>
              Nationally, losses climbed 25.8%. {stateName}&rsquo;s {yoyChange.toFixed(1)}% surge runs{" "}
              {(yoyChange - 25.8).toFixed(1)} percentage points above that baseline &mdash; a gap wide enough to suggest{" "}
              {stateName} is dealing with a concentration of fraud activity that deserves closer scrutiny.
            </Callout>
          )}

          {yoyChange < 0 && (
            <Callout emoji="📉" title={`${stateName} saw a decline in reported losses`} variant="info">
              Most states trended up; {stateName}&rsquo;s losses fell{" "}
              {Math.abs(yoyChange).toFixed(1)}%. It&rsquo;s tempting to call that progress, but it may also reflect
              shifts in how victims report rather than fewer scams taking place.
            </Callout>
          )}

          <p>
            For context, the national tab came to <strong>{fmt(nationalTotal25)}</strong> last year, up 25.8% from 2024.
            {stateName}&rsquo;s slice: <strong>{shareOfNational.toFixed(1)}%</strong> of every dollar reported stolen.
          </p>

          {percap && (
            <p>
              Adjusting for population, {stateName} sits at <strong>#{percap.rank}</strong>.
              That works out to <strong>${(percap.y25 / 100000).toLocaleString("en-US", { maximumFractionDigits: 0 })}</strong> lost
              for every 100,000 residents in 2025{percap.y24 ? ` — up from $${(percap.y24 / 100000).toLocaleString("en-US", { maximumFractionDigits: 0 })} the year before` : ""}.
            </p>
          )}
        </div>

        {/* ═══════════ 3. RANKINGS ═══════════ */}
        <SectionH2 id="rankings">3. How {stateName} Compares</SectionH2>

        <p className="mt-4 leading-relaxed text-slate-700">
          To put {stateName}&rsquo;s position in context, here are the states closest to it in the FBI&rsquo;s loss rankings:
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-3 py-2 text-center">Rank</th>
                <th className="px-3 py-2">State</th>
                <th className="px-3 py-2 text-right">2025 Losses</th>
                <th className="px-3 py-2 text-right">2024 Losses</th>
                <th className="px-3 py-2 text-right">YoY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(() => {
                // Show surrounding states: 2 above, current, 2 below (or top 5 if rank<=3)
                const start = Math.max(0, total.rank - 3);
                const end = Math.min(STATES_TOTAL.length, total.rank + 2);
                const visible = STATES_TOTAL.slice(start, end);
                return visible.map((s) => {
                  const isCurrent = s.st === stateName;
                  const change = ((s.y25 - s.y24) / s.y24 * 100);
                  return (
                    <tr key={s.rank} className={isCurrent ? "bg-red-50 font-semibold" : "even:bg-slate-50 hover:bg-slate-100"}>
                      <td className="px-3 py-2 text-center font-bold text-red-600">{s.rank}</td>
                      <td className="px-3 py-2 text-slate-800">
                        {isCurrent ? (
                          <span className="font-bold">{s.st} ←</span>
                        ) : (
                          <Link href={`/state-of-scams-2026-${stateToSlug(s.st)}`} className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-red-600">
                            {s.st}
                          </Link>
                        )}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-900">{fmtFull(s.y25)}</td>
                      <td className="px-3 py-2 text-right text-slate-600">{fmtFull(s.y24)}</td>
                      <td className={`px-3 py-2 text-right font-semibold ${change >= 0 ? "text-red-600" : "text-emerald-600"}`}>
                        {change >= 0 ? "+" : ""}{change.toFixed(1)}%
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          <Link href="/state-of-scams-2026#by-state" className="text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
            View all 50 states + DC ranked →
          </Link>
        </p>

        {/* ═══════════ 4. METRO AREAS ═══════════ */}
        {metros.length > 0 && (
          <>
            <SectionH2 id="metros">4. {stateName} Metro Areas in the FTC Top 50</SectionH2>
            <p className="mt-4 leading-relaxed text-slate-700">
              The FTC&rsquo;s Consumer Sentinel data breaks fraud reports down by metro area. {metros.length === 1 ? "One" : metros.length}{" "}
              {stateName} metro {metros.length === 1 ? "area landed" : "areas landed"} in the national top 50 for per-capita fraud complaints:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-3 py-2 text-center">National Rank</th>
                    <th className="px-3 py-2">Metro Area</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {metros.map((m) => (
                    <tr key={m.rank} className="even:bg-slate-50 hover:bg-slate-100">
                      <td className="px-3 py-2 text-center font-bold text-red-600">#{m.rank}</td>
                      <td className="px-3 py-2 font-medium text-slate-800">{m.metro}, {m.states}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {metros.some((m) => m.rank <= 10) && (
              <Callout emoji="⚠️" title={`${stateName} has a metro area in the national top 10`} variant="warning">
                {metros.filter((m) => m.rank <= 10).map((m) => m.metro).join(" and ")} cracked the national top&nbsp;10 for per-capita fraud reports.
                If you live in {metros.length > 1 ? "either of those areas" : "that area"}, the odds of encountering a scam attempt are measurably higher than the national average.
              </Callout>
            )}
          </>
        )}

        {/* ═══════════ 5. TOP SCAMS ═══════════ */}
        <SectionH2 id="top-scams">{metros.length > 0 ? "5" : "4"}. Most Dangerous Scams Affecting {stateName}</SectionH2>

        <p className="mt-4 leading-relaxed text-slate-700">
          The FBI doesn&rsquo;t publish scam-type breakdowns at the state level, but the national data offers a strong proxy for what {stateName} residents are up against. Here are the ten costliest categories in 2025:
        </p>

        <div className="mt-6 space-y-6">
          {topScamsForDisplay.map((scam) => {
            const change = scam.y24 ? ((scam.y25 - scam.y24) / scam.y24 * 100) : null;
            const desc = SCAM_DESCRIPTIONS[scam.name];
            return (
              <div key={scam.rank} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      <span className="mr-2 inline-block rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                        #{scam.rank}
                      </span>
                      {scam.name}
                    </h3>
                    {desc && <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-lg font-bold text-red-600">{fmt(scam.y25)}</div>
                    {change !== null && (
                      <div className={`text-xs font-semibold ${change >= 0 ? "text-red-500" : "text-emerald-500"}`}>
                        {change >= 0 ? "+" : ""}{change.toFixed(1)}% YoY
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          <Link href="/state-of-scams-2026#top25" className="text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
            See all 25 scam types with full 3-year data →
          </Link>
        </p>

        {/* ═══════════ 6. PROTECTION ═══════════ */}
        <SectionH2 id="protect">{metros.length > 0 ? "6" : "5"}. How {stateName} Residents Can Protect Themselves</SectionH2>

        <div className="mt-6 space-y-4 leading-relaxed text-slate-700">
          <p>
            {fmt(total.y25)} didn&rsquo;t disappear into thin air &mdash; it was taken from real {stateName} families. A few habits can cut your risk dramatically:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "🔍",
                title: "Verify Before You Trust",
                text: "Run a reverse image search on profile photos. Tools like Social Catfish let you check a photo, phone number, or email against public records in seconds — before you send a dime.",
              },
              {
                icon: "🛑",
                title: "Never Send Money to Strangers",
                text: "No real company or government agency will ever demand payment in gift cards, crypto, or wire transfers. Full stop. If someone asks for those, it's a scam.",
              },
              {
                icon: "🔒",
                title: "Enable Two-Factor Authentication",
                text: "It takes 30 seconds to turn on 2FA for your email, bank, and social accounts. That one step blocks most account-takeover attempts cold.",
              },
              {
                icon: "📞",
                title: "Verify Independently",
                text: "Got a call claiming to be your bank or the IRS? Hang up. Find the official number yourself and call back. Scammers spoof caller ID — the number on your screen means nothing.",
              },
              {
                icon: "🧊",
                title: "Slow Down High-Pressure Situations",
                text: "The urgency is the tell. 'Act now or lose everything' is a psychological lever, not a fact. Any legitimate request can survive a 24-hour pause.",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Talk to Vulnerable Family Members",
                text: `Seniors lost $7.75 billion last year — more than any other age group. If you have older family members in ${stateName}, a candid conversation about scam tactics could save them thousands.`,
              },
            ].map((tip, i) => (
              <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-2xl">{tip.icon}</div>
                <h3 className="mt-2 font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════ 7. REPORTING ═══════════ */}
        <SectionH2 id="report">{metros.length > 0 ? "7" : "6"}. How to Report a Scam in {stateName}</SectionH2>

        <div className="mt-4 space-y-3 leading-relaxed text-slate-700">
          <p>
            Been scammed &mdash; or suspect someone you know in {stateName} has? Filing a report matters, even if you think it&rsquo;s too late. Every complaint helps law enforcement spot patterns and, in some cases, claw money back:
          </p>

          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              <strong>FBI IC3:</strong>{" "}
              <a href="https://www.ic3.gov" className="text-red-600 underline hover:text-red-700" target="_blank" rel="noopener noreferrer">
                ic3.gov
              </a>{" "}
              — File a complaint for any internet-enabled crime
            </li>
            <li>
              <strong>FTC:</strong>{" "}
              <a href="https://reportfraud.ftc.gov" className="text-red-600 underline hover:text-red-700" target="_blank" rel="noopener noreferrer">
                reportfraud.ftc.gov
              </a>{" "}
              — Report fraud, scams, and bad business practices
            </li>
            <li>
              <strong>{stateName} Attorney General:</strong> Contact your state AG&rsquo;s consumer protection division
            </li>
            <li>
              <strong>Local Police:</strong> File a police report, especially for in-person or local scams
            </li>
            <li>
              <strong>ScamComplaints.org:</strong>{" "}
              <Link href="/" className="text-red-600 underline hover:text-red-700">
                File a report here
              </Link>{" "}
              to warn others and build your case
            </li>
          </ul>
        </div>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center shadow-lg sm:p-10">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Think You&rsquo;re Being Scammed?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-slate-300">
            Verify anyone&rsquo;s identity instantly. Social Catfish has helped millions of people uncover
            scammers before losing money.
          </p>
          <a
            href="https://socialcatfish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-red-600 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:bg-red-700"
          >
            Run a Free Search →
          </a>
        </div>

        {/* ── FAQ (local SEO + featured snippets) ─────────────── */}
        <SectionH2 id="faq">{metros.length > 0 ? "8" : "7"}. Frequently Asked Questions About Scams in {stateName}</SectionH2>
        <div className="mt-6 space-y-6">
          {[
            {
              q: `How much money did ${stateName} lose to scams in 2025?`,
              a: `${stateName} residents reported ${fmtFull(total.y25)} in losses to the FBI's Internet Crime Complaint Center (IC3) in 2025. That's a ${Math.abs(yoyChange).toFixed(1)}% ${yoyChange >= 0 ? "increase" : "decrease"} from ${fmtFull(total.y24)} in 2024. ${stateName} ranks #${total.rank} nationally for total scam losses.`,
            },
            {
              q: `What are the most common scams in ${stateName}?`,
              a: `While the FBI doesn't publish scam-type data at the state level, the biggest threats nationally — and almost certainly in ${stateName} — are investment fraud ($8.65B), business email compromise ($3.05B), tech support scams ($2.13B), and romance scams ($929M). Phishing is the most common by volume with over 191,000 complaints.`,
            },
            {
              q: `How do I report a scam in ${stateName}?`,
              a: `File a complaint with the FBI's IC3 at ic3.gov for internet-related fraud. You can also report to the FTC at reportfraud.ftc.gov, contact the ${stateName} Attorney General's consumer protection office, file a local police report, or submit a report at ScamComplaints.org.`,
            },
            {
              q: `How does ${stateName} compare to other states for scam losses?`,
              a: `${stateName} ranks #${total.rank} out of 51 (all states plus D.C.) for total reported scam losses and #${percap?.rank || "N/A"} on a per-capita basis. ${stateName} accounts for ${shareOfNational.toFixed(1)}% of the $20.8 billion in national losses.`,
            },
            {
              q: `Are scams getting worse in ${stateName}?`,
              a: yoyChange >= 0
                ? `Yes. Reported scam losses in ${stateName} increased ${yoyChange.toFixed(1)}% from 2024 to 2025. Nationally, losses are up 25.8% year over year and have grown 67% in just two years.`
                : `Reported losses in ${stateName} actually decreased ${Math.abs(yoyChange).toFixed(1)}% from 2024 to 2025, though the national trend is upward — losses grew 25.8% nationwide. The decline may reflect changes in reporting rather than fewer scams.`,
            },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>

        {/* ── Methodology ──────────────────────────────────────── */}
        <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">📊 Methodology</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Dollar-loss figures by state come from the FBI IC3&rsquo;s 2024 and 2025 annual reports. We calculated
            per-capita numbers using the Census Bureau&rsquo;s 2024 population estimates. Metro rankings draw on FTC
            Consumer Sentinel complaint data. Scam-type breakdowns reflect IC3 crime-type categories and are national,
            not state-specific. Keep in mind that the FBI itself estimates only 2&ndash;6% of victims ever file
            complaints &mdash; so {stateName}&rsquo;s real losses could realistically run 17 to 50 times what appears here.
          </p>
        </div>

        {/* ── Back to national + state navigation ──────────────── */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-400">
            Explore Other States
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {STATES_TOTAL.map((s) => {
              const isCurrent = s.st === stateName;
              return (
                <Link
                  key={s.st}
                  href={`/state-of-scams-2026-${stateToSlug(s.st)}`}
                  className={`rounded px-2 py-1 text-xs font-medium transition ${
                    isCurrent
                      ? "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  {STATE_ABBREV[s.st] || s.st}
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-center">
            <Link
              href="/state-of-scams-2026"
              className="inline-block rounded-lg border-2 border-red-600 px-6 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              ← View Full National Report
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
