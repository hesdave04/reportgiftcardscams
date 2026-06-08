export const metadata = {
  title: "Privacy Policy — ScamComplaints",
  description:
    "How ScamComplaints.org collects, uses, and protects your data when you submit a scam report.",
};

export default function PrivacyPage() {
  const lastUpdated = "June 7, 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-10 space-y-10 text-slate-600 leading-relaxed">
        {/* Intro */}
        <section>
          <p>
            ScamComplaints.org (&quot;we,&quot; &quot;us,&quot; or &quot;the
            platform&quot;) is operated by Social Catfish, Inc. This Privacy
            Policy explains what information we collect when you use our website
            and how we use and protect it.
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            1. Information We Collect
          </h2>
          <p className="mt-3">
            When you submit a scam report through our Case Builder or Quick
            Report form, we may collect:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Scam details</strong> — your written description of what
              happened, scam type, platforms involved, payment methods used, and
              dates
            </li>
            <li>
              <strong>Financial information</strong> — gift card numbers,
              cryptocurrency wallet addresses, payment amounts, and transaction
              details
            </li>
            <li>
              <strong>Suspect information</strong> — names, email addresses,
              phone numbers, usernames, wallet addresses, and website URLs
              associated with the scammer
            </li>
            <li>
              <strong>Technical data</strong> — your IP address (for rate
              limiting and fraud prevention) and basic browser information
            </li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> collect your real name, home address,
            Social Security number, or bank account information unless you
            voluntarily include it in your story.
          </p>
        </section>

        {/* 2. How We Use Your Information */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            2. How We Use Your Information
          </h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              To store and process your scam report for public awareness and
              investigative purposes
            </li>
            <li>
              To display aggregated or anonymized scam data on the Wall of Shame
              and other public pages
            </li>
            <li>
              To provide law enforcement with structured data exports (XML) upon
              request or through our public data access tools
            </li>
            <li>
              To detect and prevent abuse of our platform (rate limiting, bot
              detection)
            </li>
            <li>
              To improve the platform and identify scam patterns
            </li>
          </ul>
        </section>

        {/* 3. Data Security */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            3. Data Security
          </h2>
          <p className="mt-3">
            We take the security of your data seriously:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Encryption</strong> — Sensitive financial data (e.g., gift
              card numbers) is encrypted using AES-256-GCM before storage.
              Only the last 4 digits are stored in plaintext for reference.
            </li>
            <li>
              <strong>Hashing</strong> — Card numbers are also stored as
              HMAC-SHA256 hashes for secure lookups without exposing the full
              number.
            </li>
            <li>
              <strong>Hosting</strong> — Our application is hosted on Vercel
              with data stored in Supabase (PostgreSQL). Both providers maintain
              SOC 2 compliance and encrypt data at rest and in transit.
            </li>
            <li>
              <strong>Rate limiting</strong> — API endpoints are rate-limited to
              prevent abuse and automated attacks.
            </li>
          </ul>
        </section>

        {/* 4. Data Sharing */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            4. Data Sharing
          </h2>
          <p className="mt-3">
            We may share report data in the following circumstances:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Public display</strong> — Confirmed scam reports may
              appear on the Wall of Shame with scammer details (not victim
              details) visible
            </li>
            <li>
              <strong>Law enforcement</strong> — Structured data may be shared
              with law enforcement agencies investigating fraud
            </li>
            <li>
              <strong>XML export</strong> — Aggregated report data is available
              in XML format for research and investigative purposes
            </li>
          </ul>
          <p className="mt-3">
            We do <strong>not</strong> sell your data to third parties, use it
            for advertising, or share it with data brokers.
          </p>
        </section>

        {/* 5. Your Rights */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            5. Your Rights
          </h2>
          <p className="mt-3">You have the right to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-sm">
            <li>
              <strong>Request deletion</strong> — Ask us to delete your
              submitted report by contacting us with your reference ID
            </li>
            <li>
              <strong>Access your data</strong> — Request a copy of any data
              associated with your report
            </li>
            <li>
              <strong>Correction</strong> — Request corrections to inaccurate
              information in your report
            </li>
          </ul>
          <p className="mt-3">
            For California residents: Under the CCPA, you have additional rights
            regarding your personal information. We do not sell personal
            information.
          </p>
        </section>

        {/* 6. Cookies & Analytics */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            6. Cookies & Analytics
          </h2>
          <p className="mt-3">
            We use Google reCAPTCHA to protect our forms from bots. reCAPTCHA
            may set cookies and collect usage data subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:text-brand-accent-hover"
            >
              Google&apos;s Privacy Policy
            </a>
            . We do not currently use other analytics or tracking tools on this
            site.
          </p>
        </section>

        {/* 7. Children */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            7. Children&apos;s Privacy
          </h2>
          <p className="mt-3">
            This site is not intended for use by children under 13. We do not
            knowingly collect information from children under 13. If you believe
            a child has submitted a report, please contact us.
          </p>
        </section>

        {/* 8. Changes */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            8. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time. The
            &quot;Last updated&quot; date at the top of this page reflects the
            most recent revision.
          </p>
        </section>

        {/* 9. Contact */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            9. Contact Us
          </h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy or want to exercise
            your rights, contact us at:{" "}
            <a
              href="mailto:info@socialcatfish.com"
              className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:text-brand-accent-hover"
            >
              info@socialcatfish.com
            </a>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Social Catfish, Inc.
            <br />
            ScamComplaints.org
          </p>
        </section>
      </div>
    </div>
  );
}
