import ReportFraudulentWebsiteClient from "./ReportFraudulentWebsiteClient";

export const metadata = {
  title:
    "Report a Fraudulent Website | Scam Site & Phishing URL Database — ScamComplaints",
  description:
    "Report scam websites, phishing URLs, and fraudulent domains. Your submission helps protect others and supports law enforcement takedown efforts. Free, anonymous reporting.",
  keywords:
    "report fraudulent website, report scam website, phishing site report, fake website report, scam URL database, report phishing URL, fraudulent domain report",
  openGraph: {
    title: "Report a Fraudulent Website — ScamComplaints.org",
    description:
      "Submit scam websites and phishing domains to our public database. Protect others from fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-red-300 backdrop-blur">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Report Fraudulent Websites
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a scam website
            <br />
            <span className="text-red-400">before it traps someone else.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Spotted a website impersonating a bank, a fake online store, or a
            phishing page disguised as a login form? Report it here. Every
            submission feeds a public database that helps browsers flag
            dangerous URLs, lets law enforcement build cases, and warns other
            consumers before they hand over personal information.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <ReportFraudulentWebsiteClient />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  What happens after you submit?
                </h3>
                <ol className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                      1
                    </span>
                    Your report enters our public scam database
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                      2
                    </span>
                    The URL is flagged for review and cross-referenced
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                      3
                    </span>
                    Data is shared with browser safety programs and investigators
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-sm font-semibold text-amber-900">
                  Common types of fraudulent websites
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
                  <li>• Phishing pages mimicking banks or email providers</li>
                  <li>• Fake online stores that never ship products</li>
                  <li>• Tech-support scam pop-ups</li>
                  <li>• Clone sites imitating government agencies</li>
                  <li>• Cryptocurrency "investment" platforms</li>
                  <li>• Fake job boards harvesting personal data</li>
                </ul>
              </div>

              <div className="text-xs text-slate-400">
                <p>
                  Want to file a more detailed complaint?{" "}
                  <a href="/case-builder" className="underline hover:text-slate-600">
                    Use our full report builder →
                  </a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            Why reporting fraudulent websites matters
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              A single phishing site can stay live for less than 48 hours and
              still steal hundreds of login credentials. That narrow window is
              exactly why speed matters. When you report a scam website through
              ScamComplaints.org, the URL enters a public record that browser
              safety teams, hosting providers, and law enforcement agencies can
              act on. The faster a fraudulent domain gets flagged, the shorter
              its lifespan—and the fewer people it hurts.
            </p>
            <p>
              Fraudsters register domains in bulk. A common tactic is to spin up
              a near-identical copy of a legitimate site—swapping one letter in
              the domain name or adding a hyphen—and blast the link out through
              text messages, emails, or social media ads. You might land on what
              looks exactly like your bank's login page, type in your
              credentials, and only realize something was off when unauthorized
              charges start appearing days later. Reporting the URL here creates
              a paper trail that helps investigators connect the dots between
              these throwaway domains and the networks behind them.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              How to spot a scam website
            </h3>
            <p>
              There's no single red flag that catches every fake site, but a few
              patterns show up over and over. Watch for domain names that don't
              quite match the brand they claim to be—something like
              "amaz0n-secure-login.com" instead of "amazon.com." Check whether
              the site has a working contact page, a physical address, and
              consistent branding. Run a WHOIS lookup on the domain: if it was
              registered last week and claims to be a company with 20 years of
              history, that's a problem.
            </p>
            <p>
              Price-too-good-to-be-true storefronts are another giveaway. Fake
              e-commerce sites often list luxury goods at 80% off, accept only
              wire transfers or cryptocurrency, and have product descriptions
              that read like they were lifted from a different retailer entirely.
              If you've already made a purchase and nothing has shipped, the site
              you bought from belongs in this database.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              What to include in your report
            </h3>
            <p>
              The more detail you provide, the more useful the report becomes.
              At a minimum, paste the full URL—not just the homepage, but the
              specific page where the scam occurs. If the site asked you to
              enter personal information, note what fields were requested. If
              you received a link to the site via email or text, mention that
              too. Screenshots are helpful but not required for a quick
              submission; if you have them, consider using our{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                full report builder
              </a>{" "}
              where you can upload files and provide a detailed timeline.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Where else to report a scam website
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Filing here is a great start, but casting a wider net helps. These
              agencies accept online fraud reports:
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span>
                  <strong>FTC</strong> — reportfraud.ftc.gov
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span>
                  <strong>FBI IC3</strong> — ic3.gov
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span>
                  <strong>Google Safe Browsing</strong> — safebrowsing.google.com/safebrowsing/report_phish
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-red-500">→</span>
                <span>
                  <strong>Anti-Phishing Working Group</strong> — reportphishing@apwg.org
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
