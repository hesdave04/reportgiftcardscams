import XmlSidebar from "../components/XmlSidebar";

export const metadata = {
  title: "Trust & Security",
  description:
    "How ScamComplaints.org handles your data, what we show publicly, and how verified partners can request access.",
  alternates: { canonical: "/trust" },
};

function IconShield() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3zm0 4.1L7 7.1V11c0 3.7 2.3 7.5 5 8.8 2.7-1.3 5-5.1 5-8.8V7.1l-5-1z" />
      <path d="M10.5 12.9l-1.7-1.7-1.4 1.4 3.1 3.1 6.1-6.1-1.4-1.4z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17 8V7a5 5 0 10-10 0v1H5v14h14V8h-2zm-8 0V7a3 3 0 016 0v1H9zm3 5a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 5C7 5 2.7 8 1 12c1.7 4 6 7 11 7s9.3-3 11-7c-1.7-4-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function IconScale() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l4 4h-3v6.3l5.7 5.7-1.4 1.4L12 14.7l-5.3 5.7-1.4-1.4L11 12.3V6H8l4-4z" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V7h3.5L13 3.5z" />
    </svg>
  );
}
function IconKey() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 7a5 5 0 10.8 9.943l2.829 2.828 1.414-1.414-2.829-2.828A4.98 4.98 0 0014 7zm-3 5a2 2 0 110-4 2 2 0 010 4z" />
      <path d="M21 7h-4v2h2v2h2z" />
    </svg>
  );
}

export default function TrustPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
              <IconShield /> TRUST & SECURITY
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
              Built for transparency, privacy, and responsible sharing
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              We collect scam and fraud reports to help victims, investigators,
              and law enforcement identify patterns and hold scammers
              accountable. Sensitive data is encrypted. Access to personal
              information is limited and auditable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/case-builder"
                className="inline-flex items-center justify-center rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-colors"
              >
                Submit a report
              </a>
              <a
                href="/#reports"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
              >
                View public stream
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="mx-auto max-w-5xl px-4 pb-4 pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconLock />
              <h3 className="font-semibold">Data encrypted at rest</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Sensitive information like payment details and personal identifiers
              are encrypted using AES-256-GCM before storage.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconEye />
              <h3 className="font-semibold">Public data is anonymized</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Public views show only aggregated patterns and masked details. No
              raw personal data is ever exposed publicly.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconScale />
              <h3 className="font-semibold">Purpose-limited use</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              We use data solely to expose scam patterns, support
              investigations, and protect potential victims. No marketing or
              resale.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconDoc />
              <h3 className="font-semibold">Auditable exports</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Access for law enforcement and verified partners is controlled by
              API keys with audit logging.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">How it works</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">STEP 1</div>
              <div className="mt-1 text-slate-900">Tell your story</div>
              <p className="mt-2 text-sm text-slate-600">
                Describe what happened in your own words, or use voice input. Our
                AI extracts key details automatically.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">STEP 2</div>
              <div className="mt-1 text-slate-900">
                Confirm & add details
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Review what we found in your story — scam type, platforms,
                payment methods, scammer info. Edit anything that needs fixing.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">STEP 3</div>
              <div className="mt-1 text-slate-900">Encrypted & shared</div>
              <p className="mt-2 text-sm text-slate-600">
                Your report is encrypted and stored securely. Aggregated data
                helps identify patterns. Verified partners can access structured
                exports for investigations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who sees what */}
      <section className="mx-auto max-w-5xl px-4 py-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Who sees what</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-2">Information</th>
                  <th className="px-4 py-2">Public View</th>
                  <th className="px-4 py-2">Verified Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-2 text-slate-700">Your story</td>
                  <td className="px-4 py-2 text-slate-500">Not shown</td>
                  <td className="px-4 py-2 text-slate-700">
                    Full text (for case building)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">Scam type & platform</td>
                  <td className="px-4 py-2 text-slate-700">
                    Aggregated stats only
                  </td>
                  <td className="px-4 py-2 text-slate-700">Full detail</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">
                    Payment details & amounts
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    Aggregated totals
                  </td>
                  <td className="px-4 py-2 text-slate-700">Full detail</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">
                    Scammer identifiers
                  </td>
                  <td className="px-4 py-2 text-slate-500">Not shown</td>
                  <td className="px-4 py-2 text-slate-700">
                    Shown (for investigations)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">
                    Gift card numbers
                  </td>
                  <td className="px-4 py-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs">
                      •••• last4
                    </span>
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    Full number (decrypted)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
            <IconKey />
            <span>
              Exports require a valid API key via header{" "}
              <code className="font-mono">x-api-key</code>.
            </span>
          </div>
        </div>
      </section>

      {/* XML Access */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              XML access for verified partners
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Generate a cURL command to download structured report data.
              Optional filters available.
            </p>

            <div className="mt-4">
              <XmlSidebar />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Endpoint & Authentication
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <dt className="w-32 text-slate-600">Endpoint</dt>
                <dd className="font-mono text-xs break-all">/api/xml</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="w-32 text-slate-600">Auth</dt>
                <dd className="text-slate-800">
                  Send a header <code className="font-mono">x-api-key</code>{" "}
                  with your issued key.
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt className="w-32 text-slate-600">Filters</dt>
                <dd className="text-slate-800">
                  <code className="font-mono text-xs">retailer</code>,{" "}
                  <code className="font-mono text-xs">since (YYYY-MM-DD)</code>.
                </dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
              <p>
                <strong>Note:</strong> API keys are revocable. Export activity
                may be logged for abuse prevention.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
