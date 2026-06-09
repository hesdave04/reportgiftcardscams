import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Sugar Daddy & Sugar Mama Scams | Financial Manipulation — ScamComplaints",
  description: "Report fake sugar daddy and sugar mama scams on Instagram, Snapchat, and dating apps. They promise allowances but steal your money or identity. File a report.",
  keywords: "report sugar daddy scam, sugar mama scam, fake sugar daddy, Instagram sugar daddy scam, Snapchat sugar scam, cash app sugar daddy, sugar baby scam",
  openGraph: {
    title: "Report Sugar Daddy & Sugar Mama Scams — ScamComplaints.org",
    description: "File a report about fake sugar daddy/mama scams. They promise payments but steal your money or identity.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-sugar-daddy-scam" },
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
      "@id": "https://scamcomplaints.org/report-sugar-daddy-scam/#webpage",
      "url": "https://scamcomplaints.org/report-sugar-daddy-scam",
      "name": "Report a Sugar Daddy Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-sugar-daddy-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-sugar-daddy-scam/#breadcrumb",
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
          "name": "Report Sugar Daddy Scam",
          "item": "https://scamcomplaints.org/report-sugar-daddy-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-rose-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sugar Daddy Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-rose-400">sugar daddy or sugar mama scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            "I'll pay you $2,000 a week just to talk to me." Fake sugar daddy and sugar mama scams flood Instagram, Snapchat, and dating apps, targeting young adults with promises of easy money. But it always ends the same way: they need you to pay a "registration fee," send back part of a fake deposit, or share your banking details. The money they promise never comes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="sugar_daddy_scam"
              title="Quick sugar daddy/mama scam report"
              subtitle="Document the fake offer. Help warn others on the same platform."
              fields={[
          { name: "platform", label: "Where did they contact you?", type: "select", required: true, options: [
            { value: "instagram", label: "Instagram" }, { value: "snapchat", label: "Snapchat" },
            { value: "tiktok", label: "TikTok" }, { value: "twitter", label: "Twitter / X" },
            { value: "dating_app", label: "Dating app" }, { value: "text", label: "Text / WhatsApp" },
            { value: "other", label: "Other" },
          ]},
          { name: "fakeName", label: "Their username or name", type: "text", required: true, placeholder: "e.g., @sugardaddy_wealth_king" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What did they promise? What did they ask you to do? Did you send money or share banking info?" },
          { name: "amountLost", label: "Amount lost (if any)", type: "text", placeholder: "e.g., 500", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, options: [
            { value: "cash_app", label: "Cash App / Venmo / Zelle" }, { value: "gift_card", label: "Gift cards" },
            { value: "bank_info", label: "Shared bank account login" }, { value: "crypto", label: "Cryptocurrency" },
            { value: "not_paid", label: "Didn't send anything" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report sugar scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    These scammers operate hundreds of fake accounts targeting young adults
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    The same scripts and tactics are used across Instagram, Snapchat, and TikTok
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    Reports help platforms mass-ban networks of fake sugar daddy accounts
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500">→</span>
                    Young victims are embarrassed and don't report — your report fills the gap
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                <h3 className="text-sm font-semibold text-rose-900">Sugar scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-rose-800">
                  <li>• Offers thousands per week for minimal effort like "just talking"</li>
                  <li>• DMs you first with a generous offer out of nowhere</li>
                  <li>• Asks for a "registration fee" or "verification payment" to get started</li>
                  <li>• Sends a check or payment that requires you to "send back" a portion</li>
                  <li>• Asks for your bank account login to "deposit funds directly"</li>
                  <li>• Profile is new, uses stock-looking wealth photos, or has few real posts</li>
                  <li>• Can't explain why they chose you specifically</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">18–25</span>
                <p className="text-xs text-slate-500">primary target age for sugar scams</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$500</span>
                <p className="text-xs text-slate-500">typical "fee" requested to get started</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">300%</span>
                <p className="text-xs text-slate-500">increase in sugar scam reports since 2020</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">89%</span>
                <p className="text-xs text-slate-500">of sugar daddy DMs on Instagram are scams</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How sugar daddy and sugar mama scams work</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Sugar daddy and sugar mama scams are one of the fastest-growing online frauds targeting young adults, especially on Instagram,
              Snapchat, and TikTok. The premise is appealing: a wealthy older person offers to pay you a generous weekly allowance — $500,
              $1,000, even $5,000 — in exchange for companionship, conversation, or simply being their &quot;sugar baby.&quot; The offer
              comes via DM and seems too good to be true. Because it is.
            </p>
            <p>
              The scam follows predictable patterns. In the <strong>&quot;fee first&quot; variant</strong>, the sugar daddy asks you to pay
              a small registration fee ($50–$500) to &quot;verify your identity&quot; or &quot;activate your account&quot; before they can
              send your allowance. Once paid, they disappear or invent more fees. In the <strong>&quot;overpayment&quot; variant</strong>,
              they send you a fake check or Cash App payment, then ask you to forward part of it to their &quot;assistant&quot; — the
              original payment bounces and you&apos;re out the money you forwarded. In the <strong>&quot;bank access&quot; variant</strong>,
              they ask for your bank login to &quot;deposit funds directly,&quot; then drain your account.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Why young adults are targeted
            </h3>
            <p>
              Sugar scams specifically target 18–25 year olds who are often in college, dealing with student debt, or just starting their
              careers. The promise of easy money is powerfully appealing. The scammers use wealthy-looking Instagram profiles with photos
              of luxury cars, mansions, and travel — all stolen from real accounts or generated by AI. They create urgency by saying they
              need a sugar baby &quot;today&quot; and that spots are limited.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The identity theft risk
            </h3>
            <p>
              Beyond direct financial loss, sugar scams pose serious identity theft risks. Victims who share bank logins, photos of their
              IDs, or personal details may face ongoing fraud for years. Some scammers use the victim&apos;s bank account as a money mule
              conduit for other crimes, potentially making the victim an unwitting accomplice to money laundering. If you shared any
              financial information with a sugar scammer, change your passwords immediately and freeze your credit.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — the primary agency for consumer fraud reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>The social media platform</strong> — report the account on Instagram, Snapchat, or TikTok</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>Your bank</strong> — if you shared login info — change passwords and alert them immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-rose-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for financial losses or identity theft</span>
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
              <a href="/report-romance-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Romance Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-payment-app-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Payment App Scam</span>
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
