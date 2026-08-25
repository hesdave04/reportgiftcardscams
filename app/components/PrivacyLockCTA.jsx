"use client";

/**
 * PrivacyLockCTA — next-step call to action shown at the two highest-intent
 * moments on ScamComplaints:
 *   - variant="search"  → a user just ran a search for data
 *   - variant="report"  → a user just filed a report
 *
 * Two offers are surfaced:
 *   1. Privacy Lock  — remove exposed personal info from data-broker sites
 *   2. Password check — see if your password was leaked in a breach
 *
 * All links are UTM-tagged so attribution lands in ref_source/ref_medium on
 * the Social Catfish side, and a GA4 event fires on click.
 */

const OFFERS = {
  privacy_lock: {
    base: "https://socialcatfish.com/privacy-lock",
    icon: "🔒",
    title: "Remove your info from data-broker sites",
    body:
      "Your name, phone, email and address are listed publicly — that's where scammers build their target lists. Privacy Lock finds those records and gets them removed.",
    cta: "Run my free exposure scan",
  },
  password_check: {
    base: "https://socialcatfish.com/check-your-password/",
    icon: "🔑",
    title: "Check if your password was leaked online",
    body:
      "Billions of passwords are circulating in breach dumps. If yours is in one, scammers can walk straight into your email, bank and social accounts. Check yours in seconds.",
    cta: "Check my password",
  },
};

const VARIANTS = {
  search: {
    eyebrow: "Next step",
    heading: "Scammers found you the same way you just found them",
    sub:
      "The identifiers you just searched are public. So are yours. Close both doors before someone else uses them.",
  },
  report: {
    eyebrow: "Protect yourself next",
    heading: "You reported them. Now make yourself harder to target.",
    sub:
      "Scam victims get re-targeted, because their personal data and passwords are still exposed and get resold. Two things to do right now:",
  },
};

export function socialCatfishUrl(offerKey, variant = "search", extra = {}) {
  const offer = OFFERS[offerKey];
  const params = new URLSearchParams({
    utm_source: "scamcomplaints.org",
    utm_medium: "referral",
    utm_campaign: offerKey === "password_check" ? "password_check_cta" : "privacy_lock_cta",
    utm_content: variant,
    ...extra,
  });
  return `${offer.base}${offer.base.includes("?") ? "&" : "?"}${params.toString()}`;
}

function trackClick(offerKey, variant) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "scf_offer_cta_click", {
        offer: offerKey,
        cta_variant: variant,
        page_path: window.location.pathname,
      });
    }
  } catch {
    /* analytics must never break the CTA */
  }
}

function OfferCard({ offerKey, variant, query }) {
  const offer = OFFERS[offerKey];
  const href = socialCatfishUrl(offerKey, variant, query ? { utm_term: query } : {});

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-700 bg-slate-800/60 p-5">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="text-2xl">
          {offer.icon}
        </span>
        <h3 className="text-base font-bold leading-snug text-white">{offer.title}</h3>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{offer.body}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick(offerKey, variant)}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        {offer.cta}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default function PrivacyLockCTA({
  variant = "search",
  query,
  className = "",
  offers = ["privacy_lock", "password_check"],
  compact = false,
}) {
  const copy = VARIANTS[variant] || VARIANTS.search;

  if (compact) {
    const key = offers[0] || "privacy_lock";
    return (
      <a
        href={socialCatfishUrl(key, variant, query ? { utm_term: query } : {})}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick(key, variant)}
        className={`inline-flex items-center gap-1 font-medium text-red-600 underline decoration-red-200 underline-offset-2 hover:text-red-700 ${className}`}
      >
        {OFFERS[key].title} →
      </a>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left text-white shadow-sm sm:p-8 ${className}`}
      aria-label="Protect your personal information"
    >
      <span className="inline-flex items-center rounded-full bg-red-600/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-red-300">
        {copy.eyebrow}
      </span>
      <h2 className="mt-3 text-xl font-bold leading-snug sm:text-2xl">{copy.heading}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{copy.sub}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {offers.map((key) => (
          <OfferCard key={key} offerKey={key} variant={variant} query={query} />
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Privacy Lock and the password check are services of SocialCatfish.com, which
        operates ScamComplaints.org as a free public service.
      </p>
    </section>
  );
}
