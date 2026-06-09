import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report an Online Shopping Scam | Fake Store & Non-Delivery — ScamComplaints",
  description: "Report fake online stores, non-delivery scams, and counterfeit products. Ordered something that never arrived or wasn't what was advertised? File a report.",
  keywords: "report online shopping scam, fake online store report, non-delivery scam, counterfeit product report, fake website shopping, online purchase scam, dropship scam",
  openGraph: {
    title: "Report Online Shopping Scams — ScamComplaints.org",
    description: "Report fake online stores and non-delivery scams. Your report helps others avoid the same trap.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-online-shopping-scam" },
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
      "@id": "https://scamcomplaints.org/report-online-shopping-scam/#webpage",
      "url": "https://scamcomplaints.org/report-online-shopping-scam",
      "name": "Report a Online Shopping Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-online-shopping-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-online-shopping-scam/#breadcrumb",
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
          "name": "Report Online Shopping Scam",
          "item": "https://scamcomplaints.org/report-online-shopping-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Online Shopping Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-violet-400">online shopping scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Fake online stores pop up faster than they can be taken down. They advertise on Instagram and Facebook with prices that seem too good to be true — because they are. You place an order, the money disappears, and the product either never arrives or turns out to be a cheap knockoff of what was advertised. Reporting the website, store name, and ad source here feeds a public database that helps other shoppers check before they buy.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="online_shopping_scam"
              title="Quick shopping scam report"
              subtitle="Report the fake store in under 2 minutes. Have order confirmation or ad screenshots?"
              fields={[
          { name: "websiteUrl", label: "Scam store website URL", type: "text", required: true, placeholder: "e.g., fakebrandstore.com" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What did you order? What did you receive (or not receive)? How did you find the store?" },
          { name: "amountLost", label: "Amount lost", type: "text", placeholder: "e.g., 89.99", inputMode: "decimal" },
          { name: "adSource", label: "Where did you see the ad?", type: "select", expandable: true, placeholder: "Select...", options: [
            { value: "facebook", label: "Facebook ad" }, { value: "instagram", label: "Instagram ad" },
            { value: "tiktok", label: "TikTok ad" }, { value: "google", label: "Google search / ad" },
            { value: "email", label: "Email" }, { value: "youtube", label: "YouTube" },
            { value: "none", label: "Found it directly" }, { value: "other", label: "Other" },
          ]},
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, placeholder: "How did you pay?", options: [
            { value: "credit_card", label: "Credit card" }, { value: "debit_card", label: "Debit card" },
            { value: "paypal", label: "PayPal" }, { value: "zelle", label: "Zelle / Venmo / Cash App" },
            { value: "crypto", label: "Cryptocurrency" }, { value: "wire", label: "Wire transfer" },
            { value: "other", label: "Other" },
          ]},
          { name: "whatOrdered", label: "What did you order?", type: "text", expandable: true, placeholder: "e.g., Nike Air Max, Samsung TV" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report shopping scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    The website URL gets flagged so others can check before buying
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Payment processors can investigate and potentially freeze accounts
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Hosting providers can take down fraudulent sites with enough reports
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Social media platforms can remove the ads driving traffic to scam stores
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
                <h3 className="text-sm font-semibold text-violet-900">Fake store red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-violet-800">
                  <li>• Prices are 70–90% below retail for brand-name products</li>
                  <li>• Website was created very recently (check WHOIS)</li>
                  <li>• No physical address, phone number, or real contact page</li>
                  <li>• Only accepts wire transfer, crypto, or payment apps (no credit card)</li>
                  <li>• Product photos look stolen from legitimate retailers</li>
                  <li>• Grammar and spelling errors throughout the site</li>
                  <li>• No return policy or a policy that's clearly copied from elsewhere</li>
                  <li>• Heavy social media ad presence but no organic reviews</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Online shopping scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$392M</span>
                <p className="text-xs text-slate-500">lost to online shopping scams in 2023 (FTC)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">most commonly reported scam type by volume</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">73%</span>
                <p className="text-xs text-slate-500">of scam store ads appear on Facebook and Instagram</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$100</span>
                <p className="text-xs text-slate-500">median loss — small amounts, massive total volume</p>
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
          <h2 className="text-2xl font-bold text-slate-900">The fake online store epidemic</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Online shopping scams are the most frequently reported fraud type
              in the country. The FTC logged more complaints about fake stores
              and non-delivery than any other category in 2023, with losses
              totaling $392 million. The individual amounts are often small —
              $50, $100, $200 — but the sheer volume makes this a massive
              problem. And for many victims, especially those who paid with
              debit cards or payment apps, even $100 is hard to recover.
            </p>
            <p>
              The scam infrastructure is industrialized. Fraudsters use
              templates to spin up hundreds of fake storefronts in a single day,
              each with a different domain name and branding but the same
              backend. They run paid ads on Facebook, Instagram, and TikTok
              targeting people who've recently searched for specific products.
              The ads feature stolen product photos and prices that are
              just low enough to be tempting without triggering immediate
              suspicion. Once a store accumulates enough complaints, it
              disappears — and a new one takes its place by the next morning.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Three types of shopping scams
            </h3>
            <p>
              <strong>Non-delivery:</strong> You pay, the order confirmation
              looks real, but nothing ever ships. The tracking number (if
              provided) is either fake or belongs to someone else's package.
              <strong>Bait-and-switch:</strong> You order a designer handbag and
              receive a $3 knockoff from overseas. The product vaguely resembles
              what was advertised but is clearly not the same quality.
              <strong>Information harvesting:</strong> The store isn't even
              trying to sell products — it exists to collect credit card
              numbers, addresses, and phone numbers for identity theft or
              resale on dark web marketplaces.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Getting your money back
            </h3>
            <p>
              If you paid with a credit card, file a chargeback with your card
              issuer — you have strong protections under the Fair Credit Billing
              Act. For debit cards, the protections are weaker but still exist
              if you act within 60 days. PayPal Purchase Protection covers many
              non-delivery cases. For Zelle, Venmo, or Cash App payments,
              recovery is much harder because these services treat transactions
              as voluntary. In all cases, file a report here and with the FTC —
              the documentation strengthens your case with your bank.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report online shopping scams</h3>
            <p className="mt-2 text-sm text-slate-600">Report to multiple places to maximize your chances of getting money back:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>Your credit card company</strong> — File a chargeback — this is the fastest path to recovery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the federal consumer protection database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>BBB Scam Tracker</strong> — bbb.org/scamtracker — public scam database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>The social media platform</strong> — Report the ad on Facebook, Instagram, or TikTok</span>
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
              <a href="/report-facebook-marketplace-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Facebook Marketplace Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-fraudulent-website" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Fraudulent Website</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-credit-card-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Credit Card Fraud</span>
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
