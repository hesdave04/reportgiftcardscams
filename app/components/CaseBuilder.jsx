"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/* ─── constants ─── */

const STORAGE_KEY = "scamcomplaints_draft";

const PHASES = [
  "welcome",
  "story",
  "type",
  "platforms",
  "impact",
  "timeline",
  "scammer",
  "review",
];

const scamTypes = [
  { label: "Romance Scam", icon: "💔" },
  { label: "Gift Card Scam", icon: "🎁" },
  { label: "Crypto / Investment Scam", icon: "🪙" },
  { label: "Impersonation Scam", icon: "🎭" },
  { label: "Tech Support Scam", icon: "💻" },
  { label: "Online Shopping Scam", icon: "🛒" },
  { label: "Employment Scam", icon: "💼" },
  { label: "Banking / Phishing Scam", icon: "🏦" },
  { label: "Government Impersonation", icon: "🏛️" },
  { label: "Other", icon: "❓" },
];

const contactPlatforms = [
  { label: "Facebook", icon: "📘" },
  { label: "Instagram", icon: "📸" },
  { label: "WhatsApp", icon: "💬" },
  { label: "Telegram", icon: "✈️" },
  { label: "Text / SMS", icon: "📱" },
  { label: "Email", icon: "📧" },
  { label: "Phone Call", icon: "📞" },
  { label: "Dating App", icon: "💕" },
  { label: "TikTok", icon: "🎵" },
  { label: "Website", icon: "🌐" },
  { label: "In Person", icon: "🤝" },
  { label: "Other", icon: "🔗" },
];

const paymentMethods = [
  { label: "Gift Card", icon: "🎁" },
  { label: "Bank / Wire Transfer", icon: "🏦" },
  { label: "Cryptocurrency", icon: "🪙" },
  { label: "Cash App", icon: "💵" },
  { label: "Venmo", icon: "💳" },
  { label: "PayPal", icon: "🅿️" },
  { label: "Zelle", icon: "⚡" },
  { label: "Cash", icon: "💰" },
  { label: "Check", icon: "📝" },
  { label: "Other", icon: "❓" },
];

/* ─── recovery checklists by scam type ─── */

const RECOVERY_STEPS = {
  default: [
    { action: "File a report with the FTC", detail: "Your report feeds a database used by 3,000+ law enforcement agencies.", link: "https://reportfraud.ftc.gov" },
    { action: "Report to the FBI's IC3", detail: "The Internet Crime Complaint Center tracks cyber-enabled fraud nationally.", link: "https://www.ic3.gov" },
    { action: "Contact your bank or financial institution", detail: "Report the fraudulent transaction. Some transfers can be reversed if reported quickly." },
    { action: "Change your passwords", detail: "Update passwords on any accounts you shared with the scammer. Use unique passwords for each site." },
    { action: "Monitor your credit", detail: "Request free credit reports at AnnualCreditReport.com. Consider a fraud alert or credit freeze.", link: "https://www.annualcreditreport.com" },
    { action: "Save all evidence", detail: "Screenshot messages, emails, profiles, and transaction receipts before deleting anything." },
  ],
  "Romance Scam": [
    { action: "Contact your bank immediately", detail: "Report fraudulent transfers. Wire transfers may be reversible within 24–72 hours." },
    { action: "File with the FTC", detail: "Visit ReportFraud.ftc.gov — romance scams are the #1 reported fraud type.", link: "https://reportfraud.ftc.gov" },
    { action: "Report to FBI IC3", detail: "The FBI tracks romance scam networks internationally.", link: "https://www.ic3.gov" },
    { action: "Block the scammer everywhere", detail: "Block on all platforms. Do not respond to follow-up messages — they often try again." },
    { action: "Preserve all evidence", detail: "Screenshot every message, profile photo, and transaction before blocking." },
    { action: "Check for identity theft", detail: "If you shared your SSN or ID: call Equifax (800-349-9960), Experian (888-397-3742), or TransUnion (800-680-7289) to place a fraud alert." },
    { action: "Get support — you're not alone", detail: "AARP Fraud Helpline: 877-908-3360. This happens to smart, caring people every day." },
  ],
  "Gift Card Scam": [
    { action: "Contact the gift card company NOW", detail: "Some companies can freeze remaining funds. Call immediately." },
    { action: "Gift card company phone numbers", detail: "Apple: 800-275-2273 · Google Play: support.google.com/googleplay · Amazon: 888-280-4331 · Target: 800-544-2943 · Walmart: 888-537-5503" },
    { action: "File with the FTC", detail: "Gift card scams are heavily tracked by the FTC.", link: "https://reportfraud.ftc.gov" },
    { action: "Keep the physical cards and receipts", detail: "These are evidence. Don't throw them away." },
    { action: "Report to the retailer", detail: "The store where you bought the cards may be able to help with the investigation." },
  ],
  "Crypto / Investment Scam": [
    { action: "Report to the FTC and IC3", detail: "Both agencies track crypto fraud.", link: "https://reportfraud.ftc.gov" },
    { action: "Report to the SEC", detail: "If the scam involved securities or investment returns.", link: "https://www.sec.gov/tcr" },
    { action: "Report to the CFTC", detail: "For crypto commodity fraud.", link: "https://www.cftc.gov/complaint" },
    { action: "Save wallet addresses and transaction hashes", detail: "Blockchain transactions are traceable. This info helps investigators." },
    { action: "Contact your crypto exchange", detail: "Platforms like Coinbase, Binance, or Kraken may be able to flag the receiving wallet." },
    { action: "Do not send more money", detail: "Recovery scams often follow — someone claiming they can get your crypto back for a fee. This is also a scam." },
  ],
  "Tech Support Scam": [
    { action: "Disconnect from any remote access", detail: "If they installed software (AnyDesk, TeamViewer, etc.), uninstall it immediately and restart your computer." },
    { action: "Run a malware scan", detail: "Use Windows Defender, Malwarebytes, or another trusted security tool." },
    { action: "Change all passwords", detail: "Especially banking, email, and any accounts you accessed during the remote session." },
    { action: "Contact your bank", detail: "If you gave payment info, report it as fraud." },
    { action: "File with the FTC", detail: "Tech support scams are a top priority for the FTC.", link: "https://reportfraud.ftc.gov" },
  ],
  "Impersonation Scam": [
    { action: "Report to the impersonated organization", detail: "If they pretended to be IRS, Social Security, a utility, or a company — report it directly to that organization." },
    { action: "IRS impersonation?", detail: "Report to TIGTA: 800-366-4484 or treasury.gov/tigta", link: "https://www.treasury.gov/tigta" },
    { action: "File with the FTC", detail: "Government impersonation scams are rising sharply.", link: "https://reportfraud.ftc.gov" },
    { action: "Do not pay any more 'fees' or 'fines'", detail: "Real government agencies never demand payment by gift card, wire transfer, or crypto." },
  ],
  "Government Impersonation": [
    { action: "Report to the real agency they impersonated", detail: "IRS: TIGTA at 800-366-4484. SSA: oig.ssa.gov. Medicare: 800-633-4227." },
    { action: "File with the FTC", detail: "Government impersonation is the fastest-growing scam type.", link: "https://reportfraud.ftc.gov" },
    { action: "Know this: real agencies won't threaten arrest", detail: "The IRS, SSA, and other agencies will never call threatening arrest or demand immediate payment." },
    { action: "If you shared your SSN", detail: "Place a fraud alert: Equifax (800-349-9960), Experian (888-397-3742), TransUnion (800-680-7289)." },
  ],
};

function getRecoverySteps(scamType) {
  return RECOVERY_STEPS[scamType] || RECOVERY_STEPS.default;
}

/* ─── main component ─── */

export default function CaseBuilder() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [intakeId, setIntakeId] = useState(null);
  const [showResume, setShowResume] = useState(false);

  /* voice */
  const [isListening, setIsListening] = useState(false);
  const [voiceDraft, setVoiceDraft] = useState("");
  const [showVoiceReview, setShowVoiceReview] = useState(false);
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

  const phase = PHASES[currentPhase];
  const totalSteps = PHASES.length - 2; // exclude welcome & review from count
  const stepNumber = currentPhase; // welcome=0 (hidden), story=1, ..., scammer=6, review=7
  const progress = currentPhase === 0 ? 0 : Math.min(100, Math.round((currentPhase / (PHASES.length - 1)) * 100));

  /* ─── localStorage persistence ─── */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData && parsed.step > 0) {
          setShowResume(true);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (currentPhase > 0 && !submitted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step: currentPhase }));
      } catch {}
    }
  }, [formData, currentPhase, submitted]);

  function resumeDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.formData) {
        setFormData(prev => ({ ...prev, ...saved.formData }));
        setCurrentPhase(saved.step || 1);
      }
    } catch {}
    setShowResume(false);
  }

  function discardDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setShowResume(false);
  }

  /* ─── helpers ─── */

  function updateField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function toggleArray(field, value) {
    setFormData(prev => {
      const arr = prev[field] || [];
      return { ...prev, [field]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value] };
    });
  }

  function goForward() {
    if (currentPhase < PHASES.length - 1) setCurrentPhase(prev => prev + 1);
  }

  function goBack() {
    if (currentPhase > 0) setCurrentPhase(prev => prev - 1);
  }

  function jumpTo(idx) {
    if (idx >= 0 && idx < PHASES.length) setCurrentPhase(idx);
  }

  const wordCount = useMemo(() => formData.story.trim().split(/\s+/).filter(Boolean).length, [formData.story]);
  const canProceedFromStory = wordCount >= 5;

  /* ─── voice input ─── */

  function startVoice() {
    if (typeof window === "undefined") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input isn't supported in this browser. Try Chrome or Safari."); return; }

    setVoiceDraft("");
    setShowVoiceReview(false);
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.continuous = true;
    let full = "";
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) full += (full ? " " : "") + e.results[i][0].transcript;
      }
      setVoiceDraft(full);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => { setIsListening(false); if (full.trim()) setShowVoiceReview(true); };
    recognitionRef.current = rec;
    rec.start();
  }

  function stopVoice() { recognitionRef.current?.stop(); }

  function useVoiceDraft() {
    if (!voiceDraft.trim()) return;
    updateField("story", formData.story ? formData.story + " " + voiceDraft : voiceDraft);
    setVoiceDraft("");
    setShowVoiceReview(false);
  }

  /* ─── submit ─── */

  async function handleSubmit() {
    setSubmitting(true);
    try {
      let recaptchaToken = null;
      if (executeRecaptcha) {
        try { recaptchaToken = await executeRecaptcha("submit_case"); } catch {}
      }
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.error || "Something went wrong.");
      setIntakeId(result.intakeId);
      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      alert(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── success screen ─── */

  if (submitted) {
    const steps = getRecoverySteps(formData.scamType);
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div key="success" className="animate-fadeSlideIn">
          {/* Confirmation */}
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-slate-900">Your Report Has Been Filed</h1>
            <p className="mt-2 text-slate-600">Thank you for speaking up. Your report helps protect others.</p>
            {intakeId && (
              <p className="mt-3 rounded-lg bg-slate-100 px-4 py-2 inline-block text-sm text-slate-600">
                Reference: <span className="font-mono font-semibold text-slate-800">{intakeId.slice(0, 8).toUpperCase()}</span>
              </p>
            )}
          </div>

          {/* Recovery checklist */}
          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Your Recovery Checklist
              {formData.scamType && <span className="ml-2 text-sm font-normal text-emerald-700">({formData.scamType})</span>}
            </h2>
            <p className="mt-1 text-sm text-emerald-700">Based on your report, here are the specific steps you should take:</p>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-800">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-emerald-900">{s.action}</p>
                    <p className="mt-0.5 text-sm text-emerald-800">{s.detail}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-emerald-700 underline decoration-emerald-400 underline-offset-2 hover:text-emerald-900">
                        Visit site →
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Quick links */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a href="https://reportfraud.ftc.gov" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 hover:shadow transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">🏛️</div>
              <div>
                <p className="font-semibold text-slate-900">File with the FTC</p>
                <p className="text-xs text-slate-500">ReportFraud.ftc.gov</p>
              </div>
            </a>
            <a href="https://www.ic3.gov" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-300 hover:shadow transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">🛡️</div>
              <div>
                <p className="font-semibold text-slate-900">Report to FBI IC3</p>
                <p className="text-xs text-slate-500">ic3.gov</p>
              </div>
            </a>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print / Save as PDF
            </button>
            <a href="/case-builder" onClick={() => { setSubmitted(false); setCurrentPhase(0); setFormData({ story: "", scamType: "", platforms: [], sentMoney: "", sentPersonalInfo: "", amount: "", paymentMethods: [], startDate: "", paymentDate: "", realizedDate: "", suspectName: "", suspectEmail: "", suspectPhone: "", suspectUsername: "", suspectWallet: "", suspectWebsite: "" }); }}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-800 transition-colors">
              Submit Another Report
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ─── main render ─── */

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      {/* Resume prompt */}
      {showResume && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 animate-fadeSlideIn">
          <p className="font-semibold text-amber-900">📝 You have an unfinished report</p>
          <p className="mt-1 text-sm text-amber-800">Would you like to pick up where you left off?</p>
          <div className="mt-3 flex gap-3">
            <button onClick={resumeDraft} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors">Continue Report</button>
            <button onClick={discardDraft} className="rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 transition-colors">Start Fresh</button>
          </div>
        </div>
      )}

      {/* Progress bar (hidden on welcome) */}
      {currentPhase > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600">Step {currentPhase} of {PHASES.length - 1}</span>
            <span className="text-xs text-slate-400">{progress}% complete</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
            <div className="h-1.5 rounded-full bg-red-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Phase content */}
      <div key={currentPhase} className="animate-fadeSlideIn">

        {/* ─── Welcome ─── */}
        {phase === "welcome" && (
          <div className="text-center sm:text-left">
            <div className="mx-auto max-w-xl sm:mx-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                🔒 Encrypted & Confidential
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                We're here to help.
              </h1>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                Filing a scam report takes about <strong className="text-slate-900">3 minutes</strong>.
                You don't need account numbers, police reports, or legal knowledge — just tell us what happened in your own words.
              </p>
              <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">It's not your fault.</strong> Scammers are professionals.
                  Millions of people are targeted every year — and by filing this report, you're helping protect the next person.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={goForward} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors">
                  Start Your Report
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Your information is encrypted with AES-256 and never sold or shared with advertisers.
              </p>
            </div>
          </div>
        )}

        {/* ─── Story ─── */}
        {phase === "story" && (
          <div>
            <StepHeader
              title="What happened?"
              desc="Tell us your story in your own words. Include dates, dollar amounts, names, and websites if you remember them."
            />
            <p className="mt-1 text-xs text-slate-400">Don't worry about getting everything perfect — you can add more details in the next steps.</p>

            <textarea
              className="mt-5 min-h-[180px] w-full rounded-xl border border-slate-200 bg-white p-4 text-base leading-relaxed outline-none placeholder-slate-400 focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-colors resize-y"
              placeholder="Example: I met someone on Facebook who told me they were a US soldier stationed overseas. Over 3 months they convinced me to send $5,000 through gift cards and $2,000 via wire transfer..."
              value={formData.story}
              onChange={(e) => updateField("story", e.target.value)}
              autoFocus
            />

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {isListening ? (
                <button type="button" onClick={stopVoice}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 transition-colors">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-pulse-ring" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                  </span>
                  Stop Recording
                </button>
              ) : (
                <button type="button" onClick={startVoice}
                  className="flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-5 py-3 font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-colors">
                  <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Prefer to speak? Tap here
                </button>
              )}
              {formData.story && (
                <span className="text-xs text-slate-400">{wordCount} words</span>
              )}
            </div>

            {isListening && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <span className="relative flex h-4 w-4 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 animate-pulse-ring" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-red-500" />
                </span>
                <p className="text-sm text-red-800"><strong>Listening...</strong> Speak clearly. Tap "Stop Recording" when done.</p>
              </div>
            )}

            {showVoiceReview && voiceDraft && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-semibold text-emerald-800">✓ Voice captured</p>
                <div className="mt-2 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-slate-700 leading-relaxed italic">"{voiceDraft}"</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button onClick={useVoiceDraft} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">✓ Use This</button>
                  <button onClick={() => { setVoiceDraft(""); setShowVoiceReview(false); startVoice(); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Try Again</button>
                  <button onClick={() => { useVoiceDraft(); setTimeout(startVoice, 150); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Use & Add More</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── Scam Type ─── */}
        {phase === "type" && (
          <div>
            <StepHeader title="What type of scam was this?" desc="Pick the closest match. If you're not sure, choose 'Other' — that's OK." />
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {scamTypes.map(item => (
                <OptionCard key={item.label} icon={item.icon} label={item.label}
                  selected={formData.scamType === item.label}
                  onClick={() => updateField("scamType", item.label)} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Platforms ─── */}
        {phase === "platforms" && (
          <div>
            <StepHeader title="How did the scammer contact you?" desc="Select all that apply." />
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {contactPlatforms.map(item => (
                <OptionCard key={item.label} icon={item.icon} label={item.label}
                  selected={formData.platforms.includes(item.label)}
                  onClick={() => toggleArray("platforms", item.label)} multi />
              ))}
            </div>
          </div>
        )}

        {/* ─── Impact ─── */}
        {phase === "impact" && (
          <div>
            <StepHeader title="What was the impact?" desc="This helps investigators understand the severity and prioritize cases." />
            <div className="mt-6 space-y-6">
              {/* Money */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Did you lose money?</label>
                <div className="flex gap-3">
                  {["Yes", "No"].map(v => (
                    <button key={v} type="button" onClick={() => updateField("sentMoney", v)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentMoney === v ? "border-red-500 bg-red-50 text-red-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}>{v}</button>
                  ))}
                </div>
              </div>

              {formData.sentMoney === "Yes" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">How much was lost?</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                      <input type="number" className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-8 pr-4 text-lg outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-colors"
                        placeholder="0.00" value={formData.amount} onChange={(e) => updateField("amount", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">How was payment sent?</label>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {paymentMethods.map(item => (
                        <OptionCard key={item.label} icon={item.icon} label={item.label}
                          selected={formData.paymentMethods.includes(item.label)}
                          onClick={() => toggleArray("paymentMethods", item.label)} multi />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Personal info */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">Was personal information shared?</label>
                <p className="mb-3 text-xs text-slate-400">SSN, bank details, login credentials, ID documents, etc.</p>
                <div className="flex gap-3">
                  {["Yes", "No"].map(v => (
                    <button key={v} type="button" onClick={() => updateField("sentPersonalInfo", v)}
                      className={`flex-1 rounded-xl border-2 px-5 py-3.5 text-center font-medium transition-all ${
                        formData.sentPersonalInfo === v ? "border-red-500 bg-red-50 text-red-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}>{v}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Timeline ─── */}
        {phase === "timeline" && (
          <div>
            <StepHeader title="When did this happen?" desc="Approximate dates are fine. If you don't remember, skip to the next step." />
            <div className="mt-5 space-y-5">
              <DateField label="When did the scam begin?" value={formData.startDate} onChange={v => updateField("startDate", v)} />
              <DateField label="When did you send money or information?" value={formData.paymentDate} onChange={v => updateField("paymentDate", v)} />
              <DateField label="When did you realize it was a scam?" value={formData.realizedDate} onChange={v => updateField("realizedDate", v)} />
            </div>
          </div>
        )}

        {/* ─── Scammer Details ─── */}
        {phase === "scammer" && (
          <div>
            <StepHeader title="What do you know about the scammer?" desc="Every detail helps — names, emails, phone numbers, websites. Leave blank anything you don't know." />
            <div className="mt-5 space-y-3">
              <TextField icon="👤" placeholder="Name or alias" value={formData.suspectName} onChange={v => updateField("suspectName", v)} />
              <TextField icon="📧" placeholder="Email address" type="email" value={formData.suspectEmail} onChange={v => updateField("suspectEmail", v)} />
              <TextField icon="📞" placeholder="Phone number" value={formData.suspectPhone} onChange={v => updateField("suspectPhone", v)} />
              <TextField icon="@" placeholder="Username or social media handle" value={formData.suspectUsername} onChange={v => updateField("suspectUsername", v)} />
              <TextField icon="🪙" placeholder="Crypto wallet address" value={formData.suspectWallet} onChange={v => updateField("suspectWallet", v)} />
              <TextField icon="🌐" placeholder="Website or URL" value={formData.suspectWebsite} onChange={v => updateField("suspectWebsite", v)} />
            </div>
          </div>
        )}

        {/* ─── Review ─── */}
        {phase === "review" && (
          <div>
            <StepHeader title="Review your report" desc="Make sure everything looks right. Tap 'Edit' to change any section." />

            <div className="mt-6 space-y-3">
              <ReviewSection label="Your Story" stepIdx={1} onEdit={() => jumpTo(1)} content={formData.story || "—"} isLong />
              <ReviewSection label="Scam Type" stepIdx={2} onEdit={() => jumpTo(2)} content={formData.scamType || "—"} />
              <ReviewSection label="Contact Platforms" stepIdx={3} onEdit={() => jumpTo(3)} content={formData.platforms.length ? formData.platforms.join(", ") : "—"} />
              <ReviewSection label="Financial Impact" stepIdx={4} onEdit={() => jumpTo(4)}
                content={`Money lost: ${formData.sentMoney || "—"}${formData.sentMoney === "Yes" && formData.amount ? ` ($${Number(formData.amount).toLocaleString()})` : ""}${formData.paymentMethods.length ? ` via ${formData.paymentMethods.join(", ")}` : ""} · Personal info shared: ${formData.sentPersonalInfo || "—"}`} />
              <ReviewSection label="Timeline" stepIdx={5} onEdit={() => jumpTo(5)}
                content={[formData.startDate && `Started: ${formData.startDate}`, formData.paymentDate && `Paid: ${formData.paymentDate}`, formData.realizedDate && `Realized: ${formData.realizedDate}`].filter(Boolean).join(" · ") || "—"} />
              <ReviewSection label="Scammer Details" stepIdx={6} onEdit={() => jumpTo(6)}
                content={[formData.suspectName && `Name: ${formData.suspectName}`, formData.suspectEmail && `Email: ${formData.suspectEmail}`, formData.suspectPhone && `Phone: ${formData.suspectPhone}`, formData.suspectUsername && `Username: ${formData.suspectUsername}`, formData.suspectWallet && `Wallet: ${formData.suspectWallet}`, formData.suspectWebsite && `Website: ${formData.suspectWebsite}`].filter(Boolean).join(" · ") || "—"} />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                By submitting this report, you confirm the information is truthful to the best of your knowledge.
                Your data is encrypted and will only be used to support fraud prevention and law enforcement investigations.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Navigation ─── */}
      {currentPhase > 0 && (
        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={goBack}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>

          {phase === "review" ? (
            <button type="button" onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {submitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Report
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </>
              )}
            </button>
          ) : (
            <button type="button" onClick={goForward}
              disabled={phase === "story" && !canProceedFromStory}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              Continue
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      )}

      {/* Story validation hint */}
      {phase === "story" && formData.story && !canProceedFromStory && (
        <p className="mt-3 text-center text-xs text-amber-600">Please write at least 5 words to continue.</p>
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

function StepHeader({ title, desc }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 text-slate-500 leading-relaxed">{desc}</p>}
    </div>
  );
}

function OptionCard({ icon, label, selected, onClick, multi }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all ${
        selected ? "border-red-500 bg-red-50 text-slate-900 shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}>
      <span className="text-xl shrink-0">{icon}</span>
      <span className="flex-1 font-medium text-sm">{label}</span>
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
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <input type="date"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-colors"
        value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextField({ icon, placeholder, type = "text", value, onChange }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-0 focus-within:border-red-300 focus-within:ring-2 focus-within:ring-red-100 transition-colors">
      <span className="text-lg shrink-0">{icon}</span>
      <input type={type} placeholder={placeholder}
        className="flex-1 bg-transparent py-3.5 outline-none placeholder-slate-400 text-sm"
        value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ReviewSection({ label, content, onEdit, isLong }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
        <button type="button" onClick={onEdit} className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors">Edit</button>
      </div>
      <div className={`mt-2 text-sm text-slate-700 ${isLong ? "whitespace-pre-wrap line-clamp-4" : ""}`}>{content}</div>
    </div>
  );
}
