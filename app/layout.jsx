import "./globals.css";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "ScamComplaints — Report Scams & Fraud",
  description:
    "Report scams and fraud incidents quickly and clearly. Your reports help protect others and support law enforcement investigations.",
  openGraph: {
    title: "ScamComplaints — Report Scams & Fraud",
    description:
      "Report scams and fraud incidents quickly and clearly. Your reports help protect others and support law enforcement investigations.",
    siteName: "ScamComplaints",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
