-- =====================================================================
-- RANA.ORG — Supabase Database Schema
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE / ON CONFLICT guards
-- =====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Members ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS members (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  email            TEXT UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  membership_type  TEXT NOT NULL DEFAULT 'regular'
                   CHECK (membership_type IN ('regular','premium','lifetime','honorary')),
  member_since     DATE NOT NULL DEFAULT CURRENT_DATE,
  member_number    TEXT UNIQUE NOT NULL,
  status           TEXT NOT NULL DEFAULT 'active'
                   CHECK (status IN ('active','expired','pending')),
  phone            TEXT,
  address          TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger function: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- Drop trigger before recreating (safe re-run)
DROP TRIGGER IF EXISTS members_updated_at ON members;
CREATE TRIGGER members_updated_at
BEFORE UPDATE ON members
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Purchases ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS purchases (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id   UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount      NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  category    TEXT NOT NULL DEFAULT 'General',
  status      TEXT NOT NULL DEFAULT 'completed'
              CHECK (status IN ('completed','pending','refunded')),
  receipt_url TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS purchases_member_id_idx ON purchases(member_id);
CREATE INDEX IF NOT EXISTS purchases_date_idx ON purchases(date DESC);

-- ─── Events ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  date        DATE NOT NULL,
  location    TEXT,
  image_url   TEXT,
  category    TEXT DEFAULT 'Community',
  featured    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_date_idx ON events(date DESC);
CREATE INDEX IF NOT EXISTS events_featured_idx ON events(featured) WHERE featured = TRUE;

-- ─── Sponsors ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sponsors (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  logo_url     TEXT,
  website_url  TEXT,
  tier         TEXT NOT NULL DEFAULT 'community'
               CHECK (tier IN ('platinum','gold','silver','community')),
  tagline      TEXT,
  ad_image_url TEXT,
  ad_link      TEXT,
  active       BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE members   ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE events    ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors  ENABLE ROW LEVEL SECURITY;

-- Policies (drop before recreating for idempotency)
DROP POLICY IF EXISTS "Members: own row only"       ON members;
DROP POLICY IF EXISTS "Purchases: own records only" ON purchases;
DROP POLICY IF EXISTS "Events: public read"         ON events;
DROP POLICY IF EXISTS "Sponsors: public read"       ON sponsors;

CREATE POLICY "Members: own row only"
  ON members FOR SELECT
  USING (auth.uid()::TEXT = id::TEXT);

CREATE POLICY "Purchases: own records only"
  ON purchases FOR SELECT
  USING (member_id IN (
    SELECT id FROM members WHERE id::TEXT = auth.uid()::TEXT
  ));

CREATE POLICY "Events: public read"
  ON events FOR SELECT USING (TRUE);

CREATE POLICY "Sponsors: public read"
  ON sponsors FOR SELECT USING (active = TRUE);

-- ─── Seed: demo members (ON CONFLICT = skip if already exists) ───────────────
-- Credentials:
--   member@rana.org  / demo1234
--   priya@rana.org   / prati2024
--   rahul@rana.org   / member2024
-- Change all passwords after setup via your auth system.
INSERT INTO members (name, email, password_hash, membership_type, member_since, member_number, status, phone, address)
VALUES
  (
    'Demo Member',
    'member@rana.org',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/ywHqf4IqY9LzI5HRG',
    'premium', '2021-03-15', 'RANA-2021-00001', 'active',
    '+1 (408) 555-0100', 'Milpitas, CA'
  ),
  (
    'Priya Sharma',
    'priya@rana.org',
    '$2a$10$ki087tTMPittA.mBMMPlneuXsns2JZ0louDFubaUguejh3Rt682mq',
    'regular', '2022-06-01', 'RANA-2022-00042', 'active',
    '+1 (415) 555-0200', 'San Jose, CA'
  ),
  (
    'Rahul Mehta',
    'rahul@rana.org',
    '$2a$10$eJm43SHHHmhbW.8HjPOrn.DnrKd97TNMOYMNcXkV345IkG5zH3OBG',
    'lifetime', '2020-01-10', 'RANA-2020-00007', 'active',
    '+1 (510) 555-0300', 'Fremont, CA'
  )
ON CONFLICT (email) DO NOTHING;

-- ─── Seed: purchase history (skip if member not found) ───────────────────────
INSERT INTO purchases (member_id, description, amount, date, category, status)
SELECT id, 'RANA Holi Hungama 2024 — General Admission', 45.00, '2024-03-20'::DATE, 'Event Ticket', 'completed'
  FROM members WHERE email = 'member@rana.org'
UNION ALL
SELECT id, 'RANA Annual Membership Renewal 2024', 75.00, '2024-01-05'::DATE, 'Membership', 'completed'
  FROM members WHERE email = 'member@rana.org'
UNION ALL
SELECT id, 'RANA Diwali 2023 — VIP Table', 120.00, '2023-11-10'::DATE, 'Event Ticket', 'completed'
  FROM members WHERE email = 'member@rana.org'
UNION ALL
SELECT id, 'RANA Holi 2025 — Family Pass', 90.00, '2025-03-15'::DATE, 'Event Ticket', 'completed'
  FROM members WHERE email = 'priya@rana.org'
UNION ALL
SELECT id, 'RANA Annual Membership 2023', 60.00, '2023-06-01'::DATE, 'Membership', 'completed'
  FROM members WHERE email = 'priya@rana.org'
UNION ALL
SELECT id, 'RANA Lifetime Membership', 500.00, '2020-01-10'::DATE, 'Membership', 'completed'
  FROM members WHERE email = 'rahul@rana.org'
UNION ALL
SELECT id, 'RANA Holi Hungama 2024 — VIP', 75.00, '2024-03-18'::DATE, 'Event Ticket', 'completed'
  FROM members WHERE email = 'rahul@rana.org'
UNION ALL
SELECT id, 'RANA Diwali 2024 — Gold Table', 150.00, '2024-11-01'::DATE, 'Event Ticket', 'completed'
  FROM members WHERE email = 'rahul@rana.org';
