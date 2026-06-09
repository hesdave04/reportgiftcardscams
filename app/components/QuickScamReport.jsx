"use client";

import { useState } from "react";
import EmailVerification from "@/app/components/EmailVerification";

/**
 * Shared quick-report form for scam-type landing pages.
 *
 * Each page passes scam-type-specific config:
 *   - scamTypeValue: e.g. "romance_scam"
 *   - title / subtitle
 *   - fields: array of { name, label, type, placeholder, required?, options? }
 *   - accentColor: tailwind color name (red, orange, purple, etc.)
 */
export default function QuickScamReport({
  scamTypeValue,
  title = "Quick scam report",
  subtitle,
  fields = [],
  accentColor = "red",
}) {
  const [verified, setVerified] = useState(null);
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const primaryFields = fields.filter((f) => !f.expandable);
  const expandableFields = fields.filter((f) => f.expandable);

  function update(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

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
          reportType: "scam_type_report",
          emailProof: verified.proof,
          scamTypeValue,
          ...values,
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
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-green-900">Report submitted</h2>
        <p className="mt-2 text-sm text-green-700">
          Thank you for helping protect others. Your report is now in our database.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => { setResult(null); setValues({}); }}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Submit Another Report
          </button>
          <a
            href="/case-builder"
            className="rounded-lg border border-green-300 px-5 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-100"
          >
            File Detailed Complaint
          </a>
        </div>
      </div>
    );
  }

  function renderField(f) {
    const base = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20";

    if (f.type === "select") {
      return (
        <select value={values[f.name] || ""} onChange={(e) => update(f.name, e.target.value)} className={base + " text-slate-700"}>
          <option value="">{f.placeholder || "Select..."}</option>
          {(f.options || []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );
    }

    if (f.type === "textarea") {
      return (
        <textarea
          value={values[f.name] || ""}
          onChange={(e) => update(f.name, e.target.value)}
          rows={f.rows || 3}
          placeholder={f.placeholder}
          className={base}
        />
      );
    }

    return (
      <input
        type={f.type || "text"}
        value={values[f.name] || ""}
        onChange={(e) => update(f.name, e.target.value)}
        placeholder={f.placeholder}
        required={f.required}
        inputMode={f.inputMode}
        className={base + (f.mono ? " font-mono" : "")}
      />
    );
  }

  const hasRequiredEmpty = primaryFields.some(
    (f) => f.required && !values[f.name]?.trim()
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">
          {subtitle}{" "}
          <a href="/case-builder" className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700">
            Use the full report builder
          </a>
        </p>
      )}

      <div className="mt-6">
        <EmailVerification onVerified={setVerified} />
      </div>

      {verified && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {primaryFields.map((f) => (
            <div key={f.name} className={f.gridHalf ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : ""}>
              {f.gridHalf ? (
                f.gridHalf.map((sub) => (
                  <div key={sub.name}>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      {sub.label} {sub.required && <span className="text-red-500">*</span>}
                    </label>
                    {renderField(sub)}
                  </div>
                ))
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  {renderField(f)}
                  {f.hint && <p className="mt-1 text-xs text-slate-400">{f.hint}</p>}
                </div>
              )}
            </div>
          ))}

          {expandableFields.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                <svg
                  className={`h-4 w-4 transition-transform ${showMore ? "rotate-90" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {showMore ? "Hide additional details" : "Add more details (optional)"}
              </button>

              {showMore && (
                <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  {expandableFields.map((f) => (
                    <div key={f.name}>
                      <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>
                      {renderField(f)}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {result?.ok === false && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || hasRequiredEmpty}
            className="w-full rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Submit Report"}
          </button>
        </form>
      )}
    </div>
  );
}
