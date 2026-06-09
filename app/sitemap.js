// app/sitemap.js — Auto-generated sitemap for scamcomplaints.org
const BASE = "https://scamcomplaints.org";

export default function sitemap() {
  const now = new Date().toISOString();

  const pages = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/case-builder", priority: 0.9, changeFrequency: "weekly" },
    { path: "/wall-of-shame", priority: 0.8, changeFrequency: "daily" },
    { path: "/search", priority: 0.8, changeFrequency: "daily" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/trust", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/xml", priority: 0.3, changeFrequency: "monthly" },
    { path: "/report-crypto-wallet", priority: 0.7, changeFrequency: "weekly" },
    { path: "/report-fake-social-media", priority: 0.7, changeFrequency: "weekly" },
    { path: "/report-fraudulent-website", priority: 0.7, changeFrequency: "weekly" },
  ];

  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
