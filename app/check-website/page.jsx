import CheckWebsiteClient from "./CheckWebsiteClient";

export const metadata = {
  title: "Website Safety Checker — Is This Website a Scam? | ScamComplaints",
  description:
    "Free website trust score checker. Analyze any website for scam signals — domain age, SSL, blacklists, content trust signals, and our scam reports database. Check before you buy.",
  keywords:
    "website checker, is this website safe, scam website checker, website trust score, check website legitimacy, website safety check, is this site legit",
  openGraph: {
    title: "Website Safety Checker — Is This Website a Scam?",
    description:
      "Free website trust score checker. Analyze any domain for scam signals across 5 categories.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/check-website" },
};

export default function CheckWebsitePage() {
  return <CheckWebsiteClient />;
}
