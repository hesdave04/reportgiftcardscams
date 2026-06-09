export const metadata = {
  title: "About",
  description:
    "Learn about ScamComplaints.org, our mission to fight fraud, and the team behind the platform.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        About ScamComplaints
      </h1>
      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        ScamComplaints.org is a free public service that helps scam and fraud
        victims file detailed reports, share their stories, and support law
        enforcement investigations.
      </p>

      {/* Mission */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Our Mission</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Every year, millions of people fall victim to scams — from gift card
          fraud and romance scams to fake investment platforms and tech support
          schemes. Most victims don&apos;t know where to report or feel too
          embarrassed to come forward.
        </p>
        <p className="mt-3 text-slate-600 leading-relaxed">
          ScamComplaints exists to change that. We make it easy for anyone —
          regardless of age or technical ability — to document what happened,
          preserve evidence, and contribute to a shared database that helps
          protect others.
        </p>
      </section>

      {/* What We Do */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">What We Do</h2>
        <ul className="mt-4 space-y-4">
          {[
            {
              icon: "📝",
              title: "Guided Case Builder",
              text: "Our step-by-step reporting tool walks you through documenting your scam experience — with voice input support so you can simply tell your story.",
            },
            {
              icon: "🔒",
              title: "Secure Data Handling",
              text: "Sensitive information like card numbers is encrypted with AES-256-GCM. We never sell your data or share it with advertisers.",
            },
            {
              icon: "🚔",
              title: "Law Enforcement Support",
              text: "Reports can be exported in structured XML format, making it easier for investigators to cross-reference scam patterns and build cases.",
            },
            {
              icon: "🛡️",
              title: "Wall of Shame",
              text: "Confirmed scam reports are published to warn others, creating a searchable public record of fraud activity.",
            },
          ].map((item) => (
            <li key={item.title} className="flex gap-4">
              <span className="mt-0.5 text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Who We Are */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Who&apos;s Behind This</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          ScamComplaints.org is built and maintained by{" "}
          <a
            href="https://socialcatfish.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:text-brand-accent-hover hover:decoration-brand-accent/60"
          >
            Social Catfish
          </a>
          , an online identity verification company that has been helping people
          investigate and prevent scams since 2015.
        </p>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Through our work at Social Catfish — and our{" "}
          <a
            href="https://youtube.com/@Catfished"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:text-brand-accent-hover hover:decoration-brand-accent/60"
          >
            Catfished YouTube channel
          </a>{" "}
          — we&apos;ve heard thousands of scam stories. We built
          ScamComplaints to give victims a structured, safe place to report what
          happened and to create a resource that helps others avoid the same
          traps.
        </p>
      </section>

      {/* Report CTA */}
      <section className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900">
          Been scammed? Report it.
        </h2>
        <p className="mt-2 text-slate-600">
          Your report helps protect others and supports active investigations.
        </p>
        <a
          href="/case-builder"
          className="mt-6 inline-block rounded-lg bg-brand-accent px-6 py-3 font-medium text-white hover:bg-brand-accent-hover transition-colors"
        >
          Start Your Report
        </a>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          For questions about the platform, data requests, or law enforcement
          inquiries, email us at{" "}
          <a
            href="mailto:info@socialcatfish.com"
            className="font-medium text-brand-accent underline decoration-brand-accent/30 underline-offset-2 hover:text-brand-accent-hover hover:decoration-brand-accent/60"
          >
            info@socialcatfish.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
