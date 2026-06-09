import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Facebook Marketplace Scam | Buyer & Seller Fraud — ScamComplaints",
  description: "Report Facebook Marketplace scams — fake listings, no-show sellers, counterfeit items, payment fraud, and phishing. Protect other buyers and sellers.",
  keywords: "report Facebook Marketplace scam, Facebook Marketplace fraud, fake Facebook listing, Facebook seller scam, Facebook buyer scam, Marketplace scam report, Facebook phishing",
  openGraph: {
    title: "Report Facebook Marketplace Scams — ScamComplaints.org",
    description: "Scammed on Facebook Marketplace? Report fake listings, no-show sellers, and payment fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-facebook-marketplace-scam" },
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
      "@id": "https://scamcomplaints.org/report-facebook-marketplace-scam/#webpage",
      "url": "https://scamcomplaints.org/report-facebook-marketplace-scam",
      "name": "Report a Facebook Marketplace Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-facebook-marketplace-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-facebook-marketplace-scam/#breadcrumb",
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
          "name": "Report Facebook Marketplace Scam",
          "item": "https://scamcomplaints.org/report-facebook-marketplace-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Facebook Marketplace Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-indigo-400">Facebook Marketplace scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Facebook Marketplace handles billions of dollars in transactions with minimal buyer protection. No-show sellers, counterfeit goods, fake listings for apartments and vehicles, Zelle payment fraud, and phishing links disguised as shipping confirmations are rampant. When you report a Marketplace scam here, the seller's profile, listing details, and payment method get logged in a searchable database that helps others check before they buy.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="facebook_marketplace_scam"
              title="Quick Marketplace scam report"
              subtitle="Report the fake listing or seller in under 2 minutes. Have screenshots?"
              fields={[
          { name: "scamCategory", label: "What type of scam?", type: "select", required: true, options: [
            { value: "fake_listing", label: "Fake listing — item doesn't exist" },
            { value: "no_delivery", label: "Paid but never received item" },
            { value: "counterfeit", label: "Received counterfeit / wrong item" },
            { value: "rental", label: "Fake rental listing" },
            { value: "vehicle", label: "Vehicle scam" },
            { value: "phishing", label: "Phishing link (fake payment / shipping page)" },
            { value: "overpayment", label: "Overpayment / fake check (seller side)" },
            { value: "other", label: "Other" },
          ]},
          { name: "sellerProfile", label: "Seller's Facebook profile URL", type: "text", placeholder: "e.g., facebook.com/john.doe.12345" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the listing, what was promised, what actually happened, and how you paid." },
          { name: "amountLost", label: "Amount lost", type: "text", expandable: true, placeholder: "e.g., 350", inputMode: "decimal" },
          { name: "paymentMethod", label: "How did you pay?", type: "select", expandable: true, placeholder: "Payment method", options: [
            { value: "zelle", label: "Zelle" }, { value: "venmo", label: "Venmo" },
            { value: "cashapp", label: "Cash App" }, { value: "paypal_ff", label: "PayPal (Friends & Family)" },
            { value: "cash", label: "Cash (in person)" }, { value: "fb_checkout", label: "Facebook Checkout" },
            { value: "gift_card", label: "Gift card" }, { value: "other", label: "Other" },
          ]},
          { name: "itemDescription", label: "What was the listing for?", type: "text", expandable: true, placeholder: "e.g., iPhone 15, apartment rental, Toyota Camry" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report Marketplace scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Others can search for the seller's profile or listing before buying
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Patterns help Facebook improve fraud detection on Marketplace
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Law enforcement tracks serial scammers operating across cities
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Your report may link to the same seller scamming in other states
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
                <h3 className="text-sm font-semibold text-indigo-900">Marketplace scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-indigo-800">
                  <li>• Price is significantly below market value</li>
                  <li>• Seller insists on payment via Zelle, Venmo, or crypto before meeting</li>
                  <li>• Listing uses stock photos instead of real photos of the item</li>
                  <li>• Seller wants to move the conversation off Facebook</li>
                  <li>• "Shipping available" on items that should be local pickup</li>
                  <li>• Rental listing asks for deposit before you can see the property</li>
                  <li>• Vehicle listing says seller is out of town but will ship it</li>
                  <li>• Buyer sends a check for more than the asking price and wants change back</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Marketplace scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$1B+</span>
                <p className="text-xs text-slate-500">estimated annual losses on social media marketplace scams</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">1 in 6</span>
                <p className="text-xs text-slate-500">online purchase scams happen on Facebook</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$100</span>
                <p className="text-xs text-slate-500">median loss per Marketplace scam (many are much higher)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">Zelle</span>
                <p className="text-xs text-slate-500">most common payment method demanded by Marketplace scammers</p>
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
          <h2 className="text-2xl font-bold text-slate-900">Facebook Marketplace fraud: why it's so common and how to protect yourself</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Facebook Marketplace has become one of the largest peer-to-peer
              selling platforms in the world, processing an estimated $100
              billion in transactions annually. But unlike eBay or Amazon,
              Marketplace offers almost no built-in buyer protection for most
              transactions. There's no escrow. No dispute resolution for local
              pickup deals. No way to get your money back when you Zelle $400
              for a PS5 that doesn't exist. That gap between trust and
              infrastructure is where scammers thrive.
            </p>
            <p>
              The most common scam is deceptively simple: a listing for a
              popular item at an attractive (but not suspiciously low) price.
              The seller asks for payment via Zelle, Venmo, or Cash App before
              meeting. Once the money is sent, they disappear — blocking you,
              deleting the listing, or simply never responding. Because Zelle
              and Venmo treat these as authorized transactions between
              individuals, your bank typically won't reverse them.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Rental and vehicle scams
            </h3>
            <p>
              The most expensive Marketplace scams involve rentals and vehicles.
              Fake rental listings use photos stolen from real Zillow or
              Apartments.com postings and list the property at an
              below-market price. The "landlord" asks for a deposit and first
              month's rent via wire transfer before you can see the unit — then
              vanishes. Vehicle scams follow a similar pattern: the seller
              claims to be relocating and offers to ship the car with a money-back
              guarantee through a fake escrow service. Victims have lost
              $5,000 to $15,000 on vehicle scams that exist only as stolen
              photos and made-up stories.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to buy safely on Facebook Marketplace
            </h3>
            <p>
              Always meet in person for local transactions — preferably at a
              police station or other public location with cameras. Never pay
              with Zelle, Venmo, Cash App, gift cards, wire transfer, or
              crypto before receiving the item. Use Facebook Checkout (with
              buyer protection) when available. For rentals, always visit the
              property in person before sending any money. For vehicles, insist
              on a test drive and independent inspection. And check the
              seller's profile: a brand-new account with no friends, no
              history, and multiple listings at suspiciously low prices is a
              scam.
            </p>
            <p>
              If you've already been scammed, report the seller's profile to
              Facebook directly, then{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                file a full report here
              </a>{" "}
              with every detail — the profile URL, screenshots of the listing
              and conversation, and any payment receipts.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report Facebook Marketplace scams</h3>
            <p className="mt-2 text-sm text-slate-600">Report to Facebook and to these agencies:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>Facebook</strong> — Use the Report button on the listing and the seller's profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — especially for losses over $100</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>Your bank</strong> — File a fraud claim — some banks will reverse Zelle transactions if fraud is documented</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>Local police</strong> — File a report — especially important for in-person meetup scams</span>
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
              <a href="/report-payment-app-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Payment App Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-car-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Car Scam</span>
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
