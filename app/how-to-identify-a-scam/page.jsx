import Link from "next/link";

export const metadata = {
  title: "How to Identify a Scam — 14 Warning Signs You Need to Know | ScamComplaints",
  description:
    "Learn the warning signs of online scams. This guide breaks down 14 red flags used across romance scams, investment fraud, phishing, and more — with real examples.",
  keywords:
    "how to identify a scam, scam warning signs, how to spot a scam, am I being scammed, signs of online fraud, how to tell if something is a scam, scam red flags",
  openGraph: {
    title: "How to Identify a Scam — 14 Warning Signs",
    description:
      "Know the red flags before you lose money. Practical guide to spotting scams online.",
    siteName: "ScamComplaints",
    type: "article",
  },
  alternates: { canonical: "/how-to-identify-a-scam" },
};

const WARNING_SIGNS = [
  {
    num: "01",
    title: "Urgency that doesn\u2019t make sense",
    body: `Scammers manufacture deadlines because thinking is their enemy. "Send money in the next hour or you\u2019ll lose your account." "The deal expires tonight." "I need bail money before the courthouse closes." Real businesses don\u2019t collapse because you took a day to think. Real emergencies from real people can be verified with a phone call to someone you already know. The moment you feel rushed, slow down \u2014 that pressure is the scam.`,
  },
  {
    num: "02",
    title: "Payment methods you can\u2019t reverse",
    body: `Gift cards, cryptocurrency, wire transfers, payment apps like Zelle or Cash App. These aren\u2019t just convenient for scammers \u2014 they\u2019re functionally untraceable. No legitimate business or government agency will ever ask you to pay in gift cards. If someone insists on a payment method that can\u2019t be charged back, that\u2019s not a preference. It\u2019s a requirement of their business model.`,
    link: "/report-gift-card-scam",
    linkText: "Report a gift card scam",
  },
  {
    num: "03",
    title: "They contacted you first",
    body: `Cold outreach is how the majority of scams begin. An unexpected text about a package delivery. A DM from someone attractive on Instagram. A LinkedIn recruiter with a vague but lucrative offer. A pop-up warning that your computer is infected. Scammers reach out to thousands of people knowing that a small percentage will engage. If you didn\u2019t initiate the contact, scrutinize everything that follows.`,
  },
  {
    num: "04",
    title: "The story has convenient gaps",
    body: `They\u2019re a doctor, but they can\u2019t video call because they\u2019re in a war zone. They want to buy your car, but they\u2019re out of state and will send a cashier\u2019s check. They\u2019re hiring immediately, but the interview is over Telegram. Every scam has a reason why normal verification steps can\u2019t happen. When someone\u2019s story has a built-in excuse for every request you might make, the story itself is the product.`,
    link: "/report-romance-scam",
    linkText: "Report a romance scam",
  },
  {
    num: "05",
    title: "Returns that beat the market",
    body: `No legitimate investment consistently returns 10% per week. Not crypto, not forex, not AI trading bots. If someone shows you a dashboard with a balance climbing steadily, that dashboard exists to keep you depositing. The returns aren\u2019t real until you withdraw them, and when you try, there will be fees, taxes, or verification holds \u2014 each requiring more money. That\u2019s the pig butchering playbook, and it accounts for billions in losses annually.`,
    link: "/report-pig-butchering-scam",
    linkText: "Report a pig butchering scam",
  },
  {
    num: "06",
    title: "Emotional manipulation before financial requests",
    body: `Romance scammers spend weeks building attachment before mentioning money. Job scammers get you excited about a salary before asking for your Social Security number. Charity scammers show you heartbreaking images before asking for a donation. The emotional investment always precedes the financial ask. If you feel a strong emotional pull toward someone or something you found online, that\u2019s when you need to be most analytical, not least.`,
  },
  {
    num: "07",
    title: "They want to move off-platform",
    body: `Dating apps, Facebook Marketplace, and other platforms have reporting systems, transaction protections, and message logging. Scammers know this. That\u2019s why they push to move conversations to WhatsApp, Telegram, Google Chat, or text. Once you\u2019re off the platform, there\u2019s no moderator to flag suspicious behavior and no record that the platform can use to ban the account. Insist on staying on-platform for as long as possible.`,
    link: "/report-facebook-marketplace-scam",
    linkText: "Report a marketplace scam",
  },
  {
    num: "08",
    title: "The website was registered last month",
    body: `Scam shopping sites, fake investment platforms, and impersonation pages are almost always built on freshly registered domains. You can check any domain\u2019s registration date for free at whois.domaintools.com. A site selling luxury goods that was registered 30 days ago is not a site you should enter your credit card on. Period.`,
    link: "/scam-websites",
    linkText: "Check our scam websites list",
  },
  {
    num: "09",
    title: "You can\u2019t find them outside their own narrative",
    body: `Real businesses have reviews on multiple platforms, physical addresses that show up on Google Maps, and employees with LinkedIn histories. Real people have social media accounts older than a few months with photos that include other people, tagged locations, and comments from friends. If someone\u2019s entire existence is limited to the context where you met them, that context was built for you.`,
  },
  {
    num: "10",
    title: "They ask for personal information early",
    body: `Your Social Security number for a job application you didn\u2019t finish. Your bank routing number to \u201cset up direct deposit.\u201d Your driver\u2019s license to \u201cverify your identity\u201d on a dating site. Legitimate organizations collect sensitive information through secure processes at specific points in established relationships. If someone is asking for identifying information before you\u2019ve built any verifiable trust, they\u2019re building a profile for identity theft.`,
    link: "/report-identity-theft",
    linkText: "Report identity theft",
  },
  {
    num: "11",
    title: "The grammar is off \u2014 but not how you\u2019d expect",
    body: `The old advice about spotting scams by poor grammar is outdated. AI-generated messages are now fluent and polished. Instead, watch for a mismatch between the person\u2019s claimed identity and their communication style. An American military officer who writes in British English. A customer support rep who doesn\u2019t know the company\u2019s product names. A love interest whose messages alternate between poetic declarations and transactional requests. Inconsistency, not bad grammar, is the new tell.`,
    link: "/report-deepfake-scam",
    linkText: "Report a deepfake scam",
  },
  {
    num: "12",
    title: "They get angry or guilt-trip when questioned",
    body: `Ask a scammer to verify their identity and you\u2019ll get one of two responses: hurt feelings (\u201cDon\u2019t you trust me?\u201d) or anger (\u201cAfter everything I\u2019ve done for you\u201d). Both are deflection. A real person with a real request has no reason to be offended by reasonable verification. In fact, they\u2019d expect it. Emotional punishment for asking questions is a control tactic, not a relationship signal.`,
  },
  {
    num: "13",
    title: "The opportunity found you",
    body: `You didn\u2019t apply for the job \u2014 they messaged you. You didn\u2019t search for an investment \u2014 they pitched you at a party. You didn\u2019t enter a lottery \u2014 they told you that you won. Legitimate opportunities almost never arrive unsolicited. The exceptions are so rare that treating every inbound \u201copportunity\u201d as suspect until verified is not paranoia \u2014 it\u2019s pattern recognition.`,
    link: "/report-employment-scam",
    linkText: "Report an employment scam",
  },
  {
    num: "14",
    title: "Something just feels wrong",
    body: `This is the most underrated warning sign and the most ignored. The conversation is pleasant but something nags at you. The deal is good but your stomach tightens. The person is charming but the timeline feels accelerated. That\u2019s your brain processing inconsistencies faster than your conscious mind can articulate them. Don\u2019t override that instinct with hope. The fact that you\u2019re reading an article about how to identify scams means some part of you already has the answer.`,
  },
];

export default function HowToIdentifyScam() {
  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "How to Identify a Scam — 14 Warning Signs You Need to Know",
                description:
                  "Learn the warning signs of online scams. This guide breaks down 14 red flags with real examples.",
                author: {
                  "@type": "Organization",
                  name: "ScamComplaints.org",
                },
                publisher: { "@id": "https://scamcomplaints.org/#org" },
                mainEntityOfPage:
                  "https://scamcomplaints.org/how-to-identify-a-scam",
                datePublished: "2025-01-15",
                dateModified: new Date().toISOString().split("T")[0],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://scamcomplaints.org",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Resources",
                    item: "https://scamcomplaints.org/scams",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "How to Identify a Scam",
                    item: "https://scamcomplaints.org/how-to-identify-a-scam",
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to Identify an Online Scam",
                description: "A step-by-step guide to recognizing scam warning signs before you lose money.",
                step: WARNING_SIGNS.slice(0, 5).map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.body.substring(0, 200),
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-amber-300 backdrop-blur">
            ⚠️ Scam Prevention Guide
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            How to identify
            <br />
            <span className="text-amber-400">a scam.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300 max-w-xl mx-auto">
            Every scam, regardless of category, uses a small set of psychological
            levers. Learn the 14 warning signs that show up across{" "}
            <Link
              href="/report-romance-scam"
              className="text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white"
            >
              romance scams
            </Link>
            ,{" "}
            <Link
              href="/report-investment-scam"
              className="text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white"
            >
              investment fraud
            </Link>
            ,{" "}
            <Link
              href="/report-phishing-scam"
              className="text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white"
            >
              phishing
            </Link>
            , and everything in between.
          </p>
        </div>
      </section>

      {/* Warning signs */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="space-y-10">
          {WARNING_SIGNS.map((sign) => (
            <div key={sign.num} className="group">
              <div className="flex items-start gap-5">
                <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  {sign.num}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {sign.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-700">
                    {sign.body}
                  </p>
                  {sign.link && (
                    <Link
                      href={sign.link}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      {sign.linkText} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to do if you suspect */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            What to do if you think you&apos;re being scammed
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              The hardest part is admitting the possibility. Nobody wants to
              believe the person they care about, the job they were excited
              about, or the investment they put money into is fake. But the
              speed of your response directly determines how much you lose.
              Here is what to do right now:
            </p>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900">Stop all communication and payments.</strong>{" "}
                    Do not send another dollar. Do not respond to threats that
                    you&apos;ll lose what you already sent. That money is already gone.
                    Sending more will not recover it.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900">Contact your bank immediately.</strong>{" "}
                    If you sent money via wire transfer, call your bank and
                    request a recall. Time matters &mdash; some wires can be
                    reversed within 24&ndash;72 hours. For{" "}
                    <Link href="/report-credit-card-fraud" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                      credit card charges
                    </Link>
                    , file a chargeback dispute.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900">Document everything.</strong> Screenshots
                    of messages, emails, transaction receipts, profile pages,
                    phone numbers, wallet addresses. Do this before the scammer
                    deletes their accounts.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900">File reports in multiple places.</strong>{" "}
                    <Link href="/scams" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                      Report the scam here
                    </Link>
                    , then file with the{" "}
                    <a
                      href="https://reportfraud.ftc.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700"
                    >
                      FTC
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://ic3.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700"
                    >
                      FBI IC3
                    </a>
                    . Each report goes into a different database used by different
                    agencies.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    5
                  </span>
                  <div>
                    <strong className="text-slate-900">Secure your accounts.</strong> If you
                    shared passwords, login credentials, or personal
                    information, change every affected password immediately.
                    Enable two-factor authentication. Check for{" "}
                    <Link href="/report-identity-theft" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                      signs of identity theft
                    </Link>{" "}
                    by pulling your credit reports at annualcreditreport.com.
                  </div>
                </li>
              </ol>
            </div>

            <p>
              Being scammed does not mean you were stupid or careless. These
              operations employ teams of people whose full-time job is
              manipulating human psychology. They use{" "}
              <Link href="/report-deepfake-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                AI-generated deepfakes
              </Link>{" "}
              to appear on video calls. They build professional-looking
              websites in hours. They run scripts refined across thousands of
              victims. The blame belongs entirely on the criminals, not on you.
            </p>
          </div>
        </div>
      </section>

      {/* Scam stats */}
      <section className="border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            The scale of the problem
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700">
            <p>
              Americans lost more than <strong>$12.5 billion</strong> to online
              fraud in 2023 according to the FBI&apos;s Internet Crime Complaint Center.
              That figure only counts what was reported &mdash; the actual number
              is likely two to three times higher. The FTC estimates that{" "}
              <strong>only 4.8% of fraud victims</strong> file any report at all.
            </p>
            <p>
              <Link href="/report-investment-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                Investment scams
              </Link>{" "}
              are the costliest category at $4.57 billion, driven largely by
              cryptocurrency fraud. But by volume, the biggest threats are{" "}
              <Link href="/report-phishing-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                phishing attacks
              </Link>{" "}
              (298,000+ reports in 2023), followed by personal data breaches and
              non-payment/non-delivery scams.
            </p>
            <p>
              Every report filed contributes to a larger picture that helps law
              enforcement identify patterns, track criminal networks, and shut
              down operations. Filing takes minutes. Not filing guarantees the
              next person gets the same treatment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-red-50">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Think you&apos;ve spotted a scam?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Report it now. Your report helps protect others and supports
            investigations.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/scams"
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Browse All Scam Types
            </Link>
            <Link
              href="/scam-websites"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Check Scam Websites List
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
