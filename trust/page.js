export const metadata = {
  title: 'Trust & Security — Gift Card Reporter',
  description:
    'How we handle data, what we show publicly, and how verified partners can request access.',
};

function IconShield() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3zm0 4.1L7 7.1V11c0 3.7 2.3 7.5 5 8.8 2.7-1.3 5-5.1 5-8.8V7.1l-5-1z" />
      <path d="M10.5 12.9l-1.7-1.7-1.4 1.4 3.1 3.1 6.1-6.1-1.4-1.4z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8V7a5 5 0 10-10 0v1H5v14h14V8h-2zm-8 0V7a3 3 0 016 0v1H9zm3 5a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 5C7 5 2.7 8 1 12c1.7 4 6 7 11 7s9.3-3 11-7c-1.7-4-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function IconScale() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l4 4h-3v6.3l5.7 5.7-1.4 1.4L12 14.7l-5.3 5.7-1.4-1.4L11 12.3V6H8l4-4z" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 2h8l4 4v14a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm7 1.5V7h3.5L13 3.5z" />
    </svg>
  );
}
function IconKey() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
              We collect gift card reports to help victims, retailers, resellers, and law enforcement investigate
              misuse. Full numbers are never shown publicly. Access to sensitive data is limited and auditable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
              >
                Submit a report
              </a>
              <a
                href="/#reports"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
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
              <h3 className="font-semibold">Sensitive data encrypted</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Gift card numbers are encrypted at rest and in transit. Only vetted export paths can retrieve plaintext.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconEye />
              <h3 className="font-semibold">Public view is masked</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              The public stream shows only the last 4 digits with context. No raw numbers, ever.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconScale />
              <h3 className="font-semibold">Purpose-limited use</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              We use data solely to prevent abuse and support investigations. No marketing or resale.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-800">
              <IconDoc />
              <h3 className="font-semibold">Auditable exports</h3>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Access for law enforcement and retailers is controlled by API keys with basic audit logging.
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
              <div className="mt-1 text-slate-900">Submit a report</div>
              <p className="mt-2 text-sm text-slate-600">
                Reporter provides retailer, masked gift card number, amount, and context.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">STEP 2</div>
              <div className="mt-1 text-slate-900">Encryption & hashing</div>
              <p className="mt-2 text-sm text-slate-600">
                We encrypt full numbers and store only a hash + last 4 for the public feed.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">STEP 3</div>
              <div className="mt-1 text-slate-900">Controlled sharing</div>
              <p className="mt-2 text-sm text-slate-600">
                Verified partners can request XML exports to aid investigations, subject to terms.
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
                  <th className="px-4 py-2">Field</th>
                  <th className="px-4 py-2">Public Stream</th>
                  <th className="px-4 py-2">Export (Verified)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-2 text-slate-700">Gift card number</td>
                  <td className="px-4 py-2"><span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs">•••• last4</span></td>
                  <td className="px-4 py-2 text-slate-700">Full number (decrypted)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">Retailer</td>
                  <td className="px-4 py-2 text-slate-700">Shown</td>
                  <td className="px-4 py-2 text-slate-700">Shown</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">Amount</td>
                  <td className="px-4 py-2 text-slate-700">Shown</td>
                  <td className="px-4 py-2 text-slate-700">Shown</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">Reporter & recipient details</td>
                  <td className="px-4 py-2 text-slate-700">Not shown</td>
                  <td className="px-4 py-2 text-slate-700">Shown (for due diligence)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-slate-700">Notes / context</td>
                  <td className="px-4 py-2 text-slate-700">Truncated</td>
                  <td className="px-4 py-2 text-slate-700">Full text</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
            <IconKey />
            <span>
              Exports require a valid API key via header <code className="font-mono">x-api-key</code>.
            </span>
          </div>
        </div>
      </section>

      {/* XML Access for Verified Partners */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">XML access for verified partners</h2>
          <p className="mt-2 text-sm text-slate-600">
            Law enforcement, retailers, and resellers can request access. Provide your organization details and intended use.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">ENDPOINT</div>
              <div className="mt-1 font-mono text-xs text-slate-800 break-all">/api/xml</div>
              <div className="mt-2 text-xs text-slate-600">
                Auth via header <code className="font-mono">x-api-key: YOUR_XML_API_KEY</code>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-500">EXAMPLE</div>
              <pre className="mt-2 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100"><code>
curl -H "x-api-key: YOUR_XML_API_KEY" "https://YOUR-DOMAIN/api/xml?retailer=Amazon&amp;since=2025-01-01" -o giftcard_reports.xml
</code></pre>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <p><strong>Note:</strong> API keys are revocable. Export activity may be logged for abuse prevention.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Do you ever show full card numbers publicly?</span>
                <span className="ml-2 text-slate-500 group-open:rotate-180 transition">
                  ▾
                </span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                No. The public feed shows only the last 4 digits. Full numbers are encrypted and only available via authorized export.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Who can request XML access?</span>
                <span className="ml-2 text-slate-500 group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Verified law enforcement, retailers, and resellers with a legitimate need. Requests are reviewed and may be denied.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">How do you protect against spam or abuse?</span>
                <span className="ml-2 text-slate-500 group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                We use rate limiting and visible CAPTCHA on submissions. Suspicious activity may be throttled and reviewed.
              </p>
            </details>
            <details className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">Can a reporter remove their submission?</span>
                <span className="ml-2 text-slate-500 group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Yes. Contact us with the email used and the last 4 digits. We will validate and process removals where appropriate.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2 text-sm text-slate-600">
            For access requests or questions about our handling of data, email us:
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-800">
            <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 13L2 6.76V18a2 2 0 002 2h16a2 2 0 002-2V6.76L12 13z"/><path d="M22 6a2 2 0 00-2-2H4a2 2 0 00-2 2l10 6 10-6z"/></svg>
            <a href="mailto:support@example.com" className="hover:underline">support@example.com</a>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Please do not email full card numbers. Share only the last 4 digits by email.
          </div>
        </div>
      </section>
    </main>
  );
}
