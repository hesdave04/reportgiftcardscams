import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Phishing Scam | Email, Text & Banking Fraud — ScamComplaints",
  description: "Report phishing emails, smishing texts, and fake banking pages. Received a suspicious email or text pretending to be your bank? Report it here.",
  keywords: "report phishing scam, phishing email report, fake bank email, smishing report, phishing text report, bank fraud phishing, fake login page report",
  openGraph: {
    title: "Report Phishing Scams — ScamComplaints.org",
    description: "Report phishing emails, fake bank texts, and credential-stealing pages. Protect others from identity theft.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-phishing-scam" },
};

export default function Page() {
  return (
    <>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://scamcomplaints.org/report-phishing-scam/#webpage",
      "url": "https://scamcomplaints.org/report-phishing-scam",
      "name": "Report a Phishing Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-phishing-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-phishing-scam/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://scamcomplaints.org"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Scam Types",
          "item": "https://scamcomplaints.org/scams"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Report Phishing Scam",
          "item": "https://scamcomplaints.org/report-phishing-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Phishing Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-sky-400">phishing scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Phishing is the most common entry point for identity theft, account takeover, and financial fraud. That text from "your bank" about suspicious activity. The email from "Netflix" saying your payment failed. The fake USPS delivery notice. They all lead to credential-stealing pages designed to capture your login, password, and personal information. Report the message, URL, and sender here to help others recognize the same attack.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="phishing_scam"
              title="Quick phishing report"
              subtitle="Report the phishing message in under 2 minutes. Have the original email or text?"
              fields={[
          { name: "phishingType", label: "Type of phishing", type: "select", required: true, options: [
            { value: "email", label: "Phishing email" }, { value: "sms_text", label: "Text message (smishing)" },
            { value: "phone_call", label: "Phone call (vishing)" }, { value: "fake_login", label: "Fake login page" },
            { value: "social_dm", label: "Social media DM" }, { value: "qr_code", label: "QR code phishing (quishing)" },
            { value: "other", label: "Other" },
          ]},
          { name: "impersonated", label: "Who are they impersonating?", type: "text", required: true, placeholder: "e.g., Chase Bank, Netflix, USPS, PayPal" },
          { name: "description", label: "What did the message say?", type: "textarea", required: true, rows: 4, placeholder: "Paste or describe the message. What did it claim? Where did the link go?" },
          { name: "phishingUrl", label: "Suspicious URL (if applicable)", type: "text", expandable: true, placeholder: "e.g., chase-verify-account.com" },
          { name: "senderAddress", label: "Sender email or phone number", type: "text", expandable: true, placeholder: "e.g., support@chase-alert.xyz or +1-555-123-4567" },
          { name: "infoCompromised", label: "What info did you enter (if any)?", type: "text", expandable: true, placeholder: "e.g., email + password, credit card number, SSN" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report phishing?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    The same phishing campaign hits thousands of people simultaneously
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Reported URLs can be blocked by browser safe browsing programs
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Email providers use reports to improve spam filters
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Your report may prevent someone else from clicking the same link
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
                <h3 className="text-sm font-semibold text-sky-900">Phishing red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-sky-800">
                  <li>• Unexpected email/text about account problems or suspicious activity</li>
                  <li>• Sender address doesn't match the company's real domain</li>
                  <li>• Urgency — "your account will be suspended in 24 hours"</li>
                  <li>• Link goes to a URL that's similar but not the real company domain</li>
                  <li>• Asks you to "verify" by entering login credentials or personal info</li>
                  <li>• Generic greeting ("Dear Customer") instead of your actual name</li>
                  <li>• Spelling errors, weird formatting, or blurry logos</li>
                  <li>• Attachment you didn't request (especially .zip, .html, or .exe files)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Phishing statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">300K+</span>
                <p className="text-xs text-slate-500">phishing reports to the FBI IC3 in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">most common cybercrime type for 5 consecutive years</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">36%</span>
                <p className="text-xs text-slate-500">of all data breaches involve phishing</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$52M</span>
                <p className="text-xs text-slate-500">direct financial losses from phishing (FBI IC3)</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">Phishing: the most common cybercrime in the world</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Phishing has been the most frequently reported cybercrime to the
              FBI's Internet Crime Complaint Center for five consecutive years,
              with over 300,000 reports in 2023 alone. The direct financial
              losses are significant — $52 million reported to IC3 — but the
              real cost is far higher because phishing is the gateway to other
              crimes. A stolen email password leads to account takeover. A
              captured banking login leads to drained accounts. A harvested SSN
              leads to <a href="/report-identity-theft" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">identity theft</a> that can take years to untangle.
            </p>
            <p>
              Modern phishing attacks are nearly indistinguishable from
              legitimate communications. A well-crafted phishing email from
              "Chase Bank" will use the correct logo, formatting, and tone.
              The fake login page it links to will look pixel-perfect. The URL
              will be close — "chase-securelogin.com" instead of "chase.com."
              Even security-savvy people get caught when they're distracted,
              stressed, or just clicking through email quickly at the end of
              a long day.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Smishing: phishing by text message
            </h3>
            <p>
              Text-based phishing ("smishing") has surged because people are
              more likely to trust and click links in texts than emails. Common
              smishing attacks include fake USPS/FedEx delivery notifications
              ("Your package couldn't be delivered — click here to reschedule"),
              fake bank alerts ("Suspicious activity detected on your account"),
              and fake toll or parking fine notices. The links lead to pages that
              capture credit card numbers, login credentials, or personal
              information. If you received one of these texts, report it here
              with the phone number and URL.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              What to do if you clicked a phishing link
            </h3>
            <p>
              If you entered credentials on a phishing page, change your
              password for that account immediately — ideally from a different
              device. If you use the same password anywhere else, change those
              too. Enable two-factor authentication. If you entered financial
              information (credit card, bank account), call your bank or card
              issuer immediately to freeze the card and dispute any charges.
              If you entered your SSN, place a fraud alert at one of the three
              credit bureaus. Then{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                file a detailed report
              </a>{" "}
              — include the original message, the URL, and what information you
              entered.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report phishing</h3>
            <p className="mt-2 text-sm text-slate-600">Report phishing to these organizations:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>Anti-Phishing Working Group</strong> — Forward phishing emails to reportphishing@apwg.org</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — especially if you lost money or personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>Google Safe Browsing</strong> — safebrowsing.google.com/safebrowsing/report_phish — blocks the URL in Chrome</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related scam types */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <h2 className="text-lg font-bold text-slate-900">Related scam types</h2>
          <p className="mt-1 text-sm text-slate-500">Scammers often combine tactics. If this looks familiar, check these too:</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a href="/report-identity-theft" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Identity Theft</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-business-email-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Business Email Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
          </div>
          <p className="mt-5 text-center text-sm text-slate-500">
            <a href="/scams" className="font-medium text-red-600 hover:text-red-700 underline decoration-red-200 underline-offset-2">View all scam types &rarr;</a>
          </p>
        </div>
      </section>
    </>
  );
}
