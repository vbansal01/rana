# RANA.org

Official website for the **Rajasthan Alliance of North America** — a North American diaspora nonprofit celebrating Rajasthani culture and community.

**Stack:** Next.js 14.2.5 · TypeScript · Tailwind CSS · Supabase (PostgreSQL) · NextAuth.js v4 · Vercel

---

## Pages

| Route | Description |
|---|---|
| `/` | Public homepage — announcement banner, hero, recent events, Rajasthan roots, sponsors |
| `/events` | Events gallery with photo carousel and category filters |
| `/events/yosemite-2026` | Yosemite Camping Summit 2026 detail page — schedule, hikes, logistics, embedded map |
| `/events/yosemite-2026/register` | Waitlist registration form |
| `/about` | About RANA |
| `/contact` | Contact page |
| `/past-presidents` | Typographic roster of all past RANA presidents |
| `/members` | Protected member dashboard — membership card, profile, purchase history |
| `/members/notifications` | Member notifications with unread badge |
| `/members/settings` | Profile edit — photo upload (Supabase Storage), bio, family, phone, city/state |
| `/members/login` | Member login — email/password + Google + Facebook (when configured) |
| `/rana-admin/login` | Admin login — email + password + Google Authenticator TOTP |
| `/rana-admin/events` | Admin: create / edit / delete / feature events |
| `/rana-admin/members` | Admin: view all members, search, filter, expand details |
| `/admin/events` | Admin: Google Drive image URL manager |

---

## Components

### `components/layout/`
| File | Description |
|---|---|
| `Navbar.tsx` | Fixed top nav — logo, links, member session dropdown, mobile hamburger. Hidden on `/members/*` and `/rana-admin/*`. |
| `Footer.tsx` | Site-wide footer |

### `components/home/`
| File | Description |
|---|---|
| `AnnouncementBanner.tsx` | Dismissable top banner — currently Yosemite Camping Summit 2026 |
| `HeroSection.tsx` | Full-bleed hero with Ghoomar painting, event CTA buttons |
| `RecentEvents.tsx` | Recent/upcoming events strip on homepage |
| `EventCard.tsx` | Event card used in the homepage and events gallery |
| `RajasthanRoots.tsx` | Cultural roots section |
| `SponsorsSection.tsx` | Sponsors grid |

### `components/events/`
| File | Description |
|---|---|
| `EventGallery.tsx` | Filterable events grid with category pills and lightbox |
| `PhotoRoll.tsx` | Embla-powered horizontal photo carousel |

### `components/members/`
| File | Description |
|---|---|
| `MembershipCard.tsx` | Visual membership card with member number, type, and status |
| `ProfileCard.tsx` | Avatar upload (drag-drop), bio, family members, contact info |
| `PurchaseHistory.tsx` | Past event registrations / purchases |
| `SignOutButton.tsx` | Client-side sign-out button |

### `components/ui/`
| File | Description |
|---|---|
| `Button.tsx` | Reusable button with variant support |
| `SectionLabel.tsx` | Uppercase tracking label used above section headings |

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler — Credentials, Google, Facebook |
| `/api/admin/login` | POST | Admin TOTP + bcrypt auth → JWT cookie (`rana_admin_session`, 8h) |
| `/api/admin/logout` | POST | Clears admin JWT cookie |
| `/api/admin/members` | GET | All members from Supabase (admin only) |
| `/api/admin/events` | GET/POST | List + create events |
| `/api/admin/events/[id]` | PATCH/DELETE | Update or delete an event |
| `/api/events/[id]` | PATCH | Update event image URL |
| `/api/members/avatar` | POST | Upload avatar to Supabase Storage `avatars` bucket |
| `/api/members/profile` | GET/PATCH | Fetch and update member profile |
| `/api/members/purchases` | GET | Member purchase / event history |
| `/api/upload` | POST | Generic file upload handler |

---

## Directory Structure

```
rana-org/
├── public/
│   ├── Rana-logo.jpeg               # RANA logo (used in Navbar)
│   └── images/
│       └── hero-rajasthan.jpg       # Ghoomar dancers painting (hero background)
│
├── app/
│   ├── layout.tsx                   # Root layout — fonts, providers, Navbar, Footer
│   ├── providers.tsx                # NextAuth SessionProvider wrapper
│   ├── page.tsx                     # Homepage
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── past-presidents/page.tsx
│   │
│   ├── events/
│   │   ├── page.tsx                 # Events gallery
│   │   └── yosemite-2026/
│   │       ├── page.tsx             # Yosemite Camping Summit detail
│   │       └── register/page.tsx   # Waitlist registration
│   │
│   ├── members/
│   │   ├── page.tsx                 # Member dashboard (protected)
│   │   ├── notifications/page.tsx
│   │   ├── settings/page.tsx
│   │   └── login/
│   │       ├── page.tsx
│   │       └── LoginForm.tsx        # Client component — social + credentials login
│   │
│   ├── rana-admin/
│   │   ├── layout.tsx               # Admin shell layout
│   │   ├── page.tsx                 # Redirect to /rana-admin/events
│   │   ├── login/page.tsx           # TOTP login form
│   │   ├── dashboard/page.tsx
│   │   ├── events/page.tsx          # Event CRUD
│   │   └── members/page.tsx         # Member management
│   │
│   ├── admin/
│   │   └── events/page.tsx          # Google Drive image URL manager
│   │
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── admin/
│       │   ├── login/page.tsx       # ⚠ TOTP auth endpoint (keep secret)
│       │   ├── logout/route.ts
│       │   ├── members/route.ts
│       │   └── events/
│       │       └── [id]/route.ts
│       ├── events/
│       │   └── [id]/route.ts
│       ├── members/
│       │   ├── avatar/route.ts
│       │   ├── profile/route.ts
│       │   └── purchases/route.ts
│       └── upload/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── AnnouncementBanner.tsx
│   │   ├── HeroSection.tsx
│   │   ├── RecentEvents.tsx
│   │   ├── EventCard.tsx
│   │   ├── RajasthanRoots.tsx
│   │   └── SponsorsSection.tsx
│   ├── events/
│   │   ├── EventGallery.tsx
│   │   └── PhotoRoll.tsx
│   ├── members/
│   │   ├── MembershipCard.tsx
│   │   ├── ProfileCard.tsx
│   │   ├── PurchaseHistory.tsx
│   │   └── SignOutButton.tsx
│   └── ui/
│       ├── Button.tsx
│       └── SectionLabel.tsx
│
├── lib/
│   ├── auth.ts                      # NextAuth config (Credentials + optional Google/Facebook)
│   ├── admin-auth.ts                # Admin JWT sign/verify (jose)
│   ├── supabase.ts                  # Supabase client
│   ├── types.ts                     # Member interface
│   ├── mock-data.ts                 # MOCK_EVENTS array
│   ├── s3.ts                        # AWS SDK (unused, kept for future)
│   └── utils.ts                     # cn(), formatDate()
│
├── middleware.ts                    # Route protection for /members/*, /rana-admin/*
├── tailwind.config.ts               # Design tokens (navy, accent, surface, muted)
├── next.config.mjs                  # Image remote patterns
├── supabase-schema.sql              # Full DB schema
└── .env.local                       # (not committed) — see Environment Variables below
```

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

# Optional: social login for members
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
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
| Member portal (`/members/*`) | NextAuth v4 · CredentialsProvider · bcrypt · JWT session · optional Google + Facebook OAuth |
| Admin portal (`/rana-admin/*`) | Email + bcrypt password + TOTP (Google Authenticator) → signed JWT cookie (`rana_admin_session`, 8h) |

The admin URL (`/rana-admin`) is not linked anywhere on the public site.

---

## Next Steps

### Deploy to Vercel
1. Set all env vars in Vercel dashboard
2. Create `avatars` bucket in Supabase Storage (set to public)
3. Run `npx vercel deploy --prod`

### Totem Integration (jointotem.com)
Totem is a membership management SaaS. Planned integration:
- Register RANA on jointotem.com → get a "Join Now" URL
- Add "Join / Renew via Totem" CTA on member dashboard
- Build `POST /api/admin/sync-totem` — admin uploads Totem CSV → upserts Supabase by email
- Add "Import from Totem" button in `/rana-admin/members`
- Schema addition:
  ```sql
  ALTER TABLE members
    ADD COLUMN totem_member_id TEXT,
    ADD COLUMN membership_expiry DATE;
  ```

### Cleanup
- Delete `app/api/admin/debug/route.ts` (debug endpoint, should not be in production)
- Delete `app/api/admin/google-auth/` and `google-callback/` (leftover from reverted Google OAuth)
- Delete `app/members/page_clean.tsx` (stale draft file)
