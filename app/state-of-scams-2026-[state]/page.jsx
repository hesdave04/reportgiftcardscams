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

  return {
    title: `${stateName} Scam Statistics 2025–2026: ${losses} Lost — Ranked #${rank} in the U.S.`,
    description: `${stateName} (${abbrev}) residents lost ${fmtFull(data.total.y25)} to internet scams in 2025 — a ${data.yoyChange > 0 ? "+" : ""}${data.yoyChange.toFixed(0)}% change from 2024. See ${stateName}'s rankings, metro area breakdown, top scam types, and how to protect yourself.`,
    alternates: { canonical: `/state-of-scams-2026-${params.state}` },
    openGraph: {
      title: `${stateName} Scam Statistics 2025–2026: ${losses} Lost`,
      description: `${stateName} ranks #${rank} in total scam losses and #${data.percap?.rank || "N/A"} per capita. Full data from FBI IC3 & FTC.`,
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
  "Investment Fraud (incl. Pig Butchering)": "Fake investment platforms and 'pig butchering' schemes where scammers build trust over weeks before luring victims into fraudulent crypto or forex trading platforms.",
  "Business Email Compromise (BEC)": "Criminals impersonate executives, vendors, or business partners via spoofed emails to trick companies into wiring funds to fraudulent accounts.",
  "Tech / Customer Support Scams": "Fake tech support pop-ups, calls, or emails claiming your device is infected, then charging hundreds or thousands for unnecessary 'repairs.'",
  "Personal Data Breach": "Exposure of sensitive personal information through hacking, phishing, or insider threats, leading to identity theft and financial fraud.",
  "Confidence / Romance Scams": "Scammers create fake online identities to build emotional relationships, then exploit that trust to steal money — often through fabricated emergencies.",
  "Government Impersonation": "Callers or emailers posing as IRS agents, Social Security officials, or law enforcement, threatening arrest or legal action to extract payments.",
  "Employment / Job Scams": "Fake job listings and recruiter scams that trick job seekers into paying for training, equipment, or background checks that never materialize.",
  "Credit Card / Check Fraud": "Unauthorized use of credit card numbers or creation of counterfeit checks to make purchases or withdraw funds.",
  "Real Estate Fraud": "Wire fraud targeting home buyers, fake rental listings, title theft, and mortgage fraud schemes.",
  "Phishing / Spoofing": "Deceptive emails, texts, or websites designed to steal login credentials, financial information, or install malware.",
  "Lottery / Sweepstakes / Inheritance": "Victims told they've won a prize or inherited money but must pay fees or taxes upfront to claim their nonexistent windfall.",
  "Identity Theft": "Criminals steal personal information to open accounts, file fraudulent tax returns, or commit crimes under someone else's identity.",
  "Extortion / Sextortion": "Threats to release compromising images or information unless the victim pays — increasingly targeting teenagers and young adults.",
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
    headline: `${stateName} Scam Statistics 2025–2026: ${fmt(total.y25)} Lost`,
    description: `${stateName} residents reported ${fmtFull(total.y25)} in scam losses in 2025. Ranked #${total.rank} nationally and #${percap?.rank || "N/A"} per capita.`,
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
          {stateName} Scam Report 2025–2026
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
          {stateName} residents reported{" "}
          <strong className="text-red-600">{fmtFull(total.y25)}</strong> in scam losses to the FBI in 2025 —{" "}
          {yoyChange >= 0 ? "an increase" : "a decrease"} of{" "}
          <strong>{Math.abs(yoyChange).toFixed(1)}%</strong> from 2024.
          That ranks {stateName} <strong>#{total.rank}</strong> in the nation for total losses
          and <strong>#{percap?.rank || "N/A"}</strong> per capita.
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
              ["report", "How to Report a Scam"],
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
            Between 2024 and 2025, scam losses in {stateName} went from{" "}
            <strong>{fmtFull(total.y24)}</strong> to <strong>{fmtFull(total.y25)}</strong> — a{" "}
            <strong className={yoyChange >= 0 ? "text-red-600" : "text-emerald-600"}>
              {yoySign}{yoyChange.toFixed(1)}%
            </strong>{" "}
            {yoyChange >= 0 ? "increase" : "decrease"}.
          </p>

          {yoyChange > 30 && (
            <Callout emoji="🚨" title={`${stateName} losses growing faster than the national average`}>
              The national average increase was 25.8%. {stateName}&rsquo;s {yoyChange.toFixed(1)}% jump is{" "}
              {(yoyChange - 25.8).toFixed(1)} percentage points above the national trend, signaling that{" "}
              {stateName} residents may be facing an outsized scam problem.
            </Callout>
          )}

          {yoyChange < 0 && (
            <Callout emoji="📉" title={`${stateName} saw a decline in reported losses`} variant="info">
              While most states saw increases, {stateName}&rsquo;s losses dropped by{" "}
              {Math.abs(yoyChange).toFixed(1)}%. This could reflect better fraud prevention or
              changes in reporting patterns.
            </Callout>
          )}

          <p>
            Nationally, Americans lost <strong>{fmt(nationalTotal25)}</strong> in 2025 — a 25.8% increase from 2024.
            {stateName} accounted for <strong>{shareOfNational.toFixed(1)}%</strong> of that total.
          </p>

          {percap && (
            <p>
              On a per capita basis, {stateName} ranked <strong>#{percap.rank}</strong> nationally.
              For every 100,000 {stateName} residents, <strong>${(percap.y25 / 100000).toLocaleString("en-US", { maximumFractionDigits: 0 })}</strong> was
              reported lost to scams in 2025{percap.y24 ? `, compared to $${(percap.y24 / 100000).toLocaleString("en-US", { maximumFractionDigits: 0 })} in 2024` : ""}.
            </p>
          )}
        </div>

        {/* ═══════════ 3. RANKINGS ═══════════ */}
        <SectionH2 id="rankings">3. How {stateName} Compares</SectionH2>

        <p className="mt-4 leading-relaxed text-slate-700">
          Here&rsquo;s where {stateName} falls among the states with the highest total scam losses in 2025:
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
              The FTC tracks scam reports by metropolitan area. {metros.length === 1 ? "One" : metros.length}{" "}
              {stateName} metro {metros.length === 1 ? "area appears" : "areas appear"} in the national top 50 for fraud reports per capita:
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
                {metros.filter((m) => m.rank <= 10).map((m) => m.metro).join(" and ")} ranked among the
                10 most-scammed metro areas in the entire United States. Residents in {metros.length > 1 ? "these areas" : "this area"} should
                be especially vigilant.
              </Callout>
            )}
          </>
        )}

        {/* ═══════════ 5. TOP SCAMS ═══════════ */}
        <SectionH2 id="top-scams">{metros.length > 0 ? "5" : "4"}. Most Dangerous Scams Affecting {stateName}</SectionH2>

        <p className="mt-4 leading-relaxed text-slate-700">
          While the FBI does not break down scam types by state, the national trends paint a clear picture
          of the threats {stateName} residents face. These are the top scam categories nationally in 2025:
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
            With {fmt(total.y25)} lost to scams in {stateName} in 2025 alone, it has never been more important for
            {" "}{stateName} residents to stay informed and vigilant. Here are proven strategies to protect yourself:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "🔍",
                title: "Verify Before You Trust",
                text: "Use reverse image search tools like Social Catfish to verify photos, phone numbers, and email addresses before sending money or sharing personal information.",
              },
              {
                icon: "🛑",
                title: "Never Send Money to Strangers",
                text: "Legitimate businesses and government agencies will never ask for payment via gift cards, cryptocurrency, or wire transfers.",
              },
              {
                icon: "🔒",
                title: "Enable Two-Factor Authentication",
                text: "Add an extra layer of security to your email, banking, and social media accounts to prevent unauthorized access.",
              },
              {
                icon: "📞",
                title: "Verify Independently",
                text: "If someone claims to be from a company or agency, hang up and call the organization directly using a number from their official website.",
              },
              {
                icon: "🧊",
                title: "Slow Down High-Pressure Situations",
                text: "Scammers create urgency to prevent you from thinking critically. Any legitimate request can wait for verification.",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Talk to Vulnerable Family Members",
                text: `Adults over 60 lost $7.75 billion nationally in 2025. Have frank conversations with older ${stateName} residents about common scam tactics.`,
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
            If you or someone you know in {stateName} has been the victim of a scam, report it immediately.
            Reporting helps law enforcement track scam trends and may help recover losses:
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

        {/* ── Methodology ──────────────────────────────────────── */}
        <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">📊 Methodology</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            State-level dollar loss data is sourced from the FBI&rsquo;s Internet Crime Complaint Center (IC3)
            2024 and 2025 Annual Reports. Per capita figures use 2024 Census population estimates. Metro area
            rankings come from FTC Consumer Sentinel data. National scam type data combines FBI IC3 crime
            type classifications. Not all scams are reported — the FBI estimates only 2–6% of victims file
            complaints, meaning {stateName}&rsquo;s true losses could be 17–50× higher than reported.
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
