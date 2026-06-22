# RANA.org

Official website for the **Rajasthan Alliance of North America** — a North American diaspora nonprofit celebrating Rajasthani culture and community.

**Stack:** Next.js 14.2.5 · TypeScript · Tailwind CSS · Supabase (PostgreSQL) · NextAuth.js v4 · Vercel

---

## Pages

| Route | Description |
|---|---|
| `/` | Public homepage — hero, events preview, sponsors |
| `/events` | Public events gallery with photo carousel |
| `/members` | Protected member dashboard (membership card, profile, purchase history) |
| `/members/notifications` | Member notifications with unread badge |
| `/members/settings` | Profile edit — photo upload, bio, family, phone, city/state |
| `/members/login` | Member login |
| `/rana-admin/login` | Secret admin login — email + password + Google Authenticator TOTP |
| `/rana-admin/events` | Admin: create / edit / delete / feature events |
| `/rana-admin/members` | Admin: view all members, search, filter, expand details |
| `/admin/events` | Admin: Google Drive image URL manager |

---

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local`:

```env
# NextAuth
NEXTAUTH_SECRET=        # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Supabase (Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Admin portal
ADMIN_EMAIL=            # admin login email
ADMIN_PASSWORD_HASH=    # bcrypt hash — see below
ADMIN_TOTP_SECRET=      # base32 secret for Google Authenticator
ADMIN_JWT_SECRET=       # openssl rand -base64 32
```

**Generate password hash:**
```bash
node -e "require('bcryptjs').hash('YOUR_PASSWORD', 12).then(h => console.log(h))"
```

**Set up Google Authenticator:**
Open the app → Add account → Enter setup key → paste your `ADMIN_TOTP_SECRET` → Time-based.

---

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. SQL Editor → run `supabase-schema.sql`
3. Storage → create bucket `avatars` (set to **public**)
4. Copy URL and keys into `.env.local`

**Add a member:**
```sql
INSERT INTO members (name, email, password_hash, membership_type, member_since, member_number, status)
VALUES ('Jane Smith', 'jane@example.com', '<bcrypt_hash>', 'regular', '2024-01-01', 'RANA-2024-001', 'active');
```

---

## Deploy to Vercel

```bash
npx vercel deploy --prod
```

Set all env vars in **Vercel Dashboard → Project → Settings → Environment Variables**.

---

## Project Structure

```
rana-org/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── events/page.tsx           # Events gallery
│   ├── members/
│   │   ├── page.tsx              # Member dashboard
│   │   ├── notifications/        # Notifications page
│   │   ├── settings/             # Profile settings
│   │   └── login/                # Member login
│   ├── rana-admin/               # Secret admin portal (TOTP-protected)
│   │   ├── login/                # Admin login
│   │   ├── events/               # Event CRUD
│   │   └── members/              # Member management
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth
│       ├── admin/                # Admin APIs (login, logout, events, members)
│       ├── members/              # Member APIs (avatar upload)
│       └── events/               # Event image update
├── components/
│   ├── home/                     # Hero, EventCard, Sponsors
│   ├── events/                   # PhotoRoll (Embla carousel), EventGallery
│   ├── members/                  # MembershipCard, ProfileCard, PurchaseHistory
│   ├── layout/                   # Navbar, Footer
│   └── ui/                       # Button, SectionLabel
├── lib/
│   ├── auth.ts                   # NextAuth config (Credentials + bcrypt)
│   ├── admin-auth.ts             # Admin JWT sign/verify (jose)
│   ├── supabase.ts               # Supabase client
│   ├── types.ts                  # Member interface
│   └── mock-data.ts              # Sample events
├── middleware.ts                  # Route protection
├── supabase-schema.sql           # Full DB schema
└── tailwind.config.ts            # Design tokens
```

---

## Design Tokens

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#5C2415` | Deep Hawa Mahal rose — navbar, admin sidebar |
| `accent` | `#C8922A` | Gold — CTAs, highlights, active states |
| `surface` | `#FFFEF9` | Warm white page background |
| `muted` | `#7A7169` | Secondary text |

**Fonts:** Cormorant Garamond (display headings) · Inter (body/UI)

---

## Auth Architecture

| Area | Method |
|---|---|
| Member portal (`/members/*`) | NextAuth v4 · CredentialsProvider · bcrypt · JWT session |
| Admin portal (`/rana-admin/*`) | Email + bcrypt password + TOTP (Google Authenticator) → signed JWT cookie (`rana_admin_session`, 8h) |

The admin URL (`/rana-admin`) is not linked anywhere on the public site.
