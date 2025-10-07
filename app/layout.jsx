import './globals.css';
import SiteHeader from './components/SiteHeader';
import AnnouncementBar from './components/AnnouncementBar';

export const metadata = {
  title: 'Report Gift Card Scams',
  description: 'Report and search suspected gift card misuse.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="flex min-h-full flex-col text-slate-900 antialiased">
        {/* Top banner */}
        <AnnouncementBar />

        {/* Sticky main header */}
        <SiteHeader />

        {/* Page content */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Report Gift Card Scams
          </div>
        </footer>
      </body>
    </html>
  );
}
