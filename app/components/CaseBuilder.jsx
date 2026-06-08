"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/* ─── constants ─── */

const STORAGE_KEY = "scamcomplaints_draft";

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
  { label: "Other", icon: "❓" },
];

const emptyForm = {
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
  evidence: [], // { name, url, path, type, size }
};

/* ─── Flow phases ─── */
const PHASE = {
  WELCOME: "welcome",
  STORY: "story",
  EXTRACTING: "extracting",
  CONFIRM_EXTRACTION: "confirm_extraction",
  SCAM_TYPE: "scam_type",
  PLATFORMS: "platforms",
  MONEY_SENT: "money_sent",
  PAYMENT_DETAILS: "payment_details",
  TIMELINE: "timeline",
  SCAMMER_INFO: "scammer_info",
  EVIDENCE: "evidence",
  REVIEW: "review",
  SUBMITTING: "submitting",
  SUCCESS: "success",
};

/* ─── Main component ─── */

export default function CaseBuilder() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [phase, setPhase] = useState(PHASE.WELCOME);
  const [formData, setFormData] = useState(emptyForm);
  const [extractedData, setExtractedData] = useState(null);
  const [extractionError, setExtractionError] = useState(false);
  const [intakeId, setIntakeId] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const containerRef = useRef(null);

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [voiceDraft, setVoiceDraft] = useState("");
  const [showVoiceReview, setShowVoiceReview] = useState(false);
  const recognitionRef = useRef(null);

  /* ─── localStorage persistence ─── */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.story || parsed.scamType) {
          setHasDraft(true);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (phase !== PHASE.WELCOME && phase !== PHASE.SUCCESS) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...formData, _phase: phase })
        );
      } catch {}
    }
  }, [formData, phase]);

  function loadDraft() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { _phase, ...data } = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...data }));
        // Jump to where they left off, but at minimum to the story phase
        if (_phase && _phase !== PHASE.WELCOME && _phase !== PHASE.EXTRACTING && _phase !== PHASE.SUBMITTING) {
          transitionTo(_phase);
        } else {
          transitionTo(PHASE.STORY);
        }
      }
    } catch {
      transitionTo(PHASE.STORY);
    }
  }

  function clearDraft() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setHasDraft(false);
  }

  /* ─── phase transitions with animation ─── */

  function transitionTo(nextPhase) {
    setFadeIn(false);
    setTimeout(() => {
      setPhase(nextPhase);
      setFadeIn(true);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }

  /* ─── form helpers ─── */

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

  /* ─── voice input ─── */

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
          fullTranscript +=
            (fullTranscript ? " " : "") + event.results[i][0].transcript;
        }
      }
      setVoiceDraft(fullTranscript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      setIsListening(false);
      if (fullTranscript.trim()) setShowVoiceReview(true);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopVoiceInput() {
    if (recognitionRef.current) recognitionRef.current.stop();
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

  /* ─── AI extraction ─── */

  async function extractFromStory() {
    transitionTo(PHASE.EXTRACTING);
    setExtractionError(false);
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story: formData.story }),
      });

      if (!res.ok) {
        throw new Error("extraction failed");
      }

      const { extracted } = await res.json();
      setExtractedData(extracted);

      // Pre-fill form with extracted data
      setFormData((prev) => ({
        ...prev,
        scamType: extracted.scamType || prev.scamType,
        platforms: extracted.platforms?.length ? extracted.platforms : prev.platforms,
        sentMoney: extracted.sentMoney || prev.sentMoney,
        sentPersonalInfo: extracted.sentPersonalInfo || prev.sentPersonalInfo,
        amount: extracted.amount != null ? String(extracted.amount) : prev.amount,
        paymentMethods: extracted.paymentMethods?.length
          ? extracted.paymentMethods
          : prev.paymentMethods,
        startDate: extracted.startDate || prev.startDate,
        paymentDate: extracted.paymentDate || prev.paymentDate,
        realizedDate: extracted.realizedDate || prev.realizedDate,
        suspectName: extracted.suspectName || prev.suspectName,
        suspectEmail: extracted.suspectEmail || prev.suspectEmail,
        suspectPhone: extracted.suspectPhone || prev.suspectPhone,
        suspectUsername: extracted.suspectUsername || prev.suspectUsername,
        suspectWallet: extracted.suspectWallet || prev.suspectWallet,
        suspectWebsite: extracted.suspectWebsite || prev.suspectWebsite,
      }));

      transitionTo(PHASE.CONFIRM_EXTRACTION);
    } catch {
      setExtractionError(true);
      // Fallback to manual flow
      transitionTo(PHASE.SCAM_TYPE);
    }
  }

  /* ─── smart next step ─── */

  function getNextPhase(currentPhase) {
    switch (currentPhase) {
      case PHASE.CONFIRM_EXTRACTION:
        return PHASE.EVIDENCE;
      case PHASE.SCAM_TYPE:
        return PHASE.PLATFORMS;
      case PHASE.PLATFORMS:
        return PHASE.MONEY_SENT;
      case PHASE.MONEY_SENT:
        return formData.sentMoney === "No"
          ? PHASE.TIMELINE
          : PHASE.PAYMENT_DETAILS;
      case PHASE.PAYMENT_DETAILS:
        return PHASE.TIMELINE;
      case PHASE.TIMELINE:
        return PHASE.SCAMMER_INFO;
      case PHASE.SCAMMER_INFO:
        return PHASE.EVIDENCE;
      case PHASE.EVIDENCE:
        return PHASE.REVIEW;
      default:
        return PHASE.REVIEW;
    }
  }

  function goNext(from) {
    transitionTo(getNextPhase(from));
  }

  /* ─── submit ─── */

  async function handleSubmit() {
    transitionTo(PHASE.SUBMITTING);
    try {
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
        body: JSON.stringify({
          ...formData,
          evidenceUrls: (formData.evidence || []).map((f) => f.url),
          recaptchaToken,
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result?.error || "Something went wrong.");

      setIntakeId(result.intakeId);
      clearDraft();
      transitionTo(PHASE.SUCCESS);
    } catch (error) {
      alert(error.message || "Failed to submit report.");
      transitionTo(PHASE.REVIEW);
    }
  }

  /* ─── progress calculation ─── */

  const phaseOrder = [
    PHASE.WELCOME,
    PHASE.STORY,
    PHASE.EXTRACTING,
    PHASE.CONFIRM_EXTRACTION,
    PHASE.SCAM_TYPE,
    PHASE.PLATFORMS,
    PHASE.MONEY_SENT,
    PHASE.PAYMENT_DETAILS,
    PHASE.TIMELINE,
    PHASE.SCAMMER_INFO,
    PHASE.EVIDENCE,
    PHASE.REVIEW,
  ];

  const progress = useMemo(() => {
    const idx = phaseOrder.indexOf(phase);
    if (idx < 0) return 100;
    return Math.round((idx / (phaseOrder.length - 1)) * 100);
  }, [phase]);

  /* ─── Render ─── */

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl px-4 py-6 pb-16 sm:py-10 min-h-[calc(100dvh-64px)]">
      {/* Progress bar — hidden on welcome/success */}
      {phase !== PHASE.WELCOME &&
        phase !== PHASE.SUCCESS &&
        phase !== PHASE.SUBMITTING && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                Building your report
              </span>
              <span className="text-xs text-slate-400">
                ~3 min
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-accent to-brand transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progress, 5)}%` }}
              />
            </div>
          </div>
        )}

      {/* Phase content with fade transition */}
      <div
        className={`transition-all duration-200 ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {/* ── WELCOME ── */}
        {phase === PHASE.WELCOME && (
          <div className="text-center py-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50">
              <svg
                className="h-8 w-8 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              You're in the right place.
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto">
              What happened to you isn't your fault. We'll help you build a clear, 
              detailed report that can protect others and support investigations.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Most people finish in about 3 minutes. Your progress is saved automatically.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                onClick={() => transitionTo(PHASE.STORY)}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-accent px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover hover:shadow-brand-accent/30 transition-all"
              >
                Start Your Report
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              {hasDraft && (
                <button
                  onClick={loadDraft}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <svg
                    className="h-4 w-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Continue where you left off
                </button>
              )}
            </div>

            {/* Trust signals */}
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-lg">🔒</div>
                <div className="mt-1 text-xs text-slate-500">Encrypted &<br/>private</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-lg">⏱️</div>
                <div className="mt-1 text-xs text-slate-500">~3 min to<br/>complete</div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="text-lg">🤖</div>
                <div className="mt-1 text-xs text-slate-500">AI helps fill<br/>in details</div>
              </div>
            </div>
          </div>
        )}

        {/* ── STORY ── */}
        {phase === PHASE.STORY && (
          <PhaseCard>
            <QuestionBubble>
              Tell us what happened — in your own words.
            </QuestionBubble>
            <p className="mt-2 text-sm text-slate-500">
              Don't worry about getting it perfect. Just describe what happened
              — who contacted you, what they said, what you did. You can type or use voice.
            </p>

            <textarea
              className="mt-5 min-h-[180px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-relaxed outline-none focus:border-brand-accent/50 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 transition-colors resize-none"
              placeholder="Example: Someone messaged me on Instagram pretending to be a crypto investor. They got me to send $3,000 in Bitcoin to a wallet address..."
              value={formData.story}
              onChange={(e) => updateField("story", e.target.value)}
              autoFocus
            />

            {/* Voice controls */}
            <div className="mt-4 flex flex-wrap gap-3">
              {isListening ? (
                <button
                  type="button"
                  onClick={stopVoiceInput}
                  className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-medium text-white hover:bg-brand-light transition-colors"
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
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <svg
                    className="h-5 w-5 text-slate-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  Speak Instead
                </button>
              )}
            </div>

            {/* Recording indicator */}
            {isListening && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <span className="relative flex h-4 w-4 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                </span>
                <p className="text-sm text-red-800">
                  <strong>Listening...</strong> Speak clearly. Click "Stop
                  Recording" when done.
                </p>
              </div>
            )}

            {/* Voice review */}
            {showVoiceReview && voiceDraft && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-800">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-semibold">Voice captured</span>
                </div>
                <div className="mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-slate-800 leading-relaxed text-sm">
                  &ldquo;{voiceDraft}&rdquo;
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={useVoiceDraft}
                    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
                  >
                    ✓ Use This
                  </button>
                  <button
                    type="button"
                    onClick={retryVoiceInput}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      useVoiceDraft();
                      setTimeout(() => startVoiceInput(), 150);
                    }}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Use This & Add More
                  </button>
                </div>
              </div>
            )}

            {/* Word count */}
            {formData.story && (
              <div className="mt-3 text-right text-xs text-slate-400">
                {formData.story.split(/\s+/).filter(Boolean).length} words
              </div>
            )}

            {/* Continue button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (formData.story.trim().length >= 20) {
                    extractFromStory();
                  } else {
                    // Not enough text for extraction, go manual
                    transitionTo(PHASE.SCAM_TYPE);
                  }
                }}
                disabled={!formData.story.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Continue
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ── EXTRACTING (loading state) ── */}
        {phase === PHASE.EXTRACTING && (
          <PhaseCard>
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <svg
                  className="h-8 w-8 text-slate-600 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Reading your story...
              </h2>
              <p className="mt-2 text-slate-500">
                Our AI is extracting the key details so you don't have to
                re-enter them.
              </p>
            </div>
          </PhaseCard>
        )}

        {/* ── CONFIRM EXTRACTION ── */}
        {phase === PHASE.CONFIRM_EXTRACTION && extractedData && (
          <PhaseCard>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                <svg
                  className="h-5 w-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Here's what we found
                </h2>
                <p className="text-sm text-slate-500">
                  Review the details below. You can edit anything that's wrong.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {formData.scamType && (
                <ExtractedField
                  label="Scam Type"
                  value={formData.scamType}
                  icon={scamTypes.find((s) => s.label === formData.scamType)?.icon || "❓"}
                />
              )}
              {formData.platforms.length > 0 && (
                <ExtractedField
                  label="Platforms"
                  value={formData.platforms.join(", ")}
                  icon="📱"
                />
              )}
              {formData.sentMoney && (
                <ExtractedField
                  label="Money Sent"
                  value={formData.sentMoney}
                  icon={formData.sentMoney === "Yes" ? "💸" : "🚫"}
                />
              )}
              {formData.amount && (
                <ExtractedField
                  label="Amount Lost"
                  value={`$${Number(formData.amount).toLocaleString()}`}
                  icon="💰"
                />
              )}
              {formData.paymentMethods.length > 0 && (
                <ExtractedField
                  label="Payment Methods"
                  value={formData.paymentMethods.join(", ")}
                  icon="💳"
                />
              )}
              {(formData.startDate || formData.paymentDate || formData.realizedDate) && (
                <ExtractedField
                  label="Timeline"
                  value={[
                    formData.startDate && `Started: ${formData.startDate}`,
                    formData.paymentDate && `Paid: ${formData.paymentDate}`,
                    formData.realizedDate && `Realized: ${formData.realizedDate}`,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  icon="📅"
                />
              )}
              {(formData.suspectName ||
                formData.suspectEmail ||
                formData.suspectPhone ||
                formData.suspectUsername ||
                formData.suspectWallet ||
                formData.suspectWebsite) && (
                <ExtractedField
                  label="Scammer Details"
                  value={[
                    formData.suspectName,
                    formData.suspectEmail,
                    formData.suspectPhone,
                    formData.suspectUsername,
                    formData.suspectWallet &&
                      `${formData.suspectWallet.slice(0, 12)}...`,
                    formData.suspectWebsite,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  icon="🔍"
                />
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={() => transitionTo(PHASE.SCAM_TYPE)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Details
              </button>
              <button
                onClick={() => transitionTo(PHASE.REVIEW)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                Looks Good — Review & Submit
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ── SCAM TYPE ── */}
        {phase === PHASE.SCAM_TYPE && (
          <PhaseCard>
            <QuestionBubble>What type of scam was this?</QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              Pick the closest match.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
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
            <NavButtons
              onBack={() => transitionTo(PHASE.STORY)}
              onNext={() => goNext(PHASE.SCAM_TYPE)}
              nextDisabled={!formData.scamType}
            />
          </PhaseCard>
        )}

        {/* ── PLATFORMS ── */}
        {phase === PHASE.PLATFORMS && (
          <PhaseCard>
            <QuestionBubble>How did the scammer reach you?</QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              Select all that apply.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
            <NavButtons
              onBack={() => transitionTo(PHASE.SCAM_TYPE)}
              onNext={() => goNext(PHASE.PLATFORMS)}
            />
          </PhaseCard>
        )}

        {/* ── MONEY SENT ── */}
        {phase === PHASE.MONEY_SENT && (
          <PhaseCard>
            <QuestionBubble>
              Did you send money or personal information?
            </QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              This helps us understand the impact.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Did you send money?
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => updateField("sentMoney", v)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentMoney === v
                          ? "border-brand-accent bg-gold-50 text-brand"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Did you share personal information?
                </label>
                <div className="flex gap-3">
                  {["Yes", "No"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => updateField("sentPersonalInfo", v)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentPersonalInfo === v
                          ? "border-brand-accent bg-gold-50 text-brand"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <NavButtons
              onBack={() => transitionTo(PHASE.PLATFORMS)}
              onNext={() => goNext(PHASE.MONEY_SENT)}
            />
          </PhaseCard>
        )}

        {/* ── PAYMENT DETAILS ── */}
        {phase === PHASE.PAYMENT_DETAILS && (
          <PhaseCard>
            <QuestionBubble>How much did you lose, and how was it sent?</QuestionBubble>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Estimated amount lost
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                  $
                </span>
                <input
                  type="number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-8 pr-4 text-lg outline-none focus:border-brand-accent/50 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 transition-colors"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment methods used
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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

            <NavButtons
              onBack={() => transitionTo(PHASE.MONEY_SENT)}
              onNext={() => goNext(PHASE.PAYMENT_DETAILS)}
            />
          </PhaseCard>
        )}

        {/* ── TIMELINE ── */}
        {phase === PHASE.TIMELINE && (
          <PhaseCard>
            <QuestionBubble>When did this happen?</QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              Approximate dates are fine. This helps investigators.
            </p>

            <div className="mt-5 space-y-5">
              <DateField
                label="When did the scam start?"
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

            <NavButtons
              onBack={() =>
                formData.sentMoney === "No"
                  ? transitionTo(PHASE.MONEY_SENT)
                  : transitionTo(PHASE.PAYMENT_DETAILS)
              }
              onNext={() => goNext(PHASE.TIMELINE)}
            />
          </PhaseCard>
        )}

        {/* ── SCAMMER INFO ── */}
        {phase === PHASE.SCAMMER_INFO && (
          <PhaseCard>
            <QuestionBubble>
              Do you have any details about the scammer?
            </QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              Add anything you have. Leave blank if unknown — every bit helps.
            </p>

            <div className="mt-5 space-y-3">
              <TextField
                icon="👤"
                placeholder="Name or alias"
                value={formData.suspectName}
                onChange={(v) => updateField("suspectName", v)}
              />
              <TextField
                icon="📧"
                placeholder="Email address"
                type="email"
                value={formData.suspectEmail}
                onChange={(v) => updateField("suspectEmail", v)}
              />
              <TextField
                icon="📞"
                placeholder="Phone number"
                value={formData.suspectPhone}
                onChange={(v) => updateField("suspectPhone", v)}
              />
              <TextField
                icon="@"
                placeholder="Username or handle"
                value={formData.suspectUsername}
                onChange={(v) => updateField("suspectUsername", v)}
              />
              <TextField
                icon="🪙"
                placeholder="Crypto wallet address"
                value={formData.suspectWallet}
                onChange={(v) => updateField("suspectWallet", v)}
              />
              <TextField
                icon="🌐"
                placeholder="Website or URL"
                value={formData.suspectWebsite}
                onChange={(v) => updateField("suspectWebsite", v)}
              />
            </div>

            <NavButtons
              onBack={() => transitionTo(PHASE.TIMELINE)}
              onNext={() => goNext(PHASE.SCAMMER_INFO)}
              nextLabel="Review Report"
            />
          </PhaseCard>
        )}

        {/* ── EVIDENCE ── */}
        {phase === PHASE.EVIDENCE && (
          <PhaseCard>
            <QuestionBubble>
              Do you have any screenshots, receipts, or photos?
            </QuestionBubble>
            <p className="mt-1 text-sm text-slate-500">
              Upload evidence like transaction receipts, gift card photos, chat
              screenshots, or bank statements. This is optional but strengthens
              your report.
            </p>

            <EvidenceUploader
              evidence={formData.evidence}
              onChange={(evidence) => updateField("evidence", evidence)}
            />

            <NavButtons
              onBack={() =>
                extractedData
                  ? transitionTo(PHASE.CONFIRM_EXTRACTION)
                  : transitionTo(PHASE.SCAMMER_INFO)
              }
              onNext={() => goNext(PHASE.EVIDENCE)}
              nextLabel={
                formData.evidence.length > 0
                  ? "Review Report"
                  : "Skip — Review Report"
              }
            />
          </PhaseCard>
        )}

        {/* ── REVIEW ── */}
        {phase === PHASE.REVIEW && (
          <PhaseCard>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <svg
                  className="h-5 w-5 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Review your report
                </h2>
                <p className="text-sm text-slate-500">
                  Make sure everything looks right before submitting.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <ReviewCard
                label="Your Story"
                content={formData.story || "—"}
                onEdit={() => transitionTo(PHASE.STORY)}
                isLong
              />
              <ReviewCard
                label="Scam Type"
                content={formData.scamType || "—"}
                onEdit={() => transitionTo(PHASE.SCAM_TYPE)}
              />
              <ReviewCard
                label="Contact Platforms"
                content={
                  formData.platforms.length
                    ? formData.platforms.join(", ")
                    : "—"
                }
                onEdit={() => transitionTo(PHASE.PLATFORMS)}
              />
              <ReviewCard
                label="Money & Info"
                content={`Money: ${formData.sentMoney || "—"} · Personal info: ${formData.sentPersonalInfo || "—"}`}
                onEdit={() => transitionTo(PHASE.MONEY_SENT)}
              />
              {formData.sentMoney !== "No" && (
                <ReviewCard
                  label="Payment Details"
                  content={`${formData.amount ? `$${Number(formData.amount).toLocaleString()}` : "—"} · ${formData.paymentMethods.length ? formData.paymentMethods.join(", ") : "—"}`}
                  onEdit={() => transitionTo(PHASE.PAYMENT_DETAILS)}
                />
              )}
              <ReviewCard
                label="Timeline"
                content={`Started: ${formData.startDate || "—"} · Paid: ${formData.paymentDate || "—"} · Realized: ${formData.realizedDate || "—"}`}
                onEdit={() => transitionTo(PHASE.TIMELINE)}
              />
              <ReviewCard
                label="Scammer Details"
                content={
                  [
                    formData.suspectName && `Name: ${formData.suspectName}`,
                    formData.suspectEmail && `Email: ${formData.suspectEmail}`,
                    formData.suspectPhone && `Phone: ${formData.suspectPhone}`,
                    formData.suspectUsername && `@${formData.suspectUsername}`,
                    formData.suspectWallet &&
                      `Wallet: ${formData.suspectWallet}`,
                    formData.suspectWebsite &&
                      `Web: ${formData.suspectWebsite}`,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "—"
                }
                onEdit={() => transitionTo(PHASE.SCAMMER_INFO)}
              />
              <ReviewCard
                label="Evidence"
                content={
                  formData.evidence.length > 0
                    ? `${formData.evidence.length} file${formData.evidence.length > 1 ? "s" : ""} attached`
                    : "No files attached"
                }
                onEdit={() => transitionTo(PHASE.EVIDENCE)}
              />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => {
                  // Go back to the previous logical step
                  if (extractedData) {
                    transitionTo(PHASE.CONFIRM_EXTRACTION);
                  } else {
                    transitionTo(PHASE.SCAMMER_INFO);
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 font-semibold text-white shadow-lg shadow-brand-accent/20 hover:bg-brand-accent-hover transition-all"
              >
                Submit Report
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
            </div>
          </PhaseCard>
        )}

        {/* ── SUBMITTING ── */}
        {phase === PHASE.SUBMITTING && (
          <PhaseCard>
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-50">
                <svg
                  className="h-8 w-8 text-brand animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900">
                Submitting your report...
              </h2>
              <p className="mt-2 text-slate-500">
                Encrypting and saving your data securely.
              </p>
            </div>
          </PhaseCard>
        )}

        {/* ── SUCCESS ── */}
        {phase === PHASE.SUCCESS && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-10 w-10 text-emerald-600"
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

            <h1 className="text-3xl font-bold text-slate-900">
              Report Submitted
            </h1>
            <p className="mt-3 text-lg text-slate-600 max-w-md mx-auto">
              Thank you for speaking up. Your report helps protect others
              and supports investigations.
            </p>

            {intakeId && (
              <p className="mt-4 text-sm text-slate-500">
                Reference ID:{" "}
                <span className="font-mono font-medium text-slate-700">
                  {intakeId.slice(0, 8)}
                </span>
              </p>
            )}

            {/* What happens next */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-slate-900 text-sm">
                What happens next?
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Your report is encrypted and stored securely
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  It helps identify scam patterns and repeat offenders
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  Law enforcement can use aggregated data for investigations
                </li>
              </ul>
            </div>

            {/* Quick recovery tips */}
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold text-amber-900 text-sm">
                🛡️ Protect yourself now
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">→</span>
                  Contact your bank or payment provider to dispute charges
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">→</span>
                  File a report at{" "}
                  <a
                    href="https://reportfraud.ftc.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    FTC.gov
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.ic3.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    IC3.gov
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">→</span>
                  Change passwords on any accounts the scammer accessed
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">→</span>
                  Consider a credit freeze at all three bureaus
                </li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  setFormData(emptyForm);
                  setExtractedData(null);
                  setIntakeId(null);
                  transitionTo(PHASE.WELCOME);
                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 transition-colors"
              >
                Submit Another Report
              </button>
              <a
                href="/"
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function PhaseCard({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

function QuestionBubble({ children }) {
  return (
    <h2 className="text-xl font-semibold text-slate-900 leading-snug">
      {children}
    </h2>
  );
}

function ExtractedField({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-lg shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {label}
        </div>
        <div className="text-sm text-slate-800 truncate">{value}</div>
      </div>
      <svg
        className="h-4 w-4 text-emerald-500 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function OptionCard({ icon, label, selected, onClick, multi }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 sm:gap-3 rounded-xl border-2 p-2.5 sm:p-3.5 text-left transition-all ${
        selected
          ? "border-brand-accent bg-gold-50 text-slate-900 shadow-sm"
          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span className="text-lg sm:text-xl">{icon}</span>
      <span className="flex-1 font-medium text-xs sm:text-sm">{label}</span>
      {selected && (
        <svg
          className="h-5 w-5 text-brand-accent shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="date"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-brand-accent/50 focus:bg-white focus:ring-2 focus:ring-brand-accent/20 transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextField({ icon, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-0 focus-within:border-brand-accent/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-accent/20 transition-colors">
      <span className="text-lg shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-3.5 outline-none placeholder-slate-400 text-sm"
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
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-brand-accent hover:text-brand-accent-hover"
        >
          Edit
        </button>
      </div>
      <div
        className={`mt-1.5 text-sm text-slate-700 ${isLong ? "whitespace-pre-wrap line-clamp-4" : ""}`}
      >
        {content}
      </div>
    </div>
  );
}

function EvidenceUploader({ evidence, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [ocrResults, setOcrResults] = useState({});
  const [ocrLoading, setOcrLoading] = useState({});
  const fileInputRef = useRef(null);

  async function handleFiles(files) {
    if (!files || files.length === 0) return;
    const remaining = 10 - evidence.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) return;

    setUploading(true);
    try {
      const fd = new FormData();
      toUpload.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const result = await res.json();

      if (result.uploaded?.length > 0) {
        onChange([...evidence, ...result.uploaded]);
      }
      if (result.errors?.length > 0) {
        alert(
          `Some files failed:\n${result.errors.map((e) => `${e.name}: ${e.error}`).join("\n")}`
        );
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function removeFile(idx) {
    const next = [...evidence];
    next.splice(idx, 1);
    onChange(next);
  }

  async function runOcr(file, idx) {
    setOcrLoading((prev) => ({ ...prev, [idx]: true }));
    try {
      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: file.url }),
      });
      const result = await res.json();
      if (result.extracted) {
        setOcrResults((prev) => ({ ...prev, [idx]: result.extracted }));
      }
    } catch {
      // silent fail
    } finally {
      setOcrLoading((prev) => ({ ...prev, [idx]: false }));
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }

  const isImage = (type) => type?.startsWith("image/");

  return (
    <div className="mt-5 space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-brand-accent bg-gold-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-white"
        } ${uploading ? "pointer-events-none opacity-60" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <>
            <svg
              className="h-8 w-8 text-slate-400 animate-spin mb-3"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-sm text-slate-500">Uploading...</p>
          </>
        ) : (
          <>
            <svg
              className="h-10 w-10 text-slate-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm font-medium text-slate-700">
              Drop files here or click to browse
            </p>
            <p className="mt-1 text-xs text-slate-400">
              JPG, PNG, WebP, GIF, or PDF · Max 10MB each · Up to 10 files
            </p>
          </>
        )}
      </div>

      {/* File previews */}
      {evidence.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {evidence.map((file, idx) => (
            <div
              key={file.path || idx}
              className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              {/* Preview */}
              {isImage(file.type) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="h-32 w-full object-cover"
                />
              ) : (
                <div className="flex h-32 items-center justify-center bg-slate-50">
                  <svg
                    className="h-10 w-10 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              )}

              {/* File name */}
              <div className="px-2 py-1.5">
                <p className="text-[11px] text-slate-500 truncate">
                  {file.name}
                </p>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                ×
              </button>

              {/* OCR button — only for images */}
              {isImage(file.type) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    runOcr(file, idx);
                  }}
                  disabled={ocrLoading[idx]}
                  className="absolute top-1 left-1 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Extract text from this image"
                >
                  {ocrLoading[idx] ? "..." : "🔍 OCR"}
                </button>
              )}

              {/* OCR result */}
              {ocrResults[idx] && (
                <div className="border-t border-slate-100 bg-emerald-50 px-2 py-1.5">
                  <p className="text-[10px] font-medium text-emerald-700">
                    Extracted:
                  </p>
                  <p className="text-[10px] text-emerald-600 line-clamp-2">
                    {ocrResults[idx].rawText
                      ? ocrResults[idx].rawText.slice(0, 120)
                      : "No text found"}
                    {ocrResults[idx].amount &&
                      ` · $${ocrResults[idx].amount}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {evidence.length > 0 && (
        <p className="text-xs text-slate-400 text-right">
          {evidence.length}/10 files
        </p>
      )}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextDisabled, nextLabel = "Continue" }) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {nextLabel}
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
  );
}
