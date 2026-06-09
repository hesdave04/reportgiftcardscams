import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Advance Fee Fraud | 419 Scam & Nigerian Prince — ScamComplaints",
  description: "Report advance fee scams, 419 fraud, and Nigerian prince email schemes. These scams demand upfront payments for promised rewards. File a report.",
  keywords: "report advance fee scam, 419 scam, Nigerian prince scam, advance fee fraud, upfront payment scam, inheritance scam, report 419 fraud",
  openGraph: {
    title: "Report Advance Fee Fraud & 419 Scams — ScamComplaints.org",
    description: "File a report about advance fee scams demanding upfront payments for fake rewards.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-advance-fee-scam" },
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
      "@id": "https://scamcomplaints.org/report-advance-fee-scam/#webpage",
      "url": "https://scamcomplaints.org/report-advance-fee-scam",
      "name": "Report a Advance Fee Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-advance-fee-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-advance-fee-scam/#breadcrumb",
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
          "name": "Report Advance Fee Scam",
          "item": "https://scamcomplaints.org/report-advance-fee-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Advance Fee Fraud Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-amber-400">advance fee scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            If someone promises you a large sum of money — an inheritance, a business deal, a locked fund — but you need to pay fees upfront to "release" it, that is an advance fee scam. Also known as 419 fraud, this classic scheme has been running for decades and has evolved from Nigerian prince emails to sophisticated business proposals. The promised money never materializes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="advance_fee_scam"
              title="Quick advance fee scam report"
              subtitle="Document the fake promise and any payments you made."
              fields={[
          { name: "platform", label: "How were you contacted?", type: "select", required: true, options: [
            { value: "email", label: "Email" }, { value: "social_media", label: "Social media" },
            { value: "phone", label: "Phone call" }, { value: "text", label: "Text / WhatsApp" },
            { value: "mail", label: "Physical mail" }, { value: "dating", label: "Dating app" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What did they promise you? What fees did they ask you to pay? What was their story?" },
          { name: "fakeName", label: "Name they used", type: "text", placeholder: "e.g., Barrister James, Dr. Ahmed" },
          { name: "amountLost", label: "Total fees paid", type: "text", placeholder: "e.g., 8000", inputMode: "decimal", expandable: true },
          { name: "companyName", label: "Fake company or organization name", type: "text", expandable: true, placeholder: "e.g., International Monetary Fund, Royal Bank" },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report advance fee scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    These operations run on industrial scale from organized crime networks
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    The same email templates and fake personas target thousands of people
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Reports help email providers improve spam filtering and detection
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Your report may help identify criminal networks operating across borders
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">Advance fee red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
                  <li>• Unsolicited contact about a large sum of money owed to you</li>
                  <li>• You need to pay fees, taxes, or insurance upfront to "release" funds</li>
                  <li>• Each payment leads to another required fee</li>
                  <li>• Involves an inheritance, locked fund, business deal, or government payout</li>
                  <li>• Sender uses a free email (Gmail, Yahoo) despite claiming to be an institution</li>
                  <li>• Documents look official but have grammatical errors or inconsistencies</li>
                  <li>• Requests payment via wire transfer, cryptocurrency, or gift cards</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$107M</span>
                <p className="text-xs text-slate-500">lost to advance fee scams in 2023 (FBI)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">3rd</span>
                <p className="text-xs text-slate-500">most common email-based scam worldwide</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$3,000</span>
                <p className="text-xs text-slate-500">median loss per victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">70%+</span>
                <p className="text-xs text-slate-500">of advance fee scams originate from West Africa</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How advance fee scams work — the oldest online fraud, still thriving</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              The advance fee scam — sometimes called 419 fraud after the section of the Nigerian criminal code that addresses it — is one of
              the oldest cons in the internet era. Despite being widely mocked as the &quot;Nigerian prince&quot; scam, it still generates over
              $107 million in reported losses annually, according to the FBI. The modern versions are far more sophisticated than the obvious
              broken-English emails of the early 2000s.
            </p>
            <p>
              The core mechanic never changes: someone contacts you with an opportunity to receive a large amount of money (an inheritance,
              a business deal, a government payout, trapped funds), but you need to pay a relatively small fee first to cover taxes, legal
              fees, transfer charges, or customs. You pay. Then there&apos;s another fee. And another. Each time, the promised windfall is
              &quot;almost ready.&quot; It never arrives. Some victims have paid hundreds of thousands of dollars over months or years.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Modern advance fee variants
            </h3>
            <p>
              <strong>Inheritance scams</strong> notify you of a fictional relative who died abroad and left you millions. <strong>Business
              opportunity scams</strong> offer partnerships or contracts with large advance payments. <strong>Loan scams</strong> promise
              guaranteed approval but require upfront &quot;processing fees.&quot; <strong>Grant scams</strong> claim you qualify for a
              government or foundation grant if you pay a release fee. <strong>Overpayment scams</strong> send you a check for more than
              owed and ask you to wire back the difference before the check bounces.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The rule that protects you
            </h3>
            <p>
              <strong>You should never have to pay money to receive money.</strong> Legitimate inheritances, grants, loans, and business deals
              do not require the recipient to pay upfront fees. If fees are legitimate, they are deducted from the proceeds — not paid
              separately via wire transfer or gift cards. If anyone asks you to pay money now in exchange for a promise of money later, stop
              all communication immediately.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — the primary agency for international advance fee fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for tracking fraud patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>Your email provider</strong> — forward the scam email to report phishing (Google: reportphishing@google.com)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>Your bank</strong> — if you wired money, contact them immediately — some transfers can be recalled</span>
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
              <a href="/report-lottery-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Lottery Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-employment-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Employment Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-rental-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Rental Scam</span>
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
