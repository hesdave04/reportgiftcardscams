import ApiDocsClient from "./ApiDocsClient";

export const metadata = {
  title: "API Documentation — ScamComplaints.org",
  description:
    "Free API to search and contribute to the world's largest open scam database. Check wallets, emails, and phone numbers against 250,000+ scam reports.",
  alternates: { canonical: "/api-docs" },
};

export default function ApiDocsPage() {
  return <ApiDocsClient />;
}
