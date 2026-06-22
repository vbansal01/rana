# RANA.org — Context Capsule

## 1. CORE GOAL
Building **rana.org** — the website for Rajasthan Alliance of North America (RANA), a North American diaspora nonprofit.
Stack: **Next.js 14.2.5 + TypeScript + Tailwind CSS + Supabase (PostgreSQL) + Vercel**.
The site has a public homepage, events page, sponsors page, a protected member portal, and a secret admin portal.

---

## 2. CURRENT PROGRESS — FULLY BUILT

### Public site
- Homepage with hero (background: `/public/images/hero-rajasthan.jpg` — Ghoomar dancers painting)
- `/events` page with EventGallery component
- Navigation, footer, shared components

### Member portal (`/members/*` — protected by NextAuth)
- `/members` — dashboard with MembershipCard, ProfileCard (avatar/bio/family), PurchaseHistory, upcoming events
- `/members/notifications` — working notifications page with unread badge
- `/members/settings` — full profile edit: photo upload (drag-drop → Supabase Storage), bio, family, phone, city/state
- `/members/login` — login page
- Auth: NextAuth v4 with CredentialsProvider + bcryptjs

### Admin portal (`/rana-admin/*` — secret URL, protected by TOTP + JWT cookie)
- `/rana-admin/login` — email + password + 6-digit Google Authenticator code
- `/rana-admin/events` — full CRUD: create/edit/delete/feature events, image URL support, search, sort
- `/rana-admin/members` — view all members, search, filter by status, expandable detail rows
- `/admin/events` — Google Drive URL image manager for events

### APIs
- `POST /api/admin/login` — TOTP + bcrypt auth → JWT cookie (`rana_admin_session`, 8h)
- `POST /api/admin/logout`
- `GET /api/admin/members` — all members from Supabase
- `GET/POST /api/admin/events` — list + create events
- `PATCH/DELETE /api/admin/events/[id]`
- `PATCH /api/events/[id]` — update image_url
- `POST /api/members/avatar` — upload to Supabase Storage `avatars` bucket
- NextAuth at `/api/auth/[...nextauth]`

### Lib files
- `lib/admin-auth.ts` — JWT sign/verify with `jose`
- `lib/auth.ts` — NextAuth config
- `lib/types.ts` — Member interface (id, name, email, membershipType, memberSince, memberNumber, status, phone, address, avatarUrl, bio, family)
- `lib/mock-data.ts` — MOCK_EVENTS
- `lib/supabase.ts` — Supabase client
- `lib/s3.ts` — AWS SDK (unused, kept for future)
- `middleware.ts` — protects `/members/*`, `/admin/*` (NextAuth), `/rana-admin/*` (JWT cookie)
- `next.config.mjs` — remotePatterns: supabase, lh3.googleusercontent.com, drive.google.com, unsplash, amazonaws

### Build status: CLEAN — `tsc --noEmit` exits 0 with no errors.

---

## 3. KEY CONSTANTS & SECRETS

| Item | Value |
|---|---|
| TOTP Secret (Google Authenticator) | `J7XXUN4UGETT2JNSGKFEAPJC34ATUFYS` |
| Admin cookie name | `rana_admin_session` |
| Supabase avatars bucket | `avatars` (must be created as **public** in Supabase dashboard) |
| Admin portal URL | `/rana-admin` (not linked anywhere on the site) |

### Vercel env vars needed:
```
NEXTAUTH_SECRET
NEXTAUTH_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAIL
ADMIN_PASSWORD_HASH        # bcrypt hash of your chosen password
ADMIN_TOTP_SECRET          # J7XXUN4UGETT2JNSGKFEAPJC34ATUFYS
ADMIN_JWT_SECRET           # any long random string
```

Generate password hash (run in project folder):
```powershell
node -e "require('bcryptjs').hash('YOUR_PASSWORD', 12).then(h => console.log(h))"
```

Deploy command:
```powershell
cd C:\Users\Ayansh\Downloads\Rana\rana-org
npx vercel deploy --prod
```

---

## 4. DESIGN TOKENS
- Primary navy: `#5C2415` (Deep Hawa Mahal rose — Tailwind token `navy`)
- Accent gold: `#C8922A` (Tailwind token `accent`)
- Background: `#FFFEF9` (Tailwind token `surface`)
- Font: Cormorant Garamond (display) + Inter (body)

---

## 5. NEXT STEPS

### Immediate — deploy to Vercel:
1. Set all env vars in Vercel dashboard
2. Create `avatars` bucket in Supabase Storage (set to public)
3. Save the Ghoomar painting to `public/images/hero-rajasthan.jpg`
4. Run `npx vercel deploy --prod`

### Then — Totem (jointotem.com) integration:
Totem is a membership management SaaS (not a payment API). Integration plan:
- Step 1: Register RANA on jointotem.com → get a "Join Now" URL
- Step 2: Add "Join / Renew via Totem" CTA button on member dashboard (link to their hosted page)
- Step 3: Build `POST /api/admin/sync-totem` — admin uploads Totem CSV export → upserts into Supabase by email match (updates `status`, `membership_expiry`)
- Step 4: Add "Import from Totem" button in `/rana-admin/members` page
- Supabase schema addition:
  ```sql
  ALTER TABLE members
    ADD COLUMN totem_member_id TEXT,
    ADD COLUMN membership_expiry DATE;
  ```

---

## 6. IMPORTANT TECHNICAL NOTE FOR AI
**Always write files via bash Python script** — not the Write tool.
The bash sandbox (`/sessions/.../mnt/Rana/rana-org/`) does not pick up Write tool changes in real time.
Files written with the Write tool appear correct to the Read tool but `tsc` still sees the old version on disk.

Write files like this instead:
```python
# in mcp__workspace__bash
python3 << 'PYEOF'
BASE = "/sessions/.../mnt/Rana/rana-org"
content = r'''...file content...'''
open(f"{BASE}/path/to/file.ts", "w").write(content)
PYEOF
```
