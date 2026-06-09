import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Cryptocurrency Scam | Crypto Fraud — ScamComplaints",
  description: "Report cryptocurrency scams including Bitcoin fraud, fake crypto exchanges, rug pulls, and pump-and-dump schemes. File a free report to warn others.",
  keywords: "report crypto scam, cryptocurrency scam report, bitcoin scam, crypto fraud report, report bitcoin fraud, fake crypto exchange, crypto investment scam, rug pull report",
  openGraph: {
    title: "Report Cryptocurrency Scams & Bitcoin Fraud — ScamComplaints.org",
    description: "File a crypto scam report in minutes. Help expose fake exchanges, rug pulls, and fraudulent crypto investments.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-crypto-scam" },
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
      "@id": "https://scamcomplaints.org/report-crypto-scam/#webpage",
      "url": "https://scamcomplaints.org/report-crypto-scam",
      "name": "Report a Crypto Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-crypto-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-crypto-scam/#breadcrumb",
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
          "name": "Report Crypto Scam",
          "item": "https://scamcomplaints.org/report-crypto-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Crypto Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-amber-400">crypto scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Cryptocurrency scams stole $3.96 billion in 2023 alone — 86.7% of all investment fraud. From fake exchanges to rug pulls to pig butchering schemes, crypto's irreversible transactions make it the payment method of choice for scammers. If you've lost crypto to a scam, reporting it here creates a searchable record that helps investigators track wallets and warn others.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="crypto_scam"
              title="Quick crypto scam report"
              subtitle="Share the key details in under 2 minutes. Need to include wallet addresses or screenshots?"
              fields={[
          { name: "platform", label: "Where did the scam happen?", type: "select", required: true, options: [
            { value: "fake_exchange", label: "Fake exchange / trading platform" }, { value: "social_media", label: "Social media (Instagram, X, Telegram)" },
            { value: "dating_app", label: "Dating app / romance" }, { value: "defi", label: "DeFi protocol / rug pull" },
            { value: "nft", label: "NFT scam" }, { value: "mining", label: "Fake mining / staking" },
            { value: "whatsapp", label: "WhatsApp / Telegram group" }, { value: "other", label: "Other" },
          ]},
          { name: "walletAddress", label: "Scammer's wallet address", type: "text", placeholder: "0x... or bc1... (if you have it)" },
          { name: "websiteUrl", label: "Scam website URL", type: "text", placeholder: "e.g., fake-exchange.com" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "How were you introduced to this? What did they promise? How did they get you to send crypto?" },
          { name: "amountLost", label: "Amount lost (USD value)", type: "text", placeholder: "e.g., 15000", inputMode: "decimal", expandable: true },
          { name: "fakeName", label: "Name or alias they used", type: "text", expandable: true, placeholder: "e.g., CryptoKing, Sarah from Binance" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report a crypto scam?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Wallet addresses can be traced — blockchain analysis firms use reports to map criminal networks
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    The same scam platform often defrauds hundreds of victims before being shut down
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Your report helps the FBI IC3 and FTC build cases for international enforcement
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Other users can search for wallet addresses and platform names before investing
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">Crypto scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
                  <li>• Guaranteed returns — no legitimate investment can guarantee profits</li>
                  <li>• Pressure to invest quickly before you "miss out"</li>
                  <li>• Celebrity endorsements that seem too good to be true (often deepfakes)</li>
                  <li>• You can see profits on screen but can't withdraw</li>
                  <li>• Requires more deposits to "unlock" withdrawals</li>
                  <li>• Met through social media or dating app and steered to a "trading platform"</li>
                  <li>• Platform URL looks suspicious or was recently registered</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$3.96B</span>
                <p className="text-xs text-slate-500">lost to crypto fraud in 2023 (FBI)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">86.7%</span>
                <p className="text-xs text-slate-500">of investment scam losses involved cryptocurrency</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$2,000</span>
                <p className="text-xs text-slate-500">median individual loss (FTC crypto reports)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">12x</span>
                <p className="text-xs text-slate-500">growth in crypto fraud since 2020</p>
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
          <h2 className="text-2xl font-bold text-slate-900">How cryptocurrency scams work — and why they're growing so fast</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Cryptocurrency has become the preferred tool for online scammers, and the numbers prove it. The FBI reported $3.96 billion in crypto-related
              investment losses in 2023 — that&apos;s 86.7% of all investment fraud. The reason is simple: cryptocurrency transactions are irreversible,
              pseudo-anonymous, and cross borders instantly. Once you send Bitcoin or Ethereum to a scammer&apos;s wallet, there&apos;s no bank to call for a chargeback.
            </p>
            <p>
              The most common crypto scam in 2024 is the &quot;pig butchering&quot; scheme (sha zhu pan). It starts with a random text, a dating app match, or a
              LinkedIn connection. The scammer builds a relationship over weeks, then casually mentions their success with a &quot;trading platform.&quot; They
              walk you through creating an account, and your first small deposit appears to generate impressive returns on screen. But the platform is
              entirely fake — the charts, the account balance, the customer support chat are all controlled by the scammers. When you try to withdraw,
              you&apos;re told you need to pay &quot;taxes&quot; or &quot;fees&quot; first.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Types of crypto scams to watch for
            </h3>
            <p>
              <strong>Fake exchanges and trading platforms</strong> are the most financially devastating. They look professional with real-time charts and customer
              support, but no actual trading happens. <strong>Rug pulls</strong> occur when the creators of a new token or DeFi project drain all liquidity and
              disappear. <strong>Pump-and-dump schemes</strong> artificially inflate a token&apos;s price through coordinated buying and social media hype, then
              the organizers sell at the peak. <strong>Phishing attacks</strong> impersonate legitimate crypto services to steal wallet seed phrases. And
              <strong>celebrity endorsement scams</strong> use AI deepfakes of Elon Musk, MrBeast, or other public figures to promote fake giveaways.
            </p>
            <p>
              No matter the variant, the core playbook is the same: create urgency, manufacture trust, and exploit the irreversible nature of
              blockchain transactions. If anyone — a love interest, a friend of a friend, a &quot;financial advisor&quot; who contacted you first —
              directs you to a specific crypto platform and pressures you to invest, that is almost certainly a scam.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Can you recover stolen cryptocurrency?
            </h3>
            <p>
              Recovery is extremely difficult but not always impossible. Blockchain analysis firms like Chainalysis and CipherTrace can trace wallet
              movements, and law enforcement has successfully frozen funds in some cases. The FBI&apos;s IC3 Recovery Asset Team recovered $538 million
              in 2023, though that represents only 4.3% of total losses. Your best chance of recovery depends on acting fast: report to law
              enforcement immediately, contact your exchange if you transferred from one, and document every wallet address and transaction hash.
              Be extremely cautious of &quot;crypto recovery services&quot; that promise to get your money back — many of these are secondary scams
              targeting victims who are desperate to recover their losses.
            </p>
        
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for all crypto fraud — they have a dedicated crypto unit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer protection tracking and pattern analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>SEC</strong> — sec.gov/tcr — if the scam involved securities, tokens, or investment contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>Your crypto exchange</strong> — if you transferred from Coinbase, Kraken, etc. — they may be able to help trace funds</span>
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
              <a href="/report-investment-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Investment Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-pig-butchering-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Pig Butchering Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-crypto-wallet" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Crypto Wallet Scam</span>
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
