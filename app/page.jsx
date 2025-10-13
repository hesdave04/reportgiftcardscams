// app/page.jsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import dynamicImport from 'next/dynamic';

import ReportForm from './components/ReportForm';
import QuickBatch from './components/QuickBatch';

// Load RecentReports only on the client
const RecentReports = dynamicImport(() => import('./components/RecentReports'), {
  ssr: false,
  loading: () => <div className="text-slate-500 text-sm">Loading stream…</div>,
});

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Header/nav is provided by app/layout.jsx, so nothing here */}

      <section id="report-form" className="mt-2">
        <ReportForm />
      </section>

      <h3 className="mt-10 text-xl font-bold text-slate-900">Quick Batch Upload</h3>
      <div className="mt-3">
        <QuickBatch />
      </div>

      <h3 className="mt-10 text-xl font-bold text-slate-900">Recent Reports</h3>
      <div className="mt-3">
        <Suspense fallback={<div className="text-slate-500 text-sm">Loading stream…</div>}>
          <RecentReports />
        </Suspense>
      </div>
    </main>
  );
}
