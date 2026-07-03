import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Identity Theft | Data Breach & Stolen Identity — ScamComplaints",
  description: "Report identity theft, personal data breaches, and stolen identity fraud. Document what happened and help track down the criminals using your information.",
  keywords: "report identity theft, identity theft report, stolen identity, personal data breach, identity fraud, report stolen SSN, identity theft help, credit fraud report",
  openGraph: {
    title: "Report Identity Theft & Personal Data Breaches — ScamComplaints.org",
    description: "File an identity theft report. Document the fraud and protect yourself from further damage.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-identity-theft" },
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
      "@id": "https://scamcomplaints.org/report-identity-theft/#webpage",
      "url": "https://scamcomplaints.org/report-identity-theft",
      "name": "Report a Identity Theft | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-identity-theft/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-identity-theft/#breadcrumb",
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
          "name": "Report Identity Theft",
          "item": "https://scamcomplaints.org/report-identity-theft"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            Identity Theft Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report
            <br />
            <span className="text-red-400">identity theft.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Identity theft affected over 1.4 million Americans in 2023, with losses totaling $744 million from personal data breaches alone. Criminals use your stolen personal information to open credit cards, file fraudulent tax returns, drain bank accounts, and even commit crimes in your name. The sooner you report it, the sooner you can start limiting the damage.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="identity_theft"
              title="Quick identity theft report"
              subtitle="Document what happened. This creates a record that helps with disputes and investigations."
              fields={[
          { name: "platform", label: "How was your identity stolen?", type: "select", required: true, options: [
            { value: "data_breach", label: "Data breach notification" }, { value: "phishing", label: "Phishing email/text" },
            { value: "mail_theft", label: "Stolen mail" }, { value: "skimming", label: "Card skimming device" },
            { value: "social_engineering", label: "Social engineering / phone call" }, { value: "dark_web", label: "Found on dark web" },
            { value: "unknown", label: "Unknown / discovered fraud first" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What fraudulent activity did you discover? New accounts, unauthorized charges, tax filing issues, etc." },
          { name: "companyName", label: "Companies/institutions affected", type: "text", placeholder: "e.g., Chase, IRS, Equifax" },
          { name: "amountLost", label: "Known financial impact", type: "text", placeholder: "e.g., 12000", inputMode: "decimal", expandable: true },
          { name: "fakeName", label: "Suspect name or alias (if known)", type: "text", expandable: true, placeholder: "If you know who did it" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report identity theft?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Creates an official record to dispute fraudulent accounts and charges
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Helps law enforcement track identity theft rings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Other victims of the same breach can see patterns and take action faster
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Documentation is often required for credit bureau disputes and insurance claims
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-semibold text-red-900">Signs your identity was stolen</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-red-800">
                  <li>• Unfamiliar accounts or charges on your credit report</li>
                  <li>• Bills or collection notices for accounts you didn't open</li>
                  <li>• Your tax return was rejected because one was already filed with your SSN</li>
                  <li>• You stop receiving expected mail (mail redirect fraud)</li>
                  <li>• Medical bills for treatments you never received</li>
                  <li>• Notification from a company about a data breach involving your information</li>
                  <li>• Login alerts from accounts you don't recognize</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$186M</span>
                <p className="text-xs text-slate-500">lost to identity theft in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">67,000+</span>
                <p className="text-xs text-slate-500">identity theft complaints in 2025</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#14</span>
                <p className="text-xs text-slate-500">fourteenth-highest loss category</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">+47%</span>
                <p className="text-xs text-slate-500">growth since 2023</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How identity theft happens — and what to do when it does</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Identity theft is one of the most common and consequential crimes in America. The FTC received 1.4 million identity theft
              reports in 2023, and the FBI attributed $744 million in losses specifically to personal data breaches. But the true impact
              goes far beyond money — victims spend an average of 300 hours resolving the aftermath, dealing with credit bureaus,
              financial institutions, and sometimes law enforcement.
            </p>
            <p>
              Identity theft begins with data. Criminals obtain your Social Security number, date of birth, addresses, and financial account
              information through data breaches, phishing attacks, mail theft, or even by purchasing stolen records on the dark web. A single
              major data breach — like the Equifax breach that exposed 147 million Americans — can fuel identity fraud for years afterward.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Types of identity theft
            </h3>
            <p>
              <strong>Financial identity theft</strong> is the most common — criminals open credit cards, loans, or bank accounts in your name.
              <strong>Tax identity theft</strong> involves filing fraudulent tax returns using your SSN to claim your refund. <strong>Medical
              identity theft</strong> uses your insurance information for treatments, which can corrupt your medical records with dangerous
              consequences. <strong>Criminal identity theft</strong> occurs when someone gives your name to police during an arrest, creating
              a criminal record in your name. <strong>Synthetic identity theft</strong> combines real and fabricated information — often
              using a child&apos;s SSN — to create entirely new fake identities.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Immediate steps if your identity was stolen
            </h3>
            <p>
              <strong>1. Freeze your credit</strong> at all three bureaus (Equifax, Experian, TransUnion) — this prevents new accounts from
              being opened. <strong>2. File an identity theft report</strong> at IdentityTheft.gov, which creates an official FTC recovery plan.
              <strong>3. File a police report</strong> — many financial institutions require this to process fraud claims. <strong>4. Contact
              affected institutions</strong> directly to dispute fraudulent charges and close unauthorized accounts. <strong>5. Monitor your
              credit</strong> aggressively for the next 12 months — free weekly reports are available at AnnualCreditReport.com.
            </p>
            <p>
              Document everything. Keep copies of every letter, every phone call log, every dispute. Identity theft resolution is a marathon,
              not a sprint, and thorough documentation is your strongest tool for getting fraudulent activity reversed.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>IdentityTheft.gov</strong> — identitytheft.gov — FTC's official identity theft recovery tool — creates a personalized recovery plan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>Credit bureaus</strong> — freeze your credit at Equifax, Experian, and TransUnion immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for large-scale identity theft or if your data was found on the dark web</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>IRS Identity Protection</strong> — irs.gov/identity-theft-central — if someone filed taxes using your SSN</span>
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
              <a href="/report-credit-card-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Credit Card Fraud</span>
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
