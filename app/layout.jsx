// app/layout.jsx
import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Gift Card Report',
  description: 'Report and search suspected gift card misuse.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-84G8T1JFMM"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // Your property
            gtag('config', 'G-84G8T1JFMM', {
              anonymize_ip: true,
              transport_type: 'beacon'
            });
          `}
        </Script>
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
