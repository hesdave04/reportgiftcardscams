"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import EmailVerification from "@/app/components/EmailVerification";

/**
 * If the user is logged in, skip email verification and show their identity.
 * Otherwise, fall back to the existing email verification flow.
 *
 * Props:
 *   onVerified({ email, proof, isLoggedIn, reporterId, reporterRole, isWhitelisted })
 */
export default function AuthOrEmailVerify({ onVerified }) {
  const { user, reporter, loading } = useAuth();
  const calledRef = useRef(false);

  // Auto-notify parent when logged-in user is detected
  useEffect(() => {
    if (!user || calledRef.current || !onVerified) return;
    calledRef.current = true;
    onVerified({
      email: user.email,
      proof: null,
      isLoggedIn: true,
      reporterId: reporter?.id || null,
      reporterRole: reporter?.role || "reporter",
      isWhitelisted: reporter?.is_whitelisted || false,
    });
  }, [user, reporter, onVerified]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="h-10 animate-pulse rounded-lg bg-slate-200" />
      </div>
    );
  }

  // Logged-in user — no need for separate email verification
  if (user) {
    const isScambaiter = reporter?.role === "scambaiter" || reporter?.is_whitelisted;

    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-green-900">
                Signed in as {reporter?.display_name || user.email}
              </p>
              {isScambaiter && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                  ⭐ Scambaiter
                </span>
              )}
            </div>
            <p className="text-sm text-green-700">{user.email}</p>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in — use email verification with an account CTA
  return (
    <div>
      <EmailVerification
        onVerified={(data) => {
          if (onVerified) {
            onVerified({
              ...data,
              isLoggedIn: false,
              reporterId: null,
              reporterRole: null,
              isWhitelisted: false,
            });
          }
        }}
      />
      <p className="mt-2 text-center text-xs text-slate-400">
        Have an account?{" "}
        <a href="/login" className="font-medium text-red-600 hover:text-red-700">
          Sign in
        </a>{" "}
        to skip verification and track your reports.
      </p>
    </div>
  );
}
