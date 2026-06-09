// app/api/stats/leaderboard/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

/* ── Normalisation maps ── */

// Payment methods → clean display name
const PAYMENT_NORM = {
  "cash app": "Cash App",
  cashapp: "Cash App",
  "venmo": "Venmo",
  "paypal": "PayPal",
  "zelle": "Zelle",
  "bank / wire transfer": "Bank / Wire Transfer",
  "bank transfer": "Bank / Wire Transfer",
  "bank_transfer": "Bank / Wire Transfer",
  "wire transfer": "Bank / Wire Transfer",
  "wire": "Bank / Wire Transfer",
  "cryptocurrency": "Cryptocurrency",
  "crypto_btc": "Cryptocurrency",
  "gift card": "Gift Card",
  "apple_gift_card": "Gift Card",
  "cash": "Cash",
  "check": "Check",
};

// US state abbreviations → full names
const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "Washington D.C.",
  PR: "Puerto Rico", VI: "U.S. Virgin Islands", GU: "Guam",
};

// Reverse lookup: full name → abbreviation (case-insensitive)
const STATE_ABBREV = {};
for (const [abbr, name] of Object.entries(STATE_NAMES)) {
  STATE_ABBREV[name.toLowerCase()] = abbr;
}

function normalizeState(raw) {
  if (!raw) return null;
  const s = raw.trim();
  // Already a known abbreviation
  const upper = s.toUpperCase();
  if (STATE_NAMES[upper]) return upper;
  // Full name → abbreviation
  const abbr = STATE_ABBREV[s.toLowerCase()];
  if (abbr) return abbr;
  // 2 chars that look like a state code
  if (/^[A-Za-z]{2}$/.test(s)) return upper;
  return null; // unrecognised
}

function normalizePayment(raw) {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  return PAYMENT_NORM[key] || raw.trim();
}

/* ── Financial institution grouping ── */

// These payment methods are treated as "financial institutions" for the leaderboard
const FINANCIAL_INSTITUTIONS = new Set([
  "Cash App", "Venmo", "PayPal", "Zelle",
  "Bank / Wire Transfer", "Cryptocurrency",
]);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let days = parseInt(searchParams.get("days") || "180", 10);
    if (!Number.isFinite(days) || days <= 0) days = 180;

    const supa = getSupabaseAdmin();
    if (!supa) {
      return NextResponse.json(
        { error: "Supabase admin client not configured (check env vars)." },
        { status: 500 }
      );
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffISO = cutoff.toISOString();

    // Pull from both tables in parallel
    const [gcResult, intakeResult, dataPointsResult] = await Promise.all([
      supa
        .from("giftcard_reports")
        .select("gift_card_brand, retailer, purchase_state, amount, purchase_date, created_at")
        .or(`purchase_date.gte.${cutoffISO},created_at.gte.${cutoffISO}`)
        .limit(50000),
      supa
        .from("case_intakes")
        .select("scam_type, platforms, payment_methods, amount, created_at")
        .gte("created_at", cutoffISO)
        .limit(50000),
      // Data-type counting: pull identifying fields + source
      supa
        .from("case_intakes")
        .select("suspect_name, suspect_email, suspect_phone, suspect_wallet, suspect_username, suspect_website, source, payment_methods")
        .gte("created_at", cutoffISO)
        .limit(50000),
    ]);

    if (gcResult.error) throw gcResult.error;
    if (intakeResult.error) throw intakeResult.error;

    // ── State leaderboard (from giftcard_reports) ──
    const stateCounts = new Map();
    const stateAmounts = new Map();

    // ── Gift card brand leaderboard (from giftcard_reports) ──
    const brandCounts = new Map();
    const brandAmounts = new Map();

    for (const row of gcResult.data || []) {
      // State
      const st = normalizeState(row.purchase_state);
      if (st) {
        stateCounts.set(st, (stateCounts.get(st) || 0) + 1);
        if (row.amount > 0) stateAmounts.set(st, (stateAmounts.get(st) || 0) + Number(row.amount));
      }

      // Brand
      const brand = (row.gift_card_brand || "").trim();
      if (brand && brand.toLowerCase() !== "unknown" && brand.toLowerCase() !== "other") {
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
        if (row.amount > 0) brandAmounts.set(brand, (brandAmounts.get(brand) || 0) + Number(row.amount));
      }
    }

    // ── Also try state data from case_intakes (column may not exist yet) ──
    const intakeStateResult = await supa
      .from("case_intakes")
      .select("state, amount")
      .not("state", "is", null)
      .gte("created_at", cutoffISO)
      .limit(50000);

    if (!intakeStateResult.error) {
      for (const row of intakeStateResult.data || []) {
        const st = normalizeState(row.state);
        if (st) {
          stateCounts.set(st, (stateCounts.get(st) || 0) + 1);
          if (row.amount > 0) stateAmounts.set(st, (stateAmounts.get(st) || 0) + Number(row.amount));
        }
      }
    }

    // ── Financial institution leaderboard (from case_intakes payment_methods) ──
    const instCounts = new Map();
    const instAmounts = new Map();

    for (const row of intakeResult.data || []) {
      const methods = Array.isArray(row.payment_methods) ? row.payment_methods : [];
      const amt = row.amount > 0 ? Number(row.amount) : 0;

      for (const m of methods) {
        const norm = normalizePayment(m);
        if (!norm || norm === "No Money Sent") continue;
        // Only include financial institutions (not "Gift Card", "Cash", "Check")
        if (FINANCIAL_INSTITUTIONS.has(norm)) {
          instCounts.set(norm, (instCounts.get(norm) || 0) + 1);
          if (amt > 0) instAmounts.set(norm, (instAmounts.get(norm) || 0) + amt);
        }
      }
    }

    // Also count gift card as an institution entry (from giftcard_reports count)
    const gcTotal = (gcResult.data || []).length;
    if (gcTotal > 0) {
      instCounts.set("Gift Card", (instCounts.get("Gift Card") || 0) + gcTotal);
      let gcAmtTotal = 0;
      for (const row of gcResult.data || []) {
        if (row.amount > 0) gcAmtTotal += Number(row.amount);
      }
      if (gcAmtTotal > 0) instAmounts.set("Gift Card", (instAmounts.get("Gift Card") || 0) + gcAmtTotal);
    }

    // ── Data-point metrics by source ──
    const dataMetrics = { total: {}, bySource: {} };

    function countField(value) {
      // Count semicolon-separated values (e.g. "email1; email2" = 2)
      if (!value || !value.trim()) return 0;
      return value.split(/;\s*/).filter(Boolean).length;
    }

    const DATA_FIELDS = [
      { field: "suspect_name", label: "Suspect Names", icon: "👤" },
      { field: "suspect_email", label: "Email Addresses", icon: "📧" },
      { field: "suspect_phone", label: "Phone Numbers", icon: "📱" },
      { field: "suspect_wallet", label: "Crypto Wallets", icon: "🪙" },
      { field: "suspect_username", label: "Usernames / Social Profiles", icon: "🌐" },
      { field: "suspect_website", label: "Websites / URLs", icon: "🔗" },
    ];

    const SOURCE_LABELS = {
      scf_verified: "SCF Verified",
      user_submitted: "User Submitted",
      submitted: "User Submitted",
      "3p_chainabuse": "ChainAbuse",
      "3p_cryptolegal": "CryptoLegal",
      "3p_giftcard": "Gift Card Reports",
      "bulk-import": "Imported",
    };

    // Initialise totals
    for (const { field } of DATA_FIELDS) {
      dataMetrics.total[field] = 0;
    }

    if (!dataPointsResult.error) {
      for (const row of dataPointsResult.data || []) {
        const src = row.source || "unknown";
        if (!dataMetrics.bySource[src]) {
          dataMetrics.bySource[src] = {};
          for (const { field } of DATA_FIELDS) dataMetrics.bySource[src][field] = 0;
          dataMetrics.bySource[src]._reports = 0;
        }
        dataMetrics.bySource[src]._reports += 1;

        for (const { field } of DATA_FIELDS) {
          const n = countField(row[field]);
          dataMetrics.total[field] += n;
          dataMetrics.bySource[src][field] += n;
        }
      }
    }

    // Also count gift card reports data points
    const gcReportCount = (gcResult.data || []).length;
    if (gcReportCount > 0) {
      const src = "3p_giftcard";
      dataMetrics.bySource[src] = { _reports: gcReportCount };
      for (const { field } of DATA_FIELDS) {
        dataMetrics.bySource[src][field] = 0;
      }
      // Gift card reports contribute brand names as data points
      let brandCount = 0;
      let retailerCount = 0;
      for (const row of gcResult.data || []) {
        if (row.gift_card_brand?.trim()) brandCount++;
        if (row.retailer?.trim()) retailerCount++;
      }
      dataMetrics.bySource[src]._giftCardBrands = brandCount;
      dataMetrics.bySource[src]._retailers = retailerCount;
    }

    // Build ordered summary for the frontend
    const dataTypeSummary = DATA_FIELDS.map(({ field, label, icon }) => ({
      key: field,
      label,
      icon,
      total: dataMetrics.total[field],
    })).filter((d) => d.total > 0);

    const sourceSummary = Object.entries(dataMetrics.bySource)
      .sort((a, b) => b[1]._reports - a[1]._reports)
      .map(([src, counts]) => ({
        source: src,
        label: SOURCE_LABELS[src] || src.replace(/^3p_/, "").replace(/_/g, " "),
        reports: counts._reports,
        ...Object.fromEntries(
          DATA_FIELDS.map(({ field }) => [field, counts[field]])
        ),
      }));

    const toLeaderboard = (countMap, amountMap, limit = 50) =>
      Array.from(countMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({
          name,
          count,
          amount: Math.round(amountMap.get(name) || 0),
        }));

    // State entries get full name added
    const states = toLeaderboard(stateCounts, stateAmounts)
      .map((s) => ({
        ...s,
        fullName: STATE_NAMES[s.name] || s.name,
      }));

    return NextResponse.json(
      {
        states,
        giftCardBrands: toLeaderboard(brandCounts, brandAmounts),
        financialInstitutions: toLeaderboard(instCounts, instAmounts),
        dataTypes: dataTypeSummary,
        sources: sourceSummary,
        meta: {
          days,
          totalGiftCardReports: (gcResult.data || []).length,
          totalCaseIntakes: (intakeResult.data || []).length,
        },
      },
      { headers: { "cache-control": "no-store" } }
    );
  } catch (err) {
    console.error("Leaderboard API error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
