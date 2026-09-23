// /scam-websites/sitemap/N.xml — 10k indexable domain pages per chunk.
import { listIndexableForSitemap } from "@/lib/scamWebsites";

export const revalidate = 3600;
const CHUNK = 10000;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET(_req, { params }) {
  const id = parseInt(String(params.id).replace(/\.xml$/, ""), 10);
  if (!Number.isFinite(id) || id < 0) return new Response("Not found", { status: 404 });
  const rows = await listIndexableForSitemap(id * CHUNK, CHUNK);
  if (!rows.length) return new Response("Not found", { status: 404 });
  const urls = rows.map((r) => {
    const lastmod = new Date(r.updated_at || r.latest_report || Date.now()).toISOString();
    return `<url><loc>https://scamcomplaints.org/scam-websites/${esc(encodeURIComponent(r.domain))}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
  return new Response(xml, { headers: { "content-type": "application/xml", "cache-control": "public, max-age=3600" } });
}
