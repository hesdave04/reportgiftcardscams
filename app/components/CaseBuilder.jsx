"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/* ─── constants ─── */

const scamTypes = [
  { label: "Romance Scam", icon: "💔" },
  { label: "Gift Card Scam", icon: "🎁" },
  { label: "Crypto Scam", icon: "🪙" },
  { label: "Impersonation Scam", icon: "🎭" },
  { label: "Tech Support Scam", icon: "💻" },
  { label: "Marketplace Scam", icon: "🛒" },
  { label: "Investment Scam", icon: "📈" },
  { label: "Employment Scam", icon: "💼" },
  { label: "Banking Scam", icon: "🏦" },
  { label: "Other", icon: "❓" },
];

const contactPlatforms = [
  { label: "Facebook", icon: "📘" },
  { label: "Instagram", icon: "📸" },
  { label: "WhatsApp", icon: "💬" },
  { label: "Telegram", icon: "✈️" },
  { label: "Text Message", icon: "📱" },
  { label: "Email", icon: "📧" },
  { label: "Phone Call", icon: "📞" },
  { label: "Dating App", icon: "💕" },
  { label: "TikTok", icon: "🎵" },
  { label: "Other", icon: "🔗" },
];

const paymentMethods = [
  { label: "Gift Card", icon: "🎁" },
  { label: "Bank Transfer", icon: "🏦" },
  { label: "Wire Transfer", icon: "🔄" },
  { label: "Crypto", icon: "🪙" },
  { label: "Cash App", icon: "💵" },
  { label: "Venmo", icon: "💳" },
  { label: "PayPal", icon: "🅿️" },
  { label: "Zelle", icon: "⚡" },
  { label: "Cash", icon: "💰" },
  { label: "No Money Sent", icon: "🚫" },
  { label: "Other", icon: "❓" },
];

const steps = [
  { title: "Your Story", subtitle: "Tell us what happened" },
  { title: "Scam Type", subtitle: "What kind of scam was it?" },
  { title: "Contact Method", subtitle: "How they reached you" },
  { title: "What Was Shared", subtitle: "Money or personal info?" },
  { title: "Payment Details", subtitle: "How much and how" },
  { title: "Timeline", subtitle: "Key dates" },
  { title: "Scammer Info", subtitle: "Any details you have" },
  { title: "Review & Submit", subtitle: "Confirm your report" },
];

/* ─── component ─── */

export default function CaseBuilder() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceDraft, setVoiceDraft] = useState("");
  const [showVoiceReview, setShowVoiceReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [intakeId, setIntakeId] = useState(null);
  const recognitionRef = useRef(null);

  const [formData, setFormData] = useState({
    story: "",
    scamType: "",
    platforms: [],
    sentMoney: "",
    sentPersonalInfo: "",
    amount: "",
    paymentMethods: [],
    startDate: "",
    paymentDate: "",
    realizedDate: "",
    suspectName: "",
    suspectEmail: "",
    suspectPhone: "",
    suspectUsername: "",
    suspectWallet: "",
    suspectWebsite: "",
  });

  const progress = useMemo(() => {
    return Math.round(((step + 1) / steps.length) * 100);
  }, [step]);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleArrayValue(field, value) {
    setFormData((prev) => {
      const current = prev[field] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [field]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  }

  function nextStep() {
    if (step < steps.length - 1) setStep((prev) => prev + 1);
  }

  function prevStep() {
    if (step > 0) setStep((prev) => prev - 1);
  }

  /* ─── voice ─── */

  function startVoiceInput() {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    setVoiceDraft("");
    setShowVoiceReview(false);

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    let fullTranscript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          fullTranscript += (fullTranscript ? " " : "") + event.results[i][0].transcript;
        }
      }
      setVoiceDraft(fullTranscript);
    };

    recognition.onerror = () => setIsListening(false);

    recognition.onend = () => {
      setIsListening(false);
      if (fullTranscript.trim()) {
        setShowVoiceReview(true);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopVoiceInput() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }

  function useVoiceDraft() {
    if (!voiceDraft.trim()) return;
    setFormData((prev) => ({
      ...prev,
      story: prev.story ? `${prev.story} ${voiceDraft}` : voiceDraft,
    }));
    setVoiceDraft("");
    setShowVoiceReview(false);
  }

  function retryVoiceInput() {
    setVoiceDraft("");
    setShowVoiceReview(false);
    startVoiceInput();
  }

  /* ─── submit ─── */

  async function handleSubmit() {
    setSubmitting(true);
    try {
      // Get reCAPTCHA token if available
      let recaptchaToken = null;
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("submit_case");
        } catch (e) {
          console.warn("reCAPTCHA execution failed:", e);
        }
      }

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong.");
      }
      setIntakeId(result.intakeId);
      setSubmitted(true);
    } catch (error) {
      alert(error.message || "Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── success screen ─── */

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Report Submitted</h1>
        <p className="mt-3 text-lg text-slate-600">
          Thank you for reporting this scam. Your report helps protect others and supports investigators.
        </p>
        {intakeId && (
          <p className="mt-4 text-sm text-slate-500">
            Reference ID: <span className="font-mono font-medium text-slate-700">{intakeId.slice(0, 8)}</span>
          </p>
        )}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/case-builder"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setFormData({
                story: "", scamType: "", platforms: [], sentMoney: "",
                sentPersonalInfo: "", amount: "", paymentMethods: [],
                startDate: "", paymentDate: "", realizedDate: "",
                suspectName: "", suspectEmail: "", suspectPhone: "",
                suspectUsername: "", suspectWallet: "", suspectWebsite: "",
              });
            }}
            className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Submit Another Report
          </a>
          <a
            href="/"
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  /* ─── main render ─── */

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Build Your Scam Report
        </h1>
        <p className="mt-2 text-slate-600">
          We'll walk you through this step by step. Take your time — every detail helps.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Step {step + 1} of {steps.length}: {steps[step].title}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
            {progress}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-red-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step dots */}
        <div className="mt-3 hidden gap-1 sm:flex">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => i <= step && setStep(i)}
              disabled={i > step}
              className={`flex-1 rounded-md px-1 py-1.5 text-center text-[11px] font-medium transition-colors ${
                i === step
                  ? "bg-red-50 text-red-700"
                  : i < step
                  ? "bg-slate-50 text-slate-500 hover:bg-slate-100 cursor-pointer"
                  : "text-slate-300 cursor-not-allowed"
              }`}
              title={s.title}
            >
              {i < step ? "✓" : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {/* ─── Step 0: Your Story ─── */}
        {step === 0 && (
          <div>
            <StepHeader
              title="Tell us what happened"
              desc="Use your own words. You can type, or tap the microphone to speak."
            />

            <textarea
              className="mt-4 min-h-[160px] w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base leading-relaxed outline-none focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 transition-colors"
              placeholder="Example: I met someone on Facebook who told me to buy gift cards and send them the codes. I bought $2,000 in Apple gift cards from Walmart..."
              value={formData.story}
              onChange={(e) => updateField("story", e.target.value)}
            />

            <div className="mt-4 flex flex-wrap gap-3">
              {isListening ? (
                <button
                  type="button"
                  onClick={stopVoiceInput}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 transition-colors"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                  </span>
                  Stop Recording
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Use Voice Input
                </button>
              )}

              {formData.story && (
                <button
                  type="button"
                  onClick={() => updateField("story", "")}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {isListening && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <span className="relative flex h-4 w-4 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                </span>
                <p className="text-sm text-red-800">
                  <strong>Recording...</strong> Speak clearly. Click "Stop Recording" when you're done.
                </p>
              </div>
            )}

            {showVoiceReview && voiceDraft && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-800">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Voice capture complete</span>
                </div>
                <p className="mt-1 text-sm text-emerald-700">
                  Review what was captured before adding it to your report.
                </p>

                <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-slate-800 leading-relaxed">
                  "{voiceDraft}"
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={useVoiceDraft}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 transition-colors"
                  >
                    ✓ Use This
                  </button>
                  <button
                    type="button"
                    onClick={retryVoiceInput}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      useVoiceDraft();
                      setTimeout(() => startVoiceInput(), 150);
                    }}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Use This & Add More
                  </button>
                </div>
              </div>
            )}

            {formData.story && (
              <div className="mt-4 text-right text-xs text-slate-400">
                {formData.story.split(/\s+/).filter(Boolean).length} words
              </div>
            )}
          </div>
        )}

        {/* ─── Step 1: Scam Type ─── */}
        {step === 1 && (
          <div>
            <StepHeader title="What type of scam was it?" desc="Pick the closest match." />
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {scamTypes.map((item) => (
                <OptionCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  selected={formData.scamType === item.label}
                  onClick={() => updateField("scamType", item.label)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Step 2: Contact Platforms ─── */}
        {step === 2 && (
          <div>
            <StepHeader title="How did the scammer contact you?" desc="Select all that apply." />
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactPlatforms.map((item) => (
                <OptionCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  selected={formData.platforms.includes(item.label)}
                  onClick={() => toggleArrayValue("platforms", item.label)}
                  multi
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Step 3: What Was Shared ─── */}
        {step === 3 && (
          <div>
            <StepHeader title="Did you send money or personal information?" desc="This helps us understand the impact." />

            <div className="mt-6 space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Did you send money?
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("sentMoney", value)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentMoney === value
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Did you send personal information?
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("sentPersonalInfo", value)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentPersonalInfo === value
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Step 4: Payment Details ─── */}
        {step === 4 && (
          <div>
            <StepHeader title="Payment details" desc="How much was lost and how was it sent?" />

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Estimated amount lost
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-8 pr-4 text-lg outline-none focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 transition-colors"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Payment methods used
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((item) => (
                  <OptionCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    selected={formData.paymentMethods.includes(item.label)}
                    onClick={() => toggleArrayValue("paymentMethods", item.label)}
                    multi
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Step 5: Timeline ─── */}
        {step === 5 && (
          <div>
            <StepHeader title="Build the timeline" desc="Approximate dates are fine. This helps investigators." />

            <div className="mt-5 space-y-5">
              <DateField
                label="When did the scam first begin?"
                value={formData.startDate}
                onChange={(v) => updateField("startDate", v)}
              />
              <DateField
                label="When did you send money or information?"
                value={formData.paymentDate}
                onChange={(v) => updateField("paymentDate", v)}
              />
              <DateField
                label="When did you realize it was a scam?"
                value={formData.realizedDate}
                onChange={(v) => updateField("realizedDate", v)}
              />
            </div>
          </div>
        )}

        {/* ─── Step 6: Scammer Info ─── */}
        {step === 6 && (
          <div>
            <StepHeader title="Scammer details" desc="Add anything you have. Leave blank if unknown — you can always come back." />

            <div className="mt-5 space-y-4">
              <TextField icon="👤" placeholder="Name or alias" value={formData.suspectName} onChange={(v) => updateField("suspectName", v)} />
              <TextField icon="📧" placeholder="Email address" type="email" value={formData.suspectEmail} onChange={(v) => updateField("suspectEmail", v)} />
              <TextField icon="📞" placeholder="Phone number" value={formData.suspectPhone} onChange={(v) => updateField("suspectPhone", v)} />
              <TextField icon="@" placeholder="Username or handle" value={formData.suspectUsername} onChange={(v) => updateField("suspectUsername", v)} />
              <TextField icon="🪙" placeholder="Crypto wallet address" value={formData.suspectWallet} onChange={(v) => updateField("suspectWallet", v)} />
              <TextField icon="🌐" placeholder="Website or URL" value={formData.suspectWebsite} onChange={(v) => updateField("suspectWebsite", v)} />
            </div>
          </div>
        )}

        {/* ─── Step 7: Review ─── */}
        {step === 7 && (
          <div>
            <StepHeader
              title="Review your report"
              desc="Make sure everything looks right. You can go back to edit any section."
            />

            <div className="mt-6 space-y-4">
              <ReviewCard
                label="Your Story"
                stepIdx={0}
                onEdit={() => setStep(0)}
                content={formData.story || "—"}
                isLong
              />
              <ReviewCard
                label="Scam Type"
                stepIdx={1}
                onEdit={() => setStep(1)}
                content={formData.scamType || "—"}
              />
              <ReviewCard
                label="Contact Platforms"
                stepIdx={2}
                onEdit={() => setStep(2)}
                content={formData.platforms.length ? formData.platforms.join(", ") : "—"}
              />
              <ReviewCard
                label="Money Sent"
                stepIdx={3}
                onEdit={() => setStep(3)}
                content={`Money: ${formData.sentMoney || "—"} · Personal info: ${formData.sentPersonalInfo || "—"}`}
              />
              <ReviewCard
                label="Payment Details"
                stepIdx={4}
                onEdit={() => setStep(4)}
                content={`${formData.amount ? `$${Number(formData.amount).toLocaleString()}` : "—"} · ${formData.paymentMethods.length ? formData.paymentMethods.join(", ") : "—"}`}
              />
              <ReviewCard
                label="Timeline"
                stepIdx={5}
                onEdit={() => setStep(5)}
                content={`Started: ${formData.startDate || "—"} · Paid: ${formData.paymentDate || "—"} · Realized: ${formData.realizedDate || "—"}`}
              />
              <ReviewCard
                label="Scammer Details"
                stepIdx={6}
                onEdit={() => setStep(6)}
                content={[
                  formData.suspectName && `Name: ${formData.suspectName}`,
                  formData.suspectEmail && `Email: ${formData.suspectEmail}`,
                  formData.suspectPhone && `Phone: ${formData.suspectPhone}`,
                  formData.suspectUsername && `Username: ${formData.suspectUsername}`,
                  formData.suspectWallet && `Wallet: ${formData.suspectWallet}`,
                  formData.suspectWebsite && `Website: ${formData.suspectWebsite}`,
                ].filter(Boolean).join(" · ") || "—"}
              />
            </div>
          </div>
        )}

        {/* ─── Navigation ─── */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition-colors ${
              step === 0
                ? "cursor-not-allowed text-slate-300"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Next
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Report
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function StepHeader({ title, desc }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {desc && <p className="mt-1 text-sm text-slate-500">{desc}</p>}
    </div>
  );
}

function OptionCard({ icon, label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-red-500 bg-red-50 text-slate-900 shadow-sm"
          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 font-medium">{label}</span>
      {selected && (
        <svg className="h-5 w-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="date"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextField({ icon, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-0 focus-within:border-red-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-100 transition-colors">
      <span className="text-lg shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-3.5 outline-none placeholder-slate-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function ReviewCard({ label, content, onEdit, isLong }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-red-600 hover:text-red-700"
        >
          Edit
        </button>
      </div>
      <div className={`mt-2 text-sm text-slate-700 ${isLong ? "whitespace-pre-wrap" : ""}`}>
        {content}
      </div>
    </div>
  );
}
