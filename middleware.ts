import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

function adminSecret() {
  return new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "change-this-secret-in-production"
  );
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/rana-admin")) {
    if (pathname === "/rana-admin/login") return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token) return NextResponse.redirect(new URL("/rana-admin/login", req.url));
    try {
      await jwtVerify(token, adminSecret());
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/rana-admin/login", req.url));
      res.cookies.delete(ADMIN_COOKIE);
      return res;
    }
  }

  if (pathname.startsWith("/members") || pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.redirect(new URL("/members/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members/:path*", "/admin/:path*", "/rana-admin/:path*"],
};
