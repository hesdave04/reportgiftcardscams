import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Charity Scam | Fake Donation & Fundraiser Fraud — ScamComplaints",
  description: "Report fake charities, fraudulent fundraisers, and donation scams. Protect generous donors from criminals exploiting charitable giving.",
  keywords: "report charity scam, fake charity, donation scam, fraudulent fundraiser, GoFundMe scam, fake disaster relief, charity fraud report",
  openGraph: {
    title: "Report Fake Charities & Donation Scams — ScamComplaints.org",
    description: "File a charity fraud report. Expose fake charities and fraudulent fundraisers.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-charity-scam" },
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
      "@id": "https://scamcomplaints.org/report-charity-scam/#webpage",
      "url": "https://scamcomplaints.org/report-charity-scam",
      "name": "Report a Charity Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-charity-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-charity-scam/#breadcrumb",
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
          "name": "Report Charity Scam",
          "item": "https://scamcomplaints.org/report-charity-scam"
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Charity Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-green-400">charity scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Fake charities exploit humanity's best impulse — the desire to help others. After every natural disaster, mass shooting, or viral tragedy, scammers set up fake donation pages, impersonate real charities, and pocket the money intended for victims. Your report helps shut them down and redirects funds to legitimate organizations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="charity_scam"
              title="Quick charity fraud report"
              subtitle="Expose fake charities so donations reach real victims."
              fields={[
          { name: "platform", label: "Where did you encounter this?", type: "select", required: true, options: [
            { value: "phone", label: "Phone call" }, { value: "email", label: "Email" },
            { value: "social_media", label: "Social media" }, { value: "gofundme", label: "GoFundMe / crowdfunding" },
            { value: "website", label: "Website" }, { value: "door_to_door", label: "Door-to-door" },
            { value: "text", label: "Text message" }, { value: "other", label: "Other" },
          ]},
          { name: "companyName", label: "Name of the fake charity", type: "text", required: true, placeholder: "e.g., American Veterans Relief Fund" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What cause did they claim to support? How did they pressure you to donate?" },
          { name: "websiteUrl", label: "Website or fundraiser URL", type: "text", expandable: true, placeholder: "https://..." },
          { name: "amountLost", label: "Amount donated", type: "text", placeholder: "e.g., 200", inputMode: "decimal", expandable: true },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report charity scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    Fake charities divert money from real victims and legitimate organizations
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    Reports help the FTC and state AGs shut down fraudulent operations
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    Charity watchdog groups use report data to update their fraud databases
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-500">→</span>
                    Fake crowdfunding campaigns can be removed faster with documented complaints
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                <h3 className="text-sm font-semibold text-green-900">Charity scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-green-800">
                  <li>• Charity name sounds similar to a well-known organization but isn't quite right</li>
                  <li>• High-pressure tactics demanding immediate donation</li>
                  <li>• Won't provide written information about the charity</li>
                  <li>• Thanks you for a donation you don't remember making and asks for another</li>
                  <li>• Requests cash, gift cards, or wire transfer instead of check or card</li>
                  <li>• Can't explain how donations will be used</li>
                  <li>• No verifiable registration with your state's charity regulator</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$170M+</span>
                <p className="text-xs text-slate-500">lost to charity fraud annually (FTC estimate)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">36%</span>
                <p className="text-xs text-slate-500">of charity scams happen after natural disasters</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">78%</span>
                <p className="text-xs text-slate-500">of charity scam contacts come by phone</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">1 in 3</span>
                <p className="text-xs text-slate-500">charity scam victims are over 65</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How charity scams work — and how to verify before you give</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Charity scams are uniquely cruel because they exploit the best in people — the desire to help others in need. The FTC estimates
              over $170 million is lost to charity fraud annually, though the real number is likely much higher since most victims don&apos;t
              realize they&apos;ve been scammed. These fraudulent operations surge after every high-profile disaster, from hurricanes and
              wildfires to mass shootings and pandemic outbreaks.
            </p>
            <p>
              The most common tactic is <strong>name confusion</strong>. Scammers create organizations with names nearly identical to real
              charities: &quot;American Cancer Research Fund&quot; instead of the American Cancer Society, or &quot;Veterans Relief
              Association&quot; instead of legitimate veterans groups. They count on donors not checking too carefully. Phone solicitation
              is the preferred method, accounting for 78% of charity scam contacts, because the pressure of a live conversation makes it
              harder to say no.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to verify a charity is legitimate
            </h3>
            <p>
              Before donating, check the organization on <strong>Charity Navigator</strong> (charitynavigator.org), <strong>GuideStar</strong>
              (guidestar.org), or the <strong>BBB Wise Giving Alliance</strong> (give.org). Look up the charity&apos;s registration with your
              state&apos;s Attorney General or Secretary of State — most states require charities to register before soliciting donations.
              Ask for the charity&apos;s EIN (Employer Identification Number) and look it up on the IRS Tax Exempt Organization Search tool.
              Legitimate charities are transparent about how donations are used and will provide written materials without pressure.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Crowdfunding scams
            </h3>
            <p>
              GoFundMe, Facebook Fundraisers, and other crowdfunding platforms have created new avenues for charity fraud. While platforms have
              verification processes, scammers create compelling fake campaigns with stolen photos and fabricated stories. Before donating to a
              crowdfunding campaign, look for verification badges, check if the organizer has a real social media presence, and see if local
              news outlets have covered the story independently.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for tracking charity fraud patterns nationally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>Your state AG</strong> — most state Attorneys General have a charity fraud unit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>Charity Navigator</strong> — charitynavigator.org — verify before donating — check any charity's rating</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-500">→</span>
                <span><strong>The crowdfunding platform</strong> — report fake GoFundMe campaigns directly for investigation and removal</span>
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
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
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
