"use client";

import { useState, useEffect, useCallback } from "react";

const SCAM_TYPES = [
  "Romance / Dating Scam",
  "Tech Support Scam",
  "Investment / Crypto Scam",
  "Government Impersonation",
  "Gift Card Scam",
  "Online Shopping Scam",
  "Employment / Job Scam",
  "Lottery / Prize Scam",
  "Phishing / Identity Theft",
  "Utility / Bill Scam",
  "Rental Scam",
  "Other",
];

const PAYMENT_METHODS = [
  "Gift Card",
  "Wire Transfer",
  "Cryptocurrency",
  "Zelle / Venmo / CashApp",
  "Credit / Debit Card",
  "Bank Transfer (ACH)",
  "Cash (in person or mail)",
  "Other",
];

export default function QuickReport() {
  const [form, setForm] = useState({
    scamType: "",
    story: "",
    amount: "",
    paymentMethod: "",
    suspectPhone: "",
    suspectEmail: "",
    suspectSocial: "",
    suspectWebsite: "",
    paymentDate: "",
    // Conditional: Gift Card
    giftCardBrand: "",
    giftCardNumber: "",
    giftCardRetailer: "",
    // Conditional: Crypto
    suspectWallet: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok, message }
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Load reCAPTCHA
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      setRecaptchaReady(true);
      return;
    }
    if (document.querySelector(`script[src*="recaptcha"]`)) {
      setRecaptchaReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.async = true;
    s.onload = () => setRecaptchaReady(true);
    document.head.appendChild(s);
  }, []);

  const getRecaptchaToken = useCallback(async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || !window.grecaptcha) return null;
    try {
      return await window.grecaptcha.execute(siteKey, { action: "quick_report" });
    } catch {
      return null;
    }
  }, []);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const showGiftCard = form.paymentMethod === "Gift Card";
  const showCrypto = form.paymentMethod === "Cryptocurrency";

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.scamType || !form.story.trim()) return;

    setSubmitting(true);
    setResult(null);

    try {
      const recaptchaToken = await getRecaptchaToken();

      const payload = {
        scamType: form.scamType,
        story: form.story.trim(),
        amount: form.amount ? Number(String(form.amount).replace(/[^0-9.]/g, "")) : null,
        paymentMethods: form.paymentMethod ? [form.paymentMethod] : [],
        suspectPhone: form.suspectPhone || null,
        suspectEmail: form.suspectEmail || null,
        suspectUsername: form.suspectSocial || null,
        suspectWebsite: form.suspectWebsite || null,
        suspectWallet: form.suspectWallet || null,
        paymentDate: form.paymentDate || null,
        platforms: [],
        evidenceUrls: [],
        // Include gift card info in story if provided
        sentMoney: form.amount ? "yes" : null,
        recaptchaToken,
      };

      // Append gift card details to story if present
      const extras = [];
      if (showGiftCard) {
        if (form.giftCardBrand) extras.push(`Gift Card Brand: ${form.giftCardBrand}`);
        if (form.giftCardNumber) extras.push(`Card Number: ${form.giftCardNumber}`);
        if (form.giftCardRetailer) extras.push(`Purchased At: ${form.giftCardRetailer}`);
      }
      if (extras.length) {
        payload.story += "\n\n--- Gift Card Details ---\n" + extras.join("\n");
      }

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit report");
      }

      setResult({
        ok: true,
        message: "Report submitted successfully. Thank you for helping protect others.",
      });
      setForm({
        scamType: "",
        story: "",
        amount: "",
        paymentMethod: "",
        suspectPhone: "",
        suspectEmail: "",
        suspectSocial: "",
        suspectWebsite: "",
        paymentDate: "",
        giftCardBrand: "",
        giftCardNumber: "",
        giftCardRetailer: "",
        suspectWallet: "",
      });
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-accent/50 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-colors";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Row 1: Scam Type + Amount */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>
            Type of Scam <span className="text-red-500">*</span>
          </label>
          <select
            value={form.scamType}
            onChange={update("scamType")}
            required
            className={inputClass}
          >
            <option value="">Select scam type…</option>
            {SCAM_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Amount Lost</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              $
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={form.amount}
              onChange={update("amount")}
              placeholder="0.00"
              className={`${inputClass} pl-7`}
            />
          </div>
        </div>
      </div>

      {/* Row 2: What Happened */}
      <div>
        <label className={labelClass}>
          What Happened <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.story}
          onChange={update("story")}
          required
          rows={3}
          placeholder="Briefly describe what happened — who contacted you, what they said, and how money was exchanged."
          className={inputClass}
        />
        <p className="mt-1 text-xs text-slate-500">
          Keep it factual. Don&apos;t include your SSN, passwords, or bank account numbers.
        </p>
      </div>

      {/* Row 3: Payment Method + Date */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Payment Method</label>
          <select
            value={form.paymentMethod}
            onChange={update("paymentMethod")}
            className={inputClass}
          >
            <option value="">Select if applicable…</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>When It Happened</label>
          <input
            type="date"
            value={form.paymentDate}
            onChange={update("paymentDate")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Conditional: Gift Card Details */}
      {showGiftCard && (
        <div className="rounded-xl border border-gold-200 bg-gold-50 p-4">
          <p className="mb-3 text-sm font-medium text-brand">
            🎴 Gift Card Details
          </p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <label className={labelClass}>Card Brand</label>
              <input
                type="text"
                value={form.giftCardBrand}
                onChange={update("giftCardBrand")}
                placeholder="e.g., Apple, Google Play"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Card Number</label>
              <input
                type="text"
                inputMode="numeric"
                value={form.giftCardNumber}
                onChange={update("giftCardNumber")}
                placeholder="Digits on the card"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-500">
                Only last 4 shown publicly. Full number helps investigators.
              </p>
            </div>
            <div>
              <label className={labelClass}>Where Purchased</label>
              <input
                type="text"
                value={form.giftCardRetailer}
                onChange={update("giftCardRetailer")}
                placeholder="e.g., CVS, Walmart"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conditional: Crypto Wallet */}
      {showCrypto && (
        <div className="rounded-xl border border-gold-200 bg-gold-50 p-4">
          <p className="mb-3 text-sm font-medium text-brand">
            🪙 Crypto Details
          </p>
          <div>
            <label className={labelClass}>Wallet Address</label>
            <input
              type="text"
              value={form.suspectWallet}
              onChange={update("suspectWallet")}
              placeholder="e.g., 0x1234… or bc1q…"
              className={`${inputClass} font-mono text-xs`}
            />
            <p className="mt-1 text-xs text-slate-500">
              The wallet address you sent funds to. Critical for tracing.
            </p>
          </div>
        </div>
      )}

      {/* Row 4: Scammer Contact Info */}
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">
          Scammer&apos;s Contact Info{" "}
          <span className="font-normal text-slate-500">
            — any detail helps investigators
          </span>
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="tel"
            value={form.suspectPhone}
            onChange={update("suspectPhone")}
            placeholder="📞  Phone number"
            className={inputClass}
          />
          <input
            type="email"
            value={form.suspectEmail}
            onChange={update("suspectEmail")}
            placeholder="✉️  Email address"
            className={inputClass}
          />
          <input
            type="text"
            value={form.suspectSocial}
            onChange={update("suspectSocial")}
            placeholder="👤  Social media profile or @handle"
            className={inputClass}
          />
          <input
            type="url"
            value={form.suspectWebsite}
            onChange={update("suspectWebsite")}
            placeholder="🌐  Website or app URL"
            className={inputClass}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={submitting || !form.scamType || !form.story.trim()}
          className="rounded-lg bg-brand-accent px-6 py-3 font-semibold text-white shadow-md shadow-brand-accent/20 hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Submitting…" : "Submit Report"}
        </button>
        <p className="text-xs text-slate-500">
          Your IP is logged for abuse prevention. Reports may be shared with law enforcement.
        </p>
      </div>

      {/* Result message */}
      {result && (
        <div
          className={`rounded-xl border p-4 text-sm ${
            result.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {result.ok ? "✅ " : "⚠️ "}
          {result.message}
        </div>
      )}
    </form>
  );
}
