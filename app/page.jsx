import Image from 'next/image';
import ReportForm from './components/ReportForm';
import QuickBatch from './components/QuickBatch';
import Stream from './components/Stream';

export const metadata = {
  title: 'Report Gift Card Scams',
  description: 'Public Registry • Fraud Reporting • Enforcement Support',
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">

      {/* Hero with logo + tagline */}
      <section className="text-center">
        <div className="mx-auto inline-flex items-center justify-center">
          {/* Uses /public/logo.svg (large & readable) */}
          <Image
            src="/logo.svg"
            alt="ReportGiftCardScams"
            width={560}
            height={160}
            priority
            className="h-auto w-full max-w-[560px]"
          />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Report Gift Card Numbers Used in Scams
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">
          Help expose fraud patterns and protect future victims. Public stream shows only the last 4 digits.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="#report-form"
            className="inline-block rounded-lg bg-[#0B2340] px-6 py-3 font-semibold text-white shadow hover:bg-slate-900"
          >
            Report a Gift Card
          </a>
          <a
            href="/xml"
            className="inline-block rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Download Data (XML)
          </a>
        </div>
      </section>

      {/* How this works (exact copy adapted to JSX) */}
      <section className="bg-slate-50 py-16 mt-10 rounded-xl">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How Reporting Gift Card Scams Works</h2>
          <p className="text-lg text-slate-600 mb-12">
            Your reports help expose fraud, protect victims, and support enforcement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">1. Report a Gift Card</h3>
              <p className="text-slate-600 text-sm">
                Submit card details and info on the person you interacted with. Keep it factual, no sensitive personal data.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">2. We Record &amp; Verify</h3>
              <p className="text-slate-600 text-sm">
                Reports are logged, anonymized, and checked for fraud patterns. Duplicate reports are consolidated.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">3. Scam Networks Exposed</h3>
              <p className="text-slate-600 text-sm">
                Connections between fake personas and fraudulent cards are revealed, aiding law enforcement and issuers.
              </p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">4. Protect Future Victims</h3>
              <p className="text-slate-600 text-sm">
                Each report strengthens the registry, helping stop repeat offenders and preventing future losses.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="#report-form"
              className="inline-block px-8 py-3 bg-[#D62828] text-white font-bold rounded-lg shadow hover:bg-red-700 transition"
            >
              Report a Gift Card Now
            </a>
            <p className="text-sm text-slate-500 mt-2">Takes less than 2 minutes. Help protect others.</p>
          </div>
        </div>
      </section>

      {/* Report form (single entry) */}
      <section id="report-form" className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Submit a Gift Card</h2>
        <p className="mt-1 text-sm text-slate-600">
          Only the last 4 digits are displayed publicly. Full numbers are protected and used for verification purposes.
        </p>
        <div className="mt-4">
          <ReportForm />
        </div>
      </section>

      {/* Batch mode (paste many) */}
      <QuickBatch />

      {/* Recent stream */}
      <section className="mt-10">
        <h3 className="text-lg font-semibold text-slate-900">Recent Reports</h3>
        <p className="mb-3 text-sm text-slate-600">
          Public stream shows only the last 4 digits and summary details.
        </p>
        <Stream />
      </section>
    </main>
  );
}
