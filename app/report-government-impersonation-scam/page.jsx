import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Government Impersonation Scam | IRS, SSA & Law Enforcement Fraud — ScamComplaints",
  description: "Report scammers impersonating the IRS, Social Security Administration, FBI, or local police. No government agency demands payment by gift card or crypto.",
  keywords: "report government impersonation scam, IRS scam report, Social Security scam, fake FBI call, government scam report, SSA impersonation scam, police scam call",
  openGraph: {
    title: "Report Government Impersonation Scams — ScamComplaints.org",
    description: "Someone claiming to be the IRS, SSA, or FBI demanded payment? That's a scam. Report it here.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-government-impersonation-scam" },
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
      "@id": "https://scamcomplaints.org/report-government-impersonation-scam/#webpage",
      "url": "https://scamcomplaints.org/report-government-impersonation-scam",
      "name": "Report a Government Impersonation Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-government-impersonation-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-government-impersonation-scam/#breadcrumb",
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
          "name": "Report Government Impersonation Scam",
          "item": "https://scamcomplaints.org/report-government-impersonation-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-700/60 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Government Impersonation Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-amber-400">government impersonation scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            The IRS will never call you demanding immediate payment by gift card. Social Security will never threaten to suspend your number unless you wire money. The FBI will never email you about a warrant. Government impersonation scams use fear and authority to pressure victims into paying — and they're the fastest-growing fraud category in the country. Report the phone number, email, or details here so we can warn others.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="government_impersonation_scam"
              title="Quick government impersonation report"
              subtitle="Report the scam call, email, or text in under 2 minutes."
              fields={[
          { name: "agencyClaimed", label: "Agency they claimed to be", type: "select", required: true, options: [
            { value: "irs", label: "IRS (Internal Revenue Service)" },
            { value: "ssa", label: "Social Security Administration" },
            { value: "fbi", label: "FBI" },
            { value: "dea", label: "DEA (Drug Enforcement)" },
            { value: "ice", label: "ICE / Immigration" },
            { value: "local_police", label: "Local police / sheriff" },
            { value: "usps", label: "USPS / customs" },
            { value: "medicare", label: "Medicare" },
            { value: "other", label: "Other government agency" },
          ]},
          { name: "contactMethod", label: "How did they contact you?", type: "select", required: true, options: [
            { value: "phone_call", label: "Phone call" }, { value: "voicemail", label: "Voicemail" },
            { value: "text_sms", label: "Text / SMS" }, { value: "email", label: "Email" },
            { value: "letter_mail", label: "Physical letter" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What did they claim?", type: "textarea", required: true, rows: 4, placeholder: "What did they threaten? What did they demand? What payment method did they insist on?" },
          { name: "phoneNumber", label: "Phone number or caller ID", type: "text", expandable: true, placeholder: "e.g., 1-800-555-0199" },
          { name: "amountLost", label: "Amount lost (if any)", type: "text", expandable: true, placeholder: "e.g., 3000", inputMode: "decimal" },
          { name: "paymentMethod", label: "Payment demanded", type: "select", expandable: true, placeholder: "What payment did they want?", options: [
            { value: "gift_card", label: "Gift cards" }, { value: "wire", label: "Wire transfer" },
            { value: "crypto", label: "Cryptocurrency / Bitcoin ATM" },
            { value: "cash_app", label: "Cash App / Venmo / Zelle" },
            { value: "none_yet", label: "Didn't pay anything" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report government impersonation?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    The same phone numbers and caller IDs are used thousands of times
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Phone carriers use reports to flag and block spoofed numbers
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Real agencies track impersonation reports to identify fraud rings
                  </li>
                  <li className="flex gap-2">
                    <span className="text-slate-500">→</span>
                    Elderly family members are the primary targets — your report protects them
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">Government impersonation red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
                  <li>• Claims you owe money and threatens arrest if you don't pay now</li>
                  <li>• Demands payment by gift card, wire transfer, or cryptocurrency</li>
                  <li>• Caller ID shows a government agency name (these can be spoofed)</li>
                  <li>• Says your Social Security number has been "suspended" or "compromised"</li>
                  <li>• Threatens to revoke your driver's license or passport</li>
                  <li>• Tells you not to hang up or call anyone else</li>
                  <li>• Email claims to be from the FBI with a "warrant" attached</li>
                  <li>• Says you must pay to "fix" a problem with your identity</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Government impersonation statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$798M</span>
                <p className="text-xs text-slate-500">lost to government impersonation in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">97%</span>
                <p className="text-xs text-slate-500">year-over-year surge in losses</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#6</span>
                <p className="text-xs text-slate-500">sixth-highest loss scam category</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">+103%</span>
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
          <h2 className="text-2xl font-bold text-slate-900">Government impersonation: fear as a weapon</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Government <a href="/report-impersonation-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">impersonation scams</a> work because they weaponize
              authority and fear. When someone calls claiming to be the IRS and
              says a warrant has been issued for your arrest over unpaid taxes,
              the adrenaline response overrides critical thinking. Victims don't
              stop to ask why the IRS is calling instead of mailing a letter, or
              why a federal agency wants payment in Target gift cards, because
              the fear of arrest is overwhelming — especially for elderly people,
              immigrants, or anyone who's ever had an issue with taxes.
            </p>
            <p>
              The FTC reported $618 million in losses to government
              impersonation scams in 2023, making it one of the most financially
              devastating fraud categories. The median loss is $7,000 — far
              higher than most other scam types — because victims are pressured
              to make large payments under the belief that jail time is the
              alternative. And 70% of victims are over age 60, a demographic
              that grew up trusting government institutions and is less likely to
              question someone claiming to represent one.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How these scams actually work
            </h3>
            <p>
              The most common variant is the IRS tax scam. A robocall or live
              caller claims you owe back taxes and a warrant has been issued.
              They provide a fake badge number and case number. They instruct
              you to go to a store, buy gift cards (usually $500–$2,000 worth),
              scratch off the backs, and read the numbers over the phone. More
              sophisticated versions direct victims to Bitcoin ATMs with a QR
              code to scan, or provide bank account details for a wire transfer.
            </p>
            <p>
              The Social Security variant claims your SSN has been "suspended"
              due to suspicious activity, or that your number was found at a
              crime scene. They threaten arrest unless you verify your identity
              by providing your full SSN, date of birth, and bank account
              number — exactly the information needed to steal your identity.
              Some variants ask for a "security fee" to reactivate your
              number.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              What real government agencies actually do
            </h3>
            <p>
              The IRS initiates contact by mail — never by phone, email, or
              text. They never demand immediate payment by gift card, wire
              transfer, or cryptocurrency. Social Security never threatens to
              "suspend" your number. The FBI never sends emails about warrants
              or requests payments. No federal agency will threaten you with
              arrest over the phone and demand you stay on the line while buying
              gift cards. If you receive any of these contacts, hang up and
              call the agency directly using the number on their official
              website.
            </p>
            <p>
              If you've already sent money or shared personal information,{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                file a detailed report
              </a>{" "}
              immediately. Include the phone number they called from, what
              agency they claimed to be, what they demanded, and how much (if
              anything) you paid.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report government impersonation scams</h3>
            <p className="mt-2 text-sm text-slate-600">Report to the real agencies being impersonated:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>TIGTA</strong> — treasury.gov/tigta — for IRS impersonation (or call 800-366-4484)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>SSA OIG</strong> — oig.ssa.gov — for Social Security impersonation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for all government impersonation fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-slate-500">→</span>
                <span><strong>Do Not Call Registry</strong> — donotcall.gov — report the phone number</span>
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
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-tech-support-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Tech Support Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-elder-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Elder Fraud</span>
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
