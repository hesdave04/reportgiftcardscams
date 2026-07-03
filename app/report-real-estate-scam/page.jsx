import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Real Estate & Mortgage Scams | Property Fraud — ScamComplaints",
  description: "Report real estate scams, mortgage fraud, wire fraud at closing, deed theft, and property investment schemes. File a report to protect homebuyers.",
  keywords: "report real estate scam, mortgage fraud, wire fraud closing, deed theft, real estate fraud, property scam, title fraud, foreclosure scam",
  openGraph: {
    title: "Report Real Estate & Mortgage Scams — ScamComplaints.org",
    description: "File a report about real estate fraud, wire fraud at closing, mortgage scams, and deed theft.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-real-estate-scam" },
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
      "@id": "https://scamcomplaints.org/report-real-estate-scam/#webpage",
      "url": "https://scamcomplaints.org/report-real-estate-scam",
      "name": "Report a Real Estate Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-real-estate-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-real-estate-scam/#breadcrumb",
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
          "name": "Report Real Estate Scam",
          "item": "https://scamcomplaints.org/report-real-estate-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Real Estate Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-cyan-400">real estate scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Real estate scams are among the most financially devastating — the FBI reported over $145 million lost to real estate wire fraud in 2023 alone. From closing wire fraud that diverts your down payment to a scammer's account, to deed theft, foreclosure rescue scams, and fraudulent investment schemes, property fraud can wipe out your life savings in a single transaction.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="real_estate_scam"
              title="Quick real estate fraud report"
              subtitle="Document the fraud. Every detail helps investigators and protects other buyers."
              fields={[
          { name: "platform", label: "Type of real estate fraud", type: "select", required: true, options: [
            { value: "wire_fraud", label: "Closing wire fraud (fake wiring instructions)" }, { value: "deed_theft", label: "Deed theft / title fraud" },
            { value: "mortgage", label: "Mortgage fraud or predatory lending" }, { value: "foreclosure", label: "Foreclosure rescue scam" },
            { value: "investment", label: "Fake property investment scheme" }, { value: "rental", label: "Rental scam (fake landlord)" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the transaction, property involved, and how the fraud occurred." },
          { name: "companyName", label: "Company or person involved", type: "text", placeholder: "e.g., title company, agent, lender" },
          { name: "amountLost", label: "Amount lost", type: "text", placeholder: "e.g., 200000", inputMode: "decimal", expandable: true },
          { name: "websiteUrl", label: "Property listing or company website", type: "text", expandable: true, placeholder: "https://..." },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report real estate fraud?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Wire fraud at closing can be reversed if reported within 24 hours to the FBI
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Deed theft often targets vacant properties and elderly homeowners over time
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Your report helps title companies and real estate agents warn their clients
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Real estate fraud patterns help the FBI track organized criminal networks
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
                <h3 className="text-sm font-semibold text-cyan-900">Real estate scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-cyan-800">
                  <li>• Last-minute email changing wire transfer instructions before closing</li>
                  <li>• Title company communicating through a personal email, not a company domain</li>
                  <li>• Investment property offering guaranteed returns or no-risk ownership</li>
                  <li>• Pressure to close quickly and skip inspections or title searches</li>
                  <li>• Foreclosure "rescue" company asking for upfront fees</li>
                  <li>• Property seller can't provide clear title documentation</li>
                  <li>• Unknown liens or mortgages appearing on your property</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$275M</span>
                <p className="text-xs text-slate-500">lost to real estate fraud in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">59%</span>
                <p className="text-xs text-slate-500">year-over-year jump in losses</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#11</span>
                <p className="text-xs text-slate-500">eleventh-highest loss category</p>
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

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How real estate scams work — the highest-stakes consumer fraud</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Real estate fraud is unique because a single incident can cost victims their entire life savings. The FBI reported over $145
              million in losses from real estate wire fraud in 2023, with an average loss of approximately $70,000 per incident. But wire fraud
              is just one of many real estate scam types — deed theft, mortgage fraud, and fake investment schemes collectively represent
              billions in annual losses.
            </p>
            <p>
              <strong>Closing wire fraud</strong> is the most acute threat for homebuyers. Hackers monitor email communications between real
              estate agents, title companies, and buyers. When closing approaches, they send a spoofed email that appears to be from the title
              company with updated wire instructions. The buyer sends their down payment — sometimes hundreds of thousands of dollars — to the
              scammer&apos;s account. By the time the fraud is discovered, the money has been moved through multiple accounts and often overseas.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Deed theft and title fraud
            </h3>
            <p>
              <strong>Deed theft</strong> (sometimes called &quot;house stealing&quot;) occurs when criminals forge deeds to transfer
              ownership of a property to themselves, then take out loans against it or sell it. Vacant properties and homes owned by elderly
              or deceased owners are the primary targets. The legitimate owner often doesn&apos;t discover the theft for months. Some cities
              now offer free title monitoring services — check with your county recorder&apos;s office.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Protecting your largest investment
            </h3>
            <p>
              For wire transfers at closing: <strong>always verify wiring instructions by phone</strong> using a number you find independently,
              never from the email. Call your title company directly before sending any wire. Set up title monitoring with your county. For
              mortgage applications, work only with licensed lenders (verify at NMLS Consumer Access). Be extremely suspicious of anyone offering
              foreclosure &quot;rescue&quot; services that require upfront fees — these are almost always scams targeting distressed homeowners.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — critical for wire fraud — their Recovery Asset Team can freeze funds if reported within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>Your bank</strong> — contact immediately for wire recalls — time is everything</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>County recorder / clerk</strong> — for deed theft — file a fraud affidavit to cloud the title</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>CFPB</strong> — consumerfinance.gov/complaint — for mortgage fraud and predatory lending</span>
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
              <a href="/report-rental-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Rental Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-identity-theft" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Identity Theft</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-business-email-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Business Email Scam</span>
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
