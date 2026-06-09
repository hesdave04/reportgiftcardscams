import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Gift Card Scam | Gift Card Fraud Database — ScamComplaints",
  description: "Report gift card scams and fraud. If someone asked you to pay with gift cards, report it here. Free public database protecting consumers from gift card fraud.",
  keywords: "report gift card scam, gift card fraud report, scam gift cards, iTunes gift card scam, Amazon gift card scam, Google Play gift card scam, report gift card fraud",
  openGraph: {
    title: "Report Gift Card Scams & Fraud — ScamComplaints.org",
    description: "Someone asked you to pay with gift cards? Report it here to protect others.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-gift-card-scam" },
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
      "@id": "https://scamcomplaints.org/report-gift-card-scam/#webpage",
      "url": "https://scamcomplaints.org/report-gift-card-scam",
      "name": "Report a Gift Card Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-gift-card-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-gift-card-scam/#breadcrumb",
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
          "name": "Report Gift Card Scam",
          "item": "https://scamcomplaints.org/report-gift-card-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Gift Card Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-emerald-400">gift card scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            No legitimate business, government agency, or person will ever ask you to pay with gift cards. If someone told you to buy gift cards and read the numbers over the phone, that was a scam. Reporting the details here — the card type, amount, store, and how you were contacted — helps investigators track these operations and potentially freeze remaining funds before the scammer drains them.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="gift_card_scam"
              title="Quick gift card scam report"
              subtitle="Report the scam in under 2 minutes. Need to include receipts or photos?"
              fields={[
          { name: "cardType", label: "Type of gift card", type: "select", required: true, options: [
            { value: "amazon", label: "Amazon" }, { value: "apple_itunes", label: "Apple / iTunes" },
            { value: "google_play", label: "Google Play" }, { value: "target", label: "Target" },
            { value: "walmart", label: "Walmart" }, { value: "steam", label: "Steam" },
            { value: "ebay", label: "eBay" }, { value: "best_buy", label: "Best Buy" },
            { value: "visa_prepaid", label: "Visa prepaid / gift" }, { value: "other", label: "Other" },
          ]},
          { name: "amountLost", label: "Total amount on gift cards", type: "text", required: true, placeholder: "e.g., 2000", inputMode: "decimal" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Who contacted you? What did they claim? How did they tell you to send the codes?" },
          { name: "contactMethod", label: "How were you contacted?", type: "select", expandable: true, placeholder: "Select...", options: [
            { value: "phone_call", label: "Phone call" }, { value: "text_sms", label: "Text / SMS" },
            { value: "email", label: "Email" }, { value: "social_media", label: "Social media" },
            { value: "in_person", label: "In person" }, { value: "popup", label: "Computer popup" },
            { value: "other", label: "Other" },
          ]},
          { name: "impersonated", label: "Who did they claim to be?", type: "text", expandable: true, placeholder: "e.g., IRS agent, Microsoft support, your grandchild" },
          { name: "storePurchased", label: "Store where you bought the cards", type: "text", expandable: true, placeholder: "e.g., CVS, Walgreens, Target" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report gift card fraud?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Some gift card companies can freeze remaining funds if reported quickly
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Retailers use reports to train cashiers to intervene
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Law enforcement tracks patterns to identify organized fraud rings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">→</span>
                    Your report may help other victims recover partial funds
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                <h3 className="text-sm font-semibold text-emerald-900">Gift card scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-emerald-800">
                  <li>• "Pay your fine / tax / fee with gift cards"</li>
                  <li>• Caller claims to be IRS, SSA, or law enforcement</li>
                  <li>• Urgency — "you'll be arrested if you don't pay now"</li>
                  <li>• Asked to read the card numbers over the phone</li>
                  <li>• Told to stay on the phone while buying the cards</li>
                  <li>• Asked to scratch off the code and text a photo</li>
                  <li>• Claims your Social Security number is "suspended"</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Gift card scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$217M</span>
                <p className="text-xs text-slate-500">lost to gift card scams in 2023 (FTC)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Target</span>
                <p className="text-xs text-slate-500">most commonly used gift card brand in scams</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$500</span>
                <p className="text-xs text-slate-500">median loss per gift card scam victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">1 in 4</span>
                <p className="text-xs text-slate-500">scam payment requests involve gift cards</p>
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
          <h2 className="text-2xl font-bold text-slate-900">Why scammers love gift cards — and how to fight back</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Gift cards are the currency of choice for scammers because they
              combine the anonymity of cash with the convenience of digital
              transfer. Once a victim reads the numbers off the back of a card,
              the scammer can drain the balance in seconds from anywhere in the
              world. There's no chargeback mechanism, no sender protection, and
              no paper trail linking the card to a specific person. That's why
              the FTC consistently ranks gift cards as one of the top payment
              methods in reported fraud — $217 million in losses in 2023 alone.
            </p>
            <p>
              The scams follow recognizable scripts. A phone call from someone
              claiming to be the IRS says you owe back taxes and will be arrested
              unless you pay immediately — with Target gift cards. A pop-up on
              your computer warns of a virus and directs you to call a "Microsoft
              support" number, where the agent asks for payment in Google Play
              cards. A text from someone posing as your boss says they need you
              to buy $500 in Apple gift cards for a client surprise. In every
              case, the urgency is manufactured to prevent you from thinking
              clearly or checking with someone you trust.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              What to do if you've already sent the codes
            </h3>
            <p>
              Act immediately. Call the gift card company's customer service
              number — it's on the back of the card — and tell them the card was
              used in a scam. Amazon, Apple, Google, Target, and most major
              issuers have fraud departments that can sometimes freeze remaining
              balances. The faster you call, the better the odds. Keep the
              physical cards and receipts as evidence. Then file reports here,
              with the FTC (reportfraud.ftc.gov), and with your local police.
            </p>
            <p>
              Even if the money is already gone, your report matters.
              Investigators use aggregated gift card fraud data to identify the
              stores and regions where scammers are most active. Retailers use
              this data to train cashiers — when a cashier asks "is someone
              telling you to buy these?" before a large gift card purchase,
              that intervention exists because of reports like yours.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How gift card scams are organized
            </h3>
            <p>
              Most gift card scams aren't lone operators. They're run by
              organized fraud rings, often based overseas, with call centers
              employing dozens of people working through scripts. Some operations
              use "money mules" — people recruited (often unknowingly) to
              purchase gift cards locally and send photos of the codes. The gift
              card numbers are then sold on dark web marketplaces or converted
              to other currencies within minutes. A single fraud ring can run
              hundreds of scams simultaneously, which is why every individual
              report helps build the bigger picture investigators need.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report gift card scams</h3>
            <p className="mt-2 text-sm text-slate-600">Contact the card issuer first, then file with these agencies:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the #1 place to report gift card fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>Card issuer</strong> — Call the number on the back of the card immediately to report fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>Your state AG</strong> — Most state attorneys general have consumer protection divisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-500">→</span>
                <span><strong>Local police</strong> — File a police report — you may need it for insurance or bank claims</span>
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
              <a href="/report-romance-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Romance Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-tech-support-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Tech Support Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-government-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Government Impersonation Scam</span>
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
