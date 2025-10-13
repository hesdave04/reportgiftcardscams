// app/layout.jsx
import './globals.css';
import SiteHeader from './components/SiteHeader';

export const metadata = {
  title: 'ReportGiftCardScams',
  description:
    'Public registry for reporting gift card scams. Help expose fraud, protect victims, and support enforcement.',
};

// Keep routes dynamic by default so we don’t hit static export pitfalls
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
