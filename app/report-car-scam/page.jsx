import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Car Scam | Vehicle Purchase Fraud — ScamComplaints",
  description: "Report car scams, fake vehicle listings, odometer fraud, and auto purchase scams. Protect other buyers from fraudulent sellers. File a report.",
  keywords: "report car scam, vehicle scam, auto fraud, fake car listing, Craigslist car scam, Facebook Marketplace car fraud, odometer fraud, curbstoning",
  openGraph: {
    title: "Report Car Scams & Vehicle Purchase Fraud — ScamComplaints.org",
    description: "File a report about fake car listings, vehicle purchase scams, and auto fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-car-scam" },
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
      "@id": "https://scamcomplaints.org/report-car-scam/#webpage",
      "url": "https://scamcomplaints.org/report-car-scam",
      "name": "Report a Car Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-car-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-car-scam/#breadcrumb",
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
          "name": "Report Car Scam",
          "item": "https://scamcomplaints.org/report-car-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Vehicle Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-slate-400">car scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Car scams are one of the highest-dollar consumer frauds, with victims losing an average of $3,000–$10,000 per incident. From fake Craigslist listings for cars that don't exist to odometer rollbacks, title washing, and curbstoners posing as private sellers, vehicle fraud is widespread. If you've been burned by a fake car deal, report it here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="car_scam"
              title="Quick vehicle scam report"
              subtitle="Warn other buyers about this seller or listing."
              fields={[
          { name: "platform", label: "Where was the listing?", type: "select", required: true, options: [
            { value: "facebook", label: "Facebook Marketplace" }, { value: "craigslist", label: "Craigslist" },
            { value: "offerup", label: "OfferUp" }, { value: "autotrader", label: "AutoTrader / Cars.com" },
            { value: "dealer", label: "Dealership" }, { value: "private", label: "Private sale" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the vehicle, the deal, and what went wrong — fake listing, deposit taken, title issue, undisclosed damage?" },
          { name: "websiteUrl", label: "Listing URL (if still live)", type: "text", placeholder: "https://..." },
          { name: "fakeName", label: "Seller's name or dealership", type: "text", placeholder: "e.g., John's Motors" },
          { name: "amountLost", label: "Amount lost", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report car scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Vehicle scams have the highest average dollar loss of any consumer fraud
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Fake listings use the same VIN photos across multiple scam sites
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Reports help law enforcement track curbstoners and title washing rings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Other buyers can search for the VIN or seller name before purchasing
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Car scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
                  <li>• Price significantly below market value (too good to be true)</li>
                  <li>• Seller is out of town and wants to ship the car after payment</li>
                  <li>• Requests deposit before you can see or test-drive the vehicle</li>
                  <li>• VIN doesn't match the title or has signs of tampering</li>
                  <li>• Seller refuses a pre-purchase inspection by your mechanic</li>
                  <li>• "Certified" used car without actual manufacturer certification</li>
                  <li>• Payment must be in cash, wire transfer, or crypto — no escrow</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$503M</span>
                <p className="text-xs text-slate-500">lost to non-delivery scams in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$5,000</span>
                <p className="text-xs text-slate-500">average loss per vehicle purchase scam</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Facebook</span>
                <p className="text-xs text-slate-500">most common platform for fake car listings</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">30%</span>
                <p className="text-xs text-slate-500">involve fake escrow or shipping services</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How car scams work — and how to buy a vehicle safely</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Vehicle scams rank among the most financially damaging consumer frauds in America. The National Highway Traffic Safety
              Administration estimates that odometer fraud alone costs American car buyers over $1 billion per year, and total auto-related
              fraud — including fake listings, title washing, and curbstoning — is estimated at $4.9 billion annually.
            </p>
            <p>
              The most common online car scam is the <strong>phantom vehicle</strong>: a listing for a car that doesn&apos;t exist, usually
              at a suspiciously low price. Photos are stolen from legitimate listings, and the seller insists on a deposit before you can
              see the car, claiming they&apos;ll ship it from another state. Once you send money, the seller vanishes. On Facebook
              Marketplace and Craigslist, these fake listings are epidemic.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Other vehicle fraud to watch for
            </h3>
            <p>
              <strong>Odometer rollback</strong> uses electronic tools to reduce the mileage shown on a car&apos;s odometer, increasing its
              apparent value by thousands. <strong>Title washing</strong> moves a flood-damaged or salvage-title vehicle across state lines
              to get a clean title. <strong>Curbstoning</strong> involves unlicensed dealers posing as private sellers to avoid consumer
              protection laws. <strong>VIN cloning</strong> puts a clean vehicle&apos;s VIN on a stolen car. Each of these can cost buyers
              thousands of dollars and create safety hazards.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to protect yourself
            </h3>
            <p>
              Always run a vehicle history report (Carfax or AutoCheck) using the VIN. Have the vehicle inspected by an independent mechanic
              before purchase. Check the VIN on the NICB VINCheck tool to see if it&apos;s been reported stolen. Meet the seller at the
              vehicle location and verify the title matches the car. Never wire money or pay in full before seeing the vehicle. For private
              sales, meet at a police station or bank. If a deal seems too good to be true, it almost certainly is.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer fraud complaints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>NHTSA</strong> — nhtsa.gov/report-a-safety-problem — for odometer fraud and vehicle safety issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>Your state DMV</strong> — report title fraud or VIN tampering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>NICB</strong> — nicb.org — check if a VIN has been reported stolen and file a fraud tip</span>
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
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-fraudulent-website" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Fraudulent Website</span>
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
