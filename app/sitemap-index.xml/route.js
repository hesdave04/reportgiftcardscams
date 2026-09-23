// Sitemap index: the static sitemap + one chunk per 10k indexable scam-website pages.
import { countIndexable } from "@/lib/scamWebsites";

export const revalidate = 3600;
export const CHUNK = 10000;

export async function GET() {
  const total = await countIndexable();
  const chunks = Math.max(1, Math.ceil(total / CHUNK));
  const now = new Date().toISOString();
  const items = [
    `<sitemap><loc>https://scamcomplaints.org/sitemap.xml</loc><lastmod>${now}</lastmod></sitemap>`,
    ...Array.from({ length: chunks }, (_, i) => `<sitemap><loc>https://scamcomplaints.org/scam-websites/sitemap/${i}.xml</loc><lastmod>${now}</lastmod></sitemap>`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</sitemapindex>`;
  return new Response(xml, { headers: { "content-type": "application/xml", "cache-control": "public, max-age=3600" } });
}
