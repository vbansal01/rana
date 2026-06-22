import { SignJWT, jwtVerify } from "jose";

function secret() {
  return new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET ?? "change-this-secret-in-production"
  );
}

export async function signAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE = "rana_admin_session";
