import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Rental Scam | Apartment & Housing Fraud — ScamComplaints",
  description: "Report rental scams, fake apartment listings, and housing fraud. File a report to warn others about fake landlords and fraudulent property listings.",
  keywords: "report rental scam, fake apartment listing, rental fraud, report fake landlord, housing scam, rental scam report, Craigslist rental scam, Zillow scam",
  openGraph: {
    title: "Report Rental Scams & Fake Housing Listings — ScamComplaints.org",
    description: "File a rental scam report. Expose fake landlords and fraudulent apartment listings.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-rental-scam" },
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
      "@id": "https://scamcomplaints.org/report-rental-scam/#webpage",
      "url": "https://scamcomplaints.org/report-rental-scam",
      "name": "Report a Rental Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-rental-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-rental-scam/#breadcrumb",
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
          "name": "Report Rental Scam",
          "item": "https://scamcomplaints.org/report-rental-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-teal-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Rental Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-teal-400">rental scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Fake rental listings cost Americans hundreds of millions of dollars each year. Scammers copy real property photos from Zillow or Realtor.com, list them at below-market rates, and collect deposits from multiple victims before vanishing. In a housing market where affordable units disappear fast, the pressure to act quickly is exactly what scammers exploit.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="rental_scam"
              title="Quick rental scam report"
              subtitle="Warn others about this listing or fake landlord."
              fields={[
          { name: "platform", label: "Where was the listing?", type: "select", required: true, options: [
            { value: "craigslist", label: "Craigslist" }, { value: "facebook", label: "Facebook Marketplace" },
            { value: "zillow", label: "Zillow" }, { value: "apartments", label: "Apartments.com" },
            { value: "trulia", label: "Trulia" }, { value: "hotpads", label: "HotPads" },
            { value: "offerup", label: "OfferUp" }, { value: "other", label: "Other" },
          ]},
          { name: "websiteUrl", label: "Listing URL (if still live)", type: "text", placeholder: "https://..." },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the property listing, how the scammer communicated with you, and what they asked for." },
          { name: "fakeName", label: "Name the scammer used", type: "text", placeholder: "e.g., Property Manager John Smith" },
          { name: "amountLost", label: "Amount lost (deposit, fees, etc.)", type: "text", placeholder: "e.g., 2500", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "How did they ask you to pay?", type: "select", expandable: true, options: [
            { value: "wire", label: "Wire transfer" }, { value: "cash_app", label: "Cash App / Venmo / Zelle" },
            { value: "check", label: "Cashier's check / money order" }, { value: "cash", label: "Cash" },
            { value: "crypto", label: "Cryptocurrency" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report a rental scam?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    The same photos and fake listings are reused across multiple cities
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Your report helps platforms flag and remove fraudulent listings faster
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Other renters can search for the address or landlord name before sending money
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-500">→</span>
                    Aggregated reports help law enforcement pursue serial rental fraud rings
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-teal-200 bg-teal-50 p-5">
                <h3 className="text-sm font-semibold text-teal-900">Rental scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-teal-800">
                  <li>• Price is significantly below market rate for the area</li>
                  <li>• Landlord is "out of town" and can't show the property in person</li>
                  <li>• Asks for deposit or first/last month before you see the unit</li>
                  <li>• Wants payment via wire transfer, Zelle, or gift cards</li>
                  <li>• Listing photos look too professional or match other listings</li>
                  <li>• Lease agreement looks generic or has obvious errors</li>
                  <li>• Pressures you to commit immediately because there are "other applicants"</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$275M</span>
                <p className="text-xs text-slate-500">lost to real estate/rental fraud in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">59%</span>
                <p className="text-xs text-slate-500">year-over-year increase</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">~$1,500</span>
                <p className="text-xs text-slate-500">average loss per rental scam victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">+90%</span>
                <p className="text-xs text-slate-500">growth since 2023</p>
              </div>
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
          <h2 className="text-2xl font-bold text-slate-900">How rental scams work — and how to protect yourself</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Rental scams are thriving in America&apos;s tight housing market. With vacancy rates near historic lows in many cities, renters
              feel intense pressure to act fast when they find an affordable listing — and scammers know exactly how to exploit that urgency.
              The FTC received over 43,000 rental fraud complaints in 2023, with a median loss of $980. But many victims lose far more: first
              and last month&apos;s rent, a security deposit, and application fees can easily total $3,000–$5,000.
            </p>
            <p>
              The most common rental scam involves stolen property listings. Scammers copy photos and descriptions from real Zillow or
              Realtor.com listings and repost them on Craigslist or Facebook Marketplace at a below-market price. When prospective renters
              inquire, the &quot;landlord&quot; explains they&apos;re out of the country and can&apos;t show the property but will send the keys
              once a deposit is received. The scammer collects deposits from multiple victims simultaneously, then disappears.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Variations of rental fraud
            </h3>
            <p>
              <strong>Hijacked listings</strong> are the most common — scammers take real properties and pose as the owner. <strong>Phantom
              rentals</strong> involve completely fabricated properties with AI-generated photos. <strong>Bait-and-switch</strong> scams show
              you a nice unit during a tour, then the lease is for a different, inferior property. <strong>Fake landlord impersonation</strong>
              involves scammers posing as the owner of a property that&apos;s already occupied, collecting rent from a &quot;new tenant&quot; who
              shows up to find someone already living there. Some scammers even create professional-looking property management websites to
              appear legitimate.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to verify a rental listing
            </h3>
            <p>
              Never send money before seeing the property in person. Search the property address on the county assessor&apos;s website to
              verify who actually owns it. Reverse image search the listing photos to see if they appear on other sites under a different
              address. Check if the &quot;landlord&apos;s&quot; phone number or email address appears in scam reports. Be suspicious of anyone
              who won&apos;t meet you at the property, insists on wire transfers or cash apps, or pressures you to sign a lease before
              seeing the unit. A legitimate landlord will never rush you or refuse to show the property.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — file a complaint about the fraudulent listing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — especially if the scammer was impersonating a real property owner</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>The listing platform</strong> — report the listing on Craigslist, Facebook, Zillow, etc. for removal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal-500">→</span>
                <span><strong>Local police</strong> — file a police report — this helps if you pursue small claims or insurance</span>
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
              <a href="/report-real-estate-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Real Estate Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-identity-theft" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Identity Theft</span>
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
