import PrivacyLockCTA from "@/app/components/PrivacyLockCTA";

export const metadata = {
  title: "How to Report a Scam — What to Gather and What Happens Next | ScamComplaints",
  description:
    "A step-by-step guide to reporting a scam: what details to collect, how to file in about 3 minutes, where your report goes, and what to do next to protect yourself.",
  keywords:
    "how to report a scam, report online fraud, report a scammer, scam report guide, what information to report a scam, where to report scams",
  openGraph: {
    title: "How to Report a Scam — Step-by-Step Guide",
    description:
      "What to gather before you file, how the report works, and what happens after you submit.",
    siteName: "ScamComplaints",
    type: "article",
  },
  alternates: { canonical: "/how-to-report" },
};

const GATHER = [
  {
    label: "Where it happened",
    detail:
      "The app, site, or platform the scammer contacted you on — Facebook, WhatsApp, Instagram, Telegram, TikTok, a dating app, email, or a phone call. This is the single most useful field: it tells investigators which network the scammer is operating on.",
    have: "Almost everyone has this",
  },
  {
    label: "Any name or handle they used",
    detail:
      "Real-sounding name, screen name, @handle, or profile link. Scammers reuse identities across dozens of victims, so even a fake name is a match key.",
    have: "About 3 in 4 reports include one",
  },
  {
    label: "Contact details",
    detail:
      "Phone number, email address, or the username they messaged you from. Copy and paste it exactly — including the odd spellings and extra characters, which are often the giveaway.",
    have: "Phone in ~64% of reports, email in ~56%",
  },
  {
    label: "Where the money went",
    detail:
      "Crypto wallet address, bank or wire details, Zelle/Cash App/Venmo handle, PayPal address, or the gift card brand, retailer and card number. Wallet addresses and card numbers are permanent identifiers — they tie your report to every other victim of the same operation.",
    have: "Crypto and bank transfers are the two biggest categories",
  },
  {
    label: "Any website they sent you to",
    detail:
      "The full URL of the investment platform, shop, or login page. Copy it from your browser bar rather than retyping it.",
    have: "Present in about half of all reports",
  },
  {
    label: "What happened, in your own words",
    detail:
      "How it started, what they asked for, what you sent, and when you realised. You do not need to write it well — you just need to write it down. If the scam came by email, paste the whole message including the header lines (From, Reply-To, Date, Subject). Those headers carry routing information that a screenshot does not.",
    have: "97% of people who file write this out",
  },
  {
    label: "Screenshots and evidence",
    detail:
      "Chat logs, profile pages, payment receipts, the photos they sent you. Stolen photos matter more than people expect — nearly 4 in 10 reports mention pictures or video calls, and a stolen photo is often the fastest way to identify who is really behind the account.",
    have: "Optional, but it strengthens the report",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Stop contact and screenshot everything first",
    body:
      "Before you block or delete anything, capture it. Once you block a profile you often lose the chat history, and once a scam account is reported by enough people, the platform removes it and the evidence goes with it. Screenshot the conversation, the profile, and any payment confirmations. Then stop replying.",
  },
  {
    n: "2",
    title: "File the report",
    body:
      "Use the full report builder if you have a few minutes — it walks you through it question by question and takes about 3 minutes. Use the quick report if you only have one detail, like a gift card number or a scam website. A partial report is far better than no report: most reports come in with only some of the fields filled, and they still connect.",
  },
  {
    n: "3",
    title: "We structure it and look for matches",
    body:
      "Your report is logged, checked for duplicates, and cross-referenced against the rest of the database. Names, phone numbers, emails, usernames, wallet addresses, websites and payment methods become searchable links between cases — which is how a single scammer working 40 victims stops looking like 40 unrelated incidents.",
  },
  {
    n: "4",
    title: "It becomes public evidence",
    body:
      "Reports feed the public search, the Wall of Shame, and the data made available to investigators, partners and law enforcement. Sensitive details are never published — gift card numbers, for example, are shown only as the last four digits.",
  },
  {
    n: "5",
    title: "Protect yourself before it happens again",
    body:
      "Reporting protects other people. The steps below protect you: scam victims are frequently targeted a second time, because the same personal data that made you reachable is still public, and because scam operations resell victim lists to each other.",
  },
];

const ALSO_FILE = [
  {
    name: "FTC — ReportFraud.ftc.gov",
    why: "The US federal clearinghouse for consumer fraud. Feeds state and federal enforcement.",
    href: "https://reportfraud.ftc.gov",
  },
  {
    name: "FBI IC3 — ic3.gov",
    why: "For online crime, especially losses over $1,000, crypto fraud and romance scams.",
    href: "https://www.ic3.gov",
  },
  {
    name: "Your bank or payment provider",
    why: "Wires can sometimes be recalled within 24–72 hours. Card charges have formal dispute rights.",
    href: null,
  },
  {
    name: "The platform it happened on",
    why: "Reporting the account gets it removed and protects the next person it messages.",
    href: null,
  },
];

export default function HowToReportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <header>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          📝 Reporting Guide
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          How to Report a Scam
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Reporting takes about three minutes and it is free. This page explains what to
          gather before you start, what happens to your report afterwards, and what to do
          next to protect yourself. If you are in the middle of it right now, the most
          important thing is simple: <strong>stop replying, and screenshot everything
          before you block them.</strong>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href="/case-builder"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            File a full report · ~3 min
          </a>
          <a
            href="/#report-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Quick report · ~1 min
          </a>
        </div>
      </header>

      {/* What to gather */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          What to gather before you file
        </h2>
        <p className="mt-2 text-slate-600">
          You do not need all of this. Fill in what you have — every field is optional
          except your description of what happened.
        </p>
        <div className="mt-6 space-y-4">
          {GATHER.map((g) => (
            <div
              key={g.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{g.label}</h3>
                <span className="text-xs font-medium text-slate-400">{g.have}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{g.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          What happens after you submit
        </h2>
        <ol className="mt-6 space-y-6">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Where else to report */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Where else you should report it
        </h2>
        <p className="mt-2 text-slate-600">
          Filing here does not replace filing with the authorities. Do both — they serve
          different purposes.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ALSO_FILE.map((a) => (
            <div
              key={a.name}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-slate-900">
                {a.href ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {a.name} ↗
                  </a>
                ) : (
                  a.name
                )}
              </p>
              <p className="mt-1 text-sm text-slate-600">{a.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy reassurance */}
      <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-bold text-slate-900">What we do and don&apos;t publish</h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
          <li>
            <strong>We publish</strong> the scam details — platform, tactic, the identifiers
            the scammer used, and your description of what happened.
          </li>
          <li>
            <strong>We don&apos;t publish</strong> sensitive numbers. Gift card numbers appear
            only as the last four digits, and full card data is encrypted at rest.
          </li>
          <li>
            <strong>Keep your own personal information out of the description.</strong> We
            need the scammer&apos;s details, not yours — never include your Social Security
            number, bank account number or passwords in a report.
          </li>
          <li>
            Reporting is free, and it stays free. See{" "}
            <a href="/trust" className="font-medium text-red-600 hover:underline">
              Trust &amp; Security
            </a>{" "}
            and our{" "}
            <a href="/privacy" className="font-medium text-red-600 hover:underline">
              Privacy Policy
            </a>
            .
          </li>
        </ul>
      </section>

      {/* Next step CTA */}
      <PrivacyLockCTA variant="report" className="mt-14" />

      <div className="mt-10 text-center">
        <a
          href="/case-builder"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Report a scam now →
        </a>
        <p className="mt-3 text-sm text-slate-500">
          Already reported?{" "}
          <a href="/search" className="font-medium text-red-600 hover:underline">
            Search the database
          </a>{" "}
          to see if the same scammer has hit others.
        </p>
      </div>
    </main>
  );
}
