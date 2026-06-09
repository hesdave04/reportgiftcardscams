import Link from "next/link";

export const metadata = {
  title: "What to Do If You've Been Scammed — Step-by-Step Recovery Guide | ScamComplaints",
  description:
    "Immediate steps to take after being scammed online. How to report the scam, recover money, protect your identity, and prevent further damage. Free recovery checklist.",
  keywords:
    "what to do if scammed, scam recovery, how to get money back from scammer, report scam, scam victim help, identity theft after scam, recover from online scam",
  openGraph: {
    title: "What to Do If You've Been Scammed — Recovery Guide",
    description:
      "Step-by-step recovery guide for scam victims. Report, recover money, protect your identity.",
    siteName: "ScamComplaints",
    type: "article",
  },
  alternates: { canonical: "/what-to-do-if-scammed" },
};

const RECOVERY_STEPS = [
  {
    title: "Stop engaging immediately",
    time: "Right now",
    content: `The first instinct is to confront the scammer, demand your money back, or try to reason with them. Don\u2019t. Every additional interaction gives them information they can weaponize, and any money they promise to "return" is bait for a recovery scam. Block their number. Close the chat. If they\u2019re threatening to release photos or information, that\u2019s a sextortion tactic \u2014 engaging only escalates it.`,
    link: "/report-sextortion-scam",
    linkText: "Learn about sextortion scams",
  },
  {
    title: "Secure your financial accounts",
    time: "Within 1 hour",
    content: `Call your bank\u2019s fraud department. The number is on the back of your card \u2014 don\u2019t use any number the scammer gave you. If you sent a wire transfer, request an immediate recall. Banks can sometimes reverse wires within 24\u201372 hours through the SWIFT network. For credit card charges, file a formal dispute \u2014 you have strong chargeback rights under the Fair Credit Billing Act. For Zelle, Cash App, or Venmo, report the transaction as fraud through the app and contact your linked bank separately.`,
    link: "/report-payment-app-scam",
    linkText: "Report a payment app scam",
  },
  {
    title: "Change compromised passwords",
    time: "Within 1 hour",
    content: `If you clicked a phishing link, entered credentials on a fake site, or shared login information with the scammer, change those passwords immediately. Start with email \u2014 your email account is the master key to everything else. Then banking, social media, and any account that shares the same password. Enable two-factor authentication on every account that offers it. Use an authenticator app, not SMS, since SIM-swap attacks can intercept text codes.`,
    link: "/report-phishing-scam",
    linkText: "Report a phishing scam",
  },
  {
    title: "Document everything before it disappears",
    time: "Within 24 hours",
    content: `Scammers delete profiles, close accounts, and change phone numbers quickly. Before they do, capture evidence: screenshots of all conversations (with timestamps visible), the scammer\u2019s profile pages, email headers (not just the body \u2014 headers contain routing data), transaction receipts, cryptocurrency wallet addresses, phone numbers, and any websites they directed you to. Store these in a dedicated folder. This evidence package is critical for every report you\u2019ll file next.`,
  },
  {
    title: "File a report with ScamComplaints",
    time: "Within 24 hours",
    content: `Your report here creates a searchable public record that warns the next person who encounters the same scammer, website, phone number, or crypto wallet. It\u2019s anonymous, takes under 5 minutes, and contributes to a database used by investigators tracking fraud networks.`,
    link: "/scams",
    linkText: "Choose your scam type to report",
  },
  {
    title: "Report to federal agencies",
    time: "Within 48 hours",
    content: `File with the FTC at reportfraud.ftc.gov \u2014 this feeds the Consumer Sentinel database used by over 2,800 law enforcement agencies. File with the FBI\u2019s Internet Crime Complaint Center (IC3) at ic3.gov \u2014 especially for losses over $1,000, international scams, or cryptocurrency theft. For investment fraud, also file with the SEC (sec.gov/tcr) or CFTC (cftc.gov/complaint). For identity theft specifically, go to identitytheft.gov for a personalized recovery plan.`,
    link: "/report-investment-scam",
    linkText: "Report an investment scam",
  },
  {
    title: "Freeze your credit",
    time: "Within 48 hours",
    content: `If the scammer has your Social Security number, date of birth, or enough personal information to open accounts in your name, freeze your credit at all three bureaus: Equifax (equifax.com/personal/credit-report-services/credit-freeze), Experian (experian.com/freeze), and TransUnion (transunion.com/credit-freeze). A freeze is free, takes about 10 minutes per bureau, and prevents anyone from opening new credit accounts using your identity. You can temporarily lift the freeze when you legitimately need credit.`,
    link: "/report-identity-theft",
    linkText: "Report identity theft",
  },
  {
    title: "Check for ongoing damage",
    time: "Within 1 week",
    content: `Pull your free credit reports at annualcreditreport.com. Look for accounts you didn\u2019t open, addresses you\u2019ve never lived at, or inquiries you don\u2019t recognize. Set up free monitoring through Credit Karma or your bank\u2019s identity protection feature. If the scammer had access to your email, check your sent folder and login history for activity you don\u2019t recognize \u2014 they may have used your account to scam others.`,
  },
  {
    title: "Watch for recovery scams",
    time: "Ongoing",
    content: `This is critical: after being scammed, you become a target for recovery scams. Someone will contact you claiming to be a lawyer, a government agent, or a "hacking service" that can recover your money for an upfront fee. These are the same criminal networks. No legitimate recovery service charges upfront fees. The FTC and FBI do not charge victims to investigate. If someone guarantees they can get your money back, they are running the next scam.`,
    link: "/report-advance-fee-scam",
    linkText: "Report an advance fee scam",
  },
];

export default function WhatToDoPage() {
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
                headline:
                  "What to Do If You've Been Scammed — Step-by-Step Recovery Guide",
                description:
                  "Immediate steps to take after being scammed online. How to report, recover money, and protect your identity.",
                author: {
                  "@type": "Organization",
                  name: "ScamComplaints.org",
                },
                publisher: { "@id": "https://scamcomplaints.org/#org" },
                mainEntityOfPage:
                  "https://scamcomplaints.org/what-to-do-if-scammed",
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
                    name: "What to Do If You've Been Scammed",
                    item: "https://scamcomplaints.org/what-to-do-if-scammed",
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "What to Do If You've Been Scammed Online",
                description:
                  "Step-by-step recovery guide for online scam victims.",
                totalTime: "PT2H",
                step: RECOVERY_STEPS.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s.title,
                  text: s.content.substring(0, 200),
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur">
            🛡️ Recovery Guide
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            What to do if you&apos;ve
            <br />
            <span className="text-blue-400">been scammed.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300 max-w-xl mx-auto">
            The first 48 hours matter most. This guide walks you through exactly
            what to do &mdash; from securing your accounts to filing reports that
            actually lead to investigations. No judgment. Just the steps.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="space-y-0">
          {RECOVERY_STEPS.map((step, i) => (
            <div key={i} className="relative pl-10 pb-10 last:pb-0">
              {/* Timeline line */}
              {i < RECOVERY_STEPS.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-200" />
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {i + 1}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {step.title}
                  </h2>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                    {step.time}
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {step.content}
                </p>
                {step.link && (
                  <Link
                    href={step.link}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    {step.linkText} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emotional section */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">
            It&apos;s not your fault
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700">
            <p>
              Shame keeps people silent, and silence protects scammers. Fraud
              operations are professional enterprises &mdash; many run out of
              large-scale call centers or{" "}
              <Link href="/report-pig-butchering-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                compound facilities
              </Link>{" "}
              employing hundreds of people working shifts. They use scripts
              refined over thousands of interactions. They deploy{" "}
              <Link href="/report-deepfake-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                AI-generated photos and deepfake video
              </Link>{" "}
              to pass verification. You were not outsmarted by a single person
              &mdash; you were targeted by an organization.
            </p>
            <p>
              Doctors, lawyers, engineers, and cybersecurity professionals have
              all fallen for scams. Intelligence does not protect you because
              scams exploit emotions, not ignorance. The person who falls for a{" "}
              <Link href="/report-romance-scam" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
                romance scam
              </Link>{" "}
              isn&apos;t gullible &mdash; they&apos;re human.
            </p>
            <p>
              If you need someone to talk to, the{" "}
              <strong>AARP Fraud Helpline (877-908-3360)</strong> offers free
              support regardless of age, and the{" "}
              <strong>
                Identity Theft Resource Center (888-400-5530)
              </strong>{" "}
              provides free case management for identity theft victims.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-red-50">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Ready to report?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Filing a report takes under 5 minutes and helps protect the next
            person.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/scams"
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Report a Scam Now
            </Link>
            <Link
              href="/how-to-identify-a-scam"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              How to Identify a Scam
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
