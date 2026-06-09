import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report an Investment Scam | Ponzi, Forex & Crypto Fraud — ScamComplaints",
  description: "Report investment scams — fake trading platforms, Ponzi schemes, forex fraud, and unregistered securities. Help investigators trace fraudulent operations.",
  keywords: "report investment scam, Ponzi scheme report, forex scam report, fake trading platform, investment fraud report, securities fraud report, crypto investment scam",
  openGraph: {
    title: "Report Investment Scams & Fraud — ScamComplaints.org",
    description: "Lost money to a fake trading platform or Ponzi scheme? File a report to help stop the fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-investment-scam" },
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-teal-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Investment Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-teal-400">investment scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Fake trading platforms, Ponzi schemes, unregistered securities, and forex fraud collectively account for more dollar losses than any other scam category. If someone promised guaranteed returns, showed you fabricated profit charts, or pressured you into an "exclusive" investment opportunity that turned out to be fake, report the platform, company, and individuals here. Every report helps regulators identify and shut down these operations faster.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="investment_scam"
              title="Quick investment scam report"
              subtitle="Report the platform, company, or individual. Have account screenshots?"
              fields={[
          { name: "investmentType", label: "Type of investment scam", type: "select", required: true, options: [
            { value: "fake_platform", label: "Fake trading platform / app" },
            { value: "ponzi", label: "Ponzi / pyramid scheme" },
            { value: "forex", label: "Forex / binary options fraud" },
            { value: "crypto_ai", label: "Crypto / AI trading scam" },
            { value: "securities", label: "Unregistered securities" },
            { value: "real_estate", label: "Real estate investment fraud" },
            { value: "mlm", label: "MLM / multi-level marketing" },
            { value: "other", label: "Other" },
          ]},
          { name: "platformUrl", label: "Platform website or app name", type: "text", required: true, placeholder: "e.g., cryptoprofitai.com or the app name" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "How were you recruited? What were you promised? What happened when you tried to withdraw?" },
          { name: "amountLost", label: "Total amount invested / lost", type: "text", expandable: true, placeholder: "e.g., 25000", inputMode: "decimal" },
          { name: "companyName", label: "Company or person's name", type: "text", expandable: true, placeholder: "e.g., CryptoProfitAI LLC, John Smith" },
          { name: "walletAddress", label: "Crypto wallet you sent funds to", type: "text", expandable: true, placeholder: "Paste wallet address if applicable", mono: true },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report investment fraud?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    The SEC and CFTC use aggregated reports to open investigations
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Platform domains can be seized when enough evidence accumulates
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Other investors can check the company or platform before depositing
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Recovery firms and law enforcement need victim testimony to build cases
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
                <h3 className="text-sm font-semibold text-teal-900">Investment scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-teal-800">
                  <li>• Guaranteed returns — no legitimate investment is risk-free</li>
                  <li>• Unregistered with the SEC or FINRA (check investor.gov)</li>
                  <li>• Pressure to invest quickly — "this opportunity closes tomorrow"</li>
                  <li>• Recruited through social media, especially by strangers</li>
                  <li>• Can't withdraw funds or withdrawal requires paying "fees" first</li>
                  <li>• Returns sound too good — 10%, 20%, 50% per month</li>
                  <li>• Complex structure designed to confuse ("algorithmic AI trading")</li>
                  <li>• No verifiable company address, registration, or leadership team</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Investment scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$4.57B</span>
                <p className="text-xs text-slate-500">total investment fraud losses reported in 2023 (FBI)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$3.96B</span>
                <p className="text-xs text-slate-500">of that was crypto-related investment fraud</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">most costly fraud type tracked by the FBI</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">53%</span>
                <p className="text-xs text-slate-500">increase in investment fraud losses year over year</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How investment scams work and why losses are skyrocketing</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Investment fraud is the most financially devastating scam category
              tracked by the FBI, with reported losses hitting $4.57 billion in
              2023 — a 53% increase over the prior year. The explosion is driven
              largely by fake cryptocurrency trading platforms, but traditional
              Ponzi schemes, unregistered securities, and forex fraud remain
              significant. What these scams share is a common playbook: promise
              extraordinary returns, show fabricated evidence it's working, then
              disappear with the money.
            </p>
            <p>
              Modern investment scams are alarmingly sophisticated. Fake trading
              platforms feature real-time price charts pulled from legitimate
              exchanges, professional interfaces, mobile apps with high ratings
              (often boosted by fake reviews), and customer support chat. Some
              even have fake "regulatory" badges claiming SEC or FCA
              registration. The victim creates an account, deposits funds, and
              watches their "balance" grow — not realizing that every number on
              screen is fabricated. The money went straight to the scammer the
              moment it was deposited.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The withdrawal trap
            </h3>
            <p>
              The moment of truth comes when you try to withdraw. Suddenly
              there's a 20% "tax" you must pay before funds can be released.
              Then an "anti-money laundering fee." Then a "security deposit."
              Each fee is calculated to seem reasonable relative to the large
              balance you believe you're about to receive. Victims often pay
              multiple rounds of fees — sometimes totaling more than their
              original investment — before realizing no money is ever coming
              back. The platform then goes dark or the "support team" becomes
              unreachable.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to verify before you invest
            </h3>
            <p>
              Before investing with any platform or individual, check the SEC's
              EDGAR database (sec.gov) and FINRA BrokerCheck (brokercheck.finra.org)
              for registration. Unregistered investment opportunities are illegal
              in most cases. Google the platform name followed by "scam" or
              "review." Check if the company has a verifiable physical address,
              real employees with LinkedIn profiles, and audited financial
              statements. If someone recruited you through social media, that's
              a red flag by itself — legitimate investment firms don't cold-DM
              strangers on Instagram.
            </p>
            <p>
              If you've lost money to an investment scam,{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                document everything
              </a>{" "}
              — screenshots of the platform, transaction records, communication
              with the recruiter, and any promotional materials. This evidence
              is critical for regulatory investigations.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report investment scams</h3>
            <p className="mt-2 text-sm text-slate-600">Investment fraud falls under multiple regulators — report to all that apply:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>SEC</strong> — sec.gov/tcr — for securities fraud and unregistered investments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>CFTC</strong> — cftc.gov/complaint — for forex, crypto, and commodity fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for all investment fraud, especially large losses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>FINRA</strong> — finra.org/investors/have-problem — for broker misconduct</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
