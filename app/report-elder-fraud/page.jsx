import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Elder Fraud | Senior Scams & Financial Abuse — ScamComplaints",
  description: "Report elder fraud, senior scams, and financial exploitation of older adults. Help protect the most targeted age group from scammers.",
  keywords: "report elder fraud, senior scam report, elderly scam, financial exploitation elderly, elder abuse, grandparent scam, senior fraud help",
  openGraph: {
    title: "Report Elder Fraud & Senior Scams — ScamComplaints.org",
    description: "File a report about scams targeting seniors. Help protect elderly Americans from financial exploitation.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-elder-fraud" },
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-orange-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Elder Fraud Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report
            <br />
            <span className="text-orange-400">elder fraud.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Americans over 60 lost $3.4 billion to fraud in 2023 — the highest losses of any age group. Seniors are targeted by tech support scams, romance scams, government impersonation, grandparent scams, and investment fraud at alarming rates. If you or a loved one has been scammed, reporting it helps investigators protect others and may help recover funds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="elder_fraud"
              title="Quick elder fraud report"
              subtitle="Report on behalf of yourself or a family member."
              fields={[
          { name: "platform", label: "Type of scam", type: "select", required: true, options: [
            { value: "tech_support", label: "Tech support scam" }, { value: "romance", label: "Romance / catfish scam" },
            { value: "government", label: "Government impersonation (IRS, SSA)" }, { value: "grandparent", label: "Grandparent / emergency scam" },
            { value: "investment", label: "Investment / crypto scam" }, { value: "lottery", label: "Lottery / sweepstakes scam" },
            { value: "charity", label: "Fake charity" }, { value: "caregiver", label: "Caregiver / trusted person fraud" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe what happened, how the victim was contacted, and what was taken." },
          { name: "amountLost", label: "Amount lost", type: "text", placeholder: "e.g., 15000", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, options: [
            { value: "gift_card", label: "Gift cards" }, { value: "wire", label: "Wire / bank transfer" },
            { value: "cash", label: "Cash" }, { value: "crypto", label: "Cryptocurrency" },
            { value: "cash_app", label: "Cash App / Venmo / Zelle" }, { value: "check", label: "Check" }, { value: "other", label: "Other" },
          ]},
          { name: "fakeName", label: "Scammer's name or alias", type: "text", expandable: true, placeholder: "If known" },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report elder fraud?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Seniors are specifically targeted because scammers know they have savings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Many elderly victims don't report out of shame — your report fills that gap
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    The FBI's Elder Fraud Unit uses reports to build cases and recover funds
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Patterns in reports help Adult Protective Services identify at-risk individuals
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                <h3 className="text-sm font-semibold text-orange-900">Signs an elderly person is being scammed</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-orange-800">
                  <li>• Unusual or large bank withdrawals or wire transfers</li>
                  <li>• Buying large quantities of gift cards</li>
                  <li>• Secretive about phone calls or who they're talking to online</li>
                  <li>• New "friend" or "romantic partner" who asks for money</li>
                  <li>• Confusion about missing money or unfamiliar financial transactions</li>
                  <li>• Receiving excessive mail from sweepstakes or lottery companies</li>
                  <li>• A caregiver, family member, or new acquaintance with unusual financial access</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$3.4B</span>
                <p className="text-xs text-slate-500">lost by Americans over 60 in 2023 (FBI)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">101K</span>
                <p className="text-xs text-slate-500">elder fraud complaints filed with FBI</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$33,915</span>
                <p className="text-xs text-slate-500">average loss per elder victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">2x</span>
                <p className="text-xs text-slate-500">elder victims more likely to lose life savings</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">Elder fraud — the $3.4 billion crisis targeting seniors</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Elder fraud is a national crisis. The FBI reported that Americans over 60 lost $3.4 billion to scams in 2023 — the highest
              loss amount of any age group. Over 101,000 complaints were filed, with an average loss of $33,915 per victim. Many experts
              believe the actual numbers are far higher, as a significant percentage of elderly victims never report out of shame,
              confusion, or fear of losing their independence.
            </p>
            <p>
              Scammers target seniors for specific reasons: they&apos;re more likely to have retirement savings, own their homes, and have
              good credit. They grew up in an era where a handshake meant something, making them more trusting. And they&apos;re often
              isolated, especially after losing a spouse, which makes them vulnerable to romance scams and social engineering.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Most common scams targeting seniors
            </h3>
            <p>
              <strong>Tech support scams</strong> ($925M in losses) target seniors with fake virus warnings. <strong>Romance scams</strong>
              exploit loneliness, especially among recently widowed seniors. <strong>Government impersonation</strong> calls from &quot;the
              IRS&quot; or &quot;Social Security&quot; create fear. <strong>Grandparent scams</strong> use AI voice cloning to impersonate a
              grandchild in distress. <strong>Investment scams</strong> promise retirement income. And <strong>sweepstakes scams</strong> tell
              seniors they&apos;ve won a prize — some victims have paid hundreds of thousands over years.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to help a senior who may be a victim
            </h3>
            <p>
              Approach with empathy, not judgment. Elderly scam victims already feel tremendous shame. Don&apos;t blame them — instead,
              validate that these criminals are sophisticated and that anyone can be fooled. Help them file reports with the FBI IC3 and FTC.
              Contact their bank immediately if money was transferred. Consider a credit freeze. Look into Adult Protective Services if the
              exploitation is ongoing. The DOJ&apos;s Elder Justice Initiative (justice.gov/elderjustice) provides resources for families.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span><strong>FBI IC3 — Elder Fraud</strong> — ic3.gov — the FBI has a dedicated Elder Fraud unit and has recovered millions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for pattern tracking and enforcement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span><strong>Adult Protective Services</strong> — contact your state's APS if a vulnerable adult is being exploited</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span><strong>DOJ Elder Justice</strong> — justice.gov/elderjustice — Department of Justice elder fraud resources and hotline</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
