import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report an Impersonation Scam | Fake Identity Fraud — ScamComplaints",
  description: "Report impersonation scams where criminals pose as companies, celebrities, friends, or family members. File a report to expose imposters.",
  keywords: "report impersonation scam, impersonator scam, fake identity scam, someone pretending to be, celebrity scam, business impersonation, report imposter",
  openGraph: {
    title: "Report Impersonation Scams — ScamComplaints.org",
    description: "File a report about someone impersonating a company, celebrity, friend, or family member.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-impersonation-scam" },
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-violet-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Impersonation Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-violet-400">impersonation scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Impersonation scams are the #1 most reported fraud type in America. Scammers pose as Amazon, Apple, your bank, the IRS, a celebrity, or even your own family member to steal money and information. With AI deepfake technology, these imposters are getting increasingly convincing. If someone contacted you pretending to be someone else, report it here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="impersonation_scam"
              title="Quick impersonation scam report"
              subtitle="Document who they pretended to be and how they contacted you."
              fields={[
          { name: "platform", label: "Who did they impersonate?", type: "select", required: true, options: [
            { value: "company", label: "Company (Amazon, Apple, Netflix, etc.)" }, { value: "bank", label: "Bank or financial institution" },
            { value: "utility", label: "Utility company (electric, gas, water)" }, { value: "celebrity", label: "Celebrity or public figure" },
            { value: "family", label: "Family member or friend" }, { value: "employer", label: "Employer or coworker" },
            { value: "government", label: "Government agency" }, { value: "other", label: "Other" },
          ]},
          { name: "companyName", label: "Specific person/company impersonated", type: "text", required: true, placeholder: "e.g., Amazon customer service, Elon Musk" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "How did they contact you? What did they want you to do? How did you realize it was fake?" },
          { name: "phoneNumber", label: "Phone number or email used", type: "text", expandable: true, placeholder: "The number/email they contacted you from" },
          { name: "amountLost", label: "Amount lost (if any)", type: "text", placeholder: "e.g., 500", inputMode: "decimal", expandable: true },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report impersonation scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Impersonators use the same scripts and phone numbers across thousands of calls
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Reports help the FTC take enforcement action against scam operations
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Real companies use report data to warn their customers about active scams
                  </li>
                  <li className="flex gap-2">
                    <span className="text-violet-500">→</span>
                    Phone carriers use reports to block known scam numbers
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
                <h3 className="text-sm font-semibold text-violet-900">Impersonation scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-violet-800">
                  <li>• Unexpected call, email, or text from a company you do business with</li>
                  <li>• Caller ID shows a real company name (easily spoofed)</li>
                  <li>• Urgent language: "Your account will be suspended" or "unauthorized activity detected"</li>
                  <li>• Asks you to download remote access software</li>
                  <li>• Requests payment via gift cards, wire transfer, or cryptocurrency</li>
                  <li>• Asks you to "verify" your password, SSN, or banking details</li>
                  <li>• AI-generated voice or video that sounds like someone you know</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">most reported fraud type to FTC in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$2.7B</span>
                <p className="text-xs text-slate-500">lost to impersonation scams in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">854K</span>
                <p className="text-xs text-slate-500">impersonation scam reports filed (FTC)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">39%</span>
                <p className="text-xs text-slate-500">of victims were targeted using AI deepfakes</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How impersonation scams work — America's #1 reported fraud</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Impersonation scams were the number one most-reported fraud type to the FTC in 2023, with over 854,000 complaints and $2.7
              billion in losses. The category includes anyone pretending to be someone they&apos;re not — from companies like Amazon and
              Apple to government agencies, celebrities, and even family members. With AI deepfake technology, 39% of scam victims in 2023
              reported being targeted by AI-generated voices or videos.
            </p>
            <p>
              <strong>Business impersonation</strong> is the most common variant. You receive a call, text, or email that appears to be from
              Amazon, Apple, Netflix, or your bank warning of suspicious activity on your account. The scammer directs you to call a number
              or click a link that leads to a fake website. Once you enter your login credentials, they drain your account. Some variants
              involve tech support where the scammer has you install remote access software, giving them direct control of your computer.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The AI deepfake evolution
            </h3>
            <p>
              AI has dramatically escalated impersonation scams. Scammers can now clone a person&apos;s voice from a few seconds of audio
              pulled from social media. They call family members pretending to be a loved one in distress — &quot;Mom, I&apos;ve been in an
              accident, I need bail money.&quot; Video deepfakes are used to create fake celebrity endorsements for crypto scams and fake
              product promotions. Warren Buffett called AI-powered scams the &quot;biggest growth industry of all time.&quot;
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to protect yourself
            </h3>
            <p>
              The #1 rule: <strong>hang up and call back using the official number.</strong> If &quot;Amazon&quot; calls about suspicious
              activity, hang up and open the Amazon app or website yourself. If &quot;your bank&quot; texts you, call the number on the back
              of your card. Never call numbers provided in unexpected messages. For family emergency calls, establish a <strong>family code
              word</strong> that only your family knows — ask the caller for it. If they can&apos;t provide it, it&apos;s a scam regardless
              of how realistic the voice sounds.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the primary agency for impersonation scam reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for AI deepfake scams or losses over $1,000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>The real company</strong> — report the scam to the company being impersonated — they track and warn customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-500">→</span>
                <span><strong>Your phone carrier</strong> — report scam phone numbers for potential blocking</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
