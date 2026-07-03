import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Romance Scam | Online Dating Fraud — ScamComplaints",
  description: "Report romance scams, catfish fraud, and online dating scammers. File a report in minutes. Free, searchable public database to protect others from love scams.",
  keywords: "report romance scam, report catfish, online dating scam report, romance fraud report, love scam report, report dating scammer, catfish scam report, romance scam help",
  openGraph: {
    title: "Report Romance Scams & Online Dating Fraud — ScamComplaints.org",
    description: "File a romance scam report in minutes. Help others avoid the same catfish or dating scammer.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-romance-scam" },
};

export default function Page() {
  return (
    <>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://scamcomplaints.org/report-romance-scam/#webpage",
      "url": "https://scamcomplaints.org/report-romance-scam",
      "name": "Report a Romance Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-romance-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-romance-scam/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://scamcomplaints.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Scam Types",
          "item": "https://scamcomplaints.org/scams"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Report Romance Scam",
          "item": "https://scamcomplaints.org/report-romance-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-rose-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Romance Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-rose-400">romance scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Romance scams devastate more than bank accounts — they exploit trust, loneliness, and genuine human connection. If someone you met online asked for money, gift cards, or cryptocurrency under false pretenses, reporting it here helps warn the next person they target and gives investigators the patterns they need to shut these operations down.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="romance_scam"
              title="Quick romance scam report"
              subtitle="Share the key details in under 2 minutes. Need to include screenshots or chat logs?"
              fields={[
          { name: "platform", label: "Where did you meet them?", type: "select", required: true, options: [
            { value: "facebook", label: "Facebook" }, { value: "instagram", label: "Instagram" },
            { value: "tinder", label: "Tinder" }, { value: "bumble", label: "Bumble" },
            { value: "hinge", label: "Hinge" }, { value: "match", label: "Match.com" },
            { value: "pof", label: "Plenty of Fish" }, { value: "whatsapp", label: "WhatsApp" },
            { value: "telegram", label: "Telegram" }, { value: "hangouts", label: "Google Chat / Hangouts" },
            { value: "other_dating", label: "Other dating app" }, { value: "other", label: "Other" },
          ]},
          { name: "fakeName", label: "Name they used", type: "text", placeholder: "e.g., James Wilson, Dr. Sarah Chen" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "How did they approach you? What was their story? When did they start asking for money?" },
          { name: "amountLost", label: "Total amount sent", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, placeholder: "How did you send money?", options: [
            { value: "gift_card", label: "Gift cards" }, { value: "wire", label: "Bank / wire transfer" },
            { value: "crypto", label: "Cryptocurrency" }, { value: "cash_app", label: "Cash App / Venmo / Zelle" },
            { value: "money_order", label: "Money order" }, { value: "other", label: "Other" },
          ]},
          { name: "duration", label: "How long were you in contact?", type: "select", expandable: true, placeholder: "Duration", options: [
            { value: "days", label: "Less than a week" }, { value: "weeks", label: "1–4 weeks" },
            { value: "months", label: "1–6 months" }, { value: "6plus", label: "More than 6 months" },
          ]},
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report a romance scam?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    The same fake identity is often used on dozens of victims
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    Your report helps investigators connect cases across states and countries
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    Other users can search for the name, photo, or story before sending money
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    Platforms use aggregated reports to improve detection algorithms
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                <h3 className="text-sm font-semibold text-rose-900">Romance scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-rose-800">
                  <li>• Claims to be military, a doctor, or working overseas</li>
                  <li>• Professes love within days or weeks of first contact</li>
                  <li>• Always has excuses for why they can't video call</li>
                  <li>• Asks for money for emergencies, travel, or customs fees</li>
                  <li>• Wants you to move off the dating app to WhatsApp or Hangouts</li>
                  <li>• Photos look too polished or are stolen from someone else</li>
                  <li>• Story keeps changing or doesn't add up over time</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Romance scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$929M</span>
                <p className="text-xs text-slate-500">lost to romance scams in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">26,000+</span>
                <p className="text-xs text-slate-500">romance scam complaints filed in 2025</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$2,000</span>
                <p className="text-xs text-slate-500">median individual loss per victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">38%</span>
                <p className="text-xs text-slate-500">year-over-year increase in losses</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How romance scams work — and why they're so effective</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Romance scams remain one of the most financially devastating forms of
              consumer fraud in the United States. The FBI's IC3 reported $929 million
              in losses during 2025 — a 38% jump from the prior year — and those
              numbers only capture victims who actually filed a report. The true
              toll is almost certainly north of $1 billion.
              Unlike a phishing email you can spot in seconds, romance scams
              operate on a timeline of weeks or months, building genuine emotional
              attachment before any money changes hands.
            </p>
            <p>
              The scammer creates a persona — often an attractive, successful
              professional stationed overseas, typically military, a doctor
              working with an NGO, or an engineer on an oil rig. The geographic
              distance explains why they can never meet in person. They invest
              hours every day in conversations, learning about your life, your
              fears, your routines. By the time they mention a financial
              emergency, you don't see a stranger asking for money — you see
              someone you care about in trouble.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The financial escalation pattern
            </h3>
            <p>
              The first request is always small and reasonable — maybe $200 for a
              phone bill so they can keep talking to you, or $500 for a medical
              emergency. When you send it and the relationship continues normally,
              you've crossed a psychological threshold. The next request is
              larger: $2,000 for a plane ticket to finally meet you. Then customs
              fees. Then legal issues. Each payment makes it harder to walk away
              because you've already invested so much — not just money, but
              emotional energy and hope. Scammers know this and exploit it
              deliberately.
            </p>
            <p>
              Gift cards are the preferred payment method because they're
              untraceable once the codes are read. Wire transfers and
              cryptocurrency are close seconds. If someone you've never met in
              person asks you to buy gift cards, send crypto, or wire money
              overseas, that is the single most reliable indicator of a romance
              scam — no exceptions.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Who gets targeted
            </h3>
            <p>
              Anyone can be targeted. The stereotype of an elderly widow is
              outdated — FTC data shows that adults ages 18–59 report romance
              scams at comparable rates to older adults. The common thread isn't
              age or education; it's emotional vulnerability at a specific moment
              in time. People going through a divorce, dealing with grief,
              relocating to a new city, or simply experiencing loneliness are
              more susceptible. Scammers screen for these signals in profiles and
              early conversations.
            </p>
            <p>
              If you're reading this because you suspect you're being scammed
              right now, trust that instinct. The fact that you're searching for
              information means something felt off. Use our{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                full report builder
              </a>{" "}
              to document everything — names, photos, messages, payment receipts.
              That evidence matters.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report romance scams</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the primary federal agency tracking romance fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — especially for losses over $1,000 or international scammers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>Social Catfish</strong> — socialcatfish.com — reverse image search to verify the person's identity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>Your bank</strong> — contact your bank immediately if you wired money — some transfers can be reversed within 24 hours</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related scam types */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h2 className="text-lg font-bold text-slate-900">Related scam types</h2>
          <p className="mt-1 text-sm text-slate-500">Scammers often combine tactics. If this looks familiar, check these too:</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href="/report-sextortion-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Sextortion Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-military-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Military Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-sugar-daddy-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Sugar Daddy Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            <a href="/scams" className="font-medium text-red-600 hover:text-red-700 underline decoration-red-200 underline-offset-2">View all scam types &rarr;</a>
          </p>
        </div>
      </section>
    </>
  );
}
