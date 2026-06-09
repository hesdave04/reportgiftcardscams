import ReportCryptoWalletClient from "./ReportCryptoWalletClient";

export const metadata = {
  title:
    "Report a Crypto Wallet Address | Bitcoin Scam & Fraud Database — ScamComplaints",
  description:
    "Report fraudulent cryptocurrency wallet addresses, Bitcoin scam wallets, and fake investment platforms. Track stolen funds and help investigators trace crypto fraud.",
  keywords:
    "report bitcoin wallet address, report crypto scam, crypto fraud report, report scam wallet address, bitcoin scam database, report cryptocurrency fraud, ethereum scam wallet, report crypto investment scam, stolen bitcoin report",
  openGraph: {
    title:
      "Report Fraudulent Crypto Wallet Addresses — ScamComplaints.org",
    description:
      "Submit scam crypto wallets and fake investment domains. Your report helps trace stolen funds and protect other investors.",
    siteName: "ScamComplaints",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-orange-300 backdrop-blur">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Crypto Fraud Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a fraudulent
            <br />
            <span className="text-orange-400">crypto wallet address.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Cryptocurrency transactions are irreversible by design, but they're
            not invisible. When you report a scam wallet address—whether
            Bitcoin, Ethereum, USDT, or any other chain—you help blockchain
            analysts trace stolen funds and flag addresses before the next
            victim sends money.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <ReportCryptoWalletClient />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Why report a wallet address?
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Exchanges can freeze funds when flagged addresses deposit
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Blockchain analytics firms use reports to map fraud networks
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Law enforcement can subpoena exchange records tied to the
                    address
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">→</span>
                    Other users can check addresses before sending money
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                <h3 className="text-sm font-semibold text-orange-900">
                  Common crypto scam types
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-orange-800">
                  <li>• "Guaranteed returns" investment platforms</li>
                  <li>• Romance scams requesting Bitcoin or USDT</li>
                  <li>• Rug-pull tokens and fake DeFi projects</li>
                  <li>• Impersonation of Coinbase / Binance support</li>
                  <li>• Bitcoin ATM scams ("pay your taxes in crypto")</li>
                  <li>• Pig butchering / crypto trading chat groups</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Supported blockchains
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    "Bitcoin (BTC)",
                    "Ethereum (ETH)",
                    "Tether (USDT)",
                    "USDC",
                    "BNB Chain",
                    "Solana",
                    "TRON (TRX)",
                    "Litecoin",
                    "Dogecoin",
                    "XRP",
                    "Other",
                  ].map((chain) => (
                    <span
                      key={chain}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {chain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            How reporting crypto scam wallets actually helps
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              When someone convinces you to send Bitcoin to a wallet address
              they control, there's no bank to call and no chargeback to file.
              That's the pitch scammers rely on: the idea that stolen crypto is
              gone forever. But blockchain transactions are permanently recorded,
              and the addresses involved leave a trail that doesn't fade. The
              problem isn't that the information disappears—it's that nobody
              connects the dots until multiple victims come forward.
            </p>
            <p>
              That's what this database exists to solve. Each wallet address you
              report gets cross-referenced against other submissions. When three
              different people in three different states all name the same
              Bitcoin wallet as the destination for a "guaranteed trading
              platform" investment, investigators suddenly have a pattern instead
              of isolated incidents. Blockchain analysis firms like Chainalysis
              and Elliptic monitor databases like this one. Exchanges use
              flagged addresses to trigger enhanced due diligence when funds
              arrive, sometimes freezing them before the scammer can cash out.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              What makes crypto scams so effective
            </h3>
            <p>
              The most common crypto fraud right now isn't some sophisticated
              DeFi exploit or smart contract hack. It's social engineering,
              plain and simple. Someone reaches out on Instagram, WhatsApp,
              Telegram, or a dating app. They build trust over days or weeks,
              then introduce the idea of investing together in crypto. They'll
              walk you through downloading a legitimate exchange app and making
              your first deposit, then direct you to move the funds to a
              platform they control. The returns look incredible on screen
              because the numbers are fake—fabricated by a website the scammer
              set up last month.
            </p>
            <p>
              By the time you try to withdraw, the excuses start: there's a tax
              you need to pay first, or a verification fee, or the minimum
              withdrawal amount just went up. Every additional "fee" is another
              payment to the scammer. This pattern is called pig butchering, and
              it accounts for billions of dollars in losses globally every year.
              If this sounds familiar, report the wallet addresses involved. If
              the scammer directed you to a specific website or app, include
              that domain too.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              Tips for documenting crypto fraud
            </h3>
            <p>
              Copy the full wallet address exactly as it appears—don't try to
              retype it manually, because one wrong character means a completely
              different address. If you sent funds from an exchange like
              Coinbase, Binance, or Cash App, your transaction history will show
              the destination wallet. Note which blockchain the transaction
              used (Bitcoin, Ethereum, Tron, etc.) since wallet addresses look
              different on each network. If the scammer communicated through a
              specific app or website, include those details in the description
              field. For a more thorough report with screenshots and chat
              logs, use our{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                full report builder
              </a>
              .
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Additional places to report cryptocurrency fraud
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Every report filed increases pressure on the networks behind these
              scams. File in multiple places when possible:
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span>
                  <strong>FBI IC3</strong> — ic3.gov (for losses over $1,000)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span>
                  <strong>FTC</strong> — reportfraud.ftc.gov
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span>
                  <strong>CFTC</strong> — cftc.gov/complaint (for trading scams)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-orange-500">→</span>
                <span>
                  <strong>Your exchange</strong> — file a fraud report directly
                  with Coinbase, Binance, etc.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
