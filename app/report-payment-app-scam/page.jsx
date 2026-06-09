import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Zelle, Cash App & Venmo Scams | Payment App Fraud — ScamComplaints",
  description: "Report Zelle scams, Cash App fraud, and Venmo scams. Payment app transactions are nearly impossible to reverse. File a report now.",
  keywords: "report Zelle scam, Cash App scam, Venmo fraud, payment app scam, Zelle fraud report, Cash App fraud report, report Venmo scam, P2P payment scam",
  openGraph: {
    title: "Report Zelle, Cash App & Venmo Scams — ScamComplaints.org",
    description: "File a report about payment app fraud. Zelle, Cash App, and Venmo scams are surging.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-payment-app-scam" },
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Payment App Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-indigo-400">Zelle, Cash App, or Venmo scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Payment apps were designed to send money to people you trust — not strangers. Scammers know that Zelle, Cash App, and Venmo transfers are nearly instant and almost impossible to reverse, making them the perfect tool for fraud. Whether it was a fake marketplace sale, a phishing text, or an impersonation call, report it here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="payment_app_scam"
              title="Quick payment app scam report"
              subtitle="Document the transaction. This helps track serial scammers across platforms."
              fields={[
          { name: "platform", label: "Payment app used", type: "select", required: true, options: [
            { value: "zelle", label: "Zelle" }, { value: "cashapp", label: "Cash App" },
            { value: "venmo", label: "Venmo" }, { value: "paypal", label: "PayPal Friends & Family" },
            { value: "apple_pay", label: "Apple Pay" }, { value: "google_pay", label: "Google Pay" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "What were you paying for? How did the scammer convince you to send money? What happened after you sent it?" },
          { name: "fakeName", label: "Scammer's name or username on the app", type: "text", placeholder: "e.g., $CashTag or Zelle name" },
          { name: "amountLost", label: "Amount sent", type: "text", placeholder: "e.g., 800", inputMode: "decimal", expandable: true },
          { name: "phoneNumber", label: "Phone/email used on the payment app", type: "text", expandable: true, placeholder: "Their phone or email on the app" },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report payment app scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Banks are increasingly being held accountable for Zelle fraud — your report builds the case
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Cash App and Venmo use reports to ban scam accounts and flag stolen funds
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    The CFPB is investigating payment app fraud protections — reports support regulation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-500">→</span>
                    Other victims can search for the scammer's Cash Tag or Zelle name before paying
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
                <h3 className="text-sm font-semibold text-indigo-900">Payment app scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-indigo-800">
                  <li>• Seller insists on Zelle, Cash App, or Venmo instead of PayPal Goods & Services</li>
                  <li>• "Accidental" overpayment — asks you to send back the difference</li>
                  <li>• Text claiming to be from Zelle/Cash App asking you to "verify" a transaction</li>
                  <li>• Must pay upfront before receiving goods or services</li>
                  <li>• Buyer sends a payment and claims the app "requires" you to upgrade your account</li>
                  <li>• Friend or family "emergency" requesting money via app</li>
                  <li>• Marketplace deal that seems too good to be true</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$440M+</span>
                <p className="text-xs text-slate-500">lost to payment app scams in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">86%</span>
                <p className="text-xs text-slate-500">of Zelle fraud victims report the bank refused a refund</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">preferred payment method for marketplace scams</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">10 sec</span>
                <p className="text-xs text-slate-500">average time for a Zelle transfer to be irreversible</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How payment app scams work — and why banks won't help</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Payment app scams have exploded as Zelle, Cash App, and Venmo have become ubiquitous. These peer-to-peer (P2P) payment platforms
              were designed for sending money to people you already know and trust — your roommate for rent, a friend for dinner. They were never
              designed for transactions with strangers, yet that&apos;s exactly how millions of people use them. The problem: transfers are nearly
              instant and, in most cases, completely irreversible.
            </p>
            <p>
              The most common scam involves <strong>marketplace fraud</strong>. You find an item on Facebook Marketplace, OfferUp, or Craigslist.
              The seller asks for Zelle or Cash App payment. You send the money. The seller disappears. Your bank says the transfer was
              &quot;authorized&quot; because you initiated it, so no refund. This distinction between &quot;authorized&quot; and
              &quot;unauthorized&quot; transactions is the loophole banks use to deny reimbursement — even when you were clearly defrauded.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The Zelle &quot;overpayment&quot; scam
            </h3>
            <p>
              A buyer sends you a payment that appears to be more than agreed upon. You receive a text that looks like it&apos;s from Zelle saying
              the buyer has a &quot;business account&quot; and you need to upgrade yours by sending money. It&apos;s all fake — the original
              &quot;payment&quot; was never real, and the money you &quot;return&quot; goes straight to the scammer. Zelle and your bank will never
              ask you to send money to receive money.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              What to do if you&apos;ve been scammed
            </h3>
            <p>
              Contact your bank immediately and dispute the transaction — even though success rates are low, new CFPB guidance is pushing banks
              to cover more fraud scenarios. File reports here and with the FTC. Contact the payment app directly to report the scammer&apos;s account.
              For Cash App, go to the transaction and tap &quot;Report&quot;; for Zelle, contact your bank&apos;s fraud department; for Venmo, use the
              in-app support. Going forward, only use P2P apps to send money to people you know personally. For purchases from strangers, use
              PayPal Goods &amp; Services or a credit card, which offer buyer protection.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>Your bank</strong> — dispute the transaction — even if denied, it creates a paper trail</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>CFPB</strong> — consumerfinance.gov/complaint — the Consumer Financial Protection Bureau investigates payment app fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer fraud tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-indigo-500">→</span>
                <span><strong>The payment app</strong> — report the scammer's account directly in Cash App, Zelle, or Venmo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
