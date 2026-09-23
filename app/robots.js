export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard", "/login", "/signup"] }],
    sitemap: ["https://scamcomplaints.org/sitemap-index.xml", "https://scamcomplaints.org/sitemap.xml"],
    host: "https://scamcomplaints.org",
  };
}
