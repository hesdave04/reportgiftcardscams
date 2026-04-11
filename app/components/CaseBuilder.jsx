"use client";

import { useMemo, useRef, useState } from "react";

const scamTypes = [
  "Romance Scam",
  "Gift Card Scam",
  "Crypto Scam",
  "Impersonation Scam",
  "Tech Support Scam",
  "Marketplace Scam",
  "Investment Scam",
  "Employment Scam",
  "Banking Scam",
  "Other",
];

const contactPlatforms = [
  "Facebook",
  "Instagram",
  "WhatsApp",
  "Telegram",
  "Text Message",
  "Email",
  "Phone Call",
  "Dating App",
  "TikTok",
  "Other",
];

const paymentMethods = [
  "Gift Card",
  "Bank Transfer",
  "Wire Transfer",
  "Crypto",
  "Cash App",
  "Venmo",
  "PayPal",
  "Zelle",
  "Cash",
  "No Money Sent",
  "Other",
];

const steps = [
  "What happened",
  "Scam type",
  "How they contacted you",
  "Money or info sent",
  "Payment details",
  "Timeline",
  "Suspect details",
  "Review",
];

export default function CaseBuilder() {
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  }

  function prevStep() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  function startVoiceInput() {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setFormData((prev) => ({
        ...prev,
        story: prev.story ? `${prev.story} ${transcript}` : transcript,
      }));
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  async function handleSubmit() {
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Something went wrong.");
      }

      alert("Report submitted successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to submit report.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Build Your Scam Report
        </h1>
        <p className="mt-2 text-gray-600">
          We’ll walk you through this step by step and organize your report.
        </p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{progress}%</span>
        </div>

        <div className="h-3 w-full rounded-full bg-gray-200">
          <div
            className="h-3 rounded-full bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 text-sm font-medium text-gray-800">
          {steps[step]}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-semibold">Tell us what happened</h2>
            <p className="mt-2 text-sm text-gray-600">
              Use your own words. You can type or use voice.
            </p>

            <textarea
              className="mt-4 min-h-[180px] w-full rounded-xl border border-gray-300 p-4 text-base outline-none focus:border-black"
              placeholder="Example: I met someone on Facebook, they asked me to send gift cards, and I lost $2,000..."
              value={formData.story}
              onChange={(e) => updateField("story", e.target.value)}
            />

            <button
              type="button"
              onClick={startVoiceInput}
              className="mt-4 rounded-xl bg-black px-4 py-3 text-white hover:opacity-90"
            >
              {isListening ? "Listening..." : "Use Voice Input"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold">What type of scam was it?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Pick the closest option.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {scamTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => updateField("scamType", item)}
                  className={`rounded-xl border p-4 text-left transition ${
                    formData.scamType === item
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white hover:border-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold">
              How did the scammer contact you?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Select all that apply.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactPlatforms.map((item) => {
                const selected = formData.platforms.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleArrayValue("platforms", item)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white hover:border-black"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold">
              Did you send money or personal information?
            </h2>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Did you send money?
              </label>
              <div className="flex gap-3">
                {["Yes", "No"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField("sentMoney", value)}
                    className={`rounded-xl border px-5 py-3 ${
                      formData.sentMoney === value
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Did you send personal information?
              </label>
              <div className="flex gap-3">
                {["Yes", "No"].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField("sentPersonalInfo", value)}
                    className={`rounded-xl border px-5 py-3 ${
                      formData.sentPersonalInfo === value
                        ? "border-black bg-black text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold">Payment details</h2>
            <p className="mt-2 text-sm text-gray-600">
              Tell us how much was lost and how it was sent.
            </p>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Estimated amount lost
              </label>
              <input
                type="number"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                placeholder="2500"
                value={formData.amount}
                onChange={(e) => updateField("amount", e.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Payment methods used
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((item) => {
                  const selected = formData.paymentMethods.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        toggleArrayValue("paymentMethods", item)
                      }
                      className={`rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white hover:border-black"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold">Build the timeline</h2>
            <p className="mt-2 text-sm text-gray-600">
              Approximate dates are okay.
            </p>

            <div className="mt-4 grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  When did the scam first begin?
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                  value={formData.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  When did you send money or information?
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                  value={formData.paymentDate}
                  onChange={(e) => updateField("paymentDate", e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  When did you realize it was a scam?
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                  value={formData.realizedDate}
                  onChange={(e) => updateField("realizedDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-xl font-semibold">Scammer details</h2>
            <p className="mt-2 text-sm text-gray-600">
              Add anything you have. Leave blank if unknown.
            </p>

            <div className="mt-4 grid gap-4">
              <input
                type="text"
                placeholder="Name or alias"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectName}
                onChange={(e) => updateField("suspectName", e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectEmail}
                onChange={(e) => updateField("suspectEmail", e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone number"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectPhone}
                onChange={(e) => updateField("suspectPhone", e.target.value)}
              />

              <input
                type="text"
                placeholder="Username or handle"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectUsername}
                onChange={(e) => updateField("suspectUsername", e.target.value)}
              />

              <input
                type="text"
                placeholder="Crypto wallet"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectWallet}
                onChange={(e) => updateField("suspectWallet", e.target.value)}
              />

              <input
                type="text"
                placeholder="Website or URL"
                className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-black"
                value={formData.suspectWebsite}
                onChange={(e) => updateField("suspectWebsite", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-xl font-semibold">Review your report</h2>
            <p className="mt-2 text-sm text-gray-600">
              Make sure everything looks right before submission.
            </p>

            <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-5 text-sm">
              <div>
                <strong>Story:</strong>
                <div className="mt-1 text-gray-700">{formData.story || "—"}</div>
              </div>

              <div>
                <strong>Scam type:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.scamType || "—"}
                </div>
              </div>

              <div>
                <strong>Platforms:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.platforms.length
                    ? formData.platforms.join(", ")
                    : "—"}
                </div>
              </div>

              <div>
                <strong>Money sent:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.sentMoney || "—"}
                </div>
              </div>

              <div>
                <strong>Personal info sent:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.sentPersonalInfo || "—"}
                </div>
              </div>

              <div>
                <strong>Amount:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.amount || "—"}
                </div>
              </div>

              <div>
                <strong>Payment methods:</strong>
                <div className="mt-1 text-gray-700">
                  {formData.paymentMethods.length
                    ? formData.paymentMethods.join(", ")
                    : "—"}
                </div>
              </div>

              <div>
                <strong>Timeline:</strong>
                <div className="mt-1 text-gray-700">
                  Started: {formData.startDate || "—"}
                  <br />
                  Sent money/info: {formData.paymentDate || "—"}
                  <br />
                  Realized scam: {formData.realizedDate || "—"}
                </div>
              </div>

              <div>
                <strong>Suspect details:</strong>
                <div className="mt-1 text-gray-700">
                  Name: {formData.suspectName || "—"}
                  <br />
                  Email: {formData.suspectEmail || "—"}
                  <br />
                  Phone: {formData.suspectPhone || "—"}
                  <br />
                  Username: {formData.suspectUsername || "—"}
                  <br />
                  Wallet: {formData.suspectWallet || "—"}
                  <br />
                  Website: {formData.suspectWebsite || "—"}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className={`rounded-xl px-5 py-3 ${
              step === 0
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "border border-gray-300 bg-white hover:border-black"
            }`}
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
            >
              Submit Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
