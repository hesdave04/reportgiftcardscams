import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Pig Butchering Scam | Sha Zhu Pan Fraud — ScamComplaints",
  description: "Report pig butchering scams — cryptocurrency romance-investment fraud. Were you groomed into a fake trading platform? File a report to help trace stolen funds.",
  keywords: "report pig butchering scam, sha zhu pan, crypto romance scam, fake trading platform, pig butchering report, investment romance scam, crypto scam report",
  openGraph: {
    title: "Report Pig Butchering Scams — ScamComplaints.org",
    description: "Tricked into a fake crypto trading platform by someone you met online? Report the scam and help investigators.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-pig-butchering-scam" },
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Pig Butchering Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-amber-400">pig butchering scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Pig butchering — known as "sha zhu pan" in Chinese — is a long-con investment scam where fraudsters build a relationship with you over weeks or months, then lure you into depositing money on a fake cryptocurrency trading platform. The "returns" look incredible on screen because the numbers are fabricated. When you try to withdraw, the trap snaps shut. If this happened to you, every detail you share here helps trace the wallets, domains, and networks behind these operations.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="pig_butchering_scam"
              title="Quick pig butchering report"
              subtitle="Report the platform, wallet, and person involved. Have transaction hashes?"
              fields={[
          { name: "platform", label: "Where did they first contact you?", type: "select", required: true, options: [
            { value: "whatsapp", label: "WhatsApp" }, { value: "telegram", label: "Telegram" },
            { value: "linkedin", label: "LinkedIn" }, { value: "instagram", label: "Instagram" },
            { value: "facebook", label: "Facebook" }, { value: "tinder", label: "Tinder / dating app" },
            { value: "text_sms", label: "Text / SMS (wrong number)" }, { value: "twitter", label: "X / Twitter" },
            { value: "other", label: "Other" },
          ]},
          { name: "tradingPlatform", label: "Fake trading platform URL or name", type: "text", required: true, placeholder: "e.g., cryptotradefx.com or the app name" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "How did they introduce the investment idea? How long before you deposited? What happened when you tried to withdraw?" },
          { name: "walletAddress", label: "Wallet address you sent crypto to", type: "text", expandable: true, placeholder: "Paste the full address", mono: true },
          { name: "amountLost", label: "Total amount deposited / lost", type: "text", expandable: true, placeholder: "e.g., 50000", inputMode: "decimal" },
          { name: "fakeName", label: "Name the person used", type: "text", expandable: true, placeholder: "The name they gave you" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report pig butchering?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Wallet addresses you report can be flagged on exchanges before more victims deposit
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Fake trading platform domains can be taken down faster with multiple reports
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    FBI and Secret Service actively investigate pig butchering networks
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">→</span>
                    Many workers inside these scam compounds are trafficking victims themselves — reports help rescue efforts
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">Pig butchering red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
                  <li>• Stranger contacts you on WhatsApp, Telegram, or LinkedIn with a "wrong number"</li>
                  <li>• Conversation slowly shifts to investing and crypto</li>
                  <li>• They show screenshots of their own "incredible returns"</li>
                  <li>• You're guided to a professional-looking trading platform or app</li>
                  <li>• Small initial deposits show quick, impressive profits</li>
                  <li>• When you try to withdraw: taxes, fees, or "verification" payments required</li>
                  <li>• Platform has no verifiable company registration or regulatory license</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Pig butchering statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$3.96B</span>
                <p className="text-xs text-slate-500">lost to investment fraud in 2023 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$10B+</span>
                <p className="text-xs text-slate-500">estimated global annual losses</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$177K</span>
                <p className="text-xs text-slate-500">average individual loss (some victims lose $1M+)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">costliest fraud type tracked by the FBI</p>
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
          <h2 className="text-2xl font-bold text-slate-900">What is pig butchering and why is it the world's most expensive scam?</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Pig butchering is a hybrid of romance fraud and investment scam,
              and it has become the single most costly form of consumer fraud
              globally. The FBI's Internet Crime Complaint Center attributed
              $3.96 billion in reported losses to investment fraud in 2023 — the
              majority driven by pig butchering operations. The name comes from
              the Chinese term "sha zhu pan" (杀猪盘), which refers to
              fattening a pig before slaughter. The "pig" is the victim, the
              "fattening" is the weeks of relationship-building, and the
              "slaughter" is draining their savings.
            </p>
            <p>
              The scam typically begins with an innocent-seeming message on
              WhatsApp, Telegram, LinkedIn, or a dating app — often a "wrong
              number" text. The scammer is patient, spending weeks building a
              friendship or romantic connection before casually mentioning that
              they've been making money trading cryptocurrency. They'll show
              you screenshots of their "returns" and encourage you to try it
              with a small amount. You're guided to a website or app that looks
              entirely legitimate — professional charts, real-time price feeds,
              and a sleek interface.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How the fake platforms work
            </h3>
            <p>
              The trading platform is completely fabricated. The charts are
              real (pulled from actual crypto markets), but the trades and
              returns are simulated on a backend the scammer controls. Your
              initial deposit of $500 quickly "grows" to $800 — and you can
              even withdraw that first small amount to build trust. This is the
              hook. Victims then deposit $5,000, then $20,000, then $50,000,
              watching their balance climb on screen. Some victims take out
              loans, liquidate retirement accounts, or borrow from family.
            </p>
            <p>
              When you try to withdraw a significant amount, the platform
              suddenly requires a "tax payment" of 20–30% of your balance
              before releasing funds. If you pay it, another fee appears:
              a "security deposit" or "anti-money-laundering verification."
              Each new fee is calibrated to seem small relative to the huge
              balance you believe is waiting. In reality, every dollar you send
              goes directly to the fraud operation. The platform can vanish
              overnight when the operators decide they've extracted the maximum.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The human trafficking connection
            </h3>
            <p>
              Many of the people operating the keyboards in pig butchering
              scam compounds are themselves victims of human trafficking. Large
              operations based in Myanmar, Cambodia, Laos, and the Philippines
              recruit workers with fake job listings, confiscate their
              passports, and force them to run scams under threat of violence.
              This is why reporting matters beyond recovering your own funds —
              intelligence gathered from victim reports has led to
              international law enforcement raids that have rescued thousands
              of trafficking victims. The wallet addresses, platform URLs,
              phone numbers, and messaging accounts you report feed directly
              into these investigations.
            </p>
            <p>
              If you suspect you're being set up for a pig butchering scam —
              especially if someone you met online is encouraging you to invest
              in crypto through a specific platform — stop and{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                document everything
              </a>{" "}
              before sending any money. No legitimate investment opportunity
              comes through a romantic interest on WhatsApp.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report pig butchering scams</h3>
            <p className="mt-2 text-sm text-slate-600">File with all of these — each plays a different role in the investigation chain:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — the primary federal intake point for investment fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>Secret Service</strong> — secretservice.gov — actively investigating pig butchering networks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — federal consumer protection database</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500">→</span>
                <span><strong>Your crypto exchange</strong> — report the receiving wallet address to Coinbase, Binance, Kraken, etc.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
