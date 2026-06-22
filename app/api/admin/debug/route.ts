import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

function base32Decode(s: string): Buffer {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const clean = s.toUpperCase().replace(/=+$/, "").replace(/\s/g, "");
  let bits = 0, val = 0;
  const bytes: number[] = [];
  for (const ch of clean) {
    const idx = alphabet.indexOf(ch);
    if (idx === -1) continue;
    val = (val << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bytes.push((val >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(bytes);
}

function hotp(secret: string, counter: number): string {
  const key = base32Decode(secret);
  const buf = Buffer.alloc(8);
  buf.writeUInt32BE(Math.floor(counter / 0x100000000), 0);
  buf.writeUInt32BE(counter >>> 0, 4);
  const hmac = createHmac("sha1", key).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code =
    (((hmac[offset] & 0x7f) << 24) |
     ((hmac[offset + 1] & 0xff) << 16) |
     ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)) % 1000000;
  return code.toString().padStart(6, "0");
}

// DELETE THIS ROUTE AFTER DEBUGGING
export async function GET(_req: NextRequest) {
  const email   = process.env.ADMIN_EMAIL;
  const hash    = process.env.ADMIN_PASSWORD_HASH;
  const totpKey = process.env.ADMIN_TOTP_SECRET;
  const jwtKey  = process.env.ADMIN_JWT_SECRET;

  const counter = Math.floor(Date.now() / 1000 / 30);
  const currentCode = totpKey ? hotp(totpKey, counter) : null;

  return NextResponse.json({
    env: {
      ADMIN_EMAIL:          email        ? `set (${email})`               : "MISSING",
      ADMIN_PASSWORD_HASH:  hash         ? `set (${hash.slice(0,7)}…)`    : "MISSING",
      ADMIN_TOTP_SECRET:    totpKey      ? `set (${totpKey.slice(0,4)}…)` : "MISSING",
      ADMIN_JWT_SECRET:     jwtKey       ? "set"                          : "MISSING",
    },
    totp: {
      server_time_utc: new Date().toISOString(),
      counter,
      current_code:    currentCode,
      note: "This code should match your Google Authenticator app right now",
    },
  });
}
