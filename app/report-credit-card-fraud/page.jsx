import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Credit Card Fraud & Check Scams | Financial Fraud — ScamComplaints",
  description: "Report credit card fraud, check scams, skimming, and unauthorized charges. Document the fraud and help investigators track financial criminals.",
  keywords: "report credit card fraud, check fraud report, card skimming, unauthorized charges, credit card scam, fake check scam, report card fraud",
  openGraph: {
    title: "Report Credit Card Fraud & Check Scams — ScamComplaints.org",
    description: "File a credit card fraud or check scam report. Help stop financial criminals.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-credit-card-fraud" },
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
      "@id": "https://scamcomplaints.org/report-credit-card-fraud/#webpage",
      "url": "https://scamcomplaints.org/report-credit-card-fraud",
      "name": "Report a Credit Card Fraud | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-credit-card-fraud/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-credit-card-fraud/#breadcrumb",
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
          "name": "Report Credit Card Fraud",
          "item": "https://scamcomplaints.org/report-credit-card-fraud"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Financial Fraud Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report
            <br />
            <span className="text-emerald-400">credit card or check fraud.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Credit card fraud and check scams remain one of the top 10 most costly cybercrime categories, with the FBI reporting significant losses each year. From card skimming devices at ATMs to fake check schemes that leave victims liable, financial fraud takes many forms. Reporting creates a trail that helps banks, law enforcement, and other victims.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="credit_card_fraud"
              title="Quick financial fraud report"
              subtitle="Document the unauthorized activity. This helps with disputes and investigations."
              fields={[
          { name: "platform", label: "Type of fraud", type: "select", required: true, options: [
            { value: "card_stolen", label: "Stolen credit/debit card" }, { value: "skimming", label: "Card skimming / cloning" },
            { value: "online_fraud", label: "Unauthorized online purchase" }, { value: "fake_check", label: "Fake check / counterfeit check" },
            { value: "check_washing", label: "Check washing / mail theft" }, { value: "account_takeover", label: "Account takeover" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the unauthorized charges, how you discovered the fraud, and any details about the transaction." },
          { name: "companyName", label: "Bank or card issuer", type: "text", placeholder: "e.g., Chase, Bank of America, Capital One" },
          { name: "amountLost", label: "Amount of fraudulent charges", type: "text", placeholder: "e.g., 3500", inputMode: "decimal", expandable: true },
          { name: "websiteUrl", label: "Where the card was used (if known)", type: "text", expandable: true, placeholder: "e.g., merchant name or website" },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report financial fraud?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Banks use fraud reports to identify skimming locations and compromised merchants
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Pattern data helps law enforcement catch organized card fraud rings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Documentation strengthens your chargeback claim with your bank
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Other victims in the same fraud ring can be identified faster
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <h3 className="text-sm font-semibold text-emerald-900">Financial fraud red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-emerald-800">
                  <li>• Unexpected small charges ($1-$5) testing if your card works</li>
                  <li>• Charges from unfamiliar merchants or foreign countries</li>
                  <li>• Someone offers to pay you by check and asks for change back</li>
                  <li>• A check for more than expected with instructions to return the excess</li>
                  <li>• ATMs that look modified or have loose card readers</li>
                  <li>• Emails asking you to "verify" your card information</li>
                  <li>• Missing mail — thieves steal checks and wash them</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$283M</span>
                <p className="text-xs text-slate-500">lost to credit card/check fraud in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">41%</span>
                <p className="text-xs text-slate-500">year-over-year increase in losses</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#10</span>
                <p className="text-xs text-slate-500">tenth-highest loss category</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">+63%</span>
                <p className="text-xs text-slate-500">growth since 2023</p>
              </div>
                </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How credit card and check fraud works — and how to protect yourself</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Credit card fraud is so common that an estimated 65% of Americans have experienced it at some point. The Nilson Report estimated
              global card fraud losses at $33.8 billion in 2023, with the U.S. accounting for the largest share. Meanwhile, check fraud has
              surged dramatically — FinCEN reported suspicious activity filings related to check fraud nearly doubled between 2021 and 2023,
              driven by a resurgence of mail theft.
            </p>
            <p>
              Card fraud typically follows one of several patterns. <strong>Card-not-present (CNP) fraud</strong> involves using stolen card
              numbers for online purchases — this is the most common type and accounts for over 70% of all card fraud. <strong>Card skimming</strong>
              uses devices installed on ATMs, gas pumps, or point-of-sale terminals to copy card data. <strong>Account takeover</strong> occurs
              when criminals gain access to your online banking or card account. And <strong>application fraud</strong> involves opening new cards
              in your name using stolen identity information.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The check fraud comeback
            </h3>
            <p>
              Check fraud, once considered a declining crime, has roared back. Criminals steal checks from mailboxes, then use chemicals to
              &quot;wash&quot; them — removing the payee name and amount while keeping the signature. They rewrite the check for a larger
              amount to themselves or an accomplice. The &quot;fake check&quot; variant is even simpler: scammers send you a check that appears
              to clear, you send money back, then the check bounces and you&apos;re liable for the full amount. This scheme is used in
              employment scams, prize scams, and overpayment scams.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Steps to protect yourself
            </h3>
            <p>
              Monitor your statements weekly — don&apos;t wait for the monthly bill. Set up transaction alerts with your bank for any purchase
              over a threshold you choose. Use virtual card numbers for online shopping. At ATMs, check the card reader for anything loose or
              misaligned. Use chip-enabled terminals rather than swiping. For checks, use a gel pen (harder to wash), drop outgoing checks
              inside the post office rather than in a street mailbox, and consider switching to electronic payments when possible.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>Your bank / card issuer</strong> — call immediately to freeze the card and dispute charges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer protection and fraud pattern tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for large-scale fraud or organized criminal networks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>USPS Postal Inspection</strong> — uspis.gov — if checks were stolen from your mailbox</span>
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
              <a href="/report-identity-theft" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Identity Theft</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-online-shopping-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Online Shopping Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-phishing-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Phishing Scam</span>
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
