import ReportForm from './components/ReportForm';
import Stream from './components/Stream';

export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.',
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* HOW THIS WORKS — exact copy, Tailwind classes preserved */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">How Reporting Gift Card Scams Works</h2>
          <p className="text-lg text-slate-600 mb-12">Your reports help expose fraud, protect victims, and support enforcement.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">📝</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">1. Report a Gift Card</h3>
              <p className="text-slate-600 text-sm">Submit card details and info on the person you interacted with. Keep it factual, no sensitive personal data.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">2. We Record & Verify</h3>
              <p className="text-slate-600 text-sm">Reports are logged, anonymized, and checked for fraud patterns. Duplicate reports are consolidated.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">3. Scam Networks Exposed</h3>
              <p className="text-slate-600 text-sm">Connections between fake personas and fraudulent cards are revealed, aiding law enforcement and issuers.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#0B2340] flex items-center justify-center mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">4. Protect Future Victims</h3>
              <p className="text-slate-600 text-sm">Each report strengthens the registry, helping stop repeat offenders and preventing future losses.</p>
            </div>
          </div>

          <div className="mt-12">
            <a href="#report-form" className="inline-block px-8 py-3 bg-[#D62828] text-white font-bold rounded-lg shadow hover:bg-red-700 transition">
              Report a Gift Card Now
            </a>
            <p className="text-sm text-slate-500 mt-2">Takes less than 2 minutes. Help protect others.</p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="report-form" className="scroll-mt-24">
        <h1 className="sr-only">Gift Card Number Reporting</h1>
        <ReportForm />
      </section>

      {/* STREAM */}
      <section className="mt-10">
        <h3 className="mb-3 text-lg font-semibold">Recent Reports</h3>
        <Stream />
      </section>
    </main>
  );
}
