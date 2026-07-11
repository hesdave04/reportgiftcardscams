import "./globals.css";
import Script from "next/script";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import RecaptchaProvider from "@/app/providers/RecaptchaProvider";
import AuthProvider from "@/app/providers/AuthProvider";

const GA_ID = "G-4RDYHX774R";

export const metadata = {
  metadataBase: new URL("https://scamcomplaints.org"),
  title: "ScamComplaints — Report Scams & Fraud",
  description:
    "Report scams and fraud incidents quickly and clearly. Your reports help protect others and support law enforcement investigations.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ScamComplaints — Report Scams & Fraud",
    description:
      "Report scams and fraud incidents quickly and clearly. Your reports help protect others and support law enforcement investigations.",
    siteName: "ScamComplaints",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://scamcomplaints.org/#org",
      name: "ScamComplaints.org",
      url: "https://scamcomplaints.org",
      description:
        "A free public service helping victims report scams, expose fraud, and support investigations.",
      founder: {
        "@type": "Organization",
        name: "Social Catfish",
        url: "https://socialcatfish.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://scamcomplaints.org/#website",
      url: "https://scamcomplaints.org",
      name: "ScamComplaints",
      publisher: { "@id": "https://scamcomplaints.org/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://scamcomplaints.org/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="hQb_qL8w-vgTT53NxNCbyL2advT48_DIh6xvoQ8HNmE" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚨</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <AuthProvider>
          <RecaptchaProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </RecaptchaProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
