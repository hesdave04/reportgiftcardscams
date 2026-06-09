import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  metadataBase: new URL("https://scamcomplaints.org"),
  title: {
    default: "ScamComplaints — Report Scams & Fraud",
    template: "%s — ScamComplaints",
  },
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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
