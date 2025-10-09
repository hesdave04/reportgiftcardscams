// scripts/generate-logos.mjs
// Creates placeholder SVG logos for every brand/retailer slug.
// Run: node scripts/generate-logos.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// dynamic import of ESM module
const prefillMod = await import(pathToFileURL(path.join(root, "lib/prefill.js")).href);
const { BRANDS, RETAILERS } = prefillMod;

const outBrands = path.join(root, "public", "logos", "brands");
const outRetailers = path.join(root, "public", "logos", "retailers");
fs.mkdirSync(outBrands, { recursive: true });
fs.mkdirSync(outRetailers, { recursive: true });

function initials(name) {
  // Take first 3 alphanumerics as initials fallback
  const letters = (name || "").replace(/[^A-Za-z0-9]+/g, " ").trim().split(/\s+/);
  if (!letters.length) return "GC";
  const joined = letters.map(s => s[0]).join("").toUpperCase();
  return joined.slice(0, 3);
}

function svgFor(text, color = "#0B2340") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${text}">
  <rect width="128" height="128" rx="18" fill="${color}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700"
        fill="#ffffff">${text}</text>
</svg>`;
}

function writeIfMissing(dir, slug, name, kind) {
  const f = path.join(dir, `${slug}.svg`);
  if (!fs.existsSync(f)) {
    fs.writeFileSync(f, svgFor(initials(name), kind === "brands" ? "#1f2937" : "#0B2340"));
    console.log("created", path.relative(root, f));
  }
}

// brands
for (const b of BRANDS) {
  writeIfMissing(outBrands, b.slug, b.name, "brands");
}

// retailers
for (const r of RETAILERS) {
  writeIfMissing(outRetailers, r.slug, r.name, "retailers");
}

console.log("Done.");
