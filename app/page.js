// app/page.jsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import ReportForm from './components/ReportForm';
import SiteHeader from './components/SiteHeader';
import HowItWorks from './components/HowItWorks';
import QuickBatch from './components/QuickBatch';

// Dynamically import Stream (CSR only) to avoid SSR + useSearchParams conflict
const Stream = dynamic(() => import('./components/Stream'), { ssr: false });

export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.',
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <SiteHeader />
      <HowItWorks />

      <section id="report-form" className="mt-8">
        <ReportForm />
      </section>

      <h3 className="mt-10 text-xl font-bold text-slate-900">Quick Batch Upload</h3>
      <div className="mt-3">
        <QuickBatch />
      </div>

      <h3 className="mt-10 text-xl font-bold text-slate-900">Recent Reports</h3>
      <div className="mt-3">
        <Suspense fallback={<div className="text-slate-500 text-sm">Loading stream…</div>}>
          <Stream />
        </Suspense>
      </div>
    </main>
  );
}
