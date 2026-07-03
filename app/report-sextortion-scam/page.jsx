import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Sextortion | Online Blackmail & Sexual Extortion — ScamComplaints",
  description: "Report sextortion, online blackmail, and sexual extortion scams. Confidential reporting. Help stop this growing threat targeting teens and adults.",
  keywords: "report sextortion, sextortion scam report, online blackmail report, sexual extortion, sextortion help, report online blackmail, nude blackmail, sextortion teen",
  openGraph: {
    title: "Report Sextortion & Online Blackmail — ScamComplaints.org",
    description: "Confidential sextortion reporting. Help law enforcement track these criminals and protect future victims.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-sextortion-scam" },
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
      "@id": "https://scamcomplaints.org/report-sextortion-scam/#webpage",
      "url": "https://scamcomplaints.org/report-sextortion-scam",
      "name": "Report a Sextortion Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-sextortion-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-sextortion-scam/#breadcrumb",
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
          "name": "Report Sextortion Scam",
          "item": "https://scamcomplaints.org/report-sextortion-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Sextortion Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report
            <br />
            <span className="text-purple-400">sextortion.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Sextortion — blackmail involving intimate images — is surging, especially among teens and young adults. Victims under 18 increased nearly 10% in 2023. Whether someone is threatening to share intimate photos, demanding money to keep them private, or using AI to create fake explicit images, you are not alone and this is not your fault. Reporting stops these criminals from targeting others.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="sextortion_scam"
              title="Confidential sextortion report"
              subtitle="Your identity is protected. This report helps track patterns and protect others."
              fields={[
          { name: "platform", label: "Where did this happen?", type: "select", required: true, options: [
            { value: "instagram", label: "Instagram" }, { value: "snapchat", label: "Snapchat" },
            { value: "facebook", label: "Facebook / Messenger" }, { value: "tiktok", label: "TikTok" },
            { value: "discord", label: "Discord" }, { value: "whatsapp", label: "WhatsApp" },
            { value: "dating_app", label: "Dating app" }, { value: "gaming", label: "Gaming platform" },
            { value: "email", label: "Email" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe how they contacted you and what they're threatening. You don't need to share explicit details." },
          { name: "fakeName", label: "Name or username they used", type: "text", placeholder: "e.g., their social media handle" },
          { name: "amountLost", label: "Amount demanded or paid", type: "text", placeholder: "e.g., 500", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment demanded via", type: "select", expandable: true, options: [
            { value: "gift_card", label: "Gift cards" }, { value: "crypto", label: "Cryptocurrency" },
            { value: "cash_app", label: "Cash App / Venmo / Zelle" }, { value: "wire", label: "Bank transfer" },
            { value: "not_paid", label: "Haven't paid" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report sextortion?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    These criminals operate at scale — one person may be blackmailing dozens of victims simultaneously
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Reports help platforms identify and ban accounts faster
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Law enforcement has successfully arrested sextortion rings using victim reports
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    You are NOT alone — this is one of the fastest-growing cybercrimes in America
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                <h3 className="text-sm font-semibold text-purple-900">Sextortion warning signs</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-purple-800">
                  <li>• Attractive stranger initiates contact and quickly escalates to sexual conversation</li>
                  <li>• Requests intimate photos or video chat, then records without consent</li>
                  <li>• Threatens to send images to your family, friends, or employer</li>
                  <li>• Demands payment in gift cards, crypto, or cash apps</li>
                  <li>• Claims to have hacked your webcam (often a bluff in email scams)</li>
                  <li>• Uses AI to create fake explicit images from your social media photos</li>
                  <li>• Targets teens through gaming platforms, Instagram, or Snapchat</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$122M</span>
                <p className="text-xs text-slate-500">lost to extortion/sextortion in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">25,000+</span>
                <p className="text-xs text-slate-500">sextortion complaints in 2025</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#16</span>
                <p className="text-xs text-slate-500">sixteenth-highest loss category</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">+64%</span>
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
          <h2 className="text-2xl font-bold text-slate-900">How sextortion works — and what to do if it happens to you</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Sextortion is one of the fastest-growing online crimes in the United States, and it&apos;s devastating lives. The FBI reported
              over 12,600 sextortion complaints in 2023, with teen and Gen-Z victims surging nearly 10%. Multiple teenagers have died by
              suicide after being targeted, making this not just a financial crime but a life-threatening one.
            </p>
            <p>
              The mechanics are brutally simple. A scammer creates an attractive fake profile on Instagram, Snapchat, or a dating app.
              They initiate conversation, build rapport quickly, and escalate to sexual content — exchanging photos or moving to video chat.
              Once they have compromising material, the friendly persona vanishes instantly. The victim receives a message: &quot;Pay $500 in
              Bitcoin or I send these to everyone on your friends list.&quot; They often show screenshots of the victim&apos;s actual contacts
              to prove they&apos;re serious.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The two types of sextortion
            </h3>
            <p>
              <strong>Targeted sextortion</strong> involves actually obtaining real intimate images through manipulation or hacking. The scammer
              genuinely has compromising material and uses it as leverage. This is most common on dating apps and social media. <strong>Mass email
              sextortion</strong> is a bluff — scammers send millions of emails claiming to have hacked your webcam and recorded you. They include
              an old password (from a data breach) to make the threat seem credible, but they typically have nothing. Both types demand cryptocurrency
              or gift card payments.
            </p>
            <p>
              A newer and deeply disturbing variant uses <strong>AI-generated deepfake images</strong>. Scammers take ordinary social media photos
              and use AI tools to create realistic fake explicit images. The victim never shared anything inappropriate, but the fabricated
              images are realistic enough to cause panic. This variant frequently targets teenagers who have public social media profiles.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              What to do right now
            </h3>
            <p>
              <strong>Do not pay.</strong> Paying almost never stops the threats — it confirms you&apos;re willing to pay, and the demands escalate.
              FBI data shows that most sextortion criminals who receive a payment come back asking for more. <strong>Do not delete evidence.</strong>
              Screenshot everything: the threats, the accounts, the payment demands, the conversation history. <strong>Block the account</strong>
              on the platform and report it. <strong>Tell someone you trust</strong> — a parent, friend, teacher, or counselor. The shame and
              isolation are the scammer&apos;s biggest weapons.
            </p>
            <p>
              If you or someone you know is in crisis, contact the{" "}
              <a href="https://988lifeline.org" className="font-medium text-red-600 underline" target="_blank" rel="noopener">
                988 Suicide & Crisis Lifeline
              </a>{" "}
              (call or text 988). For children and teens, the{" "}
              <a href="https://www.missingkids.org/gethelpnow/cybertipline" className="font-medium text-red-600 underline" target="_blank" rel="noopener">
                National Center for Missing & Exploited Children CyberTipline
              </a>{" "}
              handles reports involving minors. You can also reach out to the{" "}
              <a href="https://www.fbi.gov/contact-us/field-offices" className="font-medium text-red-600 underline" target="_blank" rel="noopener">
                FBI field office
              </a>{" "}
              nearest to you.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — file a complaint — the FBI has a dedicated sextortion task force</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span><strong>NCMEC CyberTipline</strong> — cybertipline.org — if the victim is under 18 — mandatory reporting for minors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span><strong>988 Suicide & Crisis Lifeline</strong> — call or text 988 — free, confidential, 24/7 support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span><strong>The platform</strong> — report the account on Instagram, Snapchat, etc. — platforms can remove content and ban accounts</span>
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
              <a href="/report-social-media-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Social Media Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-deepfake-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Deepfake Scam</span>
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
