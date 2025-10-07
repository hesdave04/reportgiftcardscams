import ReportForm from './components/ReportForm';
import Stream from './components/Stream';
import XmlSidebar from './components/XmlSidebar';

export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.',
};

export default function HomePage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Gift Card Number Reporting
        </h1>
        <p className="mt-2 text-slate-600">
          Submit details of a gift card you shared and to whom. The public stream only shows the last 4 digits.
          Full numbers are encrypted and available via authenticated XML export for verified parties.
        </p>
      </header>

      {/* Form + XML sidebar */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <ReportForm />
          </div>
        </div>
        <XmlSidebar />
      </section>

      {/* Recent reports */}
      <section id="reports" className="mt-10">
        <h3 className="mb-3 text-lg font-semibold">Recent Reports</h3>
        <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-200">
          <Stream />
        </div>
      </section>

      <footer className="mt-10 text-xs text-slate-500">
        <p>
          Server endpoint: <code className="font-mono">/api/xml</code> — preferred auth header{' '}
          <code className="font-mono">x-api-key: YOUR_XML_API_KEY</code>.
        </p>
      </footer>
    </main>
  );
}
