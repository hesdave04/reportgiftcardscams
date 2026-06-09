// app/sitemap.js — Auto-generated sitemap for scamcomplaints.org
const BASE = "https://scamcomplaints.org";

export default function sitemap() {
  const now = new Date().toISOString();

  // Core pages
  const core = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/case-builder", priority: 0.9, changeFrequency: "weekly" },
    { path: "/wall-of-shame", priority: 0.8, changeFrequency: "daily" },
    { path: "/search", priority: 0.8, changeFrequency: "daily" },
    { path: "/leaderboard", priority: 0.8, changeFrequency: "daily" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/trust", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/xml", priority: 0.3, changeFrequency: "monthly" },
    { path: "/api-docs", priority: 0.6, changeFrequency: "monthly" },
  ];

  // Pillar pages
  const pillar = [
    { path: "/scams", priority: 0.9, changeFrequency: "weekly" },
    { path: "/scam-websites", priority: 0.8, changeFrequency: "daily" },
  ];

  // All scam type report pages
  const scamPages = [
    // Original 3
    "/report-crypto-wallet",
    "/report-fake-social-media",
    "/report-fraudulent-website",
    // Generated batch 0 — 10 pages
    "/report-romance-scam",
    "/report-gift-card-scam",
    "/report-tech-support-scam",
    "/report-pig-butchering-scam",
    "/report-facebook-marketplace-scam",
    "/report-investment-scam",
    "/report-online-shopping-scam",
    "/report-employment-scam",
    "/report-phishing-scam",
    "/report-government-impersonation-scam",
    // Batch 1 — 6 pages
    "/report-crypto-scam",
    "/report-sextortion-scam",
    "/report-rental-scam",
    "/report-identity-theft",
    "/report-business-email-scam",
    "/report-lottery-scam",
    // Batch 2 — 7 pages
    "/report-credit-card-fraud",
    "/report-charity-scam",
    "/report-impersonation-scam",
    "/report-elder-fraud",
    "/report-deepfake-scam",
    "/report-pet-scam",
    "/report-grandparent-scam",
    // Batch 3 — 4 pages
    "/report-payment-app-scam",
    "/report-advance-fee-scam",
    "/report-social-media-scam",
    "/report-military-scam",
    // Batch 4 — 4 pages
    "/report-sugar-daddy-scam",
    "/report-car-scam",
    "/report-real-estate-scam",
    "/report-ransomware",
  ].map((path) => ({ path, priority: 0.7, changeFrequency: "weekly" }));

  const allPages = [...core, ...pillar, ...scamPages];

  return allPages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
