# ScamComplaints Mobile App

Native iOS & Android app for reporting and looking up online scams. Built with Expo (React Native) + Supabase.

## Features

- **Scam Reporting** — Full-form scam reports (34 scam types, 17 platforms, suspect details)
- **Quick Report** — Fast submission for scam websites, emails, phones, crypto wallets, social profiles
- **Scam Lookup** — Search the database by email, phone, name, website, or crypto wallet
  - 10 free searches/month for standard users
  - Unlimited for verified Social Catfish customers
- **My Reports** — View history of submitted reports
- **Push Notifications** — Alerts when scammers are re-reported
- **Apple Sign-In + Email Auth** — App Store compliant authentication
- **Privacy & Compliance** — Full Privacy Policy, Terms of Service, age gate (13+), account deletion

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Expo SDK 52 / React Native 0.76 |
| Navigation | React Navigation 7 (native stack + bottom tabs) |
| Backend | Supabase (auth, database, RLS) |
| API | scamcomplaints.org Next.js API routes |
| Auth | Supabase Auth (email/password, Apple, Google) |
| Notifications | expo-notifications |
| Build | EAS Build + EAS Submit |

## Project Structure

```
├── App.js                    # Root — providers + navigation
├── app.json                  # Expo config (bundle IDs, permissions, plugins)
├── eas.json                  # EAS build profiles
├── src/
│   ├── components/           # Reusable UI (Button, Input, Card, EmptyState)
│   ├── constants/            # Theme colors, scam types
│   ├── contexts/             # AuthContext (auth state, sign in/up/out)
│   ├── hooks/                # Custom hooks
│   ├── lib/
│   │   ├── supabase.js       # Supabase client init
│   │   └── api.js            # API layer (reports, search, quotas, profiles)
│   └── screens/              # All screens
│       ├── OnboardingScreen  # 3-slide intro
│       ├── AuthScreen        # Sign in/up + Apple Sign-In
│       ├── HomeScreen        # Dashboard with quick actions
│       ├── ReportScamScreen  # 4-step full report wizard
│       ├── QuickReportScreen # Fast 1-field report
│       ├── ScamLookupScreen  # Search with quota tracking
│       ├── MyReportsScreen   # User's report history
│       ├── ReportDetailScreen# Single report view
│       ├── ProfileScreen     # Settings, SCF verification, account deletion
│       ├── PrivacyPolicyScreen
│       ├── TermsOfServiceScreen
│       ├── AboutScreen
│       └── NotificationSettingsScreen
└── supabase/
    └── migrations/           # SQL migrations for app_profiles table
```

## Setup

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Configure environment
Update `app.json` → `expo.extra`:
```json
{
  "supabaseUrl": "https://YOUR_PROJECT.supabase.co",
  "supabaseAnonKey": "YOUR_ANON_KEY",
  "apiBaseUrl": "https://scamcomplaints.org"
}
```

### 3. Run Supabase migration
Apply `supabase/migrations/001_app_profiles.sql` to your Supabase project.

### 4. Configure auth providers
In Supabase Dashboard → Authentication → Providers:
- Enable **Email** (with email confirmation)
- Enable **Apple** (add Apple Developer credentials)
- Enable **Google** (add Google OAuth credentials)

### 5. Run locally
```bash
npx expo start
```

### 6. Build for production
```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

### 7. Submit to stores
```bash
eas submit --platform ios
eas submit --platform android
```

## App Store Compliance Checklist

- [x] Privacy Policy (accessible before and after login)
- [x] Terms of Service
- [x] Age gate (13+ confirmation on signup)
- [x] Account deletion (Apple requirement)
- [x] Apple Sign-In (required when offering social login on iOS)
- [x] Data collection disclosure (no unnecessary permissions)
- [x] No external payment links
- [x] Proper error handling
- [x] Contact/support available
- [x] `ITSAppUsesNonExemptEncryption: false` declared
- [x] Content rating appropriate (fraud reporting = 12+/Teen)

## Search Quota System

| User Type | Monthly Limit |
|-----------|--------------|
| Free user | 10 searches |
| Social Catfish customer | Unlimited |

Quotas reset on the 1st of each month. The `app_profiles` table tracks usage with `searches_used_this_month` and `search_reset_date`. The `increment_search_count` Supabase function handles atomic counter updates.
