"use client";

import { useState } from "react";
import EmailVerification from "@/app/components/EmailVerification";

const PLATFORMS = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "snapchat", label: "Snapchat" },
  { value: "x_twitter", label: "X / Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "tinder", label: "Tinder" },
  { value: "bumble", label: "Bumble" },
  { value: "hinge", label: "Hinge" },
  { value: "other_dating", label: "Other dating app" },
  { value: "other", label: "Other platform" },
];

const SCAM_TYPES = [
  { value: "romance", label: "Romance / catfish scam" },
  { value: "impersonation", label: "Impersonating a real person" },
  { value: "celebrity", label: "Celebrity impersonation" },
  { value: "military", label: "Fake military identity" },
  { value: "sextortion", label: "Sextortion / blackmail" },
  { value: "business", label: "Business impersonation / BEC" },
  { value: "crypto", label: "Crypto / investment pitch" },
  { value: "other", label: "Other" },
];

export default function ReportFakeSocialMediaClient() {
  const [verified, setVerified] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [platform, setPlatform] = useState("");
  const [fakeName, setFakeName] = useState("");
  const [realPersonName, setRealPersonName] = useState("");
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
          reportType: "social_media_report",
          emailProof: verified.proof,
          profileUrl: profileUrl.trim(),
          platform,
          fakeName: fakeName.trim() || undefined,
          realPersonName: realPersonName.trim() || undefined,
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
          Profile reported
        </h2>
        <p className="mt-2 text-sm text-green-700">
          This fake profile is now flagged in our database. Others searching
          for this name or profile will find your report.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => {
              setResult(null);
              setProfileUrl("");
              setPlatform("");
              setFakeName("");
              setRealPersonName("");
              setScamType("");
              setDescription("");
            }}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Report Another Profile
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
        Quick profile report
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Flag the fake account in under a minute. Want to include chat
        screenshots and a full timeline?{" "}
        <a
          href="/case-builder"
          className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700"
        >
          Use the full report builder
        </a>
      </p>

      <div className="mt-6">
        <EmailVerification onVerified={setVerified} />
      </div>

      {verified && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Profile URL or username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://www.facebook.com/fake.profile or @username"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="">Select platform</option>
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Scam type
              </label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="">Select type (optional)</option>
                {SCAM_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name used on the fake profile
            </label>
            <input
              type="text"
              value={fakeName}
              onChange={(e) => setFakeName(e.target.value)}
              placeholder="e.g., Dr. James Wilson"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Brief description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What is this person claiming? How did they approach you?"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          {/* Expand for more details */}
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
              : "Know the real person behind the photos?"}
          </button>

          {showFull && (
            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Real person's name (if known)
                </label>
                <input
                  type="text"
                  value={realPersonName}
                  onChange={(e) => setRealPersonName(e.target.value)}
                  placeholder="Name of the real person whose photos are being used"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
                <p className="mt-1 text-xs text-slate-400">
                  This helps us document photo theft and protect the real
                  individual.
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Have screenshots or chat logs? Use the{" "}
                <a
                  href="/case-builder"
                  className="underline hover:text-slate-600"
                >
                  full report builder
                </a>{" "}
                for file uploads and detailed timelines.
              </p>
            </div>
          )}

          {result?.ok === false && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !profileUrl.trim()}
            className="w-full rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Report Fake Profile"}
          </button>
        </form>
      )}
    </div>
  );
}
