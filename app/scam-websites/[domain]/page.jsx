import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { notFound } from "next/navigation";

export const revalidate = 3600;

function extractDomain(url) {
  if (!url) return null;
  try {
    let clean = url.trim().toLowerCase();
    if (!clean.startsWith("http")) clean = "https://" + clean;
    const u = new URL(clean);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();
  }
}

function formatScamType(t) {
  return (t || "Unknown")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getDomainData(domain) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("case_intakes")
    .select("id, suspect_website, scam_type, created_at, amount, story, suspect_name, suspect_email, suspect_phone")
    .not("suspect_website", "is", null)
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error || !data) return null;

  const matching = data.filter((row) => {
    const d = extractDomain(row.suspect_website);
    return d === domain;
  });

  if (matching.length === 0) return null;

  const scamTypes = new Set();
  const suspectNames = new Set();
  const suspectEmails = new Set();
  const suspectPhones = new Set();
  let totalLost = 0;
  let firstReported = matching[0].created_at;
  let latestReport = matching[0].created_at;

  for (const row of matching) {
    if (row.scam_type) scamTypes.add(row.scam_type);
    if (row.suspect_name) suspectNames.add(row.suspect_name);
    if (row.suspect_email) suspectEmails.add(row.suspect_email);
    if (row.suspect_phone) suspectPhones.add(row.suspect_phone);
    if (row.amount) totalLost += Number(row.amount) || 0;
    if (row.created_at < firstReported) firstReported = row.created_at;
    if (row.created_at > latestReport) latestReport = row.created_at;
  }

  return {
    domain,
    reports: matching,
    totalReports: matching.length,
    scamTypes: [...scamTypes],
    suspectNames: [...suspectNames].slice(0, 5),
    suspectEmails: [...suspectEmails].slice(0, 5),
    suspectPhones: [...suspectPhones].slice(0, 5),
    totalLost,
    firstReported,
    latestReport,
  };
}

export async function generateMetadata({ params }) {
  const domain = decodeURIComponent(params.domain);
  return {
    title: `Is ${domain} a Scam? — Reports & Reviews | ScamComplaints`,
    description: `Check if ${domain} is a scam. Read reports from victims, see scam type details, and file your own report. ScamComplaints scam website database.`,
    keywords: `${domain} scam, is ${domain} legit, ${domain} reviews, ${domain} fraud, ${domain} complaints, ${domain} scam report`,
    openGraph: {
      title: `Is ${domain} a Scam? — ScamComplaints.org`,
      description: `Reports and reviews for ${domain}. Check before you buy.`,
      siteName: "ScamComplaints",
      type: "website",
    },
    alternates: { canonical: `/scam-websites/${domain}` },
  };
}

export default async function DomainPage({ params }) {
  const domain = decodeURIComponent(params.domain);
  const data = await getDomainData(domain);

  if (!data) {
    notFound();
  }

  const riskLevel =
    data.totalReports >= 5
      ? { label: "High Risk", color: "red", bg: "bg-red-100", text: "text-red-700" }
      : data.totalReports >= 2
        ? { label: "Moderate Risk", color: "orange", bg: "bg-orange-100", text: "text-orange-700" }
        : { label: "Reported", color: "yellow", bg: "bg-yellow-100", text: "text-yellow-700" };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/50 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:py-18">
          <Link
            href="/scam-websites"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
          >
            ← Back to Scam Websites List
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white sm:text-4xl break-all">
              {domain}
            </h1>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${riskLevel.bg} ${riskLevel.text}`}>
              ⚠️ {riskLevel.label}
            </span>
          </div>

          <p className="mt-3 text-base text-slate-300">
            This website has been reported <strong className="text-white">{data.totalReports} time{data.totalReports !== 1 ? "s" : ""}</strong> to
            ScamComplaints
            {data.totalLost > 0 && (
              <> with total reported losses of <strong className="text-red-400">${data.totalLost.toLocaleString()}</strong></>
            )}
            . First reported on {formatDate(data.firstReported)}.
          </p>
        </div>
      </section>

      {/* Summary cards */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{data.totalReports}</p>
            <p className="text-xs text-slate-500">Reports Filed</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">
              {data.totalLost > 0 ? `$${data.totalLost.toLocaleString()}` : "—"}
            </p>
            <p className="text-xs text-slate-500">Total Reported Losses</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">
              {data.scamTypes.length > 0 ? formatScamType(data.scamTypes[0]) : "—"}
            </p>
            <p className="text-xs text-slate-500">Primary Scam Type</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{formatDate(data.latestReport)}</p>
            <p className="text-xs text-slate-500">Latest Report</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Reports column */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Victim Reports ({data.totalReports})
            </h2>
            <div className="mt-4 space-y-4">
              {data.reports.slice(0, 20).map((r, i) => (
                <div
                  key={r.id || i}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {r.scam_type && (
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                          {formatScamType(r.scam_type)}
                        </span>
                      )}
                      {r.amount > 0 && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          Lost ${Number(r.amount).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatDate(r.created_at)}
                    </span>
                  </div>
                  {r.story && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-4">
                      {r.story}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {data.totalReports > 20 && (
              <p className="mt-4 text-sm text-slate-400">
                Showing 20 of {data.totalReports} reports.
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24 space-y-6">
              {/* Report CTA */}
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5 text-center">
                <h3 className="font-semibold text-red-900">
                  Were you scammed by {domain}?
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Add your report to help warn others and build a stronger case.
                </p>
                <a
                  href="/report-fraudulent-website"
                  className="mt-3 inline-block rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Report This Website
                </a>
              </div>

              {/* Known details */}
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Known Details</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-slate-400">Domain</dt>
                    <dd className="font-medium text-slate-900">{domain}</dd>
                  </div>
                  {data.scamTypes.length > 0 && (
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Scam Types</dt>
                      <dd className="text-slate-700">
                        {data.scamTypes.map(formatScamType).join(", ")}
                      </dd>
                    </div>
                  )}
                  {data.suspectNames.length > 0 && (
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Associated Names</dt>
                      <dd className="text-slate-700">{data.suspectNames.join(", ")}</dd>
                    </div>
                  )}
                  {data.suspectEmails.length > 0 && (
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Associated Emails</dt>
                      <dd className="text-slate-700 break-all">{data.suspectEmails.join(", ")}</dd>
                    </div>
                  )}
                  {data.suspectPhones.length > 0 && (
                    <div>
                      <dt className="text-xs font-medium text-slate-400">Associated Phones</dt>
                      <dd className="text-slate-700">{data.suspectPhones.join(", ")}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Protection tips */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">Protect Yourself</h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-800">
                  <li>• Contact your bank immediately if you sent money</li>
                  <li>• File a chargeback with your credit card company</li>
                  <li>• Change passwords if you created an account</li>
                  <li>• Report to <a href="https://reportfraud.ftc.gov" className="underline" target="_blank" rel="noopener">FTC</a> and <a href="https://ic3.gov" className="underline" target="_blank" rel="noopener">FBI IC3</a></li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Is {domain} a scam?
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Based on {data.totalReports} report{data.totalReports !== 1 ? "s" : ""} filed with ScamComplaints,{" "}
              <strong>{domain}</strong> has been flagged as a potentially fraudulent website.
              {data.totalLost > 0 && (
                <> Victims have reported combined losses of ${data.totalLost.toLocaleString()}.</>
              )}
            </p>
            <p>
              If you&apos;re considering doing business with this website, we recommend extreme
              caution. Check for the warning signs of scam websites: recently registered domains,
              no real contact information, prices that are too good to be true, and limited payment
              options. Always use a credit card (for chargeback protection) rather than wire transfers,
              cryptocurrency, or payment apps.
            </p>
            <p>
              If you&apos;ve already been scammed by {domain}, file a report above to warn others
              and strengthen the evidence against this operation. The more reports filed, the
              faster fraudulent websites get shut down.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
