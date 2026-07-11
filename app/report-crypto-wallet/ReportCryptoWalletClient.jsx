"use client";

import { useState } from "react";
import AuthOrEmailVerify from "@/app/components/AuthOrEmailVerify";

const BLOCKCHAINS = [
  { value: "bitcoin", label: "Bitcoin (BTC)" },
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "tether_erc20", label: "Tether USDT (ERC-20)" },
  { value: "tether_trc20", label: "Tether USDT (TRC-20)" },
  { value: "usdc", label: "USDC" },
  { value: "bnb", label: "BNB Chain" },
  { value: "solana", label: "Solana (SOL)" },
  { value: "tron", label: "TRON (TRX)" },
  { value: "litecoin", label: "Litecoin (LTC)" },
  { value: "dogecoin", label: "Dogecoin (DOGE)" },
  { value: "xrp", label: "XRP (Ripple)" },
  { value: "other", label: "Other / not sure" },
];

const SCAM_TYPES = [
  { value: "investment", label: "Fake investment / trading platform" },
  { value: "pig_butchering", label: "Pig butchering / romance + crypto" },
  { value: "impersonation", label: "Exchange or support impersonation" },
  { value: "rug_pull", label: "Rug pull / scam token" },
  { value: "giveaway", label: "Fake giveaway or airdrop" },
  { value: "ransomware", label: "Ransomware payment" },
  { value: "btc_atm", label: "Bitcoin ATM scam" },
  { value: "other", label: "Other" },
];

export default function ReportCryptoWalletClient() {
  const [verified, setVerified] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [blockchain, setBlockchain] = useState("");
  const [associatedDomain, setAssociatedDomain] = useState("");
  const [scamType, setScamType] = useState("");
  const [description, setDescription] = useState("");
  const [amountLost, setAmountLost] = useState("");
  const [currency, setCurrency] = useState("");
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
          reportType: "crypto_wallet_report",
          emailProof: verified.proof,
          isLoggedIn: verified.isLoggedIn || false,
          reporterId: verified.reporterId || null,
          walletAddress: walletAddress.trim(),
          blockchain,
          associatedDomain: associatedDomain.trim() || undefined,
          scamType,
          description: description.trim() || undefined,
          amountLost: amountLost || undefined,
          currency: currency || undefined,
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
          Wallet address reported
        </h2>
        <p className="mt-2 text-sm text-green-700">
          This wallet is now flagged in our database. Thank you for helping
          trace crypto fraud.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => {
              setResult(null);
              setWalletAddress("");
              setBlockchain("");
              setAssociatedDomain("");
              setScamType("");
              setDescription("");
              setAmountLost("");
              setCurrency("");
            }}
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            Report Another Wallet
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
        Quick crypto wallet report
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Paste the wallet address and any linked domains. Need to include
        screenshots or transaction hashes?{" "}
        <a
          href="/case-builder"
          className="font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700"
        >
          Use the full report builder
        </a>
      </p>

      <div className="mt-6">
        <AuthOrEmailVerify onVerified={setVerified} />
      </div>

      {verified && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Wallet address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="e.g., bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 font-mono text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              Paste the full address exactly as it appears. Don't retype it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Blockchain
              </label>
              <select
                value={blockchain}
                onChange={(e) => setBlockchain(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="">Select blockchain</option>
                {BLOCKCHAINS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
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
              Associated website or trading platform domain
            </label>
            <input
              type="text"
              value={associatedDomain}
              onChange={(e) => setAssociatedDomain(e.target.value)}
              placeholder="e.g., fake-trading-platform.com"
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
              placeholder="How did the scam work? How were you directed to this wallet?"
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
            {showFull ? "Hide amount details" : "Add amount lost (optional)"}
          </button>

          {showFull && (
            <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Amount lost
                  </label>
                  <input
                    type="text"
                    value={amountLost}
                    onChange={(e) => setAmountLost(e.target.value)}
                    placeholder="e.g., 5000"
                    inputMode="decimal"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    <option value="">Select</option>
                    <option value="USD">USD</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="USDT">USDT</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {result?.ok === false && (
            <p className="text-sm text-red-600">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !walletAddress.trim()}
            className="w-full rounded-xl bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Report Wallet Address"}
          </button>
        </form>
      )}
    </div>
  );
}
