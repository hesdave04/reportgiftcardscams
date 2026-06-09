"use client";

import { useEffect, useState } from "react";

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K+`;
  return String(n);
}

export default function LiveStats() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/v1/stats")
      .then((r) => r.json())
      .then((d) => { if (d.total_reports) setCount(d.total_reports); })
      .catch(() => {});
  }, []);

  const stats = [
    { label: "Reports Filed", value: count ? formatCount(count) : "250K+" },
    { label: "Average Filing Time", value: "~3 min" },
    { label: "Free & Confidential", value: "100%" },
    { label: "Shared with Law Enforcement", value: "🔒" },
  ];

  return (
    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
        >
          <div className="text-2xl font-bold text-white">{s.value}</div>
          <div className="mt-0.5 text-xs text-slate-400">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
