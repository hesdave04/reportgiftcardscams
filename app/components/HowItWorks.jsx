// app/components/HowItWorks.jsx
// Server component — no "use client"

export default function HowItWorks() {
  const steps = [
    {
      title: '1. Report a Gift Card',
      desc:
        'Share the brand, where you bought it, the amount, and the card number (only the last 4 are displayed publicly).',
      icon: '📝',
    },
    {
      title: '2. We Record & Verify',
      desc:
        'Reports are logged, anonymized, and checked for patterns and duplicates to keep the data clean.',
      icon: '🔎',
    },
    {
      title: '3. Scam Networks Exposed',
      desc:
        'Connections between phone numbers, emails, social accounts, and card activity are surfaced.',
      icon: '🛡️',
    },
    {
      title: '4. Protect Future Victims',
      desc:
        'Your report strengthens the registry used by the community and investigators to stop repeat abuse.',
      icon: '🤝',
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900">
        How Reporting Gift Card Scams Works
      </h2>
      <p className="mt-2 text-slate-600">
        Your reports help expose fraud, protect victims, and support enforcement.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/90 text-lg text-white">
              <span aria-hidden>{s.icon}</span>
            </div>
            <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
