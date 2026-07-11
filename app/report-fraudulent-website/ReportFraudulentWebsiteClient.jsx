"use client";

import { useState } from "react";
import AuthOrEmailVerify from "@/app/components/AuthOrEmailVerify";

const SCAM_TYPES = [
  { value: "phishing", label: "Phishing / fake login page" },
  { value: "fake_store", label: "Fake online store" },
  { value: "tech_support", label: "Tech support scam" },
  { value: "clone_site", label: "Clone / impersonation site" },
  { value: "investment", label: "Fake investment platform" },
  { value: "job_scam", label: "Fake job board / employment scam" },
  { value: "romance", label: "Romance / dating scam site" },
  { value: "other", label: "Other" },
];

export default function ReportFraudulentWebsiteClient() {
  const [verified, setVerified] = useState(null);
  const [url, setUrl] = useState("");
  const [additionalUrls, setAdditionalUrls] = useState("");
  const [scamType, setScamType] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showFull, setShowFull] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!verified) return;
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/quick-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportType: "website_report",
          emailProof: verified.proof,
          isLoggedIn: verified.isLoggedIn || false,
          reporterId: verified.reporterId || null,
          url: url.trim(),
          additionalUrls: additionalUrls
            .split("\n")
            .map((u) => u.trim())
            .filter(Boolean),
          scamType,
          description: description.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setResult({ ok: true, id: data.reportId });
    } catch (err) {
      setResult({ ok: false, error: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-green-900">
          Report submitted
        </h2>
        <p className="mt-2 text-sm text-green-700">
          Thank you for helping protect others. Your report is now in our
          database and will be reviewed.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => {
              setResult(null);
              setUrl("");
              setAdditionalUrls("");
              setScamType("");
              setDescription("");
            }}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Report Another Website
          </button>
          <a
            href="/case-builder"
            className="rounded-lg border border-green-300 px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-100"
          >
            File Full Complaint
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">
        Quick website report
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Submit the scam URL in under a minute. Want to include screenshots and a
        full timeline?{" "}
        <a
          href="/case-builder"
          className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700"
        >
          Use the full report builder instead
        </a>
      </p>

      <div className="mt-6">
        <AuthOrEmailVerify onVerified={setVerified} />
      </div>

      {verified && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Fraudulent website URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example-scam-site.com"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Type of scam
            </label>
            <select
              value={scamType}
              onChange={(e) => setScamType(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">Select a type (optional)</option>
              {SCAM_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Brief description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What does this site do? How did you find it?"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          {/* Expandable full complaint section */}
          <button
            type="button"
            onClick={() => setShowFull(!showFull)}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showFull ? "rotate-90" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {showFull
              ? "Hide additional fields"
              : "Add more details (additional URLs, etc.)"}
          </button>

          {showFull && (
            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Additional related URLs (one per line)
                </label>
                <textarea
                  value={additionalUrls}
                  onChange={(e) => setAdditionalUrls(e.target.value)}
                  rows={3}
                  placeholder={"https://other-scam-site.com\nhttps://related-domain.net"}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
              <p className="text-xs text-slate-400">
                Need to upload evidence? Use the{" "}
                <a
                  href="/case-builder"
                  className="underline hover:text-slate-600"
                >
                  full report builder
                </a>{" "}
                for file uploads, timelines, and detailed narratives.
              </p>
            </div>
          )}

          {result?.ok === false && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !url.trim()}
            className="w-full rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Submit Website Report"}
          </button>
        </form>
      )}
    </div>
  );
}
