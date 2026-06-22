# RANA.org — Next.js Website

Rajasthan Association of North America — official website.  
Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **NextAuth.js v4**, and **Supabase**.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in values
cp .env.example .env.local

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` with:

```env
# NextAuth — generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Supabase (from your project's Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL editor, run the entire contents of **`supabase-schema.sql`**
3. Copy your project URL and keys into `.env.local`

### Adding members

Members are stored in the `members` table. To hash a password:

```bash
node -e "const b=require('bcryptjs'); console.log(b.hashSync('yourpassword', 12))"
```

Then insert into `members`:

```sql
INSERT INTO members (name, email, password_hash, membership_type, member_since, member_number, status)
VALUES ('Jane Smith', 'jane@example.com', '<bcrypt_hash>', 'regular', '2024-01-01', 'RANA-2024-00002', 'active');
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Set these environment variables in Vercel Dashboard** → Project → Settings → Environment Variables:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` → `https://rana.org`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## Project Structure

```
rana-org/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home (hero, events, photo roll, sponsors)
│   ├── events/page.tsx     # Events gallery with photo roll
│   ├── members/
│   │   ├── page.tsx        # Protected member dashboard
│   │   └── login/page.tsx  # Login page
│   └── api/
│       ├── auth/[...nextauth]/  # NextAuth endpoints
│       └── members/             # Member data APIs
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Hero, EventCard, RecentEvents, Sponsors
│   ├── events/             # PhotoRoll (Embla), EventGallery
│   ├── members/            # MembershipCard, PurchaseHistory
│   └── ui/                 # Button, SectionLabel
├── lib/
│   ├── auth.ts             # NextAuth config (Credentials + bcrypt)
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript interfaces
│   ├── utils.ts            # cn(), formatDate(), formatCurrency()
│   └── mock-data.ts        # Sample events and sponsors
├── middleware.ts            # Protects /members/* routes
├── supabase-schema.sql     # Full DB schema + seed
└── tailwind.config.ts      # Design tokens, fonts, colors
```

---

## Design System

### Color Palette (OlyPrep-inspired, premium cultural adaptation)

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#FFFEF9` | Page background (warm white) |
| `foreground` | `#0D0D0D` | Primary text |
| `accent` | `#C8922A` | CTAs, links, highlights (warm gold) |
| `navy` | `#1C1C2E` | Navbar, cards, footer |
| `surface` | `#F5F0E8` | Section backgrounds, cards |
| `muted` | `#7A7169` | Secondary text |

### Three-Font System

| Role | Font | Usage |
|------|------|-------|
| **Display** | Playfair Display (serif) | All headings |
| **Body** | Inter (sans-serif) | Body text, UI, labels |
| **Accent** | Cormorant Garamond (serif) | Pull-quotes, large italic display |

---

## Replacing Mock Data

All mock content lives in `lib/mock-data.ts`.  
To wire up live data, replace the array exports with Supabase queries:

```ts
// lib/data.ts (create this file)
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getEvents() {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  return data ?? [];
}
```

Then call `getEvents()` from your Server Components.

---

## Adding Real Photos

Replace Unsplash URLs in `lib/mock-data.ts` with:
- Supabase Storage URLs (upload via dashboard)  
- Or your own CDN/hosting

To add event images to Supabase Storage:
1. Dashboard → Storage → Create bucket `event-images` (public)
2. Upload images
3. Copy public URLs into your events table or mock data
