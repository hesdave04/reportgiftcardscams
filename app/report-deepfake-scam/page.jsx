import QuickScamReport from "@/app/components/QuickScamReport";

export const metadata = {
  title: "Report AI Deepfake Scams | Fake Video & Voice Fraud — ScamComplaints",
  description: "Report AI deepfake scams involving fake videos, cloned voices, and AI-generated impersonations used for fraud. Help track this emerging threat.",
  keywords: "report deepfake scam, AI scam, deepfake fraud, fake video scam, voice cloning scam, AI impersonation, report AI fraud, deepfake celebrity scam",
  openGraph: {
    title: "Report AI Deepfake Scams — ScamComplaints.org",
    description: "File a report about AI-generated deepfake scams. Track fake video and voice cloning fraud.",
    siteName: "ScamComplaints",
    type: "website",
  },
  alternates: { canonical: "/report-deepfake-scam" },
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
      "@id": "https://scamcomplaints.org/report-deepfake-scam/#webpage",
      "url": "https://scamcomplaints.org/report-deepfake-scam",
      "name": "Report a Deepfake Scam | ScamComplaints",
      "isPartOf": {
        "@id": "https://scamcomplaints.org/#website"
      },
      "breadcrumb": {
        "@id": "https://scamcomplaints.org/report-deepfake-scam/#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://scamcomplaints.org/report-deepfake-scam/#breadcrumb",
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
          "name": "Report Deepfake Scam",
          "item": "https://scamcomplaints.org/report-deepfake-scam"
        }
      ]
    }
  ]
}` }}
      />
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-fuchsia-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-fuchsia-300 backdrop-blur">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            AI Deepfake Reporting
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Report an
            <br />
            <span className="text-fuchsia-400">AI deepfake scam.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            39% of online scam victims in 2023 were targeted using AI deepfake technology. Scammers use AI to create fake video calls, clone voices of family members, generate celebrity endorsements for fake investments, and produce realistic fake explicit images. Warren Buffett called AI scams the "biggest growth industry of all time." Report deepfake fraud here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <QuickScamReport
              scamTypeValue="deepfake_scam"
              title="Quick deepfake scam report"
              subtitle="Document the AI-generated content used in the scam."
              fields={[
          { name: "platform", label: "Type of deepfake used", type: "select", required: true, options: [
            { value: "video_call", label: "Fake video call (face swap)" }, { value: "voice_clone", label: "Cloned voice / AI phone call" },
            { value: "celebrity", label: "Fake celebrity endorsement" }, { value: "explicit", label: "AI-generated explicit images" },
            { value: "social_media", label: "Fake social media video/post" }, { value: "business", label: "Fake executive video (BEC)" },
            { value: "other", label: "Other" },
          ]},
          { name: "description", label: "What happened?", type: "textarea", required: true, rows: 4, placeholder: "Describe the deepfake content — who was impersonated, where you saw it, and what the scam was trying to achieve." },
          { name: "websiteUrl", label: "URL where deepfake appeared", type: "text", placeholder: "https://..." },
          { name: "fakeName", label: "Person impersonated", type: "text", expandable: true, placeholder: "e.g., Elon Musk, family member's name" },
          { name: "amountLost", label: "Amount lost (if any)", type: "text", placeholder: "e.g., 5000", inputMode: "decimal", expandable: true },
        ]}
            />
          </div>
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Why report deepfake scams?</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-fuchsia-500">→</span>
                    AI scam technology is evolving faster than detection tools — reports map the landscape
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fuchsia-500">→</span>
                    The same deepfake assets (videos, voices) are reused across multiple scam campaigns
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fuchsia-500">→</span>
                    Reports help platforms improve deepfake detection algorithms
                  </li>
                  <li className="flex gap-2">
                    <span className="text-fuchsia-500">→</span>
                    Law enforcement needs data on AI fraud patterns to develop enforcement strategies
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-5">
                <h3 className="text-sm font-semibold text-fuchsia-900">AI deepfake red flags</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-fuchsia-800">
                  <li>• Unusual skin tones, flickering, or inconsistent lighting in videos</li>
                  <li>• Lip movements slightly out of sync with speech</li>
                  <li>• Unnatural eye movements or blinking patterns</li>
                  <li>• Celebrity endorsing an investment opportunity (almost always fake)</li>
                  <li>• Voice of a family member calling from an unknown number in distress</li>
                  <li>• Video quality drops when the person moves their head or hands</li>
                  <li>• Background noise or audio quality inconsistencies</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-slate-900">Key statistics</h3>
                <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <span className="text-lg font-bold text-slate-900">39%</span>
                <p className="text-xs text-slate-500">of scam victims targeted by AI deepfakes in 2023</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">3,000%</span>
                <p className="text-xs text-slate-500">increase in deepfake fraud attempts since 2022</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">$25B+</span>
                <p className="text-xs text-slate-500">projected annual deepfake fraud losses by 2027</p>
              </div>
              <div>
                <span className="text-lg font-bold text-slate-900">5 sec</span>
                <p className="text-xs text-slate-500">of audio needed to clone someone's voice</p>
              </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">How AI deepfake scams work — the fastest-growing fraud threat</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            
            <p>
              AI-powered deepfake scams represent the fastest-growing threat in online fraud. Social Catfish&apos;s 2024 report found that
              39% of scam victims were targeted using AI deepfake technology, and the trend is accelerating. Warren Buffett called AI-powered
              scams the &quot;biggest growth industry of all time,&quot; and the data supports his warning — deepfake fraud attempts increased
              over 3,000% between 2022 and 2024.
            </p>
            <p>
              The technology has reached a point where a scammer needs only 5 seconds of someone&apos;s voice — easily pulled from a social
              media video — to create a convincing clone. Video deepfakes can now operate in real-time, allowing scammers to conduct live
              video calls while wearing someone else&apos;s face. This has devastated the reliability of video calls as an identity
              verification method, which was previously the gold standard for detecting romance scams and business fraud.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How deepfakes are used in scams
            </h3>
            <p>
              <strong>Celebrity endorsement scams</strong> use AI-generated videos of Elon Musk, Jeff Bezos, or other public figures promoting
              fake crypto investments. <strong>Voice cloning</strong> powers the evolved grandparent scam — a panicked voice that sounds exactly
              like your grandchild calls asking for bail money. <strong>Romance scam deepfakes</strong> create realistic video calls, eliminating
              the old red flag of &quot;they would never video chat.&quot; <strong>BEC deepfakes</strong> impersonate executives on video calls
              to authorize fraudulent wire transfers — one company lost $25 million in a single deepfake-enabled BEC attack in 2024.
            </p>

            <h3 class="pt-2 text-lg font-semibold text-slate-900">
              How to detect deepfakes
            </h3>
            <p>
              Look for subtle visual glitches: inconsistent skin tones, unusual shadows, teeth that blur or change shape, earrings that
              appear and disappear, hair that doesn&apos;t move naturally. Ask the person to turn their head to the side or place a hand
              in front of their face — real-time deepfakes often glitch with occlusion. For voice calls, use your family code word. For
              investment opportunities, remember: if a celebrity is promoting it through social media ads, it&apos;s almost certainly a scam.
              No legitimate investment needs a deepfake Elon Musk to sell it.
            </p>
        
          </div>
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Where else to report</h3>
            <p className="mt-2 text-sm text-slate-600">File in multiple places to maximize impact:</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-fuchsia-500">→</span>
                <span><strong>FBI IC3</strong> — ic3.gov — the FBI is actively building deepfake fraud databases and investigative capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-fuchsia-500">→</span>
                <span><strong>FTC</strong> — reportfraud.ftc.gov — for consumer protection tracking of AI fraud patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-fuchsia-500">→</span>
                <span><strong>The platform</strong> — report deepfake content on YouTube, Facebook, Instagram, etc. for removal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-fuchsia-500">→</span>
                <span><strong>Social Catfish</strong> — socialcatfish.com — use reverse image search to check if photos/videos are stolen or AI-generated</span>
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
              <a href="/report-impersonation-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Impersonation Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-sextortion-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Sextortion Scam</span>
                <span className="ml-auto text-slate-400 group-hover:text-red-500">&rarr;</span>
              </a>
              <a href="/report-romance-scam" className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
                <span className="text-sm font-medium text-slate-900 group-hover:text-red-600">Report Romance Scam</span>
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
