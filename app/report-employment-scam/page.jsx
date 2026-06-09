import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report an Employment Scam | Fake Job & Work-From-Home Fraud — ScamComplaints",
  description: "Report fake job offers, work-from-home scams, and employment fraud. Someone asked for money or personal info for a job that doesn't exist? Report it here.",
  keywords: "report employment scam, fake job scam, work from home scam, job offer scam report, fake recruiter, employment fraud report, task scam, fake hiring",
  openGraph: {
    title: "Report Employment Scams & Fake Job Offers — ScamComplaints.org",
    description: "Report fake job postings, work-from-home scams, and employment fraud targeting job seekers.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-employment-scam" },
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
      "@id": "https://scamcomplaints.org/report-employment-scam/#webpage",
      "url": "https://scamcomplaints.org/report-employment-scam",
      "name": "Report a Employment Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-employment-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-employment-scam/#breadcrumb",
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
          "name": "Report Employment Scam",
          "item": "https://scamcomplaints.org/report-employment-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Employment Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-cyan-400">employment scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Job seekers are prime targets for scammers. Fake job postings on Indeed, LinkedIn, and Craigslist trick applicants into sending personal information, paying upfront "training" fees, or depositing fraudulent checks. Task scams promise easy money for online work but require a "deposit" before you can withdraw earnings. If a job opportunity asked for your SSN before an interview, required payment upfront, or seemed too good to be true, report it here.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="employment_scam"
              title="Quick employment scam report"
              subtitle="Report the fake job in under 2 minutes. Have the job listing or messages?"
              fields={[
          { name: "scamCategory", label: "Type of employment scam", type: "select", required: true, options: [
            { value: "fake_posting", label: "Fake job posting" },
            { value: "task_scam", label: "Task scam (pay to earn)" },
            { value: "check_scam", label: "Fake check / money mule" },
            { value: "wfh", label: "Work-from-home scam" },
            { value: "recruiter", label: "Fake recruiter / headhunter" },
            { value: "training_fee", label: "Required upfront payment for training / equipment" },
            { value: "data_harvest", label: "Collected SSN/ID for fake onboarding" },
            { value: "other", label: "Other" },
          ]},
          { name: "companyName", label: "Company or person name", type: "text", required: true, placeholder: "e.g., GlobalTech Solutions, John at HR" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Where did you find the job? What were you promised? What did they ask for?" },
          { name: "jobPlatform", label: "Where was it posted?", type: "select", expandable: true, placeholder: "Job board / platform", options: [
            { value: "indeed", label: "Indeed" }, { value: "linkedin", label: "LinkedIn" },
            { value: "craigslist", label: "Craigslist" }, { value: "ziprecruiter", label: "ZipRecruiter" },
            { value: "facebook", label: "Facebook" }, { value: "telegram", label: "Telegram" },
            { value: "whatsapp", label: "WhatsApp message" }, { value: "text_sms", label: "Text / SMS" },
            { value: "email", label: "Email" }, { value: "other", label: "Other" },
          ]},
          { name: "amountLost", label: "Amount lost", type: "text", expandable: true, placeholder: "e.g., 500", inputMode: "decimal" },
          { name: "infoShared", label: "Personal info you shared", type: "text", expandable: true, placeholder: "e.g., SSN, driver's license, bank account number" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report employment scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    The same fake job posting is targeting hundreds of applicants
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Job boards use reports to remove fraudulent listings faster
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Your report helps investigators connect fake companies to real operators
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-500">→</span>
                    Other job seekers can search for the company name before applying
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
                <h3 className="text-sm font-semibold text-cyan-900">Employment scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-cyan-800">
                  <li>• Hired without an interview or after a text-only chat</li>
                  <li>• Asked for SSN, bank info, or copies of ID before starting</li>
                  <li>• Required to pay for training, equipment, or a background check</li>
                  <li>• Job description is vague — "earn $5K/month from home, no experience"</li>
                  <li>• "Employer" communicates only through Telegram or WhatsApp</li>
                  <li>• Offered a check to deposit and buy equipment — then send back the change</li>
                  <li>• Task/click-based job requiring a deposit to "unlock" higher-paying tasks</li>
                  <li>• Company has no verifiable website, address, or leadership</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Employment scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$367M</span>
                <p className="text-xs text-slate-500">lost to job and business opportunity scams in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">5x</span>
                <p className="text-xs text-slate-500">increase in task scam reports since 2022</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$2,000</span>
                <p className="text-xs text-slate-500">median loss per employment scam victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">18-34</span>
                <p className="text-xs text-slate-500">age group most targeted by fake job scams</p>
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
          <h2 className="text-2xl font-bold text-slate-900">Employment scams are booming — here's how they work</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Employment scams have exploded since the remote work revolution.
              With millions of people searching for work-from-home jobs, scammers
              have a massive pool of targets and a simple pitch: easy money, no
              experience required, work on your own schedule. The FTC reported
              $367 million in losses to job and business opportunity scams in
              2023, and the real number is almost certainly higher because many
              victims don't report — they're embarrassed, or they don't realize
              it was a scam until months later.
            </p>
            <p>
              The fastest-growing variant is the "task scam." You're recruited
              through Telegram, WhatsApp, or a text message to do simple online
              tasks — rating products, watching videos, "boosting" app
              downloads. You earn small amounts at first, building trust. Then
              to access "premium" tasks with bigger payouts, you need to
              deposit money. The "earnings" accumulate on screen but when you
              try to withdraw, there are fees, minimums, or additional deposits
              required. It's the same psychological trap as pig butchering,
              repackaged for job seekers.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The fake check scam
            </h3>
            <p>
              You're "hired" and sent a check to deposit — supposedly for
              equipment, supplies, or your first week's pay. The check is for
              more than expected, and you're told to deposit it, keep your
              portion, and wire the rest back or send it to a "vendor." The
              check clears initially (banks make funds available before fully
              verifying), but bounces days later. You're on the hook for the
              full amount. This scam has been around for decades but continues
              to work because most people don't know that a check can appear
              to clear and still be fraudulent.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Protecting your identity
            </h3>
            <p>
              If you shared your Social Security number, driver's license, or
              bank account details with a fake employer, take action immediately.
              Place a fraud alert with one of the three credit bureaus (Experian,
              TransUnion, Equifax — alerting one automatically notifies the
              others). Consider a credit freeze if you shared your SSN. Monitor
              your bank account for unauthorized transactions. Then{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                file a full report
              </a>{" "}
              with every detail — the company name, the platform where you found
              the listing, the person's name and contact info, and what personal
              information you provided.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report employment scams</h3>
            <p className="mt-2 text-sm text-slate-600">Report to these agencies, especially if you shared personal info:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — file a complaint about the fake job</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>IdentityTheft.gov</strong> — identitytheft.gov — if you shared SSN or other personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>The job board</strong> — Report the listing on Indeed, LinkedIn, etc. — they have fraud teams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-cyan-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for task scams, check scams, and large losses</span>
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
              <a href="/report-identity-theft" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Identity Theft</span>
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
