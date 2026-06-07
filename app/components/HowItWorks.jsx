// Server component
export default function HowItWorks() {
  const steps = [
    {
      title: "1. Report a Scam",
      desc: "Tell us what happened in your own words — type or use voice. We'll guide you through the details.",
      icon: "📝",
    },
    {
      title: "2. We Record & Organize",
      desc: "Reports are logged, structured, and checked for patterns and duplicates to keep the data clean.",
      icon: "🔎",
    },
    {
      title: "3. Scam Networks Exposed",
      desc: "Connections between phone numbers, emails, social accounts, and payment methods are surfaced.",
      icon: "🛡️",
    },
    {
      title: "4. Protect Future Victims",
      desc: "Your report strengthens the database used by the community and investigators to stop repeat fraud.",
      icon: "🤝",
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
      <p className="mt-2 text-slate-600">
        Your reports help expose fraud, protect victims, and support law enforcement.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">
              <span aria-hidden>{s.icon}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
