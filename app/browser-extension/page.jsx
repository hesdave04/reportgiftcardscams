import Link from "next/link";

export const metadata = {
  title:
    "Browser Protect Extension — Real-Time Scam & Phishing Protection | ScamComplaints",
  description:
    "Install the free Browser Protect extension from SocialCatfish.com. Get real-time scam detection, phishing alerts, and safe browsing verification on every site you visit.",
  keywords:
    "browser protect extension, scam blocker, phishing protection, safe browsing extension, online identity verification, socialcatfish extension, chrome scam detector",
  openGraph: {
    title: "Browser Protect — Real-Time Scam & Phishing Protection",
    description:
      "Get instant scam alerts, phishing protection, and site verification as you browse. Free Chrome extension from SocialCatfish.com.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/browser-extension" },
};

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/browser-protect-socialcat/amogpigigfopedlnjdhaoiadclbfhobn";

const features = [
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Instant Site Verification",
    description:
      'Get a quick "Safe" or "Suspicious" signal the moment you land on any website. No manual lookups needed.',
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
    title: "Scam & Fraud Detection",
    description:
      "Real-time alerts for known phishing sites, fake stores, and impersonation risks — before you share any personal information.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
    title: "Smart Reporting Dashboard",
    description:
      "Track your browsing safety stats and report suspicious websites directly from your browser toolbar.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Privacy Protection",
    description:
      "Detects data misuse and warns you when sites attempt to collect information inappropriately. Your data stays private.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    title: "Fake Profile Detection",
    description:
      "Automatically identifies and blocks fake profiles on dating sites in real-time, powered by SocialCatfish.com's database.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    title: "Zero-Effort Protection",
    description:
      "Works silently in the background. No configuration needed — install it and you're protected from day one.",
  },
];

const protections = [
  { label: "Scam Blocker", desc: "Blocks known scam & fraud websites automatically" },
  { label: "Phishing Protection", desc: "Detects phishing attempts before you enter credentials" },
  { label: "Safe Browsing", desc: "Verifies site authenticity in real-time as you browse" },
  { label: "Identity Verification", desc: "Checks online identities against SocialCatfish.com data" },
];

export default function BrowserExtensionPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/60 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-sky-300 backdrop-blur">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              Free Chrome Extension · 5.0 ★ Rating
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Browse the web
              <br />
              <span className="text-sky-400">without the risk.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Browser Protect from SocialCatfish.com analyzes every site you visit
              in real-time — detecting scams, blocking phishing, and verifying
              authenticity so you can click with confidence.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-sky-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 hover:shadow-sky-400/30"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 6.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM3.19 7.5L7.1 14.3A5.5 5.5 0 019.05 8.2L6.55 3.85A10.42 10.42 0 003.19 7.5zm15.4-.92L16.95 8.2a5.5 5.5 0 011.95 6.1l3.91 1.25A10.45 10.45 0 0021.75 12c0-2-.56-3.86-1.54-5.42h-1.62zM12 17.5c-1.26 0-2.42-.42-3.35-1.13L5.22 18.3A10.42 10.42 0 0012 22.5a10.45 10.45 0 006.78-2.5H12z" />
                </svg>
                Add to Chrome — Free
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Learn More
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>5.0 rating</span>
              </div>
              <span className="text-slate-600">|</span>
              <span>89+ active users</span>
              <span className="text-slate-600">|</span>
              <span>v1.8</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-stretch justify-center gap-0 divide-x divide-slate-200 px-4 py-0">
          {protections.map((p) => (
            <div key={p.label} className="flex flex-col items-center px-6 py-6 text-center sm:w-1/4 w-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600 mb-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-900">{p.label}</p>
              <p className="mt-1 text-xs text-slate-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="features" className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Everything you need to stay safe online
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">
              Browser Protect works silently in the background, analyzing every
              page you visit and alerting you before you interact with a scam.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              How it works
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-500">
              Three steps. Zero configuration. Instant protection.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Install the extension",
                desc: "Click \"Add to Chrome\" — it takes under 5 seconds. No account required.",
              },
              {
                step: "2",
                title: "Browse normally",
                desc: "The extension runs silently in the background, analyzing every site in real-time.",
              },
              {
                step: "3",
                title: "Get instant alerts",
                desc: "If a site is suspicious, you'll get an immediate warning before you share any info.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-xl font-extrabold text-white shadow-lg shadow-sky-500/20">
                  {s.step}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy & Trust ── */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Your privacy comes first
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Your data is <strong>never sold</strong> to third parties
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Not used for purposes unrelated to the extension&apos;s core functionality
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Not used to determine creditworthiness or for lending purposes
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Built by <strong>Social Catfish LLC</strong> — a verified trader under EU regulations (DUNS: 121686689)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About the developer ── */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Built by SocialCatfish.com
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
              SocialCatfish.com is the internet&apos;s leading identity verification
              platform. With millions of searches performed, we help people verify
              who they&apos;re really talking to online. Browser Protect brings that
              same technology directly into your browser — for free.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Social Catfish LLC · 38770 Sky Canyon Drive STE A, Murrieta, CA 92563
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-slate-100 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            Start browsing safely today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
            Join thousands of users who browse with confidence. Install Browser
            Protect and get real-time protection from scams, phishing, and fake
            profiles.
          </p>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-sky-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 hover:shadow-sky-400/30"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 6.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zM3.19 7.5L7.1 14.3A5.5 5.5 0 019.05 8.2L6.55 3.85A10.42 10.42 0 003.19 7.5zm15.4-.92L16.95 8.2a5.5 5.5 0 011.95 6.1l3.91 1.25A10.45 10.45 0 0021.75 12c0-2-.56-3.86-1.54-5.42h-1.62zM12 17.5c-1.26 0-2.42-.42-3.35-1.13L5.22 18.3A10.42 10.42 0 0012 22.5a10.45 10.45 0 006.78-2.5H12z" />
            </svg>
            Add to Chrome — It&apos;s Free
          </a>
        </div>
      </section>
    </>
  );
}
