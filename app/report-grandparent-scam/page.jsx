import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Grandparent Scam | Emergency & Bail Fraud — ScamComplaints",
  description: "Report grandparent scams, fake emergency calls, and bail money fraud. Scammers use AI voice cloning to impersonate family members. File a report.",
  keywords: "report grandparent scam, emergency scam, bail money scam, family emergency scam, grandchild scam, AI voice clone scam, report family impersonation",
  openGraph: {
    title: "Report Grandparent Scams & Fake Emergency Calls — ScamComplaints.org",
    description: "File a report about fake emergency calls impersonating family members for money.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-grandparent-scam" },
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
      "@id": "https://scamcomplaints.org/report-grandparent-scam/#webpage",
      "url": "https://scamcomplaints.org/report-grandparent-scam",
      "name": "Report a Grandparent Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-grandparent-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-grandparent-scam/#breadcrumb",
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
          "name": "Report Grandparent Scam",
          "item": "https://scamcomplaints.org/report-grandparent-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-red-400">grandparent scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            "Grandma, I've been in an accident and I need bail money — please don't tell Mom." This heartbreaking scam targets elderly Americans by impersonating a grandchild in crisis. With AI voice cloning, the caller can now sound exactly like your loved one. These scams steal millions every year by exploiting the most powerful force in the world — a grandparent's love.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="grandparent_scam"
              title="Quick grandparent scam report"
              subtitle="Even if no money was sent, your report helps track these callers."
              fields={[
          { name: "platform", label: "How were you contacted?", type: "select", required: true, options: [
            { value: "phone", label: "Phone call" }, { value: "text", label: "Text message" },
            { value: "both", label: "Phone call + text" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What emergency did they fake? Who did they claim to be? Did they hand the phone to a 'lawyer' or 'police officer'?" },
          { name: "fakeName", label: "Who did they impersonate?", type: "text", placeholder: "e.g., My grandson Jake" },
          { name: "phoneNumber", label: "Phone number they called from", type: "text", placeholder: "+1 555-123-4567" },
          { name: "amountLost", label: "Amount sent (if any)", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, options: [
            { value: "cash", label: "Cash (picked up by courier)" }, { value: "wire", label: "Wire transfer" },
            { value: "gift_card", label: "Gift cards" }, { value: "crypto", label: "Cryptocurrency" },
            { value: "not_paid", label: "Didn't pay" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report grandparent scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    These operations use the same phone numbers and scripts across dozens of victims
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Reports help law enforcement trace the money couriers who pick up cash
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Phone carriers use reports to block known scam numbers
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Your report may prevent someone's grandparent from losing their savings
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-semibold text-red-900">Emergency scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-red-800">
                  <li>• "Don't tell Mom/Dad" — isolation is the scammer's first move</li>
                  <li>• Caller claims to be a grandchild, then hands phone to a "lawyer" or "officer"</li>
                  <li>• Demands cash, gift cards, or wire transfer immediately</li>
                  <li>• Caller's phone number is unfamiliar or blocked</li>
                  <li>• Sends a courier to pick up cash from your home</li>
                  <li>• Voice sounds slightly off or call quality is poor (AI cloning artifacts)</li>
                  <li>• Emergency story escalates — car accident, DUI, hospital, then bail needed</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$7.75B</span>
                <p className="text-xs text-slate-500">total elder fraud losses in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">201,266</span>
                <p className="text-xs text-slate-500">elder fraud complaints in 2025</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$38,500</span>
                <p className="text-xs text-slate-500">average loss for victims 60+</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">59%</span>
                <p className="text-xs text-slate-500">year-over-year increase in elder losses</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How grandparent scams work — and why AI makes them worse</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              The grandparent scam is one of the most emotionally manipulative frauds in existence. A phone call comes in — the voice on the
              other end sounds panicked, young, and is calling you &quot;Grandma&quot; or &quot;Grandpa.&quot; They say they&apos;ve been in a
              car accident, arrested, or hospitalized, and they need money immediately. Then they say the words that seal the trap: &quot;Please
              don&apos;t tell Mom and Dad.&quot;
            </p>
            <p>
              Before AI voice cloning, these calls relied on vague impersonations and the victim filling in the blanks (&quot;Is this Jake?&quot;
              &quot;Yes, Grandma, it&apos;s Jake!&quot;). Now, scammers can clone a grandchild&apos;s voice from a few seconds of social media
              audio. The call sounds exactly like the real person, making it exponentially harder to detect. The FBI reported that AI-enhanced
              emergency scams have surged dramatically.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The typical playbook
            </h3>
            <p>
              The call follows a script: the &quot;grandchild&quot; is crying and panicked, describes an accident or arrest, then hands the phone
              to a &quot;lawyer&quot; or &quot;police officer&quot; who calmly explains that bail is needed immediately. The &quot;lawyer&quot; gives
              specific instructions: withdraw cash, buy gift cards, or wire money. Some operations send a courier to the victim&apos;s home to
              collect cash in person — these couriers are often recruited through their own scam (employment fraud) and may not even know they&apos;re
              part of a criminal operation.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The family code word defense
            </h3>
            <p>
              The single most effective defense against grandparent scams is a <strong>family code word</strong>. Choose a word or phrase that only
              your family knows — something that would never appear on social media. If someone calls claiming to be a family member in trouble,
              ask for the code word. If they can&apos;t provide it, hang up and call your family member directly at their known number. Share this
              strategy with every elderly person in your life before they become a target.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — file a complaint — especially if a courier came to your home</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for tracking phone-based scam operations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>Your local police</strong> — file a report — especially if someone came to your home to collect cash</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>AARP Fraud Helpline</strong> — call 877-908-3360 — free support for older Americans targeted by scams</span>
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
              <a href="/report-elder-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Elder Fraud</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-gift-card-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Gift Card Scam</span>
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
