# Scam Complaints — Onboarding

## What This Is
**scamcomplaints.org** — a public scam reporting platform where users can submit gift card fraud reports, search existing reports, and build detailed case files. Law enforcement and verified partners can access data via authenticated XML exports.

## Tech Stack
- **Next.js 14** (App Router) + **React 18** — frontend framework
- **Supabase** (PostgreSQL) — database and admin client
- **Tailwind CSS** — styling
- **Vercel** — hosting and deployment
- **reCAPTCHA v2** — bot protection on forms
- **AES-256-GCM** — encryption for sensitive card numbers

## Project Structure
```
reportgiftcardscams/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   │   ├── admin/bulk/         # Authenticated bulk import
│   │   ├── config/recaptcha/   # reCAPTCHA site key endpoint
│   │   ├── intake/             # Case builder submissions
│   │   ├── report/             # Single report submissions
│   │   │   └── bulk/           # Public bulk submissions
│   │   ├── search/             # Search reports
│   │   ├── stats/wall-of-shame/# Aggregated stats
│   │   └── xml/                # Authenticated XML export
│   ├── case-builder/           # Step-by-step report wizard
│   ├── components/             # Shared UI components
│   ├── providers/              # React context providers
│   ├── trust/                  # Trust & Security page
│   ├── wall-of-shame/          # Ranked scam brands/retailers
│   └── xml/                    # XML download builder UI
├── lib/                        # Server utilities
│   ├── crypto.js               # AES-256-GCM encrypt/decrypt + HMAC
│   ├── recaptcha.js            # reCAPTCHA v2 server verification
│   ├── supabaseAdmin.js        # Supabase admin client
│   └── prefill.js              # Form prefill helpers
├── utils/                      # Shared utilities
│   ├── rate-limit.js           # In-memory IP rate limiter
│   └── parseMany.js            # Batch CSV/text parser
├── scripts/                    # Dev/ops scripts
│   ├── generate-logos.mjs      # Logo generation
│   └── upload-batch.js         # Batch upload tool
└── public/                     # Static assets
```

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hesdave04/reportgiftcardscams.git
   cd reportgiftcardscams
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy env template and fill in values:
   ```bash
   cp env.local .env.local
   ```
   Required variables:
   - `SUPABASE_URL` — your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
   - `ENCRYPTION_KEY` — base64-encoded 32-byte key for AES-256-GCM
   - `HMAC_KEY` — base64-encoded 32-byte key for card hashing
   - `XML_API_KEY` — API key for law enforcement XML endpoint
   - `RECAPTCHA_SECRET_KEY` — reCAPTCHA v2 secret key
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — reCAPTCHA v2 site key

4. Start the dev server:
   ```bash
   npm run dev
   ```

## Key Pages
| Route | Description |
|-------|-------------|
| `/` | Home — report form, batch upload, recent reports stream |
| `/case-builder` | 8-step guided scam report wizard |
| `/wall-of-shame` | Ranked lists of most-abused gift card brands and retailers |
| `/trust` | Trust & Security — data handling policies |
| `/xml` | XML download builder for verified partners |

## Deployment
Push to `main` → Vercel auto-deploys to scamcomplaints.org.
