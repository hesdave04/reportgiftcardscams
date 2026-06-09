import Link from "next/link";

export const metadata = {
  title: "Types of Scams — Complete Guide to Online Fraud | ScamComplaints",
  description:
    "Comprehensive guide to every major type of online scam: romance scams, pig butchering, crypto fraud, phishing, tech support scams, Facebook Marketplace fraud, and more. Learn how they work, spot the red flags, and report them.",
  keywords:
    "types of scams, online scam guide, common internet scams, list of scams, how scams work, scam types, fraud types, report scam, online fraud guide",
  openGraph: {
    title: "Types of Scams — The Complete Online Fraud Guide",
    description:
      "Learn about every major scam type, how they work, and how to report them. Protect yourself and others.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/scams" },
};

/* ─── ALL scam categories (grouped) ────────────────────────────────────── */

const FINANCIAL_SCAMS = [
  {
    slug: "report-investment-scam",
    icon: "📈",
    name: "Investment Scams",
    aka: "Ponzi schemes, forex fraud, fake platforms",
    loss: "$4.57B lost in 2023",
    desc: "Fake trading platforms, unregistered securities, Ponzi schemes, and algorithmic trading scams that promise guaranteed returns. The #1 costliest scam category.",
  },
  {
    slug: "report-crypto-scam",
    icon: "₿",
    name: "Cryptocurrency Scams",
    aka: "Bitcoin fraud, rug pulls, fake exchanges",
    loss: "$3.96B lost in 2023",
    desc: "Fake crypto exchanges, rug pulls, pump-and-dump schemes, and fraudulent mining platforms. 86.7% of investment fraud involves crypto.",
  },
  {
    slug: "report-pig-butchering-scam",
    icon: "🐷",
    name: "Pig Butchering Scams",
    aka: "Sha Zhu Pan, crypto romance scams",
    loss: "Subset of $3.96B crypto fraud",
    desc: "A long-con where scammers groom victims through dating apps into 'investing' on fake crypto platforms. The most expensive single scam type globally.",
  },
  {
    slug: "report-credit-card-fraud",
    icon: "💳",
    name: "Credit Card & Check Fraud",
    aka: "Card skimming, fake checks, account takeover",
    loss: "$12.4B card fraud globally (2023)",
    desc: "Card skimming at ATMs, unauthorized online purchases, fake check schemes, check washing, and account takeover fraud.",
  },
  {
    slug: "report-payment-app-scam",
    icon: "📱",
    name: "Zelle, Cash App & Venmo Scams",
    aka: "P2P fraud, overpayment scams",
    loss: "$440M+ lost in 2023",
    desc: "Marketplace fraud, overpayment scams, and phishing attacks on Zelle, Cash App, and Venmo. Transfers are nearly instant and almost impossible to reverse.",
  },
  {
    slug: "report-advance-fee-scam",
    icon: "💰",
    name: "Advance Fee / 419 Scams",
    aka: "Nigerian prince, inheritance scam",
    loss: "$107M lost in 2023",
    desc: "Someone promises you a large sum — inheritance, business deal, locked funds — but you need to pay fees first. Each payment leads to another fee. The money never comes.",
  },
  {
    slug: "report-gift-card-scam",
    icon: "🎁",
    name: "Gift Card Scams",
    aka: "iTunes scam, Target card scam",
    loss: "$217M lost in 2023",
    desc: "Scammers demand payment via gift cards — the untraceable cash of the digital age. Often combined with government impersonation or tech support scams.",
  },
];

const IDENTITY_SCAMS = [
  {
    slug: "report-romance-scam",
    icon: "💔",
    name: "Romance Scams",
    aka: "Catfishing, love scams, dating fraud",
    loss: "$1.14B lost in 2023",
    desc: "Fake romantic relationships on dating apps and social media. Scammers build trust over weeks, then ask for money for emergencies, travel, or medical bills.",
  },
  {
    slug: "report-impersonation-scam",
    icon: "🎭",
    name: "Impersonation Scams",
    aka: "Amazon, Apple, bank impersonation",
    loss: "$2.7B lost in 2023",
    desc: "The #1 most reported fraud. Scammers pose as companies (Amazon, Apple, banks), celebrities, or even family members. 39% now use AI deepfakes.",
  },
  {
    slug: "report-government-impersonation-scam",
    icon: "🏛️",
    name: "Government Impersonation",
    aka: "IRS scams, SSA scams, fake FBI",
    loss: "$618M lost in 2023",
    desc: "Fake IRS, Social Security, or law enforcement calls threatening arrest unless you pay immediately. No government agency ever demands gift card payments.",
  },
  {
    slug: "report-military-scam",
    icon: "🎖️",
    name: "Military Romance Scams",
    aka: "Fake soldiers, deployment fraud",
    loss: "$653M lost to romance fraud (2023)",
    desc: "Stolen photos of real service members used to build fake relationships. 'Deployment' is the excuse for never meeting. Real soldiers never need your money.",
  },
  {
    slug: "report-phishing-scam",
    icon: "🎣",
    name: "Phishing Scams",
    aka: "Smishing, vishing, credential theft",
    loss: "300K+ reports in 2023",
    desc: "Fake emails, texts, and websites impersonating banks, USPS, Netflix to steal login credentials and personal data. The most common cybercrime by volume.",
  },
  {
    slug: "report-identity-theft",
    icon: "🆔",
    name: "Identity Theft",
    aka: "SSN theft, data breach, credit fraud",
    loss: "$744M in data breach losses",
    desc: "Criminals use stolen personal info to open accounts, file fake tax returns, or commit crimes in your name. 1.4M reports filed in 2023.",
  },
  {
    slug: "report-deepfake-scam",
    icon: "🤖",
    name: "AI Deepfake Scams",
    aka: "Voice cloning, fake videos, AI fraud",
    loss: "39% of victims targeted by AI",
    desc: "AI-generated fake videos, cloned voices, and deepfake celebrity endorsements used for fraud. The fastest-growing scam technology.",
  },
];

const CONSUMER_SCAMS = [
  {
    slug: "report-online-shopping-scam",
    icon: "🛍️",
    name: "Online Shopping Scams",
    aka: "Fake stores, non-delivery, dropship fraud",
    loss: "$392M lost in 2023",
    desc: "Fake online stores with too-good prices on Instagram and Facebook ads. Products never arrive, are cheap knockoffs, or the site steals card data.",
  },
  {
    slug: "report-facebook-marketplace-scam",
    icon: "🛒",
    name: "Facebook Marketplace Scams",
    aka: "Fake listings, no-show sellers",
    loss: "$1B+ estimated annual losses",
    desc: "Fake product listings, no-show sellers, counterfeit goods, and fake rental/vehicle listings. Zelle payments nearly impossible to recover.",
  },
  {
    slug: "report-tech-support-scam",
    icon: "🖥️",
    name: "Tech Support Scams",
    aka: "Fake Microsoft/Apple calls",
    loss: "$924M lost in 2023",
    desc: "Fake virus warnings and calls from 'Microsoft' or 'Apple' trick victims into granting remote access, then charge for fake repairs or drain accounts.",
  },
  {
    slug: "report-employment-scam",
    icon: "💼",
    name: "Employment Scams",
    aka: "Fake jobs, task scams, check fraud",
    loss: "$501M lost in 2024",
    desc: "Fake job postings, work-from-home scams, and task scams requiring deposits. Job scam losses tripled from $90M (2020) to $501M (2024).",
  },
  {
    slug: "report-rental-scam",
    icon: "🏠",
    name: "Rental Scams",
    aka: "Fake apartments, landlord fraud",
    loss: "$400M+ annual losses",
    desc: "Fake rental listings with stolen photos, below-market prices, and landlords who are 'out of town.' Deposits collected from multiple victims simultaneously.",
  },
  {
    slug: "report-car-scam",
    icon: "🚗",
    name: "Car & Vehicle Scams",
    aka: "Odometer fraud, phantom listings",
    loss: "$4.9B annual auto fraud",
    desc: "Fake car listings, odometer rollbacks, title washing, and VIN cloning. One of the highest-dollar consumer frauds with $3K-$10K average loss.",
  },
  {
    slug: "report-pet-scam",
    icon: "🐶",
    name: "Puppy & Pet Scams",
    aka: "Fake breeders, puppy deposit fraud",
    loss: "80% of sponsored puppy ads are fake",
    desc: "Adorable photos stolen from real breeders, attractive prices, deposits via cash apps — then escalating 'shipping fees' for a puppy that never arrives.",
  },
  {
    slug: "report-lottery-scam",
    icon: "🎰",
    name: "Lottery & Sweepstakes Scams",
    aka: "Fake prizes, Publishers Clearing House scam",
    loss: "$301M lost in 2023",
    desc: "Fake prize notifications by phone, email, or mail. You can't win a contest you never entered, and legitimate prizes never require upfront payment.",
  },
  {
    slug: "report-charity-scam",
    icon: "❤️",
    name: "Charity Scams",
    aka: "Fake donations, GoFundMe fraud",
    loss: "$170M+ annual losses",
    desc: "Fake charities exploit disasters and tragedies. Names similar to real organizations, high-pressure phone calls, and fraudulent crowdfunding campaigns.",
  },
  {
    slug: "report-real-estate-scam",
    icon: "🏢",
    name: "Real Estate & Mortgage Scams",
    aka: "Wire fraud, deed theft, foreclosure scams",
    loss: "$145M+ in wire fraud alone",
    desc: "Closing wire fraud that diverts down payments, deed theft targeting vacant properties, and foreclosure rescue scams. Average loss: $70K per incident.",
  },
];

const TARGETED_SCAMS = [
  {
    slug: "report-sextortion-scam",
    icon: "🔒",
    name: "Sextortion",
    aka: "Online blackmail, nude blackmail",
    loss: "12,600+ FBI reports in 2023",
    desc: "Blackmail involving intimate images — real or AI-generated. Surging among teens and young adults. 20+ teen suicides linked since 2022.",
  },
  {
    slug: "report-elder-fraud",
    icon: "👴",
    name: "Elder Fraud",
    aka: "Senior scams, financial exploitation",
    loss: "$3.4B lost by seniors in 2023",
    desc: "Americans over 60 lose the most money of any age group. Tech support, romance, grandparent scams, and sweepstakes fraud target seniors relentlessly.",
  },
  {
    slug: "report-grandparent-scam",
    icon: "📞",
    name: "Grandparent Scams",
    aka: "Emergency scam, fake bail call",
    loss: "$102M in emergency phone scams",
    desc: "'Grandma, I've been in an accident!' AI voice cloning makes these calls sound exactly like your grandchild. A family code word is the best defense.",
  },
  {
    slug: "report-sugar-daddy-scam",
    icon: "🍯",
    name: "Sugar Daddy / Sugar Mama Scams",
    aka: "Instagram sugar scam, Cash App sugar",
    loss: "300% increase since 2020",
    desc: "Fake sugar daddy/mama accounts on Instagram and Snapchat offering thousands per week. Requires a 'registration fee' or bank login to 'deposit' funds.",
  },
  {
    slug: "report-business-email-scam",
    icon: "📧",
    name: "Business Email Compromise (BEC)",
    aka: "CEO fraud, invoice scams",
    loss: "$2.95B lost in 2023",
    desc: "Scammers impersonate executives or vendors to trick employees into wiring money. #2 costliest cybercrime. FBI can freeze wires if reported in 24-72 hours.",
  },
  {
    slug: "report-ransomware",
    icon: "🔐",
    name: "Ransomware",
    aka: "Computer locked, files encrypted",
    loss: "$59M+ in ransom payments (2023)",
    desc: "Malware encrypts your files and demands cryptocurrency payment. Check nomoreransom.org for free decryption tools before paying anything.",
  },
  {
    slug: "report-social-media-scam",
    icon: "📲",
    name: "Social Media Scams",
    aka: "Instagram, TikTok, Facebook fraud",
    loss: "$1.9B from social media fraud",
    desc: "Social media is the #1 contact method for scams. Fake giveaways, hacked accounts, fraudulent ads, and DM recruitment scams across every platform.",
  },
];

const ORIGINAL_REPORT_PAGES = [
  {
    slug: "report-crypto-wallet",
    icon: "👛",
    name: "Report a Crypto Wallet",
    aka: "Suspicious wallet address",
    loss: "Blockchain tracing tool",
    desc: "Report a specific cryptocurrency wallet address involved in a scam. Helps blockchain analysis firms trace and flag criminal wallets.",
  },
  {
    slug: "report-fake-social-media",
    icon: "👤",
    name: "Report a Fake Social Media Profile",
    aka: "Catfish accounts, impersonators",
    loss: "Identity verification tool",
    desc: "Report a fake or impersonation profile on any social media platform. Helps platforms remove fraudulent accounts faster.",
  },
  {
    slug: "report-fraudulent-website",
    icon: "🌐",
    name: "Report a Fraudulent Website",
    aka: "Scam sites, fake stores",
    loss: "Domain blacklisting tool",
    desc: "Report a scam website — fake stores, phishing pages, fraudulent businesses. Helps browsers and search engines warn other visitors.",
  },
];

const SECTIONS = [
  { title: "Financial & Investment Fraud", items: FINANCIAL_SCAMS },
  { title: "Identity & Impersonation Fraud", items: IDENTITY_SCAMS },
  { title: "Consumer & Marketplace Fraud", items: CONSUMER_SCAMS },
  { title: "Targeted Scams & Cyber Threats", items: TARGETED_SCAMS },
  { title: "Report a Specific Entity", items: ORIGINAL_REPORT_PAGES },
];

function ScamCard({ s }) {
  return (
    <Link
      href={`/${s.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{s.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600">
            {s.name}
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">{s.aka}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {s.desc}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-red-600">{s.loss}</span>
            <span className="text-xs font-medium text-slate-400 group-hover:text-red-500">
              Report →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ScamsPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://scamcomplaints.org/scams/#webpage",
      "url": "https://scamcomplaints.org/scams",
      "name": "Types of Scams — Complete Guide to Online Fraud",
      "description": "Comprehensive guide to every major type of online scam. Learn how they work, spot the red flags, and report them.",
      "isPartOf": {"@id": "https://scamcomplaints.org/#website"}
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/scams/#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://scamcomplaints.org"},
        {"@type": "ListItem", "position": 2, "name": "Scam Types", "item": "https://scamcomplaints.org/scams"}
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/50 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Scam Encyclopedia
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Types of scams.
            <br />
            <span className="text-red-400">Know them. Report them. Stop them.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            Americans lost over <strong className="text-white">$10 billion</strong> to
            fraud in 2023 — a 14% increase over the prior year. This page covers every
            major scam category, how each one works, the red flags to watch for, and how
            to file a report. Click any scam type to read the full guide and submit a
            report.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/case-builder"
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
            >
              File a Detailed Report
            </a>
            <a
              href="/search"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Search for a Scam
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-6 px-4 py-6">
          {[
            ["$10B+", "Total U.S. fraud losses (2023)"],
            ["2.6M", "Fraud reports filed with FTC"],
            ["34", "Scam types covered on this site"],
            ["14%", "Year-over-year increase in losses"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scam type sections */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">All scam types</h2>
        <p className="mt-2 text-sm text-slate-500">
          Click any card to read the full guide, learn the red flags, and submit a report.
        </p>

        {SECTIONS.map((section) => (
          <div key={section.title} className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
              {section.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.items.map((s) => (
                <ScamCard key={s.slug} s={s} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* General advice section */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            How to protect yourself from any scam
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🔍", "Verify before you trust", "Search names, phone numbers, emails, and websites on ScamComplaints before sending money. Check company registration on SEC.gov or BBB."],
              ["⏸️", "Resist urgency", "Every scam creates artificial time pressure — \"act now or lose your account / go to jail / miss the deal.\" Legitimate organizations give you time to think."],
              ["💳", "Payment method = red flag", "Gift cards, wire transfers, crypto, and cash apps are scam payment methods. Use credit cards for purchase protection and chargeback rights."],
              ["🔐", "Guard your personal info", "Never share your SSN, bank login, or copies of ID with anyone who contacts you first. Legitimate employers and agencies don't ask via text."],
              ["📱", "Verify identity independently", "If someone claims to be from your bank, the IRS, or a company — hang up and call the official number from their website. Never use a number they provide."],
              ["📢", "Report everything", "Even if you didn't lose money, report scam attempts. Every report builds the database that protects others."],
            ].map(([emoji, title, text]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-lg">
                  {emoji}
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Been scammed? Report it now.
          </h2>
          <p className="max-w-xl text-sm text-slate-500">
            Your report is added to a public, searchable database. It takes under
            2 minutes and helps protect others from the same scam.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/case-builder"
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700"
            >
              File a Full Report
            </a>
            <a
              href="/search"
              className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Search the Database
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
