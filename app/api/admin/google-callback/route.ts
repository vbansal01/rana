import { NextRequest, NextResponse } from "next/server";
import { signAdminToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const loginUrl = (err: string) =>
    new URL(`/rana-admin/login?error=${err}`, req.url);

  if (error || !code) return NextResponse.redirect(loginUrl("google_denied"));

  // CSRF check
  const stored = req.cookies.get("admin_oauth_state")?.value;
  if (!stored || stored !== state) return NextResponse.redirect(loginUrl("state_mismatch"));

  // Exchange code for access token
  const baseUrl = process.env.NEXTAUTH_URL ?? `https://${req.headers.get("host")}`;
  const redirectUri = `${baseUrl}/api/admin/google-callback`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id:     process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri:  redirectUri,
      grant_type:    "authorization_code",
    }),
  });

  if (!tokenRes.ok) return NextResponse.redirect(loginUrl("token_exchange"));
  const { access_token } = await tokenRes.json() as { access_token: string };

  // Get Google user info
  const infoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!infoRes.ok) return NextResponse.redirect(loginUrl("userinfo"));
  const { email } = await infoRes.json() as { email: string };

  // Verify against configured admin email
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || email.toLowerCase() !== adminEmail.toLowerCase()) {
    return NextResponse.redirect(loginUrl("unauthorized_email"));
  }

  // Issue admin session cookie
  const jwt = await signAdminToken();
  const res = NextResponse.redirect(new URL("/rana-admin/dashboard", req.url));
  res.cookies.delete("admin_oauth_state");
  res.cookies.set(ADMIN_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
  return res;
}
