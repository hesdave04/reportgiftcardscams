import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Ransomware | Computer Locked & Data Encrypted — ScamComplaints",
  description: "Report ransomware attacks that locked your computer or encrypted your files. Document the attack to help cybersecurity researchers and law enforcement.",
  keywords: "report ransomware, ransomware attack, computer locked, files encrypted, ransomware help, report ransomware attack, data held hostage, ransom payment",
  openGraph: {
    title: "Report Ransomware Attacks — ScamComplaints.org",
    description: "File a ransomware attack report. Help track criminal operations and protect others.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-ransomware" },
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
      "@id": "https://scamcomplaints.org/report-ransomware/#webpage",
      "url": "https://scamcomplaints.org/report-ransomware",
      "name": "Report a Ransomware | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-ransomware/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-ransomware/#breadcrumb",
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
          "name": "Report Ransomware",
          "item": "https://scamcomplaints.org/report-ransomware"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Ransomware Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-red-400">ransomware attack.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Ransomware attacks cost Americans and businesses over $59 million in ransom payments in 2023, but the total economic impact — including downtime, data loss, and recovery — is estimated at billions. If your computer, phone, or business network has been locked or your files encrypted with a ransom demand, report it here and find help.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="ransomware"
              title="Quick ransomware report"
              subtitle="Document the attack. Include the ransom note text if you can."
              fields={[
          { name: "platform", label: "What was affected?", type: "select", required: true, options: [
            { value: "personal_computer", label: "Personal computer" }, { value: "phone", label: "Phone / tablet" },
            { value: "business", label: "Business network / servers" }, { value: "website", label: "Website" },
            { value: "cloud", label: "Cloud storage / SaaS" }, { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the ransom note, what files were affected, how you think you were infected, and any cryptocurrency wallet address in the ransom demand." },
          { name: "companyName", label: "Ransomware name (if shown)", type: "text", placeholder: "e.g., LockBit, REvil, STOP/Djvu" },
          { name: "amountLost", label: "Ransom demanded (USD)", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
          { name: "walletAddress", label: "Bitcoin/crypto wallet in ransom note", type: "text", expandable: true, placeholder: "bc1... or 0x... address from the ransom demand" },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report ransomware?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Security researchers use reports to develop free decryption tools
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Bitcoin wallet addresses in ransom notes help trace criminal networks
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Reports help the FBI and CISA take down ransomware infrastructure
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-500">→</span>
                    Pattern data helps organizations prepare and protect their networks
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h3 className="text-sm font-semibold text-red-900">How ransomware infects systems</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-red-800">
                  <li>• Phishing email with a malicious attachment (Word doc, PDF, ZIP)</li>
                  <li>• Clicking a link to a compromised or malicious website</li>
                  <li>• Using weak or stolen passwords (especially for remote desktop)</li>
                  <li>• Outdated software with known security vulnerabilities</li>
                  <li>• Infected USB drives or external devices</li>
                  <li>• Compromised software updates (supply chain attacks)</li>
                  <li>• Exploited VPN or remote access without multi-factor authentication</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$32.3M</span>
                <p className="text-xs text-slate-500">reported ransomware losses in 2025 (FBI IC3)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">159%</span>
                <p className="text-xs text-slate-500">year-over-year increase from 2024</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">4,000+</span>
                <p className="text-xs text-slate-500">ransomware complaints in 2025</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#17</span>
                <p className="text-xs text-slate-500">seventeenth-highest loss category</p>
              </div>
                </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How ransomware works — and what to do if you're attacked</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Ransomware is malicious software that encrypts your files or locks your computer, then demands payment (usually in cryptocurrency)
              for the decryption key. The FBI received 2,825 ransomware complaints in 2023 with reported losses exceeding $59 million in ransom
              payments alone. But the true cost — including business downtime, data loss, IT recovery, and reputational damage — is estimated at
              over $20 billion annually in the United States.
            </p>
            <p>
              Most ransomware infections begin with a <strong>phishing email</strong> containing a malicious attachment or link. An employee clicks
              a document that appears to be an invoice or shipping notification, and the ransomware silently encrypts files across the network.
              Within hours, a ransom note appears demanding cryptocurrency payment. Modern ransomware gangs also practice &quot;double extortion&quot;
              — stealing data before encrypting it and threatening to publish it if the ransom isn&apos;t paid.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Should you pay the ransom?
            </h3>
            <p>
              The FBI recommends against paying ransoms because payment funds criminal operations and doesn&apos;t guarantee you&apos;ll get your
              data back. Studies show that only about 65% of victims who pay actually receive a working decryption key, and 80% of those who
              pay are attacked again. However, the decision is complex for businesses facing existential data loss. Before paying, check{" "}
              <a href="https://www.nomoreransom.org" className="font-medium text-red-600 underline" target="_blank" rel="noopener">
                No More Ransom
              </a>{" "}
              — a coalition of cybersecurity companies that has developed free decryption tools for many ransomware variants.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Immediate steps after a ransomware attack
            </h3>
            <p>
              <strong>1. Disconnect from the network</strong> — unplug ethernet and disable WiFi to prevent spread. <strong>2. Don&apos;t
              turn off the computer</strong> — some ransomware variants store keys in RAM. <strong>3. Take a photo of the ransom note</strong>
              including any wallet addresses. <strong>4. Report to FBI IC3</strong> and CISA (cisa.gov/stopransomware). <strong>5. Contact
              a cybersecurity professional</strong> before attempting any recovery. <strong>6. Check No More Ransom</strong> for free
              decryption tools. Backup your data regularly and keep backups offline — it&apos;s the single best defense against ransomware.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — file a ransomware complaint — the FBI has a dedicated ransomware task force</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>CISA</strong> — cisa.gov/stopransomware — Cybersecurity & Infrastructure Security Agency ransomware resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>No More Ransom</strong> — nomoreransom.org — check for free decryption tools before paying anything</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span><strong>Your IT team or a cybersecurity firm</strong> — professional incident response can limit damage and aid recovery</span>
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
              <a href="/report-phishing-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Phishing Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-business-email-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Business Email Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-crypto-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Crypto Scam</span>
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
