import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import RecaptchaProvider from "@/app/providers/RecaptchaProvider";

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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚨</text></svg>" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        <RecaptchaProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </RecaptchaProvider>
      </body>
    </html>
  );
}
