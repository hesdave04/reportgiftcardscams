import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report a Tech Support Scam | Fake Computer Support — ScamComplaints",
  description: "Report tech support scams, fake virus warnings, and fraudulent computer repair services. Someone gained remote access to your computer? Report it now.",
  keywords: "report tech support scam, fake Microsoft support, computer virus scam, remote access scam, tech support fraud report, fake Apple support scam, computer popup scam",
  openGraph: {
    title: "Report Tech Support Scams — ScamComplaints.org",
    description: "Report fake tech support calls, virus popups, and remote access fraud. Protect others from computer scams.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-tech-support-scam" },
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
      "@id": "https://scamcomplaints.org/report-tech-support-scam/#webpage",
      "url": "https://scamcomplaints.org/report-tech-support-scam",
      "name": "Report a Tech Support Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-tech-support-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-tech-support-scam/#breadcrumb",
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
          "name": "Report Tech Support Scam",
          "item": "https://scamcomplaints.org/report-tech-support-scam"
        }
      ]
    }
  ]
}` }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Tech Support Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-blue-400">tech support scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            That popup screaming about a virus? The call from "Microsoft" saying your computer is compromised? The refund that needs you to log into your bank? All scams. Tech support fraud tricks people into paying for fake problems or handing over remote access to their computers — giving scammers a direct window into bank accounts, passwords, and personal files. Report it here.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="tech_support_scam"
              title="Quick tech support scam report"
              subtitle="Report the scam in under 2 minutes. Have screenshots of the popup?"
              fields={[
          { name: "impersonated", label: "Company they claimed to be", type: "select", required: true, options: [
            { value: "microsoft", label: "Microsoft" }, { value: "apple", label: "Apple" },
            { value: "google", label: "Google" }, { value: "amazon", label: "Amazon" },
            { value: "isp", label: "Internet provider (ISP)" }, { value: "bank", label: "A bank" },
            { value: "antivirus", label: "Antivirus / security company" }, { value: "other", label: "Other" },
          ]},
          { name: "contactMethod", label: "How did this start?", type: "select", required: true, options: [
            { value: "popup", label: "Popup / browser warning" }, { value: "phone_call", label: "They called me" },
            { value: "i_called", label: "I called a number from a popup" }, { value: "email", label: "Email" },
            { value: "search_result", label: "Fake search result / ad" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe what they told you, what they did on your computer, and how they asked for payment." },
          { name: "phoneNumber", label: "Phone number they used", type: "text", expandable: true, placeholder: "e.g., 1-888-555-0123" },
          { name: "remoteAccess", label: "Did they access your computer remotely?", type: "select", expandable: true, placeholder: "Select...", options: [
            { value: "yes_anydesk", label: "Yes — AnyDesk" }, { value: "yes_teamviewer", label: "Yes — TeamViewer" },
            { value: "yes_other", label: "Yes — other software" }, { value: "no", label: "No" }, { value: "unsure", label: "Not sure" },
          ]},
          { name: "amountLost", label: "Amount lost", type: "text", expandable: true, placeholder: "e.g., 500", inputMode: "decimal" },
        ]}
            />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report tech support scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    The same phone numbers and popups target thousands of people
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    Reporting helps browser companies block malicious popup domains
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    Phone carriers can flag or disconnect fraudulent numbers
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    Your report may prevent an elderly family member's next call
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="text-sm font-semibold text-blue-900">Tech support scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-blue-800">
                  <li>• Unexpected popup warning of a virus or security breach</li>
                  <li>• Pop-up includes a phone number to call for "support"</li>
                  <li>• Caller claims to be from Microsoft, Apple, or your ISP</li>
                  <li>• Asks you to download remote access software (AnyDesk, TeamViewer)</li>
                  <li>• Wants payment in gift cards, crypto, or wire transfer</li>
                  <li>• Claims they need to access your bank to "process a refund"</li>
                  <li>• Creates fake urgency — "your data is being stolen right now"</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Tech support scam statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$924M</span>
                <p className="text-xs text-slate-500">lost to tech support scams in 2023 (FBI)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">60+</span>
                <p className="text-xs text-slate-500">age group most frequently targeted</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$26K</span>
                <p className="text-xs text-slate-500">average loss for victims over age 60</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">3x</span>
                <p className="text-xs text-slate-500">increase in tech support scams since 2020</p>
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
          <h2 className="text-2xl font-bold text-slate-900">Inside the tech support scam industry</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Tech support scams are a billion-dollar global industry operating
              out of organized call centers, primarily in South Asia. The FBI's
              Internet Crime Complaint Center reported $924 million in losses in
              2023 — and that figure only captures reported cases. The scams come
              in two flavors: outbound calls to random phone numbers claiming to
              be Microsoft or Apple, and browser-based pop-ups designed to mimic
              virus warnings and drive victims to call a fake support number.
            </p>
            <p>
              Once connected, the scammer walks you through granting remote
              access to your computer, usually through legitimate tools like
              AnyDesk, TeamViewer, or UltraViewer. With remote access, they run
              harmless Windows commands (like Event Viewer logs) and present
              normal system events as evidence of "hacking." Then comes the
              pitch: a one-time cleanup fee of $299, or a "protection plan" for
              $499/year. Payment by gift card, wire transfer, or cryptocurrency
              is the tell — legitimate companies don't operate this way.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              The "refund" scam variant
            </h3>
            <p>
              The most dangerous tech support scams don't start with a virus
              warning — they start with a refund. You receive an email claiming
              your tech support subscription is being renewed for $399 and to
              call to cancel. When you call, the "agent" asks to access your
              computer to process the refund. They then ask you to log into
              your bank account — claiming they need to verify the refund went
              through. While you're logged in, they use remote access to
              transfer money out of your account or modify what you see on
              screen to make it look like they accidentally refunded too much,
              pressuring you to "send back" the overage via gift cards or wire
              transfer.
            </p>
            <p>
              This variant is particularly devastating because victims are
              interacting with their own real bank account and believe
              everything they're seeing on screen. Losses frequently exceed
              $10,000. If you've given someone remote access to your computer
              while your bank was open, contact your bank immediately, change
              all passwords from a different device, and file a report.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Immediate steps if you've been scammed
            </h3>
            <p>
              If you've given remote access to a scammer: disconnect from the
              internet immediately (unplug your router or disable Wi-Fi). Run a
              full malware scan with a trusted tool like Malwarebytes. Change
              every password you can think of — email, banking, social media —
              from a <em>different</em> device. Contact your bank if you logged
              in during the remote session. Then{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                file a full report
              </a>{" "}
              with every detail you remember: the phone number, what software
              they used, what they said, and how they asked for payment.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report tech support scams</h3>
            <p className="mt-2 text-sm text-slate-600">Report to multiple agencies to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — federal database for all consumer fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — especially for losses involving remote access and bank fraud</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>Microsoft</strong> — microsoft.com/reportascam — report Microsoft impersonation directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-500">→</span>
                <span><strong>Your bank</strong> — contact immediately if you logged into banking during a remote session</span>
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
              <a href="/report-government-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Government Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-elder-fraud" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Elder Fraud</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-phishing-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Phishing Scam</span>
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
