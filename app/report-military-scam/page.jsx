import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Military Romance Scams | Fake Soldier Fraud — ScamComplaints",
  description: "Report military romance scams where criminals impersonate soldiers, using stolen photos of real service members. File a report to stop these imposters.",
  keywords: "report military scam, fake soldier scam, military romance scam, military impersonation fraud, army scam, fake deployment scam, stolen military photos",
  openGraph: {
    title: "Report Military Romance Scams & Fake Soldier Fraud — ScamComplaints.org",
    description: "File a report about someone impersonating military personnel for romance fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-military-scam" },
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
      "@id": "https://scamcomplaints.org/report-military-scam/#webpage",
      "url": "https://scamcomplaints.org/report-military-scam",
      "name": "Report a Military Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-military-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-military-scam/#breadcrumb",
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
          "name": "Report Military Scam",
          "item": "https://scamcomplaints.org/report-military-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-green-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Military Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-green-400">military romance scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            "I'm a U.S. soldier deployed overseas and I need help with..." — Military romance scams use stolen photos of real service members to build fake relationships. The scammer claims to be deployed, which conveniently explains why they can't meet or video chat. They build emotional connections over weeks, then ask for money for leave, phone cards, or medical bills. Real soldiers never need your money.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="military_scam"
              title="Quick military scam report"
              subtitle="Expose the fake identity. Include their username and any photos they shared."
              fields={[
          { name: "platform", label: "Where did you meet them?", type: "select", required: true, options: [
            { value: "facebook", label: "Facebook" }, { value: "instagram", label: "Instagram" },
            { value: "tinder", label: "Tinder / dating app" }, { value: "hangouts", label: "Google Chat / Hangouts" },
            { value: "whatsapp", label: "WhatsApp" }, { value: "words_with_friends", label: "Words with Friends / gaming" },
            { value: "other", label: "Other" },
          ]},
          { name: "fakeName", label: "Name and rank they claimed", type: "text", required: true, placeholder: "e.g., Sgt. James Wilson, Capt. David Brown" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Their story, where they claimed to be deployed, what they asked for money for." },
          { name: "amountLost", label: "Total amount sent", type: "text", placeholder: "e.g., 8000", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, options: [
            { value: "gift_card", label: "Gift cards (iTunes, Steam, etc.)" }, { value: "wire", label: "Wire transfer" },
            { value: "crypto", label: "Cryptocurrency" }, { value: "cash_app", label: "Cash App / Venmo / Zelle" },
            { value: "money_gram", label: "MoneyGram / Western Union" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report military scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    These scammers use stolen photos of REAL soldiers — the real person is also a victim
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    The military and CID actively investigate impersonation of service members
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    The same fake persona is often used to scam multiple victims simultaneously
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    Reverse image search on the photos can identify the real soldier and protect future victims
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="text-sm font-semibold text-green-900">Military scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-green-800">
                  <li>• Claims to be a high-ranking U.S. military officer deployed overseas</li>
                  <li>• Met on social media or dating app, not through the military community</li>
                  <li>• Says they need money for leave, a satellite phone, or a "secure line"</li>
                  <li>• Cannot video call because of "deployment security protocols" (not real)</li>
                  <li>• Asks for money via gift cards, wire transfer, or cryptocurrency</li>
                  <li>• Photos look professional — likely stolen from a real soldier's social media</li>
                  <li>• Says their pay is "frozen" or they need help accessing military benefits</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$929M</span>
                <p className="text-xs text-slate-500">total romance scam losses in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">38%</span>
                <p className="text-xs text-slate-500">year-over-year increase in romance losses</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">25%</span>
                <p className="text-xs text-slate-500">of romance scammers claim military identity</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$64K</span>
                <p className="text-xs text-slate-500">average loss when military persona is used</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How military romance scams work — stolen valor, real money</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Military romance scams are one of the most prevalent and emotionally devastating subsets of romance fraud. Scammers steal photos
              of real U.S. service members from social media — often soldiers in dress uniforms or in overseas deployment settings — and create
              fake dating profiles. The military persona provides a built-in excuse for every red flag: can&apos;t meet in person (deployed),
              can&apos;t video call (security restrictions), needs financial help (military bureaucracy).
            </p>
            <p>
              The scammer builds a romantic relationship over weeks or months, then introduces financial requests. Common stories include needing
              money for &quot;military leave papers,&quot; a satellite phone to stay in touch, medical treatment for an injury, or transportation
              to come home. None of these are real military expenses. The U.S. military provides all equipment, medical care, and leave to service
              members at no cost. A real soldier will never ask a romantic interest for money.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Key facts about real military service
            </h3>
            <p>
              <strong>There is no fee to go on leave.</strong> The military does not charge soldiers for leave paperwork. <strong>Soldiers are not
              charged for internet or phone access.</strong> Most deployment locations have free WiFi and phone access. <strong>Military email
              addresses end in .mil</strong> — any soldier using only a Gmail or Yahoo account for official communication is suspicious.
              <strong>There is no such thing as paying to retire or leave the military early.</strong> If someone asks for money for any of these
              things, they are a scammer.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to verify a military identity
            </h3>
            <p>
              Do a reverse image search on Google or Social Catfish with any photos they&apos;ve sent. The stolen photos almost always trace back
              to a real soldier&apos;s public social media profile. You can report the impersonation to the U.S. Army Criminal Investigation Division
              (CID) at cid.army.mil. If the person claims a specific unit or base, call that base&apos;s public affairs office to verify. And remember
              the golden rule: never send money to someone you&apos;ve never met in person.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>U.S. Army CID</strong> — cid.army.mil — report impersonation of U.S. Army personnel</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for romance fraud reports involving financial loss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>Social Catfish</strong> — socialcatfish.com — reverse image search to identify stolen military photos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer fraud pattern tracking</span>
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
