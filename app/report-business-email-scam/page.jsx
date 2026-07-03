import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Business Email Compromise (BEC) | Email Fraud — ScamComplaints",
  description: "Report business email compromise, CEO fraud, invoice scams, and corporate email fraud. BEC scams cost businesses $2.95 billion in 2023. File a report now.",
  keywords: "report business email compromise, BEC scam report, CEO fraud, invoice scam, business email fraud, wire transfer scam, corporate email scam, report BEC",
  openGraph: {
    title: "Report Business Email Compromise (BEC) Scams — ScamComplaints.org",
    description: "File a BEC scam report. Help track corporate email fraud and fake invoice schemes.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-business-email-scam" },
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
      "@id": "https://scamcomplaints.org/report-business-email-scam/#webpage",
      "url": "https://scamcomplaints.org/report-business-email-scam",
      "name": "Report a Business Email Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-business-email-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-business-email-scam/#breadcrumb",
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
          "name": "Report Business Email Scam",
          "item": "https://scamcomplaints.org/report-business-email-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            BEC Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-blue-400">business email scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Business Email Compromise (BEC) scams cost American companies $2.95 billion in 2023 — making it the #2 costliest cybercrime behind investment fraud. Scammers impersonate executives, vendors, and lawyers to trick employees into wiring money or sharing sensitive data. If your business was targeted, reporting quickly can help freeze fraudulent transfers.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="bec_scam"
              title="Quick BEC scam report"
              subtitle="Document the attack to help track these organized crime networks."
              fields={[
          { name: "platform", label: "Type of BEC attack", type: "select", required: true, options: [
            { value: "ceo_fraud", label: "CEO / executive impersonation" }, { value: "invoice", label: "Fake invoice / vendor fraud" },
            { value: "account_compromise", label: "Compromised email account" }, { value: "data_theft", label: "W-2 / employee data theft" },
            { value: "lawyer", label: "Lawyer / legal impersonation" }, { value: "vendor", label: "Vendor email compromise" },
            { value: "other", label: "Other" },
          ]},
          { name: "companyName", label: "Your company name", type: "text", placeholder: "Company targeted by BEC" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the fraudulent email, what was requested, and whether funds were transferred." },
          { name: "amountLost", label: "Amount lost or requested", type: "text", placeholder: "e.g., 50000", inputMode: "decimal", expandable: true },
          { name: "fakeName", label: "Who did they impersonate?", type: "text", expandable: true, placeholder: "e.g., CEO John Smith, Vendor ABC Corp" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report BEC scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    The FBI can sometimes freeze wire transfers if reported within 24–72 hours
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    BEC attacks target multiple companies using the same infrastructure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    Reports help cybersecurity teams identify compromised email domains
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    Patterns in reports lead to takedowns of organized crime networks
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="text-sm font-semibold text-blue-900">BEC scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-blue-800">
                  <li>• Urgent request from CEO or executive — especially for wire transfers</li>
                  <li>• Vendor suddenly changes bank account details for payments</li>
                  <li>• Email address has a subtle misspelling of a real domain</li>
                  <li>• Request to bypass normal approval processes due to "confidentiality"</li>
                  <li>• Pressure to act immediately with no time to verify</li>
                  <li>• Email tone or writing style doesn't match the real person</li>
                  <li>• Request for W-2s, employee data, or financial records via email</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$3.05B</span>
                <p className="text-xs text-slate-500">lost to BEC in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#2</span>
                <p className="text-xs text-slate-500">second-highest loss scam type</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$120K</span>
                <p className="text-xs text-slate-500">average loss per BEC incident</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">10%</span>
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
          <h2 className="text-2xl font-bold text-slate-900">How business email compromise works — the $2.95 billion threat</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Business Email Compromise is a sophisticated form of cybercrime that specifically targets companies and organizations that perform
              wire transfers or handle sensitive employee data. Unlike mass phishing campaigns that cast a wide net, BEC attacks are carefully
              researched and targeted. The FBI&apos;s IC3 recorded $2.95 billion in BEC losses in 2023, but the true figure is likely much higher
              since many businesses don&apos;t report to avoid reputational damage.
            </p>
            <p>
              BEC works because it exploits trust and authority rather than technical vulnerabilities. A scammer gains enough information about
              a company&apos;s structure — often from LinkedIn, press releases, and company websites — to impersonate an executive or vendor
              convincingly. They then send an email to someone in finance or HR with a seemingly legitimate request: wire $50,000 to a new
              account for an acquisition, update the payment details for a regular vendor, or send employee W-2 forms for a &quot;tax audit.&quot;
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Common BEC attack patterns
            </h3>
            <p>
              <strong>CEO fraud</strong> impersonates the CEO or CFO to request urgent wire transfers. <strong>Vendor email compromise</strong>
              intercepts real vendor communications and redirects payments by changing bank details on invoices. <strong>Account compromise</strong>
              involves actually hacking an employee&apos;s email and sending fraudulent requests from the real account. <strong>Data theft BEC</strong>
              requests employee tax records or PII rather than money. Each variant exploits the same human tendency: when the boss asks for
              something urgently, employees comply.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              If money was wired — act immediately
            </h3>
            <p>
              Time is critical with BEC. Contact your bank <strong>immediately</strong> and request a wire recall. File a complaint with the
              FBI IC3 — their Recovery Asset Team has a success rate of about 73% for freezing domestic wire transfers when contacted within
              24–72 hours. The faster you act, the better the chance of recovery. After the immediate response, implement mandatory dual-approval
              for all wire transfers and verbal verification (by phone, using a known number) for any payment changes or new payment requests.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — critical if funds were wired — the Recovery Asset Team can freeze domestic transfers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>Your bank</strong> — request a wire recall immediately — time is critical</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for pattern tracking and consumer protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>Secret Service</strong> — secretservice.gov — for wire fraud cases involving significant amounts</span>
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
              <a href="/report-phishing-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Phishing Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-ransomware" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Ransomware</span>
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
