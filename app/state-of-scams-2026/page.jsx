export const metadata = {
  title: "State of Scams 2026: America's Top 25 Scams — Every State & City Ranked",
  description:
    "Americans lost $20.8 billion to internet scams in 2025 — a 67% increase in 2 years. See the top 25 scams, 3-year FBI & FTC trends, and how every state and metro area ranks.",
  alternates: { canonical: "/state-of-scams-2026" },
  openGraph: {
    title: "State of Scams 2026: America's Top 25 Scams — Every State & City Ranked",
    description:
      "Americans lost $20.8 billion to internet scams in 2025 — up 67% in 2 years. Rankings for every scam type, every state, and 50 metro areas.",
    type: "article",
  },
};

/* ── helper ─────────────────────────────────────────────────────────── */
function fmt(n) {
  return "$" + Number(n).toLocaleString("en-US");
}

/* ── data ───────────────────────────────────────────────────────────── */
const TOP25 = [
  { rank: 1, name: "Investment Fraud (incl. Pig Butchering)", y25: 8648617756, y24: 6570639864, y23: 4570275683 },
  { rank: 2, name: "Business Email Compromise (BEC)", y25: 3046598558, y24: 2770151146, y23: 2946830270 },
  { rank: 3, name: "Tech / Customer Support Scams", y25: 2134675818, y24: 1464755976, y23: 924512658 },
  { rank: 4, name: "Personal Data Breach", y25: 1314923988, y24: 1453296303, y23: 744219879 },
  { rank: 5, name: "Confidence / Romance Scams", y25: 929287469, y24: 672009052, y23: 652544805 },
  { rank: 6, name: "Government Impersonation", y25: 797943193, y24: 405624084, y23: 394050518 },
  { rank: 7, name: "Non-Payment / Non-Delivery", y25: 503373587, y24: 785436888, y23: 309648416 },
  { rank: 8, name: "Data Breach (Corporate)", y25: 435240992, y24: 364855818, y23: 534397222 },
  { rank: 9, name: "Employment / Job Scams", y25: 362934762, y24: 264223271, y23: 70234079 },
  { rank: 10, name: "Credit Card / Check Fraud", y25: 282670235, y24: 199889841, y23: 173627614 },
  { rank: 11, name: "Real Estate Fraud", y25: 275110419, y24: 173586820, y23: 145243348 },
  { rank: 12, name: "Phishing / Spoofing", y25: 215843126, y24: 70013036, y23: 18728550 },
  { rank: 13, name: "Lottery / Sweepstakes / Inheritance", y25: 194147851, y24: 102212250, y23: 94502836 },
  { rank: 14, name: "Identity Theft", y25: 185832657, y24: 174354745, y23: 126203809 },
  { rank: 15, name: "Advance Fee Fraud", y25: 155910852, y24: 102074512, y23: 134516577 },
  { rank: 16, name: "Extortion / Sextortion", y25: 122499133, y24: 143185736, y23: 74821835 },
  { rank: 17, name: "Ransomware", y25: 32320105, y24: 12473156, y23: 59641384 },
  { rank: 18, name: "Harassment / Stalking", y25: 27707167, y24: 10611223, y23: 9677332 },
  { rank: 19, name: "IPR / Copyright / Counterfeit", y25: 26667006, y24: 8715512, y23: 7555329 },
  { rank: 20, name: "Overpayment Scams", y25: 22898075, y24: 21452521, y23: 27955195 },
  { rank: 21, name: "Malware", y25: 19370572, y24: 1365945, y23: 1213317 },
  { rank: 22, name: "SIM Swap", y25: 17366758, y24: 25983946, y23: 48798103 },
  { rank: 23, name: "Botnet", y25: 13859049, y24: 8860202, y23: 22422708 },
  { rank: 24, name: "Threats of Violence", y25: 9509532, y24: 1842186, y23: 13531178 },
  { rank: 25, name: "Charity Scams", y25: 7907609, y24: null, y23: null },
];

const STATES_TOTAL = [
  { rank: 1, st: "California", y25: 3674716305, y24: 2539041635 },
  { rank: 2, st: "Texas", y25: 1825636181, y24: 1351598183 },
  { rank: 3, st: "Florida", y25: 1596138595, y24: 1071909632 },
  { rank: 4, st: "New York", y25: 1226307877, y24: 903975003 },
  { rank: 5, st: "New Jersey", y25: 660411901, y24: 434856424 },
  { rank: 6, st: "Arizona", y25: 630700609, y24: 392441717 },
  { rank: 7, st: "Pennsylvania", y25: 537787231, y24: 400082312 },
  { rank: 8, st: "Illinois", y25: 535255201, y24: 479054271 },
  { rank: 9, st: "Georgia", y25: 534581965, y24: 420454472 },
  { rank: 10, st: "Virginia", y25: 476120025, y24: 317406595 },
  { rank: 11, st: "Washington", y25: 458165375, y24: 368203209 },
  { rank: 12, st: "North Carolina", y25: 431561716, y24: 324287947 },
  { rank: 13, st: "Ohio", y25: 421289526, y24: 278038028 },
  { rank: 14, st: "Massachusetts", y25: 410924066, y24: 338872378 },
  { rank: 15, st: "Maryland", y25: 390242821, y24: 238976904 },
  { rank: 16, st: "Michigan", y25: 381068131, y24: 241737979 },
  { rank: 17, st: "Colorado", y25: 355049719, y24: 243517403 },
  { rank: 18, st: "Nevada", y25: 302235247, y24: 268769310 },
  { rank: 19, st: "Tennessee", y25: 269214519, y24: 190271310 },
  { rank: 20, st: "South Carolina", y25: 264083026, y24: 146468765 },
  { rank: 21, st: "Minnesota", y25: 248892986, y24: 203352530 },
  { rank: 22, st: "Missouri", y25: 233933401, y24: 183751987 },
  { rank: 23, st: "Indiana", y25: 233016771, y24: 125093323 },
  { rank: 24, st: "Connecticut", y25: 219500212, y24: 143884002 },
  { rank: 25, st: "Utah", y25: 195417205, y24: 129414310 },
  { rank: 26, st: "Wisconsin", y25: 194227722, y24: 169942495 },
  { rank: 27, st: "Oregon", y25: 193196479, y24: 144160344 },
  { rank: 28, st: "Alabama", y25: 167212658, y24: 103771880 },
  { rank: 29, st: "Kansas", y25: 147337101, y24: 80300908 },
  { rank: 30, st: "Oklahoma", y25: 131921776, y24: 113724886 },
  { rank: 31, st: "Kentucky", y25: 119685861, y24: 73919940 },
  { rank: 32, st: "Hawaii", y25: 106447375, y24: 55180901 },
  { rank: 33, st: "Louisiana", y25: 105440238, y24: 87411457 },
  { rank: 34, st: "Arkansas", y25: 102541947, y24: 51714039 },
  { rank: 35, st: "District of Columbia", y25: 97368097, y24: 291531458 },
  { rank: 36, st: "Iowa", y25: 95520131, y24: 72860333 },
  { rank: 37, st: "West Virginia", y25: 92648544, y24: 24196661 },
  { rank: 38, st: "Idaho", y25: 88725284, y24: 63035342 },
  { rank: 39, st: "New Mexico", y25: 85571285, y24: 76621670 },
  { rank: 40, st: "Mississippi", y25: 77360761, y24: 65613936 },
  { rank: 41, st: "Rhode Island", y25: 71960439, y24: 23597036 },
  { rank: 42, st: "Nebraska", y25: 71844724, y24: 46730894 },
  { rank: 43, st: "Delaware", y25: 62012494, y24: 37611598 },
  { rank: 44, st: "New Hampshire", y25: 59283023, y24: 52811455 },
  { rank: 45, st: "Maine", y25: 56536020, y24: 31455797 },
  { rank: 46, st: "Montana", y25: 53192859, y24: 31603407 },
  { rank: 47, st: "South Dakota", y25: 51452806, y24: 24957446 },
  { rank: 48, st: "Alaska", y25: 39972438, y24: 26296803 },
  { rank: 49, st: "North Dakota", y25: 37865442, y24: 21831953 },
  { rank: 50, st: "Vermont", y25: 26567033, y24: 11285112 },
  { rank: 51, st: "Wyoming", y25: 25826205, y24: 43502744 },
];

const STATES_PERCAP = [
  { rank: 1, st: "District of Columbia", y25: 14037165, y24: 41513914 },
  { rank: 2, st: "California", y25: 9337282, y24: 6439159 },
  { rank: 3, st: "Nevada", y25: 9208347, y24: 8225617 },
  { rank: 4, st: "Arizona", y25: 8272766, y24: 5175704 },
  { rank: 5, st: "Hawaii", y25: 7429222, y24: 3815721 },
  { rank: 6, st: "New Jersey", y25: 6916601, y24: 4577026 },
  { rank: 7, st: "Florida", y25: 6802930, y24: 4586256 },
  { rank: 8, st: "Rhode Island", y25: 6456625, y24: 2121448 },
  { rank: 9, st: "Maryland", y25: 6228591, y24: 3815560 },
  { rank: 10, st: "New York", y25: 6130795, y24: 4550077 },
  { rank: 11, st: "Connecticut", y25: 5950941, y24: 3915137 },
  { rank: 12, st: "Colorado", y25: 5905133, y24: 4087582 },
  { rank: 13, st: "Delaware", y25: 5850500, y24: 3575529 },
  { rank: 14, st: "Texas", y25: 5757321, y24: 4319470 },
  { rank: 15, st: "Massachusetts", y25: 5743909, y24: 4748658 },
  { rank: 16, st: "Washington", y25: 5726337, y24: 4626726 },
  { rank: 17, st: "Utah", y25: 5521970, y24: 3693739 },
  { rank: 18, st: "South Dakota", y25: 5502421, y24: 2699068 },
  { rank: 19, st: "Alaska", y25: 5421682, y24: 3552983 },
  { rank: 20, st: "Virginia", y25: 5361647, y24: 3602310 },
  { rank: 21, st: "West Virginia", y25: 5245800, y24: 1367059 },
  { rank: 22, st: "Kansas", y25: 4948815, y24: 2703183 },
  { rank: 23, st: "South Carolina", y25: 4740934, y24: 2673358 },
  { rank: 24, st: "North Dakota", y25: 4736982, y24: 2740752 },
  { rank: 25, st: "Georgia", y25: 4729664, y24: 3760478 },
  { rank: 26, st: "Montana", y25: 4646906, y24: 2778974 },
  { rank: 27, st: "Oregon", y25: 4520711, y24: 3374247 },
  { rank: 28, st: "Wyoming", y25: 4386594, y24: 7403235 },
  { rank: 29, st: "Idaho", y25: 4371279, y24: 3149218 },
  { rank: 30, st: "Minnesota", y25: 4268880, y24: 3510223 },
  { rank: 31, st: "Illinois", y25: 4208265, y24: 3769066 },
  { rank: 32, st: "New Hampshire", y25: 4188601, y24: 3748066 },
  { rank: 33, st: "Vermont", y25: 4121073, y24: 1740206 },
  { rank: 34, st: "Pennsylvania", y25: 4117999, y24: 3059025 },
  { rank: 35, st: "New Mexico", y25: 4025941, y24: 3596829 },
  { rank: 36, st: "Maine", y25: 3995834, y24: 2238828 },
  { rank: 37, st: "North Carolina", y25: 3853929, y24: 2935789 },
  { rank: 38, st: "Michigan", y25: 3762564, y24: 2383896 },
  { rank: 39, st: "Missouri", y25: 3730673, y24: 2942166 },
  { rank: 40, st: "Tennessee", y25: 3680270, y24: 2632511 },
  { rank: 41, st: "Nebraska", y25: 3560184, y24: 2330178 },
  { rank: 42, st: "Ohio", y25: 3540096, y24: 2339737 },
  { rank: 43, st: "Indiana", y25: 3341541, y24: 1806591 },
  { rank: 44, st: "Arkansas", y25: 3292097, y24: 1674485 },
  { rank: 45, st: "Wisconsin", y25: 3251878, y24: 2850918 },
  { rank: 46, st: "Alabama", y25: 3219908, y24: 2011980 },
  { rank: 47, st: "Oklahoma", y25: 3199432, y24: 2776898 },
  { rank: 48, st: "Iowa", y25: 2949621, y24: 2247743 },
  { rank: 49, st: "Mississippi", y25: 2618706, y24: 2229457 },
  { rank: 50, st: "Kentucky", y25: 2597990, y24: 1611028 },
  { rank: 51, st: "Louisiana", y25: 2283151, y24: 1901183 },
];

const METROS = [
  ["Miami-Fort Lauderdale-West Palm Beach", "FL"],
  ["Atlanta-Sandy Springs-Roswell", "GA"],
  ["Houston-Pasadena-The Woodlands", "TX"],
  ["Las Vegas-Henderson-North Las Vegas", "NV"],
  ["Orlando-Kissimmee-Sanford", "FL"],
  ["Los Angeles-Long Beach-Anaheim", "CA"],
  ["Baton Rouge", "LA"],
  ["Killeen-Temple", "TX"],
  ["Tampa-St. Petersburg-Clearwater", "FL"],
  ["Dallas-Fort Worth-Arlington", "TX"],
  ["Palm Bay-Melbourne-Titusville", "FL"],
  ["Macon-Bibb County", "GA"],
  ["Lakeland-Winter Haven", "FL"],
  ["Jacksonville", "FL"],
  ["Phoenix-Mesa-Chandler", "AZ"],
  ["San Antonio-New Braunfels", "TX"],
  ["Odessa", "TX"],
  ["Memphis", "TN"],
  ["Baltimore-Columbia-Towson", "MD"],
  ["Savannah", "GA"],
  ["Washington-Arlington-Alexandria", "DC-VA-MD"],
  ["Charlotte-Concord-Gastonia", "NC-SC"],
  ["Denver-Aurora-Lakewood", "CO"],
  ["Riverside-San Bernardino-Ontario", "CA"],
  ["New York-Newark-Jersey City", "NY-NJ"],
  ["Philadelphia-Camden-Wilmington", "PA-NJ-DE"],
  ["Chicago-Naperville-Elgin", "IL-IN-WI"],
  ["New Orleans-Metairie", "LA"],
  ["Montgomery", "AL"],
  ["Birmingham-Hoover", "AL"],
  ["Deltona-Daytona Beach-Ormond Beach", "FL"],
  ["Columbus", "GA-AL"],
  ["Augusta-Richmond County", "GA-SC"],
  ["Raleigh-Cary", "NC"],
  ["Nashville-Davidson-Murfreesboro-Franklin", "TN"],
  ["Seattle-Tacoma-Bellevue", "WA"],
  ["Detroit-Warren-Dearborn", "MI"],
  ["San Diego-Chula Vista-Carlsbad", "CA"],
  ["Austin-Round Rock-Georgetown", "TX"],
  ["Tucson", "AZ"],
  ["Virginia Beach-Norfolk-Newport News", "VA-NC"],
  ["San Francisco-Oakland-Berkeley", "CA"],
  ["Columbus", "OH"],
  ["Portland-Vancouver-Hillsboro", "OR-WA"],
  ["Indianapolis-Carmel-Anderson", "IN"],
  ["Sacramento-Roseville-Folsom", "CA"],
  ["Kansas City", "MO-KS"],
  ["St. Louis", "MO-IL"],
  ["Boston-Cambridge-Newton", "MA-NH"],
  ["Minneapolis-St. Paul-Bloomington", "MN-WI"],
];

const AGE_GROUPS = [
  { group: "Under 20", complaints: "31,254", losses: "$67.1M", avg: "$2,147", share: "0.3%" },
  { group: "20–29", complaints: "112,069", losses: "$563.1M", avg: "$5,025", share: "2.7%" },
  { group: "30–39", complaints: "153,293", losses: "$1.7B", avg: "$11,091", share: "8.1%" },
  { group: "40–49", complaints: "167,066", losses: "$2.96B", avg: "$17,700", share: "14.2%" },
  { group: "50–59", complaints: "124,820", losses: "$3.7B", avg: "$29,643", share: "17.7%" },
  { group: "60+", complaints: "201,266", losses: "$7.75B", avg: "$38,500", share: "37.1%" },
];

/* ── percent change helper ──────────────────────────────────────────── */
function pct(cur, prev) {
  if (!prev) return "NEW";
  const p = ((cur - prev) / prev) * 100;
  const s = (p >= 0 ? "+" : "") + p.toFixed(1) + "%";
  return s;
}
function pctColor(cur, prev) {
  if (!prev) return "text-amber-600";
  return cur > prev ? "text-red-600" : "text-emerald-600";
}

/* ── reusable components ────────────────────────────────────────────── */
function StatCard({ number, label, change }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-red-600 sm:text-3xl">{number}</div>
      <div className="mt-1 text-xs text-slate-500 sm:text-sm">{label}</div>
      {change && <div className="mt-1 text-xs font-semibold text-red-600">{change}</div>}
    </div>
  );
}

function Callout({ emoji, title, children, variant = "default" }) {
  const border =
    variant === "warning"
      ? "border-amber-400 bg-amber-50"
      : variant === "info"
      ? "border-sky-400 bg-sky-50"
      : "border-red-400 bg-red-50";
  return (
    <div className={`my-6 rounded-lg border-l-4 ${border} p-5`}>
      <p className="font-semibold text-slate-800">
        {emoji} {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-slate-700">{children}</div>
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

/* ════════════════════════════════════════════════════════════════════ */
export default function StateOfScams2026() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
        State of Scams 2026: America&rsquo;s Top&nbsp;25 Scams &mdash; Ranked&nbsp;by Every State&nbsp;&amp;&nbsp;City
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
        Americans lost a record <strong className="text-red-600">$20.8&nbsp;billion</strong> to internet scams in 2025 &mdash; a 67% increase in just two&nbsp;years. Here&rsquo;s every scam type, every state, and every major metro area, ranked by the&nbsp;data.
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Published July 2026 &middot; Data from FBI IC3, FTC Consumer Sentinel, BBB Scam Tracker &middot; By{" "}
        <a href="https://socialcatfish.com" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">
          Social Catfish
        </a>{" "}
        Research
      </p>

      {/* ── Key stats ─────────────────────────────────────────── */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard number="$20.8B" label="Total Losses Reported to FBI (2025)" change="↑ 26% from 2024" />
        <StatCard number="$16B" label="Total Losses Reported to FTC (2025)" change="↑ 25% from 2024" />
        <StatCard number="1,008,597" label="FBI IC3 Complaints (2025)" change="↑ 17% from 2024" />
        <StatCard number="$11.4B" label="Cryptocurrency Losses (2025)" change="↑ 22% from 2024" />
      </div>

      {/* ── TOC ────────────────────────────────────────────────── */}
      <nav className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">📋 Table of Contents</h3>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm">
          {[
            ["overview", "The Big Picture: 3-Year Scam Trends"],
            ["top25", "The Top 25 Scams of 2025, Ranked"],
            ["deep-dive", "Deep Dive: Analysis of Each Scam"],
            ["by-state", "Scam Losses by State: All 50 States Ranked"],
            ["per-capita", "States Ranked by Losses Per Capita"],
            ["by-city", "Top 50 Most-Scammed Metro Areas"],
            ["demographics", "Who's Getting Scammed? Age & Demographics"],
            ["ai-scams", "The AI Scam Explosion"],
            ["protect", "How to Protect Yourself"],
            ["methodology", "Methodology & Sources"],
          ].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-red-600">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ═══════════ 1. BIG PICTURE ═══════════ */}
      <SectionH2 id="overview">1. The Big Picture: 3-Year Scam Trends (2023–2025)</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        The numbers tell a story that should alarm every American: scam losses are not just growing — they&rsquo;re <strong>accelerating</strong>. In just two years, losses reported to the FBI&rsquo;s Internet Crime Complaint Center (IC3) surged from $12.5&nbsp;billion to $20.8&nbsp;billion — a staggering 67%&nbsp;increase.
      </p>
      <p className="mt-3 leading-relaxed text-slate-700">
        For context, that $20.8&nbsp;billion is more than the entire GDP of Iceland. And because the FBI estimates that <strong>only 2–6% of fraud victims actually file complaints</strong>, the true cost of scams in America could exceed <strong>$195&nbsp;billion per&nbsp;year</strong>.
      </p>

      <h3 className="mt-8 text-lg font-semibold text-slate-800">FBI IC3: Year-Over-Year Comparison</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-800 text-white"><th className="px-3 py-2">Metric</th><th className="px-3 py-2">2023</th><th className="px-3 py-2">2024</th><th className="px-3 py-2">2025</th><th className="px-3 py-2">2-Yr Change</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {[
              ["Total Complaints", "880,418", "859,532", "1,008,597", "+14.6%"],
              ["Total Losses", "$12.5B", "$16.6B", "$20.8B", "+66.4%"],
              ["Avg Loss per Complaint", "$14,196", "$19,372", "$20,699", "+45.8%"],
              ["Cryptocurrency Losses", "$5.6B", "$9.3B", "$11.4B", "+103.6%"],
              ["Victims Aged 60+", "101,068", "147,127", "201,266", "+99.1%"],
            ].map(([m, a, b, c, d], i) => (
              <tr key={i} className="even:bg-slate-50 hover:bg-slate-100">
                <td className="px-3 py-2 font-medium text-slate-800">{m}</td>
                <td className="px-3 py-2 text-slate-600">{a}</td>
                <td className="px-3 py-2 text-slate-600">{b}</td>
                <td className="px-3 py-2 font-semibold text-slate-900">{c}</td>
                <td className="px-3 py-2 font-semibold text-red-600">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-800">FTC Consumer Sentinel: Year-Over-Year Comparison</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-800 text-white"><th className="px-3 py-2">Metric</th><th className="px-3 py-2">2023</th><th className="px-3 py-2">2024</th><th className="px-3 py-2">2025</th><th className="px-3 py-2">2-Yr Change</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {[
              ["Total Fraud Reports", "2.6M", "2.6M", "~3.0M", "+15%"],
              ["Total Fraud Losses", "$10.0B", "$12.5B", "~$16B", "+60%"],
              ["Imposter Scam Reports", "854,000", "846,000", "1,000,000+", "+17%+"],
              ["Imposter Scam Losses", "$2.7B", "$2.95B", "$3.5B", "+30%"],
            ].map(([m, a, b, c, d], i) => (
              <tr key={i} className="even:bg-slate-50 hover:bg-slate-100">
                <td className="px-3 py-2 font-medium text-slate-800">{m}</td>
                <td className="px-3 py-2 text-slate-600">{a}</td>
                <td className="px-3 py-2 text-slate-600">{b}</td>
                <td className="px-3 py-2 font-semibold text-slate-900">{c}</td>
                <td className="px-3 py-2 font-semibold text-red-600">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout emoji="⚠️" title="Key Trend: Scams cost more per victim, not just more victims." variant="warning">
        While complaint volumes grew modestly, the <em>amount people lose per scam</em> is skyrocketing. The FBI&rsquo;s average loss per complaint jumped from $14,196 in 2023 to $20,699 in 2025. Scams are getting more sophisticated — and more expensive.
      </Callout>

      {/* ═══════════ 2. TOP 25 ═══════════ */}
      <SectionH2 id="top25">2. The Top 25 Scams of 2025, Ranked by Financial&nbsp;Losses</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        Using FBI IC3 crime type data — the most comprehensive federal dataset on cybercrime — here are the costliest scam types affecting Americans in 2025, with three-year trend&nbsp;data:
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-2 py-2 text-center">#</th>
              <th className="px-3 py-2">Scam Type</th>
              <th className="px-3 py-2 text-right">2025 Losses</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">2024</th>
              <th className="hidden px-3 py-2 text-right md:table-cell">2023</th>
              <th className="px-3 py-2 text-right">YoY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {TOP25.map((s) => (
              <tr key={s.rank} className="even:bg-slate-50 hover:bg-slate-100">
                <td className="px-2 py-2 text-center font-bold text-red-600">{s.rank}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{s.name}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmt(s.y25)}</td>
                <td className="hidden px-3 py-2 text-right text-slate-600 sm:table-cell">{s.y24 ? fmt(s.y24) : "—"}</td>
                <td className="hidden px-3 py-2 text-right text-slate-600 md:table-cell">{s.y23 ? fmt(s.y23) : "—"}</td>
                <td className={`px-3 py-2 text-right font-semibold ${pctColor(s.y25, s.y24)}`}>{pct(s.y25, s.y24)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs italic text-slate-400">
        Source: FBI IC3 Annual Reports 2023–2025. &ldquo;Other&rdquo; category ($512M in 2025) excluded. Charity was new in 2025.
      </p>

      <Callout emoji="📊" title="Cross-Cutting Descriptors (FBI IC3, 2025):" variant="info">
        <ul className="mt-1 list-disc pl-5 space-y-1">
          <li><strong>Cryptocurrency:</strong> $11.4 billion across 181,565 complaints — up 22% from $9.3B in 2024</li>
          <li><strong>AI-Related:</strong> $893 million across 22,364 complaints — <em>first year tracked</em></li>
        </ul>
      </Callout>

      {/* ═══════════ 3. DEEP DIVE ═══════════ */}
      <SectionH2 id="deep-dive">3. Deep Dive: Analysis of Each Major&nbsp;Scam</SectionH2>

      {/* Investment */}
      <div className="mt-8 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">1</span>
          <h3 className="text-xl font-bold text-slate-900">Investment Fraud &amp; Pig Butchering — $8.65 Billion</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Investment fraud has been the #1 costliest scam in America for three consecutive years, and it&rsquo;s not even close. In 2025, victims reported <strong>$8.65&nbsp;billion in losses</strong> from 72,984 complaints — more than the next two scam types combined.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          The dominant scheme is &ldquo;pig butchering&rdquo; (<em>sha zhu pan</em>), where scammers build long-term relationships with victims — often through dating apps, social media, or wrong-number texts — before luring them into fake cryptocurrency investment platforms. Victims see fabricated returns, invest more, then the scammer disappears.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          <strong>3-year trajectory:</strong> $4.57B → $6.57B → $8.65B. An <strong>89% increase</strong> in two years. Cryptocurrency was the payment method in 71% of investment fraud losses, totaling $7.2&nbsp;billion.
        </p>
      </div>

      {/* BEC */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">2</span>
          <h3 className="text-xl font-bold text-slate-900">Business Email Compromise (BEC) — $3.05 Billion</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          BEC targets businesses by impersonating executives, vendors, or partners to trick employees into authorizing fraudulent wire transfers. Despite relatively low complaint volume (24,768), the average BEC incident costs <strong>more than $123,000</strong>, making it the highest-damage-per-incident scam type.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          <strong>3-year trajectory:</strong> $2.95B → $2.77B → $3.05B — steady and massive. Over <strong>$8.77&nbsp;billion</strong> lost in three years. AI-generated emails are making BEC nearly impossible to distinguish from legitimate communications.
        </p>
      </div>

      {/* Tech Support */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">3</span>
          <h3 className="text-xl font-bold text-slate-900">Tech / Customer Support Scams — $2.13 Billion</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Tech support scams have <strong>more than doubled</strong> in two years. Scammers impersonate Microsoft, Apple, or Amazon, convincing victims their devices are compromised and demanding payment. A subset — <strong>&ldquo;gold courier&rdquo; scams</strong> — convinces elderly victims to convert savings to gold bars, then sends physical couriers to pick them up. In 2024, just 525 gold courier complaints resulted in $219&nbsp;million — an average of <strong>$417,000 per victim</strong>.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700">
          <strong>3-year trajectory:</strong> $925M → $1.46B → $2.13B — a <strong>131% increase</strong>. Adults 60+ accounted for over 58% of tech support losses.
        </p>
      </div>

      {/* Romance */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">5</span>
          <h3 className="text-xl font-bold text-slate-900">Confidence / Romance Scams — $929 Million</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Romance scams remain one of the most emotionally devastating fraud types. Scammers create fake online personas, build romantic relationships over weeks or months, then manipulate victims into sending money. The BBB ranks romance scams as having the <strong>highest median loss ($6,099)</strong> of any scam type. Scammers increasingly use AI-generated photos, voice cloning, and deepfake video calls to sustain fake identities.
        </p>
        <p className="mt-3 leading-relaxed text-slate-700"><strong>3-year trajectory:</strong> $653M → $672M → $929M — up 42%.</p>
      </div>

      {/* Gov Impersonation */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">6</span>
          <h3 className="text-xl font-bold text-slate-900">Government Impersonation — $798 Million</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Scammers posing as IRS agents, Social Security officials, or FBI representatives stole <strong>$798&nbsp;million</strong> in 2025 — <strong>nearly double</strong> the 2024 figure ($406M). Common tactics include threatening arrest for unpaid taxes and claiming SSNs have been &ldquo;suspended.&rdquo;
        </p>
      </div>

      {/* Employment */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">9</span>
          <h3 className="text-xl font-bold text-slate-900">Employment / Job Scams — $363 Million</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          The <strong>fastest-growing major scam category</strong>: employment scam losses exploded from $70 million in 2023 to $363&nbsp;million in 2025 — a <strong>417% increase</strong> in just two years. Fake remote job postings, fraudulent recruitment emails, and &ldquo;task scam&rdquo; schemes (where victims are paid small amounts before being asked to invest larger sums) drive this explosive growth.
        </p>
      </div>

      {/* Phishing */}
      <div className="mt-6 border-b border-dashed border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">12</span>
          <h3 className="text-xl font-bold text-slate-900">Phishing / Spoofing — $216 Million</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          Phishing remains the <strong>most-reported scam by volume</strong> (191,561 complaints). While per-incident losses tend to be lower, phishing is a gateway crime — compromised credentials lead to BEC, account takeovers, and identity theft. Losses grew <strong>over 1,000%</strong> in two years ($19M → $70M → $216M) as AI-crafted phishing messages become virtually indistinguishable from legitimate communications.
        </p>
      </div>

      {/* Other notable */}
      <div className="mt-6 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-600 text-sm font-bold text-white">+</span>
          <h3 className="text-xl font-bold text-slate-900">Other Notable Scams</h3>
        </div>
        <p className="mt-3 leading-relaxed text-slate-700">
          <strong>Personal Data Breach ($1.31B)</strong> — up 76% since 2023. <strong>Non-Payment/Non-Delivery ($503M)</strong> — online marketplace fraud. <strong>Real Estate Fraud ($275M)</strong> — wire diversion in home purchases, up 59%. <strong>Lottery/Sweepstakes ($194M)</strong> — nearly doubled in one year. <strong>Extortion/Sextortion ($122M)</strong> — increasingly targeting teenagers with AI-generated images. <strong>Ransomware ($32M reported)</strong> — likely massively underreported; 63 new variants identified. <strong>Malware ($19M)</strong> — saw a <strong>1,318% increase</strong>. <strong>SIM Swap ($17M)</strong> — declining as carriers improve protections.
        </p>
      </div>

      {/* ═══════════ 4. STATES TOTAL ═══════════ */}
      <SectionH2 id="by-state">4. Scam Losses by State: All 50 States + D.C. Ranked&nbsp;(2025)</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        Where you live determines your scam risk. Every U.S. state and the District of Columbia ranked by total reported losses to the FBI IC3 in 2025:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-2 py-2 text-center">#</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2 text-right">2025 Losses</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">2024 Losses</th>
              <th className="px-3 py-2 text-right">YoY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {STATES_TOTAL.map((s) => (
              <tr key={s.rank} className="even:bg-slate-50 hover:bg-slate-100">
                <td className="px-2 py-2 text-center font-bold text-red-600">{s.rank}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{s.st}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmt(s.y25)}</td>
                <td className="hidden px-3 py-2 text-right text-slate-600 sm:table-cell">{fmt(s.y24)}</td>
                <td className={`px-3 py-2 text-right font-semibold ${pctColor(s.y25, s.y24)}`}>{pct(s.y25, s.y24)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs italic text-slate-400">
        Source: FBI IC3 Annual Reports 2024 and 2025. Territories excluded from ranking but included in national totals.
      </p>

      <Callout emoji="🔑" title="Key Finding">
        California alone lost <strong>$3.67&nbsp;billion</strong> — more than the bottom 30 states combined. The top 4 states (CA, TX, FL, NY) account for <strong>$8.3&nbsp;billion — roughly 40%</strong> of all national losses. West Virginia saw the largest percentage jump (+283%), while South Dakota (+106%), Arkansas (+98%), and Hawaii (+93%) also surged.
      </Callout>

      {/* ═══════════ 5. PER CAPITA ═══════════ */}
      <SectionH2 id="per-capita">5. States Ranked by Losses Per Capita (Per 100K&nbsp;Residents)</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        Raw dollar losses favor populous states. Per-capita rankings reveal where scams hit hardest <em>relative to population</em> — and the picture changes dramatically:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-2 py-2 text-center">#</th>
              <th className="px-3 py-2">State</th>
              <th className="px-3 py-2 text-right">2025 / 100K</th>
              <th className="hidden px-3 py-2 text-right sm:table-cell">2024 / 100K</th>
              <th className="px-3 py-2 text-right">YoY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {STATES_PERCAP.map((s) => (
              <tr key={s.rank} className="even:bg-slate-50 hover:bg-slate-100">
                <td className="px-2 py-2 text-center font-bold text-red-600">{s.rank}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{s.st}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-900">{fmt(s.y25)}</td>
                <td className="hidden px-3 py-2 text-right text-slate-600 sm:table-cell">{fmt(s.y24)}</td>
                <td className={`px-3 py-2 text-right font-semibold ${pctColor(s.y25, s.y24)}`}>{pct(s.y25, s.y24)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs italic text-slate-400">
        Source: FBI IC3 Annual Reports 2024 and 2025, per-capita figures use U.S. Census Bureau population estimates.
      </p>

      <Callout emoji="🏛️" title="Why D.C. ranks #1 per capita" variant="info">
        Despite a drop from $41.5M to $14M per 100K, the District of Columbia still leads — likely driven by the concentration of federal workers, government contractors, and tech professionals targeted by BEC and investment scams. <strong>West Virginia (+284%)</strong>, <strong>Rhode Island (+204%)</strong>, and <strong>South Dakota (+104%)</strong> saw the most dramatic per-capita surges.
      </Callout>

      {/* ═══════════ 6. METRO AREAS ═══════════ */}
      <SectionH2 id="by-city">6. Top 50 Most-Scammed Metro Areas in America</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        For residents and local journalists, the metro-area data is the most actionable. Using FTC Consumer Sentinel Network data for 2024, here are the 50 metropolitan areas with the highest per-capita fraud report rates:
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-2 py-2 text-center">#</th>
              <th className="px-3 py-2">Metropolitan Area</th>
              <th className="px-3 py-2">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {METROS.map(([metro, st], i) => (
              <tr key={i} className="even:bg-slate-50 hover:bg-slate-100">
                <td className={`px-2 py-2 text-center font-bold ${i < 10 ? "text-red-600" : "text-slate-500"}`}>{i + 1}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{metro}</td>
                <td className="px-3 py-2 text-slate-600">{st}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs italic text-slate-400">
        Source: FTC Consumer Sentinel Network Data Book 2024. Rankings based on fraud reports per 100,000 population.
      </p>

      <Callout emoji="🏙️" title="Regional Patterns" variant="info">
        <ul className="mt-1 list-disc pl-5 space-y-1">
          <li><strong>Florida dominates:</strong> 7 of the top 50 metros, including #1 Miami, #5 Orlando, and #9 Tampa.</li>
          <li><strong>Texas is close behind:</strong> 6 metros — Houston (#3), Dallas (#10), Killeen (#8), San Antonio (#16), Odessa (#17), Austin (#39).</li>
          <li><strong>Georgia has 5 metros</strong> in the top 50: Atlanta (#2), Macon (#12), Savannah (#20), Columbus (#32), Augusta (#33).</li>
          <li><strong>Military towns hit hard:</strong> Killeen (#8) and Odessa (#17) rank surprisingly high per capita.</li>
        </ul>
      </Callout>

      {/* ═══════════ 7. DEMOGRAPHICS ═══════════ */}
      <SectionH2 id="demographics">7. Who&rsquo;s Getting Scammed? Age &amp; Demographics</SectionH2>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">FBI IC3 Complaints &amp; Losses by Age Group (2025)</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-800 text-white"><th className="px-3 py-2">Age</th><th className="px-3 py-2 text-right">Complaints</th><th className="px-3 py-2 text-right">Losses</th><th className="px-3 py-2 text-right">Avg Loss</th><th className="px-3 py-2 text-right">% of Total</th></tr></thead>
          <tbody className="divide-y divide-slate-200">
            {AGE_GROUPS.map((a, i) => (
              <tr key={i} className={`even:bg-slate-50 hover:bg-slate-100 ${a.group === "60+" ? "bg-red-50 font-semibold" : ""}`}>
                <td className="px-3 py-2 text-slate-800">{a.group}</td>
                <td className="px-3 py-2 text-right text-slate-600">{a.complaints}</td>
                <td className="px-3 py-2 text-right text-slate-900">{a.losses}</td>
                <td className="px-3 py-2 text-right text-slate-600">{a.avg}</td>
                <td className="px-3 py-2 text-right text-slate-600">{a.share}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout emoji="⚠️" title="Elder Fraud Crisis" variant="warning">
        Americans aged 60+ lost <strong>$7.75&nbsp;billion</strong> in 2025 — a <strong>59% increase</strong> from $4.9B in 2024. This group filed the <strong>most complaints</strong> (201,266), lost <strong>37% of all money</strong> reported stolen, and had the <strong>highest average loss</strong> ($38,500). Over <strong>12,444 seniors</strong> each lost more than $100,000. Top scams targeting seniors: investment fraud ($3.5B), tech support ($1B+), romance ($584M), and BEC ($568M).
      </Callout>
      <p className="mt-4 leading-relaxed text-slate-700">
        <strong>Counterintuitive FTC finding:</strong> Younger adults (20–29) are actually <em>more likely</em> to report losing money — 44% of their reports involve a loss, vs. just 24% for ages 70–79. But when older adults do lose money, they lose <em>far more</em>: the median loss for 80+ is $1,650, vs. $189 for under-20s.
      </p>

      {/* ═══════════ 8. AI SCAMS ═══════════ */}
      <SectionH2 id="ai-scams">8. The AI Scam Explosion</SectionH2>
      <p className="mt-4 leading-relaxed text-slate-700">
        The single most alarming trend: the weaponization of artificial intelligence for fraud.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard number="$893M" label="AI-Related Scam Losses (FBI 2025)" change="First Year Tracked" />
        <StatCard number="1,210%" label="Surge in AI-Enabled Fraud (2025)" />
        <StatCard number="8M" label="Deepfakes Online (end of 2025)" change="↑ from 500K in 2023" />
        <StatCard number="$40B" label="Projected AI Fraud by 2027" change="Deloitte forecast" />
      </div>

      <h3 className="mt-8 text-lg font-semibold text-slate-800">AI Scam Statistics That Should Alarm You:</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li><strong>Voice cloning:</strong> Just <strong>3 seconds of audio</strong> creates an 85% voice match. 1 in 4 adults have experienced an AI voice scam, and <strong>77% of those targeted lost money</strong> (McAfee).</li>
        <li><strong>Deepfake videos:</strong> Human accuracy in identifying high-quality deepfakes is just <strong>24.5%</strong>. One deepfake video call cost engineering firm Arup <strong>$25.6 million</strong>.</li>
        <li><strong>AI phishing:</strong> AI-generated phishing emails achieve click-through rates <strong>4× higher</strong> than human-crafted messages.</li>
        <li><strong>Scale:</strong> Americans receive an average of <strong>14 scam messages daily</strong> and encounter <strong>3 deepfakes per day</strong> (McAfee).</li>
        <li><strong>Time cost:</strong> Americans spend <strong>114 hours per year</strong> — nearly 3 full work weeks — verifying whether messages are real or scams.</li>
        <li><strong>&ldquo;Indistinguishable threshold&rdquo; crossed:</strong> As of late 2025, voice cloning has crossed the point where human listeners <strong>can no longer reliably distinguish</strong> cloned voices from real ones.</li>
      </ul>

      <Callout emoji="🌍" title="The Global Picture" variant="warning">
        According to the Global Anti-Scam Alliance (GASA), global scam losses reached <strong>$442&nbsp;billion</strong> in 2024, with <strong>57% of adults worldwide</strong> targeted at least once a week. In the U.S. alone, deepfake-enabled fraud is projected to reach <strong>$40&nbsp;billion by 2027</strong> (Deloitte).
      </Callout>

      {/* ═══════════ 9. PROTECT ═══════════ */}
      <SectionH2 id="protect">9. How to Protect Yourself</SectionH2>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">🔍 Verify Before You Trust</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li><strong>Verify identities independently.</strong> If someone contacts you claiming to be from your bank, the IRS, or a company — hang up and call the official number yourself.</li>
        <li><strong>Reverse image search</strong> profile photos from dating sites, social media, or business contacts. Tools like{" "}
          <a href="https://socialcatfish.com" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">Social Catfish</a>{" "}
          can verify if someone is who they claim to be.
        </li>
        <li><strong>Insist on live video calls</strong> before sending money to anyone you&rsquo;ve met online.</li>
        <li><strong>Verify investment platforms</strong> through SEC.gov and FINRA BrokerCheck before investing.</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">💰 Protect Your Money</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li><strong>Never send cryptocurrency, wire transfers, or gift cards</strong> based on unsolicited requests — these are nearly impossible to recover.</li>
        <li><strong>Be suspicious of &ldquo;urgent&rdquo; financial requests.</strong> Scammers manufacture time pressure to bypass your judgment.</li>
        <li><strong>Set up bank alerts</strong> for large transactions and unusual activity.</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">🤖 AI-Era Precautions</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li><strong>Establish a family code word</strong> for emergency calls — AI can clone voices from social media videos.</li>
        <li><strong>Don&rsquo;t trust caller ID.</strong> Scammers spoof any phone number.</li>
        <li><strong>Be skeptical of too-polished messages.</strong> AI-generated scam messages have perfect grammar.</li>
        <li><strong>Limit public voice/video content</strong> that could be used for deepfake creation.</li>
      </ul>

      <h3 className="mt-6 text-lg font-semibold text-slate-800">📞 Report Scams</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
        <li><strong>FBI IC3:</strong> <a href="https://www.ic3.gov" className="text-red-600 underline underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">ic3.gov</a></li>
        <li><strong>FTC:</strong> <a href="https://reportfraud.ftc.gov" className="text-red-600 underline underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">reportfraud.ftc.gov</a></li>
        <li><strong>BBB Scam Tracker:</strong> <a href="https://www.bbb.org/scamtracker" className="text-red-600 underline underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">bbb.org/scamtracker</a></li>
        <li><strong>ScamComplaints.org:</strong> <a href="https://scamcomplaints.org/case-builder" className="text-red-600 underline underline-offset-2 hover:text-red-700">Report here</a></li>
      </ul>

      {/* ═══════════ 10. METHODOLOGY ═══════════ */}
      <SectionH2 id="methodology">10. Methodology &amp; Sources</SectionH2>
      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-600">
        <h3 className="text-base font-semibold text-slate-800">About This Report</h3>
        <p className="mt-2">
          This analysis was compiled by{" "}
          <a href="https://socialcatfish.com" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700" target="_blank" rel="noopener noreferrer">Social Catfish</a>{" "}
          Research using publicly available data from federal agencies and research organizations. All figures represent <em>reported</em> losses. The FBI estimates only 2–6% of victims file complaints, suggesting true annual fraud costs could exceed $195&nbsp;billion.
        </p>

        <h3 className="mt-5 text-base font-semibold text-slate-800">Primary Sources</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><strong>FBI Internet Crime Complaint Center (IC3)</strong> — Annual Reports 2023, 2024, 2025</li>
          <li><strong>FTC Consumer Sentinel Network</strong> — Data Books 2023–2024 &amp; 2025 press releases</li>
          <li><strong>BBB Scam Tracker</strong> — 2024 Annual Risk Report</li>
          <li><strong>GASA Global State of Scams Report 2025</strong> — 46,000 respondents, 42 countries</li>
          <li><strong>McAfee State of the Scamiverse Report 2026</strong> — 7,500 consumer survey</li>
          <li><strong>Deloitte Center for Financial Services</strong> — AI fraud loss projections</li>
        </ul>

        <h3 className="mt-5 text-base font-semibold text-slate-800">Notes on Data</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>FBI IC3 and FTC use different methodologies. Their figures should not be added together.</li>
          <li>&ldquo;Cryptocurrency&rdquo; in IC3 data is a cross-cutting descriptor, not a standalone category.</li>
          <li>Metro-area rankings use FTC data (IC3 does not publish metro-level breakdowns).</li>
          <li>State rankings use FBI IC3 data representing complaints filed by victims.</li>
        </ul>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Think you&rsquo;re talking to a scammer?</h2>
        <p className="mt-2 text-slate-600">Verify their identity before it&rsquo;s too late.</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href="https://socialcatfish.com" target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 transition-colors">
            Verify Someone on Social Catfish
          </a>
          <a href="/case-builder" className="inline-block rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 hover:bg-slate-100 transition-colors">
            Report a Scam
          </a>
        </div>
      </section>

      {/* ── Footer attribution ────────────────────────────────── */}
      <p className="mt-12 text-center text-xs text-slate-400">
        © 2026 Social Catfish &middot;{" "}
        <a href="https://socialcatfish.com" className="underline hover:text-slate-600" target="_blank" rel="noopener noreferrer">socialcatfish.com</a>{" "}
        &middot; Data sourced from public government reports. This report may be cited with attribution.
      </p>
    </article>
  );
}
