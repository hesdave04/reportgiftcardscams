import ReportFakeSocialMediaClient from "./ReportFakeSocialMediaClient";

export const metadata = {
  title:
    "Report a Fake Social Media Profile | Impersonation & Catfish Database — ScamComplaints",
  description:
    "Report fake Facebook, Instagram, TikTok, and dating profiles. Flag impersonators, catfish accounts, and social media scammers. Free public reporting tool.",
  keywords:
    "report fake social media profile, report fake Facebook account, report catfish profile, fake Instagram account report, social media impersonation report, report fake dating profile, report scammer profile, catfish scam report",
  openGraph: {
    title:
      "Report Fake Social Media Profiles — ScamComplaints.org",
    description:
      "Flag impersonation accounts and catfish profiles across every platform. Your report helps others avoid being deceived.",
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Report Fake Profiles
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a fake
            <br />
            <span className="text-purple-400">social media profile.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Someone pretending to be a soldier, a doctor, a celebrity, or even
            someone you know? Fake social media profiles are the starting
            point for romance scams, identity theft, and financial fraud.
            Reporting them here creates a searchable record that helps other
            people recognize the same fake identity before they get drawn in.
          </p>
        </div>
      </section>

      {/* Form + Content */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form column */}
          <div className="lg:col-span-3">
            <ReportFakeSocialMediaClient />
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Why report a fake profile?
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Warn others who may encounter the same fake identity
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Protect the real person whose photos are being stolen
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Help investigators link profiles across platforms
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">→</span>
                    Build evidence for platform takedown requests
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
                <h3 className="text-sm font-semibold text-purple-900">
                  Red flags for fake profiles
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-purple-800">
                  <li>• Model-quality photos but few personal posts</li>
                  <li>• Newly created account with limited history</li>
                  <li>• Claims to be military, a doctor, or oil rig worker</li>
                  <li>• Moves conversation off-platform quickly</li>
                  <li>• Avoids video calls or makes excuses</li>
                  <li>• Asks for money, gift cards, or crypto</li>
                  <li>• Stories that don't add up on closer inspection</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Supported platforms
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    "Facebook",
                    "Instagram",
                    "TikTok",
                    "Snapchat",
                    "X / Twitter",
                    "LinkedIn",
                    "WhatsApp",
                    "Telegram",
                    "Tinder",
                    "Bumble",
                    "Hinge",
                    "Other",
                  ].map((platform) => (
                    <span
                      key={platform}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            The anatomy of a fake social media profile
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Most people think they'd spot a fake profile immediately—until
              one actually targets them. The profiles used in modern scams are
              far more polished than the obvious fakes of ten years ago.
              Scammers curate stolen photos from real people's social media
              accounts, sometimes running them through AI tools to create
              slight variations that won't trigger reverse image searches.
              They'll build out a profile over weeks, posting lifestyle content,
              adding friends, and joining groups to manufacture credibility
              before ever reaching out to a target.
            </p>
            <p>
              The playbook varies depending on the endgame. Romance scammers
              typically build a deep emotional connection before introducing
              financial requests—usually framed as emergencies or investments.
              Business email compromise schemes use fake LinkedIn profiles to
              impersonate executives. Sextortion scammers create attractive
              profiles on dating apps, build intimacy quickly, then threaten to
              share screenshots. In every case, the fake profile is just a tool.
              Reporting it disrupts the infrastructure these operations depend on.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              How catfish scams work across platforms
            </h3>
            <p>
              A catfish operation usually starts on one platform and migrates to
              another. The initial contact might come through a Facebook friend
              request or an Instagram follow, but within days the scammer
              pushes the conversation to WhatsApp, Telegram, or Google Chat—
              where there's less platform oversight and messages are harder to
              trace. This platform-hopping makes it difficult for any single
              company's trust and safety team to see the full picture, which is
              why cross-platform reporting matters.
            </p>
            <p>
              When you submit a profile here, include every username and
              platform you've encountered the person on. If they told you their
              name was "Dr. James Wilson" on Facebook but used the handle
              "@jwilson_real" on Instagram and communicated through a WhatsApp
              number, all three data points help investigators and victims
              identify the same operation. The same stolen photos and cover
              stories get recycled across dozens of profiles, and connecting
              them is how patterns emerge.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-slate-900">
              Protecting the real people behind stolen photos
            </h3>
            <p>
              There's a second set of victims in every catfish scam: the people
              whose photos are being used. Real military service members, real
              doctors, real models find their images plastered across fake
              dating profiles and romance scam operations without their
              knowledge. Some discover it when strangers start messaging them
              asking about money they supposedly borrowed. Others never find
              out at all. If you've identified the real person whose photos are
              being misused, our{" "}
              <a
                href="/case-builder"
                className="font-medium text-red-600 underline decoration-red-300 underline-offset-2 hover:text-red-700"
              >
                full report builder
              </a>{" "}
              lets you include that context so it's documented alongside the
              fake profile.
            </p>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Report directly to platforms as well
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Filing here adds the profile to our public database. For fastest
              takedown, report directly to the platform too:
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span>
                  <strong>Facebook</strong> — use the "Report" button on the profile
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span>
                  <strong>Instagram</strong> — three-dot menu → Report → It's pretending to be someone else
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span>
                  <strong>Social Catfish</strong> — socialcatfish.com for reverse image searches
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-purple-500">→</span>
                <span>
                  <strong>FTC</strong> — reportfraud.ftc.gov for financial losses
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
