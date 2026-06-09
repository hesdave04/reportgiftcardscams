import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Lottery & Sweepstakes Scams | Prize Fraud — ScamComplaints",
  description: "Report lottery scams, fake sweepstakes, and prize fraud. You can't win a contest you never entered. File a report to expose these scammers.",
  keywords: "report lottery scam, sweepstakes scam report, fake prize scam, lottery fraud, report sweepstakes fraud, Publishers Clearing House scam, fake lottery winner",
  openGraph: {
    title: "Report Lottery & Sweepstakes Scams — ScamComplaints.org",
    description: "File a report about fake lottery wins, sweepstakes fraud, and prize scams.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-lottery-scam" },
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
      "@id": "https://scamcomplaints.org/report-lottery-scam/#webpage",
      "url": "https://scamcomplaints.org/report-lottery-scam",
      "name": "Report a Lottery Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-lottery-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-lottery-scam/#breadcrumb",
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
          "name": "Report Lottery Scam",
          "item": "https://scamcomplaints.org/report-lottery-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-yellow-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Prize Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-yellow-400">lottery or sweepstakes scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Fake prize notifications are one of the most common scams in America, accounting for over 38% of all fraud reports to Fraud.org. Whether it's a call claiming you won a lottery, an email about a sweepstakes you never entered, or a text about an unclaimed prize — if you have to pay to collect your "winnings," it's a scam. Every time.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="lottery_scam"
              title="Quick prize scam report"
              subtitle="Help shut down these operations by documenting the scam."
              fields={[
          { name: "platform", label: "How were you contacted?", type: "select", required: true, options: [
            { value: "phone", label: "Phone call" }, { value: "email", label: "Email" },
            { value: "text", label: "Text message" }, { value: "mail", label: "Physical mail" },
            { value: "social_media", label: "Social media" }, { value: "popup", label: "Website popup" },
            { value: "other", label: "Other" },
          ]},
          { name: "companyName", label: "Name of the fake lottery/sweepstakes", type: "text", placeholder: "e.g., International Lottery Commission, PCH Prize" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What did they claim you won? What did they ask you to pay? How did they contact you?" },
          { name: "amountLost", label: "Amount paid (if any)", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
          { name: "phoneNumber", label: "Phone number they called from", type: "text", expandable: true, placeholder: "e.g., +1 555-123-4567" },
          { name: "paymentMethod", label: "Payment method requested", type: "select", expandable: true, options: [
            { value: "gift_card", label: "Gift cards" }, { value: "wire", label: "Wire transfer" },
            { value: "crypto", label: "Cryptocurrency" }, { value: "cash_app", label: "Cash App / Venmo / Zelle" },
            { value: "check", label: "Cashier's check / money order" }, { value: "not_paid", label: "Didn't pay" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report prize scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-yellow-500">→</span>
                    These operations target thousands of people using the same phone numbers and scripts
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">→</span>
                    Reports help telecom companies block scam phone numbers
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">→</span>
                    Elderly victims are disproportionately targeted — your report protects them
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">→</span>
                    The FTC uses aggregated reports to shut down fraud operations
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
                <h3 className="text-sm font-semibold text-yellow-900">Prize scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-yellow-800">
                  <li>• You "won" a contest you never entered</li>
                  <li>• You must pay taxes, fees, or processing charges to claim your prize</li>
                  <li>• They ask for your bank account for a "direct deposit"</li>
                  <li>• Payment must be in gift cards, wire transfers, or cryptocurrency</li>
                  <li>• They pressure you to keep it secret or act fast</li>
                  <li>• The caller has a heavy accent or the email has grammatical errors</li>
                  <li>• They send you a check that you need to deposit and return part of</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">38%+</span>
                <p className="text-xs text-slate-500">of all fraud reports are prize/sweepstakes scams</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$301M</span>
                <p className="text-xs text-slate-500">lost to prize scams in 2023 (FTC)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$813</span>
                <p className="text-xs text-slate-500">median loss per victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">87%</span>
                <p className="text-xs text-slate-500">started with a phone call (Fraud.org)</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How lottery and sweepstakes scams work — the most common fraud in America</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Lottery and sweepstakes scams are the single most reported fraud category in America, according to Fraud.org, making up
              over 38% of all fraud complaints. The FTC reported $301 million in losses to prize scams in 2023, with elderly Americans
              disproportionately affected. The scam has been around for decades because the basic formula works: tell someone they won
              money, then ask them to pay a small amount to &quot;release&quot; it.
            </p>
            <p>
              The contact usually comes via phone call, though email, text, and social media variants are growing. The caller claims you&apos;ve
              won a lottery, sweepstakes, or giveaway — sometimes impersonating real organizations like Publishers Clearing House. But to
              collect your prize, you need to pay &quot;taxes,&quot; &quot;processing fees,&quot; or &quot;insurance.&quot; These fees typically
              start at a few hundred dollars and escalate. Some victims have paid tens of thousands of dollars in repeated fees, always
              being told the prize is almost ready.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The rule that never fails
            </h3>
            <p>
              <strong>You cannot win a contest you did not enter.</strong> Legitimate sweepstakes never require you to pay anything to claim
              a prize — it&apos;s actually illegal under U.S. law. If someone asks you to pay money to receive money, that is a scam. No
              exceptions. Real prizes are reported on your tax return after you receive them; the &quot;taxes&quot; aren&apos;t paid upfront.
            </p>
            <p>
              A common variant is the &quot;fake check&quot; scam: you receive a check for your &quot;winnings&quot; along with instructions
              to deposit it and wire back a portion for &quot;taxes.&quot; The check appears to clear, you send the money, and then the check
              bounces days later — leaving you responsible for the full amount. Banks can take weeks to identify a fraudulent check, and
              you are legally responsible for any funds you withdraw against it.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Who is targeted and why it works
            </h3>
            <p>
              Prize scams disproportionately target elderly Americans, with 87% of contacts occurring via phone call. Scammers often build
              ongoing relationships with victims, calling regularly and building trust before introducing the &quot;prize.&quot; Some victims
              report being contacted by the same scammer for months, with the relationship evolving to include emotional manipulation.
              If you suspect an elderly family member is receiving these calls, have a direct conversation — they may be embarrassed and
              hiding payments they&apos;ve already made.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the primary federal agency for prize and sweepstakes fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — if you've lost significant money or the scam involves international callers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-500">→</span>
                <span><strong>National Do Not Call Registry</strong> — donotcall.gov — register your number to reduce scam calls</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-yellow-500">→</span>
                <span><strong>Your state Attorney General</strong> — many states have <a href="/report-elder-fraud" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">elder fraud</a> units that investigate prize scams</span>
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
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-gift-card-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Gift Card Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-elder-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Elder Fraud</span>
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
