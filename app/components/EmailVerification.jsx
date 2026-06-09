"use client";

import { useState, useRef } from "react";

export default function EmailVerification({ onVerified }) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("enter"); // enter | sent | verified
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState("");
  const inputRefs = useRef([]);

  async function handleSendCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");

      setToken(data.token);
      setStep("sent");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check", token, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

      setProof(data.proof);
      setStep("verified");
      onVerified({ email: data.email, proof: data.proof });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCodeInput(index, value) {
    if (!/^\d*$/.test(value)) return;
    const digits = code.split("");
    digits[index] = value.slice(-1);
    const newCode = digits.join("").slice(0, 6);
    setCode(newCode.padEnd(6, " ").trimEnd());

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newCode.length === 6 && /^\d{6}$/.test(newCode)) {
      setCode(newCode);
      setTimeout(() => {
        document
          .getElementById("verify-code-btn")
          ?.click();
      }, 100);
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  if (step === "verified") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">Email verified</p>
            <p className="text-sm text-green-700">{email}</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "sent") {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-3">
          <p className="text-sm font-semibold text-slate-900">
            Check your inbox
          </p>
          <p className="mt-1 text-sm text-slate-500">
            We sent a 6-digit code to <span className="font-medium text-slate-700">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyCode}>
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={code[i] || ""}
                onChange={(e) => handleCodeInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-12 w-10 rounded-lg border border-slate-300 bg-white text-center text-lg font-semibold text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 sm:h-14 sm:w-12 sm:text-xl"
                autoFocus={i === 0}
              />
            ))}
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-600">{error}</p>
          )}

          <button
            id="verify-code-btn"
            type="submit"
            disabled={loading || code.replace(/\s/g, "").length < 6}
            className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify Code"}
          </button>

          <button
            type="button"
            onClick={() => {
              setStep("enter");
              setCode("");
              setError("");
            }}
            className="mt-2 w-full text-center text-sm text-slate-500 hover:text-slate-700"
          >
            Use a different email
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <label className="mb-2 block text-sm font-semibold text-slate-900">
        Your email address
      </label>
      <p className="mb-3 text-sm text-slate-500">
        We'll send a quick verification code. Your email is never shared publicly.
      </p>
      <form onSubmit={handleSendCode} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
        />
        <button
          type="submit"
          disabled={loading || !email}
          className="shrink-0 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Sending…" : "Send Code"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
