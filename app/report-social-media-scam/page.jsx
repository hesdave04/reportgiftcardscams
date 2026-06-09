import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report Social Media Scams | Instagram, TikTok & Facebook Fraud — ScamComplaints",
  description: "Report scams on Instagram, TikTok, Facebook, Twitter/X, and other social media platforms. From fake giveaways to hacked accounts. File a report.",
  keywords: "report social media scam, Instagram scam, TikTok scam, Facebook scam, Twitter scam, social media fraud, fake giveaway, hacked account scam",
  openGraph: {
    title: "Report Social Media Scams — ScamComplaints.org",
    description: "File a report about scams on Instagram, TikTok, Facebook, Twitter/X, and other platforms.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-social-media-scam" },
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-sky-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            Social Media Scam Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report a
            <br />
            <span className="text-sky-400">social media scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            Social media platforms are the #1 starting point for online scams, accounting for $1.9 billion in fraud losses in 2023. From fake giveaways and hacked accounts to DM scams and fraudulent ads, every major platform has a scam problem. If you encountered fraud on Instagram, TikTok, Facebook, Twitter/X, Snapchat, or any other platform, report it here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="social_media_scam"
              title="Quick social media scam report"
              subtitle="Help get scam accounts removed and protect other users."
              fields={[
          { name: "platform", label: "Which platform?", type: "select", required: true, options: [
            { value: "instagram", label: "Instagram" }, { value: "tiktok", label: "TikTok" },
            { value: "facebook", label: "Facebook" }, { value: "twitter", label: "Twitter / X" },
            { value: "snapchat", label: "Snapchat" }, { value: "youtube", label: "YouTube" },
            { value: "linkedin", label: "LinkedIn" }, { value: "telegram", label: "Telegram" },
            { value: "discord", label: "Discord" }, { value: "other", label: "Other" },
          ]},
          { name: "fakeName", label: "Scam account username", type: "text", required: true, placeholder: "e.g., @fakeaccount123" },
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the scam — was it a fake giveaway, a DM scam, a hacked friend's account, a fraudulent ad?" },
          { name: "websiteUrl", label: "Link to the scam post or profile", type: "text", expandable: true, placeholder: "https://..." },
          { name: "amountLost", label: "Amount lost (if any)", type: "text", placeholder: "e.g., 300", inputMode: "decimal", expandable: true },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report social media scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Social media scam accounts often have thousands of followers — your report triggers review
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Fake giveaway scams use the same template across hundreds of accounts
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Reports help platforms improve their automated fraud detection
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sky-500">→</span>
                    Documenting the scam profile helps protect the next person they message
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
                <h3 className="text-sm font-semibold text-sky-900">Social media scam red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-sky-800">
                  <li>• "You've been selected" DM from a brand you follow — but it's a fake account</li>
                  <li>• Friend's hacked account sending you a "vote for me" or investment link</li>
                  <li>• Celebrity giveaway requiring you to send crypto or pay a "fee" to claim</li>
                  <li>• Ad for a product at an impossibly low price with no reviews</li>
                  <li>• "DM me for details" on income opportunity posts</li>
                  <li>• Account created recently with suspiciously high follower counts</li>
                  <li>• Links that redirect to unfamiliar websites</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">$1.9B</span>
                <p className="text-xs text-slate-500">lost to scams starting on social media (FTC, 2023)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">#1</span>
                <p className="text-xs text-slate-500">contact method for scams (ahead of phone, email, text)</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">70%</span>
                <p className="text-xs text-slate-500">of people contacted via social media lost money</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">25-34</span>
                <p className="text-xs text-slate-500">age group most targeted on social media</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How social media scams work — the $1.9 billion fraud epidemic</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              Social media has become the most lucrative hunting ground for scammers. The FTC reported that fraud originating on social media
              platforms caused $1.9 billion in losses in 2023, making it the #1 contact method for scams — ahead of phone calls, emails, and
              texts. An alarming 70% of people who were contacted by a scammer through social media ended up losing money.
            </p>
            <p>
              The reasons are structural: social media platforms provide scammers with free, unlimited access to billions of potential victims,
              sophisticated targeting tools (through ads), credibility signals (follower counts, verified-looking profiles), and the ability to
              impersonate real people and brands convincingly. Adults ages 25–34 are the most targeted demographic, contrary to the common
              belief that only older users fall for scams.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Common social media scam types
            </h3>
            <p>
              <strong>Fake giveaways</strong> impersonate celebrities or brands and ask you to pay a &quot;shipping fee&quot; or send crypto
              to claim a prize. <strong>Hacked account scams</strong> send messages from a compromised friend asking for money or promoting
              a &quot;great investment.&quot; <strong>Fraudulent ads</strong> sell products that never arrive or redirect to phishing sites.
              <strong>DM recruitment scams</strong> offer income opportunities that require an upfront &quot;investment.&quot; <strong>Romance
              scams</strong> begin with a follow or DM from an attractive stranger. <strong>Influencer impersonation</strong> creates fake
              accounts mimicking real creators to sell counterfeit products or run scams.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              Protecting yourself on social media
            </h3>
            <p>
              Be skeptical of any DM from someone you don&apos;t know personally, even if the account looks legitimate. Verify giveaways by
              checking the official brand&apos;s website. If a friend sends an unusual message, call or text them separately to confirm their
              account wasn&apos;t hacked. Never click links in DMs. For ads, search for the product on Google to check if the store is
              legitimate. And remember: no legitimate giveaway or business opportunity requires you to pay money or send cryptocurrency first.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer fraud tracking on social media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>The platform</strong> — report the scam account directly on Instagram, TikTok, Facebook, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — for scams involving significant financial loss</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-sky-500">→</span>
                <span><strong>BBB Scam Tracker</strong> — bbb.org/scamtracker — track and expose social media scam operations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
