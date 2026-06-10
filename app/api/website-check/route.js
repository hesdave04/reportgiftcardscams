// app/api/website-check/route.js — Website Trust Score Checker API
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import dns from "dns/promises";
import https from "https";
import http from "http";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Vercel function timeout

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════ */

function extractDomain(input) {
  if (!input) return null;
  let clean = input.trim().toLowerCase();
  if (!clean.startsWith("http")) clean = "https://" + clean;
  try {
    const u = new URL(clean);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return clean
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();
  }
}

/** Fetch with a timeout */
function fetchWithTimeout(url, opts = {}, timeoutMs = 8000) {
  return Promise.race([
    fetch(url, opts),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeoutMs)
    ),
  ]);
}

/** Get TLS/SSL certificate info for a domain */
function getSSLInfo(domain, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(null);
    }, timeoutMs);

    try {
      const req = https.request(
        {
          hostname: domain,
          port: 443,
          method: "HEAD",
          path: "/",
          rejectUnauthorized: false,
          timeout: 5000,
          headers: { "User-Agent": "ScamComplaints-WebsiteChecker/1.0" },
        },
        (res) => {
          clearTimeout(timeout);
          const cert = res.socket?.getPeerCertificate?.(true);
          if (!cert || !cert.subject) {
            resolve(null);
            return;
          }
          resolve({
            subject: cert.subject,
            issuer: cert.issuer,
            valid_from: cert.valid_from,
            valid_to: cert.valid_to,
            serialNumber: cert.serialNumber,
            fingerprint: cert.fingerprint,
            authorized: res.socket?.authorized || false,
            // Check cert type by looking at issuer/subject
            subjectAltName: cert.subjectaltname || "",
          });
          req.destroy();
        }
      );
      req.on("error", () => {
        clearTimeout(timeout);
        resolve(null);
      });
      req.on("timeout", () => {
        clearTimeout(timeout);
        req.destroy();
        resolve(null);
      });
      req.end();
    } catch {
      clearTimeout(timeout);
      resolve(null);
    }
  });
}

/** Check if site has HTTPS and get response headers */
async function checkHTTPS(domain) {
  try {
    const res = await fetchWithTimeout(`https://${domain}`, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "ScamComplaints-WebsiteChecker/1.0" },
    }, 8000);

    const headers = Object.fromEntries(res.headers.entries());
    const html = await res.text().catch(() => "");

    return {
      hasSSL: true,
      statusCode: res.status,
      headers,
      html: html.slice(0, 50000), // limit to 50KB for analysis
      redirected: res.redirected,
      finalUrl: res.url,
    };
  } catch {
    // Try HTTP
    try {
      const res = await fetchWithTimeout(`http://${domain}`, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "ScamComplaints-WebsiteChecker/1.0" },
      }, 6000);

      const html = await res.text().catch(() => "");
      return {
        hasSSL: false,
        statusCode: res.status,
        headers: Object.fromEntries(res.headers.entries()),
        html: html.slice(0, 50000),
        redirected: res.redirected,
        finalUrl: res.url,
      };
    } catch {
      return { hasSSL: false, statusCode: 0, headers: {}, html: "", offline: true };
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════
   CHECK MODULES
   ═══════════════════════════════════════════════════════════════════ */

// 1. Domain & Registration Check via RDAP
async function checkDomainRegistration(domain) {
  const result = {
    score: 0,
    max: 25,
    details: {},
    flags: [],
  };

  try {
    const rdapRes = await fetchWithTimeout(
      `https://rdap.org/domain/${domain}`,
      {
        headers: { Accept: "application/rdap+json" },
      },
      6000
    );

    if (!rdapRes.ok) {
      result.details.rdap_status = "unavailable";
      result.flags.push("Could not retrieve domain registration data");
      result.score = 5; // neutral
      return result;
    }

    const rdap = await rdapRes.json();

    // Extract events
    const events = rdap.events || [];
    const registration = events.find((e) => e.eventAction === "registration");
    const expiration = events.find((e) => e.eventAction === "expiration");
    const lastChanged = events.find((e) => e.eventAction === "last changed");

    // Domain age
    if (registration?.eventDate) {
      const regDate = new Date(registration.eventDate);
      const ageDays = Math.floor((Date.now() - regDate.getTime()) / 86400000);
      const ageYears = ageDays / 365;
      result.details.registration_date = registration.eventDate;
      result.details.domain_age_days = ageDays;
      result.details.domain_age_label =
        ageYears >= 2
          ? `${Math.floor(ageYears)} years`
          : ageDays >= 365
            ? "1 year"
            : ageDays >= 180
              ? `${Math.floor(ageDays / 30)} months`
              : `${ageDays} days`;

      if (ageYears >= 5) {
        result.score += 10;
      } else if (ageYears >= 2) {
        result.score += 8;
      } else if (ageYears >= 1) {
        result.score += 5;
      } else if (ageDays >= 180) {
        result.score += 2;
      } else if (ageDays < 30) {
        result.flags.push("Domain registered less than 30 days ago — very high risk");
      } else if (ageDays < 180) {
        result.flags.push("Domain is less than 6 months old");
      }
    } else {
      result.score += 3; // unknown, neutral
    }

    // Registration period (how far out is expiration)
    if (expiration?.eventDate && registration?.eventDate) {
      const expDate = new Date(expiration.eventDate);
      const regDate = new Date(registration.eventDate);
      const remainDays = Math.floor((expDate.getTime() - Date.now()) / 86400000);
      const totalPeriodYears = (expDate.getTime() - regDate.getTime()) / (365 * 86400000);
      result.details.expiration_date = expiration.eventDate;
      result.details.days_until_expiry = remainDays;

      if (remainDays > 365) {
        result.score += 4;
        result.details.registration_period = `${Math.ceil(remainDays / 365)} years remaining`;
      } else if (remainDays > 180) {
        result.score += 2;
        result.details.registration_period = `${Math.ceil(remainDays / 30)} months remaining`;
      } else if (remainDays <= 0) {
        result.flags.push("Domain registration has expired");
      } else {
        result.details.registration_period = `${remainDays} days remaining`;
        result.flags.push("Domain expires within 6 months");
      }
    }

    // WHOIS privacy / entity info
    const entities = rdap.entities || [];
    const registrant = entities.find(
      (e) => e.roles && e.roles.includes("registrant")
    );
    if (registrant?.vcardArray) {
      result.score += 5;
      result.details.whois_visibility = "public";
    } else if (entities.length > 0) {
      result.score += 3;
      result.details.whois_visibility = "partial";
    } else {
      result.score += 1;
      result.details.whois_visibility = "privacy-protected";
      result.flags.push("Domain registration details are hidden");
    }

    // Registrar
    const registrar = entities.find(
      (e) => e.roles && e.roles.includes("registrar")
    );
    if (registrar?.vcardArray) {
      try {
        const fn = registrar.vcardArray[1]?.find((v) => v[0] === "fn");
        if (fn) result.details.registrar = fn[3];
      } catch {}
    }
    if (rdap.links) {
      const rdapLink = rdap.links.find((l) => l.rel === "related");
      if (rdapLink) result.details.registrar_url = rdapLink.href;
    }

    // Check nameservers
    const ns = rdap.nameservers || [];
    if (ns.length > 0) {
      result.details.nameservers = ns.map((n) => n.ldhName).slice(0, 4);
      result.score += 2;
    }

    // Status flags
    const status = rdap.status || [];
    result.details.domain_status = status;
    if (status.includes("client delete prohibited")) result.score += 1;
    if (status.includes("serverHold") || status.includes("clientHold")) {
      result.flags.push("Domain is on hold / suspended");
      result.score -= 5;
    }
  } catch (err) {
    result.details.rdap_error = err.message;
    result.score = 5; // neutral fallback
    result.flags.push("Domain registration data could not be retrieved");
  }

  result.score = Math.max(0, Math.min(result.max, result.score));
  return result;
}

// 2. SSL / Security Check
async function checkSSL(domain, sslInfo, httpInfo) {
  const result = {
    score: 0,
    max: 20,
    details: {},
    flags: [],
  };

  // SSL present?
  if (httpInfo.hasSSL && sslInfo) {
    result.score += 8;
    result.details.has_ssl = true;
    result.details.ssl_authorized = sslInfo.authorized;

    // Cert validity
    if (sslInfo.valid_from && sslInfo.valid_to) {
      const validTo = new Date(sslInfo.valid_to);
      const daysUntilExpiry = Math.floor(
        (validTo.getTime() - Date.now()) / 86400000
      );
      result.details.ssl_expires = sslInfo.valid_to;
      result.details.ssl_days_remaining = daysUntilExpiry;

      if (daysUntilExpiry > 30) {
        result.score += 2;
      } else if (daysUntilExpiry <= 0) {
        result.score -= 5;
        result.flags.push("SSL certificate has expired");
      } else {
        result.flags.push(`SSL certificate expires in ${daysUntilExpiry} days`);
      }
    }

    // Issuer
    if (sslInfo.issuer) {
      const issuerOrg = sslInfo.issuer.O || sslInfo.issuer.CN || "";
      result.details.ssl_issuer = issuerOrg;

      // Check for EV/OV indicators
      if (sslInfo.subject.O && sslInfo.subject.O !== sslInfo.subject.CN) {
        // OV or EV cert (has Organization in subject)
        result.score += 4;
        result.details.ssl_type = "Organization Validated (OV/EV)";
      } else {
        result.score += 1;
        result.details.ssl_type = "Domain Validated (DV)";
      }
    }

    // Check authorized
    if (!sslInfo.authorized) {
      result.flags.push("SSL certificate validation failed");
      result.score -= 3;
    }
  } else if (httpInfo.hasSSL) {
    result.score += 5;
    result.details.has_ssl = true;
    result.details.ssl_details = "Could not inspect certificate details";
  } else if (!httpInfo.offline) {
    result.details.has_ssl = false;
    result.flags.push("No SSL certificate — site uses unencrypted HTTP");
    result.score -= 3;
  }

  // HSTS
  const headers = httpInfo.headers || {};
  if (headers["strict-transport-security"]) {
    result.score += 3;
    result.details.hsts = true;
  } else {
    result.details.hsts = false;
  }

  // Security headers
  if (headers["x-frame-options"] || headers["content-security-policy"]) {
    result.score += 1;
    result.details.security_headers = true;
  }

  if (httpInfo.offline) {
    result.flags.push("Website appears to be offline or unreachable");
  }

  result.score = Math.max(0, Math.min(result.max, result.score));
  return result;
}

// 3. Blacklist & Reputation Check
async function checkBlacklist(domain, supabase) {
  const result = {
    score: 0,
    max: 20,
    details: {},
    flags: [],
  };

  let baseScore = 15; // Start with a baseline "clean" score

  // a) Check our own ScamComplaints database
  if (supabase) {
    try {
      const { count, error } = await supabase
        .from("case_intakes")
        .select("id", { count: "exact", head: true })
        .ilike("suspect_website", `%${domain}%`);

      const reportCount = count || 0;
      result.details.scamcomplaints_reports = reportCount;

      if (reportCount > 0) {
        result.details.in_scamcomplaints_db = true;
        if (reportCount >= 5) {
          baseScore -= 12;
          result.flags.push(
            `Found ${reportCount} scam reports in ScamComplaints database — high risk`
          );
        } else if (reportCount >= 2) {
          baseScore -= 8;
          result.flags.push(
            `Found ${reportCount} scam reports in ScamComplaints database`
          );
        } else {
          baseScore -= 5;
          result.flags.push(
            `Found ${reportCount} scam report(s) in ScamComplaints database`
          );
        }
      } else {
        result.details.in_scamcomplaints_db = false;
      }
    } catch (err) {
      result.details.db_check_error = err.message;
    }
  }

  // b) Google Safe Browsing (if API key is configured)
  const gsbKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  if (gsbKey) {
    try {
      const gsbRes = await fetchWithTimeout(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${gsbKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client: { clientId: "scamcomplaints", clientVersion: "1.0" },
            threatInfo: {
              threatTypes: [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION",
              ],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [
                { url: `https://${domain}/` },
                { url: `http://${domain}/` },
              ],
            },
          }),
        },
        5000
      );
      const gsbData = await gsbRes.json();
      const matches = gsbData.matches || [];
      result.details.google_safe_browsing =
        matches.length > 0 ? "flagged" : "clean";

      if (matches.length > 0) {
        baseScore -= 15;
        const types = [...new Set(matches.map((m) => m.threatType))];
        result.flags.push(
          `Flagged by Google Safe Browsing: ${types.join(", ")}`
        );
      } else {
        baseScore += 3;
      }
    } catch {
      result.details.google_safe_browsing = "check_failed";
    }
  } else {
    result.details.google_safe_browsing = "not_configured";
  }

  // c) Check SURBL via DNS (free, no API key)
  try {
    const surblDomain = `${domain}.multi.surbl.org`;
    const records = await dns.resolve4(surblDomain).catch(() => null);
    if (records && records.length > 0) {
      result.details.surbl = "listed";
      baseScore -= 8;
      result.flags.push("Domain is listed on SURBL spam/abuse blocklist");
    } else {
      result.details.surbl = "clean";
    }
  } catch {
    result.details.surbl = "clean"; // NXDOMAIN = not listed
  }

  // d) Check SpamHaus DBL via DNS (free)
  try {
    const dblDomain = `${domain}.dbl.spamhaus.org`;
    const records = await dns.resolve4(dblDomain).catch(() => null);
    if (records && records.length > 0) {
      result.details.spamhaus_dbl = "listed";
      baseScore -= 8;
      result.flags.push("Domain is listed on Spamhaus DBL blocklist");
    } else {
      result.details.spamhaus_dbl = "clean";
    }
  } catch {
    result.details.spamhaus_dbl = "clean";
  }

  // e) Check PhishTank (if domain recently appeared — via DNS-based check)
  try {
    // Use URIBL as a phishing check
    const uriblDomain = `${domain}.multi.uribl.com`;
    const records = await dns.resolve4(uriblDomain).catch(() => null);
    if (records && records.length > 0) {
      result.details.uribl = "listed";
      baseScore -= 5;
      result.flags.push("Domain is listed on URIBL blocklist");
    } else {
      result.details.uribl = "clean";
    }
  } catch {
    result.details.uribl = "clean";
  }

  result.score = Math.max(0, Math.min(result.max, baseScore));
  return result;
}

// 4. Server & Infrastructure Check
async function checkInfrastructure(domain, httpInfo) {
  const result = {
    score: 0,
    max: 15,
    details: {},
    flags: [],
  };

  // DNS records
  try {
    const [aRecords, aaaaRecords, mxRecords, nsRecords] = await Promise.allSettled([
      dns.resolve4(domain),
      dns.resolve6(domain),
      dns.resolveMx(domain),
      dns.resolveNs(domain),
    ]);

    // A records
    if (aRecords.status === "fulfilled" && aRecords.value.length > 0) {
      result.details.ip_addresses = aRecords.value.slice(0, 3);
      result.score += 2;

      // GeoIP lookup (ip-api.com free)
      try {
        const geoRes = await fetchWithTimeout(
          `http://ip-api.com/json/${aRecords.value[0]}?fields=status,country,countryCode,city,isp,org,hosting`,
          {},
          4000
        );
        const geo = await geoRes.json();
        if (geo.status === "success") {
          result.details.server_country = geo.country;
          result.details.server_country_code = geo.countryCode;
          result.details.server_city = geo.city;
          result.details.server_isp = geo.isp;
          result.details.server_org = geo.org;
          result.details.is_hosting = geo.hosting;

          // Reputable hosting countries get a small boost
          const reputableCountries = new Set([
            "US", "CA", "GB", "DE", "NL", "FR", "AU", "JP", "SE", "CH", "IE", "SG",
          ]);
          if (reputableCountries.has(geo.countryCode)) {
            result.score += 2;
          }
        }
      } catch {}
    } else {
      result.flags.push("No A records found — domain may not be active");
    }

    // AAAA records
    if (aaaaRecords.status === "fulfilled" && aaaaRecords.value.length > 0) {
      result.details.has_ipv6 = true;
      result.score += 1;
    } else {
      result.details.has_ipv6 = false;
    }

    // MX records
    if (mxRecords.status === "fulfilled" && mxRecords.value.length > 0) {
      result.details.has_mx = true;
      result.details.mail_servers = mxRecords.value
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 3)
        .map((r) => r.exchange);

      // Check for branded email vs free email provider MX
      const mxStr = mxRecords.value.map((r) => r.exchange).join(" ").toLowerCase();
      const freeEmailMX = ["google.com", "outlook.com", "zoho.com"];
      const usesFreeEmail = freeEmailMX.some((f) => mxStr.includes(f));
      result.details.uses_professional_email = !usesFreeEmail;

      result.score += 2;
    } else {
      result.details.has_mx = false;
      result.flags.push("No email (MX) records — unusual for a legitimate business");
    }

    // NS records
    if (nsRecords.status === "fulfilled" && nsRecords.value.length > 0) {
      result.details.nameservers = nsRecords.value.slice(0, 4);
      result.score += 1;
    }
  } catch (err) {
    result.details.dns_error = err.message;
    result.flags.push("DNS lookup failed");
  }

  // Response time
  if (!httpInfo.offline && httpInfo.statusCode > 0) {
    result.score += 2;
    result.details.site_reachable = true;
  } else if (httpInfo.offline) {
    result.details.site_reachable = false;
    result.flags.push("Website is unreachable");
  }

  // CDN detection from headers
  const headers = httpInfo.headers || {};
  const cdnHeaders = ["cf-ray", "x-served-by", "x-cache", "x-amz-cf-id", "x-vercel-id"];
  const hasCDN = cdnHeaders.some((h) => headers[h]);
  if (hasCDN) {
    result.score += 2;
    result.details.uses_cdn = true;
    if (headers["cf-ray"]) result.details.cdn_provider = "Cloudflare";
    else if (headers["x-vercel-id"]) result.details.cdn_provider = "Vercel";
    else if (headers["x-amz-cf-id"]) result.details.cdn_provider = "AWS CloudFront";
    else result.details.cdn_provider = "Detected";
  } else {
    result.details.uses_cdn = false;
  }

  // Server header
  if (headers.server) {
    result.details.server_software = headers.server;
    result.score += 1;
  }

  result.score = Math.max(0, Math.min(result.max, result.score));
  return result;
}

// 5. Content & Trust Signals Check
async function checkContent(domain, httpInfo) {
  const result = {
    score: 0,
    max: 20,
    details: {},
    flags: [],
  };

  const html = (httpInfo.html || "").toLowerCase();

  if (!html || httpInfo.offline) {
    result.flags.push("Could not analyze website content — site is unreachable");
    result.score = 3;
    return result;
  }

  // Check for contact information
  const hasContactPage =
    html.includes('href="/contact') ||
    html.includes('href="contact') ||
    html.includes("contact us") ||
    html.includes("contact-us") ||
    html.includes('href="/support');
  if (hasContactPage) {
    result.score += 3;
    result.details.has_contact_page = true;
  } else {
    result.details.has_contact_page = false;
    result.flags.push("No contact page found");
  }

  // Phone number
  const hasPhone =
    /tel:[\d+\-()]+/.test(html) ||
    /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(html) ||
    /\+\d[\d\s\-.()]{7,}/.test(html);
  result.details.has_phone = hasPhone;
  if (hasPhone) result.score += 1;

  // Email address
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(html);
  result.details.has_email = hasEmail;
  if (hasEmail) result.score += 1;

  // Physical address indicators
  const hasAddress =
    /\b\d{1,5}\s+\w+\s+(st|street|ave|avenue|blvd|boulevard|rd|road|dr|drive|ln|lane|way|ct|court|pl|place)\b/i.test(html) ||
    html.includes("address") && (html.includes("suite") || html.includes("floor"));
  result.details.has_address = hasAddress;
  if (hasAddress) result.score += 2;

  // Privacy policy
  const hasPrivacy =
    html.includes("privacy policy") ||
    html.includes("privacy-policy") ||
    html.includes('href="/privacy') ||
    html.includes('href="privacy');
  result.details.has_privacy_policy = hasPrivacy;
  if (hasPrivacy) {
    result.score += 3;
  } else {
    result.flags.push("No privacy policy found");
  }

  // Terms of service
  const hasTerms =
    html.includes("terms of service") ||
    html.includes("terms and conditions") ||
    html.includes("terms-of-service") ||
    html.includes('href="/terms') ||
    html.includes('href="terms') ||
    html.includes("terms of use");
  result.details.has_terms = hasTerms;
  if (hasTerms) {
    result.score += 3;
  } else {
    result.flags.push("No terms of service found");
  }

  // Social media links
  const socialPlatforms = [
    "facebook.com",
    "twitter.com",
    "x.com",
    "instagram.com",
    "linkedin.com",
    "youtube.com",
    "tiktok.com",
  ];
  const foundSocials = socialPlatforms.filter((s) => html.includes(s));
  result.details.social_media_links = foundSocials;
  if (foundSocials.length >= 2) {
    result.score += 3;
  } else if (foundSocials.length === 1) {
    result.score += 1;
  } else {
    result.flags.push("No social media links found");
  }

  // Robots / noindex check
  const blocksSearchEngines =
    html.includes('name="robots"') &&
    (html.includes("noindex") || html.includes("nofollow"));
  result.details.blocks_search_engines = blocksSearchEngines;
  if (blocksSearchEngines) {
    result.score -= 5;
    result.flags.push("Website blocks search engine indexing — suspicious");
  }

  // Content depth — check for meaningful content
  const textContent = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = textContent.split(" ").filter((w) => w.length > 2).length;
  result.details.content_word_count = wordCount;
  if (wordCount < 50) {
    result.flags.push("Very thin page content — may indicate a parked or empty domain");
    result.score -= 2;
  } else if (wordCount > 200) {
    result.score += 2;
  }

  // Favicon
  const hasFavicon =
    html.includes("favicon") ||
    html.includes('rel="icon"') ||
    html.includes('rel="shortcut icon"');
  result.details.has_favicon = hasFavicon;
  if (hasFavicon) result.score += 1;

  // Title tag
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) {
    result.details.page_title = titleMatch[1].trim().slice(0, 100);
    result.score += 1;
  }

  result.score = Math.max(0, Math.min(result.max, result.score));
  return result;
}

/* ═══════════════════════════════════════════════════════════════════
   RISK LEVEL CLASSIFICATION
   ═══════════════════════════════════════════════════════════════════ */
function classifyRisk(score) {
  if (score <= 20) return { level: "very_unsafe", label: "Very Likely Unsafe", emoji: "🔴", color: "red" };
  if (score <= 40) return { level: "likely_unsafe", label: "Likely Unsafe", emoji: "🟠", color: "orange" };
  if (score <= 60) return { level: "caution", label: "Caution Recommended", emoji: "🟡", color: "yellow" };
  if (score <= 80) return { level: "likely_safe", label: "Likely Safe", emoji: "🟢", color: "green" };
  return { level: "very_safe", label: "Very Likely Safe", emoji: "✅", color: "emerald" };
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HANDLER
   ═══════════════════════════════════════════════════════════════════ */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawUrl = searchParams.get("url") || searchParams.get("domain") || "";

    if (!rawUrl) {
      return NextResponse.json(
        { error: "Missing required parameter: url or domain" },
        { status: 400 }
      );
    }

    const domain = extractDomain(rawUrl);
    if (!domain || domain.length < 3 || !domain.includes(".")) {
      return NextResponse.json(
        { error: "Invalid domain format" },
        { status: 400 }
      );
    }

    // Check cache first
    const supa = getSupabaseAdmin();
    if (supa) {
      try {
        const cacheAge = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { data: cached } = await supa
          .from("website_checks")
          .select("*")
          .eq("domain", domain)
          .gte("checked_at", cacheAge)
          .order("checked_at", { ascending: false })
          .limit(1)
          .single();

        if (cached?.result) {
          return NextResponse.json(
            { ...cached.result, cached: true },
            { headers: { "cache-control": "no-store" } }
          );
        }
      } catch {
        // No cached result, continue with fresh check
      }
    }

    // Run all checks in parallel
    const [sslInfo, httpInfo] = await Promise.all([
      getSSLInfo(domain),
      checkHTTPS(domain),
    ]);

    const [domainCheck, sslCheck, blacklistCheck, infraCheck, contentCheck] =
      await Promise.all([
        checkDomainRegistration(domain),
        checkSSL(domain, sslInfo, httpInfo),
        checkBlacklist(domain, supa),
        checkInfrastructure(domain, httpInfo),
        checkContent(domain, httpInfo),
      ]);

    // Calculate total score
    const totalScore =
      domainCheck.score +
      sslCheck.score +
      blacklistCheck.score +
      infraCheck.score +
      contentCheck.score;
    const maxScore =
      domainCheck.max +
      sslCheck.max +
      blacklistCheck.max +
      infraCheck.max +
      contentCheck.max;

    // Normalize to 0-100
    const normalizedScore = Math.round((totalScore / maxScore) * 100);
    const risk = classifyRisk(normalizedScore);

    // Collect all flags
    const allFlags = [
      ...domainCheck.flags,
      ...sslCheck.flags,
      ...blacklistCheck.flags,
      ...infraCheck.flags,
      ...contentCheck.flags,
    ];

    const response = {
      domain,
      trust_score: normalizedScore,
      risk_level: risk.level,
      risk_label: risk.label,
      risk_emoji: risk.emoji,
      risk_color: risk.color,
      checks: {
        domain_registration: {
          score: domainCheck.score,
          max: domainCheck.max,
          pct: Math.round((domainCheck.score / domainCheck.max) * 100),
          details: domainCheck.details,
        },
        ssl_security: {
          score: sslCheck.score,
          max: sslCheck.max,
          pct: Math.round((sslCheck.score / sslCheck.max) * 100),
          details: sslCheck.details,
        },
        blacklist_reputation: {
          score: blacklistCheck.score,
          max: blacklistCheck.max,
          pct: Math.round((blacklistCheck.score / blacklistCheck.max) * 100),
          details: blacklistCheck.details,
        },
        server_infrastructure: {
          score: infraCheck.score,
          max: infraCheck.max,
          pct: Math.round((infraCheck.score / infraCheck.max) * 100),
          details: infraCheck.details,
        },
        content_trust: {
          score: contentCheck.score,
          max: contentCheck.max,
          pct: Math.round((contentCheck.score / contentCheck.max) * 100),
          details: contentCheck.details,
        },
      },
      flags: allFlags,
      in_scamcomplaints_db:
        blacklistCheck.details.in_scamcomplaints_db || false,
      scamcomplaints_reports:
        blacklistCheck.details.scamcomplaints_reports || 0,
      checked_at: new Date().toISOString(),
      cached: false,
    };

    // Persist results in Supabase (non-fatal if tables don't exist yet)
    if (supa) {
      // a) Cache the check result in website_checks
      try {
        await supa.from("website_checks").upsert(
          {
            domain,
            trust_score: normalizedScore,
            risk_level: risk.level,
            result: response,
            checked_at: new Date().toISOString(),
          },
          { onConflict: "domain" }
        );
      } catch {
        // Caching failure is non-fatal — table may not exist yet
      }

      // b) Auto-add domain to case_intakes so it appears in the
      //    scam websites directory and is searchable site-wide.
      //    Only insert if this exact domain isn't already recorded.
      try {
        const { count } = await supa
          .from("case_intakes")
          .select("id", { count: "exact", head: true })
          .ilike("suspect_website", `%${domain}%`);

        if (!count || count === 0) {
          await supa.from("case_intakes").insert({
            suspect_website: domain,
            source: "website-checker",
            status: "checked",
            scam_type: normalizedScore <= 40 ? "suspicious_website" : null,
            story: `Automated website trust check — score ${normalizedScore}/100 (${risk.label}). ${allFlags.length} flag(s): ${allFlags.join("; ") || "none"}.`,
            full_payload: response,
          });
        }
      } catch {
        // Insert failure is non-fatal
      }
    }

    return NextResponse.json(response, {
      headers: { "cache-control": "no-store" },
    });
  } catch (err) {
    console.error("Website check error:", err);
    return NextResponse.json(
      { error: "Internal server error: " + (err?.message || String(err)) },
      { status: 500 }
    );
  }
}
