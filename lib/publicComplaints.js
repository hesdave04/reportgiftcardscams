// lib/publicComplaints.js — government complaint counts (FTC Do Not Call + FCC Consumer Complaints) for a phone number,
// read from CFIP. Informational only: these are unverified consumer complaints and robocallers spoof real numbers,
// so they never count as "scam reports" and never change a verdict. Both datasets are US public-domain data; attribute them.

export const PUBLIC_COMPLAINT_SOURCES = {
  ftc: { label: 'FTC Do Not Call complaints', url: 'https://www.ftc.gov/policy-notices/open-government/data-sets/do-not-call-data' },
  fcc: { label: 'FCC Consumer Complaints', url: 'https://opendata.fcc.gov/Consumer/CGB-Consumer-Complaints-Data/3xyp-aqkj' },
};

// CFIP phone `response` -> { ftc, fcc, total, callback, last_reported, topic } or null when neither feed has complaints.
export function publicComplaintsFromCfip(r) {
  if (!r || typeof r !== 'object') return null;
  const ftc = Number(r.ftc_complaints?.count_90d || 0);
  const fcc = Number(r.fcc_complaints?.count_90d || 0);
  if (!ftc && !fcc) return null;
  const dates = [r.ftc_complaints?.last_reported, r.fcc_complaints?.last_reported].filter(Boolean).map((d) => new Date(d)).filter((d) => !isNaN(d));
  const last = dates.length ? new Date(Math.max(...dates)).toISOString() : null;
  const topic = r.fcc_complaints?.topic || r.ftc_complaints?.subject || null;
  return {
    ftc,
    fcc,
    total: ftc + fcc,
    callback: Number(r.fcc_complaints?.callback_count || 0),
    last_reported: last,
    topic: topic && !/^(other|unknown)( services)?$/i.test(topic) ? topic.replace(/ Services$/, '') : null,
    window_days: 90,
  };
}

// 10-digit NANP number from a search query, or null.
export function phoneE164FromQuery(q) {
  const s = String(q || '').trim();
  if (!/^[\d\s().+-]+$/.test(s)) return null;
  const d = s.replace(/\D/g, '');
  const d10 = d.length === 10 ? d : d.length === 11 && d[0] === '1' ? d.slice(1) : null;
  return d10 && /^[2-9]\d{2}[2-9]\d{6}$/.test(d10) ? `+1${d10}` : null;
}

// US toll-free numbers (800/833/844/855/866/877/888): scammers often spoof them and many belong to real companies,
// so reports about them are shown with a caveat (David 2026-10-29; same rule as CallerTap / CFIP 020).
export function isTollFree(e164) {
  return /^\+1(800|833|844|855|866|877|888)\d{7}$/.test(String(e164 || ''));
}

export const TOLL_FREE_CAVEAT =
  'This is a toll-free number. Scammers often spoof toll-free numbers, and many belong to real companies, so treat these reports as a warning sign, not proof.';
