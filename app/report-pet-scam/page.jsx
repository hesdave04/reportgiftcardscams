import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Puppy Scam | Pet Fraud & Fake Breeders — ScamComplaints",
  description: "Report puppy scams, fake pet breeders, and pet adoption fraud. Fake puppy listings steal money from animal lovers. File a report now.",
  keywords: "report puppy scam, pet scam, fake breeder, puppy fraud, fake puppy listing, dog scam, report pet scam, puppy deposit scam",
  openGraph: {
    title: "Report Puppy Scams & Fake Pet Breeders — ScamComplaints.org",
    description: "File a report about fake puppy listings, fraudulent breeders, and pet adoption scams.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-pet-scam" },
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
      "@id": "https://scamcomplaints.org/report-pet-scam/#webpage",
      "url": "https://scamcomplaints.org/report-pet-scam",
      "name": "Report a Pet Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-pet-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-pet-scam/#breadcrumb",
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
          "name": "Report Pet Scam",
          "item": "https://scamcomplaints.org/report-pet-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-pink-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pet Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-pink-400">puppy or pet scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Pet scams are one of the most emotionally devastating frauds online. The BBB ranks them among the riskiest scams, with 80% of sponsored puppy ads on social media being fraudulent. Scammers use adorable photos stolen from real breeders to collect deposits — and sometimes ongoing "shipping fees" — for puppies that don't exist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="pet_scam"
              title="Quick pet scam report"
              subtitle="Help warn other pet buyers about this fake listing or breeder."
              fields={[
          { name: "platform", label: "Where was the listing?", type: "select", required: true, options: [
            { value: "facebook", label: "Facebook / FB Marketplace" }, { value: "instagram", label: "Instagram" },
            { value: "craigslist", label: "Craigslist" }, { value: "breeder_site", label: "Fake breeder website" },
            { value: "puppyfind", label: "PuppyFind / NextDayPets" }, { value: "google_ad", label: "Google/Facebook ad" },
            { value: "other", label: "Other" },
          ]},
          { name: "websiteUrl", label: "Website or listing URL", type: "text", placeholder: "https://..." },
          { name: "fakeName", label: "Breeder/seller name", type: "text", required: true, placeholder: "e.g., Happy Paws Puppies" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What breed was advertised? How much did they charge? What happened after you paid?" },
          { name: "amountLost", label: "Amount lost", type: "text", placeholder: "e.g., 1500", inputMode: "decimal", expandable: true },
          { name: "paymentMethod", label: "Payment method", type: "select", expandable: true, options: [
            { value: "cash_app", label: "Cash App / Venmo / Zelle" }, { value: "wire", label: "Wire transfer" },
            { value: "gift_card", label: "Gift cards" }, { value: "crypto", label: "Cryptocurrency" }, { value: "other", label: "Other" },
          ]},
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report a pet scam?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-pink-500">→</span>
                    Fake breeder websites often scam dozens of families before being taken down
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-500">→</span>
                    The same stolen puppy photos are used across multiple fake sites
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-500">→</span>
                    Reports help platforms remove fraudulent pet listings faster
                  </li>
                  <li className="flex gap-2">
                    <span className="text-pink-500">→</span>
                    Your report might save another family from the heartbreak
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-pink-200 bg-pink-50 p-5">
                <h3 className="text-sm font-semibold text-pink-900">Pet scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-pink-800">
                  <li>• Price is well below market rate for the breed</li>
                  <li>• Breeder can't video call with the actual puppy</li>
                  <li>• Puppy can be shipped but you can't visit in person</li>
                  <li>• Requests deposit via cash apps, wire transfer, or gift cards</li>
                  <li>• After deposit, "shipping company" charges insurance, crate, or health fees</li>
                  <li>• Website was recently created (check with WHOIS lookup)</li>
                  <li>• Multiple breeds available — real breeders typically specialize in one</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$5.4M</span>
                <p className="text-xs text-slate-500">estimated annual pet scam losses (BBB 2024)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">12,000+</span>
                <p className="text-xs text-slate-500">pet scam complaints per year (BBB)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$850</span>
                <p className="text-xs text-slate-500">average loss per pet scam victim</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">80%</span>
                <p className="text-xs text-slate-500">of puppy ads online may be fraudulent</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How puppy scams work — and how to buy a pet safely</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Pet scams are uniquely cruel because they exploit the emotional excitement of adding a furry family member. The Better Business
              Bureau ranks pet scams among the riskiest fraud types, reporting that 80% of sponsored puppy listings found online are fraudulent.
              The average victim loses about $850, but some have paid thousands in escalating &quot;fees&quot; for a pet that never arrives.
            </p>
            <p>
              The scam typically starts with adorable photos — often stolen from legitimate breeders — posted on Facebook, Instagram, Craigslist,
              or a professional-looking fake breeder website. The prices are attractive, the puppy is available immediately, and the &quot;breeder&quot;
              is warm and responsive. After collecting a deposit (usually via Zelle, Venmo, or wire transfer), a &quot;shipping company&quot;
              contacts you requiring payment for a special crate, insurance, climate-controlled transport, or veterinary clearance. Each fee
              escalates, and the puppy never arrives.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to buy a pet safely
            </h3>
            <p>
              The #1 rule: <strong>never buy a pet you haven&apos;t seen in person</strong> (or via live video call with the actual puppy and the
              breeder together). Do a reverse image search on the puppy photos. Check the breeder&apos;s website age via a WHOIS lookup. Ask for
              references from previous buyers. Real breeders will want to video call with you, ask about your home, and often have waitlists.
              Consider adopting from a local shelter or rescue — you can meet the animal in person and the fees are transparent.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              After-payment escalation scam
            </h3>
            <p>
              One of the most insidious elements is the post-payment escalation. After the initial deposit, a &quot;shipping company&quot;
              (actually the scammer) contacts you saying the puppy is at the airport but you need to pay for a special crate ($200), pet
              insurance ($350), or a climate-controlled van ($500). Each payment feels small compared to losing the puppy. Some victims have
              paid five or six additional fees before realizing the puppy doesn&apos;t exist. If you&apos;ve reached this point, stop payment
              immediately and file a report.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-500">→</span>
                <span><strong>BBB Scam Tracker</strong> — bbb.org/scamtracker — specifically tracks pet scams and fraudulent breeders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer protection and fraud pattern tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-500">→</span>
                <span><strong>PetScams.com</strong> — petscams.com — database of known fake pet seller websites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-500">→</span>
                <span><strong>The listing platform</strong> — report the ad on Facebook, Craigslist, or the fake website's hosting provider</span>
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
              <a href="/report-online-shopping-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Online Shopping Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-advance-fee-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Advance Fee Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-fraudulent-website" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Fraudulent Website</span>
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
