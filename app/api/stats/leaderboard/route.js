// app/api/stats/leaderboard/route.js
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

/* ── Normalisation maps ── */

const PAYMENT_NORM = {
  "cash app": "Cash App", cashapp: "Cash App",
  venmo: "Venmo", paypal: "PayPal", zelle: "Zelle",
  "bank / wire transfer": "Bank / Wire Transfer",
  "bank transfer": "Bank / Wire Transfer",
  bank_transfer: "Bank / Wire Transfer",
  "wire transfer": "Bank / Wire Transfer",
  wire: "Bank / Wire Transfer",
  cryptocurrency: "Cryptocurrency", crypto_btc: "Cryptocurrency",
  "gift card": "Gift Card", apple_gift_card: "Gift Card",
  cash: "Cash", check: "Check",
};

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

const STATE_ABBREV = {};
for (const [abbr, name] of Object.entries(STATE_NAMES)) {
  STATE_ABBREV[name.toLowerCase()] = abbr;
}

function normalizeState(raw) {
  if (!raw) return null;
  const s = raw.trim();
  const upper = s.toUpperCase();
  if (STATE_NAMES[upper]) return upper;
  const abbr = STATE_ABBREV[s.toLowerCase()];
  if (abbr) return abbr;
  if (/^[A-Za-z]{2}$/.test(s)) return upper;
  return null;
}

function normalizePayment(raw) {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  return PAYMENT_NORM[key] || raw.trim();
}

const FINANCIAL_INSTITUTIONS = new Set([
  "Cash App", "Venmo", "PayPal", "Zelle",
  "Bank / Wire Transfer", "Cryptocurrency",
]);

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
  imported: "Imported",
  ScamHatersUnited: "ScamHaters United",
};

/**
 * Dynamically discover all distinct source values in the case_intakes table.
 * Falls back to a static list if the query fails.
 */
async function discoverSources(supa, cutoffISO) {
  try {
    // Supabase JS doesn't support SELECT DISTINCT, so we use a grouped approach:
    // Pull source values from recent records (limited scan).
    const { data, error } = await supa
      .from("case_intakes")
      .select("source")
      .gte("created_at", cutoffISO)
      .not("source", "is", null)
      .neq("source", "")
      .limit(50000);

    if (error || !data) {
      console.error("discoverSources error:", error);
      return ["submitted", "scf_verified", "3p_chainabuse", "3p_cryptolegal", "user_submitted", "imported", "bulk-import"];
    }

    const unique = [...new Set(data.map((r) => r.source).filter(Boolean))];
    return unique.length > 0
      ? unique
      : ["submitted", "scf_verified", "3p_chainabuse", "3p_cryptolegal", "user_submitted", "imported", "bulk-import"];
  } catch (err) {
    console.error("discoverSources exception:", err);
    return ["submitted", "scf_verified", "3p_chainabuse", "3p_cryptolegal", "user_submitted", "imported", "bulk-import"];
  }
}

/* ── Count helper: uses Supabase head:true to get count without data ── */
async function countWhere(supa, table, filters = {}, cutoffISO) {
  let q = supa.from(table).select("id", { count: "exact", head: true });
  if (cutoffISO) q = q.gte("created_at", cutoffISO);
  for (const [col, val] of Object.entries(filters)) {
    if (val === "NOT_NULL") {
      q = q.not(col, "is", null).neq(col, "");
    } else {
      q = q.eq(col, val);
    }
  }
  const { count, error } = await q;
  if (error) return 0;
  return count || 0;
}

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

    // ═══════════════════════════════════════════════════════════
    //  1. Gift card reports (small table — pull all rows is fine)
    // ═══════════════════════════════════════════════════════════
    const gcResult = await supa
      .from("giftcard_reports")
      .select("gift_card_brand, retailer, purchase_state, amount, purchase_date, created_at")
      .or(`purchase_date.gte.${cutoffISO},created_at.gte.${cutoffISO}`)
      .limit(50000);

    if (gcResult.error) throw gcResult.error;

    const stateCounts = new Map();
    const stateAmounts = new Map();
    const brandCounts = new Map();
    const brandAmounts = new Map();

    for (const row of gcResult.data || []) {
      const st = normalizeState(row.purchase_state);
      if (st) {
        stateCounts.set(st, (stateCounts.get(st) || 0) + 1);
        if (row.amount > 0) stateAmounts.set(st, (stateAmounts.get(st) || 0) + Number(row.amount));
      }
      const brand = (row.gift_card_brand || "").trim();
      if (brand && brand.toLowerCase() !== "unknown" && brand.toLowerCase() !== "other") {
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
        if (row.amount > 0) brandAmounts.set(brand, (brandAmounts.get(brand) || 0) + Number(row.amount));
      }
    }

    // State data from case_intakes (few records have state set)
    const intakeStateResult = await supa
      .from("case_intakes")
      .select("state, amount")
      .not("state", "is", null)
      .neq("state", "")
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

    // ═══════════════════════════════════════════════════════════
    //  2. Financial institutions (from payment_methods — small subset)
    //     Most scraped records don't have payment_methods, so the
    //     1000-row default is fine here.
    // ═══════════════════════════════════════════════════════════
    const instCounts = new Map();
    const instAmounts = new Map();

    const pmResult = await supa
      .from("case_intakes")
      .select("payment_methods, amount")
      .not("payment_methods", "is", null)
      .gte("created_at", cutoffISO)
      .limit(50000);

    if (!pmResult.error) {
      for (const row of pmResult.data || []) {
        const methods = Array.isArray(row.payment_methods) ? row.payment_methods : [];
        const amt = row.amount > 0 ? Number(row.amount) : 0;
        for (const m of methods) {
          const norm = normalizePayment(m);
          if (!norm || norm === "No Money Sent") continue;
          if (FINANCIAL_INSTITUTIONS.has(norm)) {
            instCounts.set(norm, (instCounts.get(norm) || 0) + 1);
            if (amt > 0) instAmounts.set(norm, (instAmounts.get(norm) || 0) + amt);
          }
        }
      }
    }

    // Add gift card count from giftcard_reports
    const gcTotal = (gcResult.data || []).length;
    if (gcTotal > 0) {
      instCounts.set("Gift Card", (instCounts.get("Gift Card") || 0) + gcTotal);
      let gcAmtTotal = 0;
      for (const row of gcResult.data || []) {
        if (row.amount > 0) gcAmtTotal += Number(row.amount);
      }
      if (gcAmtTotal > 0) instAmounts.set("Gift Card", (instAmounts.get("Gift Card") || 0) + gcAmtTotal);
    }

    // ═══════════════════════════════════════════════════════════
    //  3. Data Intelligence — use COUNT queries (no row limit!)
    //     One count query per field × source combination
    // ═══════════════════════════════════════════════════════════

    // 3a. Get total case_intakes count
    const totalIntakeCount = await countWhere(supa, "case_intakes", {}, cutoffISO);

    // 3b. Dynamically discover all sources and count each
    const discoveredSources = await discoverSources(supa, cutoffISO);
    const sourceCountPromises = discoveredSources.map(async (src) => {
      const count = await countWhere(supa, "case_intakes", { source: src }, cutoffISO);
      return { source: src, count };
    });
    const sourceCounts = (await Promise.all(sourceCountPromises)).filter((s) => s.count > 0);

    // 3c. For each source × field, get non-null count
    const fieldCountPromises = [];
    for (const { source, count: totalReports } of sourceCounts) {
      for (const { field } of DATA_FIELDS) {
        fieldCountPromises.push(
          countWhere(supa, "case_intakes", { source, [field]: "NOT_NULL" }, cutoffISO)
            .then((n) => ({ source, field, count: n }))
        );
      }
    }
    const fieldCounts = await Promise.all(fieldCountPromises);

    // 3d. Also get overall per-field totals
    const totalFieldPromises = DATA_FIELDS.map(({ field }) =>
      countWhere(supa, "case_intakes", { [field]: "NOT_NULL" }, cutoffISO)
        .then((n) => ({ field, count: n }))
    );
    const totalFieldCounts = await Promise.all(totalFieldPromises);

    // Build data type summary
    const dataTypeSummary = DATA_FIELDS.map(({ field, label, icon }) => {
      const match = totalFieldCounts.find((f) => f.field === field);
      return { key: field, label, icon, total: match ? match.count : 0 };
    }).filter((d) => d.total > 0);

    // Build source summary
    const sourceMap = {};
    for (const { source, count } of sourceCounts) {
      sourceMap[source] = { _reports: count };
      for (const { field } of DATA_FIELDS) sourceMap[source][field] = 0;
    }
    for (const { source, field, count } of fieldCounts) {
      if (sourceMap[source]) sourceMap[source][field] = count;
    }

    const sourceSummary = Object.entries(sourceMap)
      .sort((a, b) => b[1]._reports - a[1]._reports)
      .map(([src, counts]) => ({
        source: src,
        label: SOURCE_LABELS[src] || src.replace(/^3p_/, "").replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        reports: counts._reports,
        ...Object.fromEntries(DATA_FIELDS.map(({ field }) => [field, counts[field]])),
      }));

    // Also add gift card reports to source summary if present
    const gcReportCount = (gcResult.data || []).length;
    if (gcReportCount > 0) {
      sourceSummary.push({
        source: "3p_giftcard",
        label: SOURCE_LABELS["3p_giftcard"],
        reports: gcReportCount,
        ...Object.fromEntries(DATA_FIELDS.map(({ field }) => [field, 0])),
      });
    }

    // ═══════════════════════════════════════════════════════════
    //  4. Build response
    // ═══════════════════════════════════════════════════════════
    const toLeaderboard = (countMap, amountMap, limit = 50) =>
      Array.from(countMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count, amount: Math.round(amountMap.get(name) || 0) }));

    const states = toLeaderboard(stateCounts, stateAmounts).map((s) => ({
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
          totalGiftCardReports: gcReportCount,
          totalCaseIntakes: totalIntakeCount,
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
