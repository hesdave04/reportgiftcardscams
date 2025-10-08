import './globals.css';
import RecaptchaProvider from './providers/RecaptchaProvider';
import SiteHeader from './components/SiteHeader';

export const metadata = {
  title: 'Report Gift Card Scams',
  description: 'Public Registry • Fraud Reporting • Enforcement Support',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="min-h-full">
        <RecaptchaProvider>
          <div className="bg-slate-900 text-center text-xs text-white py-2">
            Made by{' '}
            <a
              className="underline font-semibold"
              href="https://socialcatfish.com"
              target="_blank"
              rel="noreferrer"
            >
              SocialCatfish.com
            </a>{' '}
            with ❤️
          </div>

          <SiteHeader />

          <main className="max-w-6xl mx-auto px-4 py-10">
            {children}
          </main>
        </RecaptchaProvider>
      </body>
    </html>
  );
}
