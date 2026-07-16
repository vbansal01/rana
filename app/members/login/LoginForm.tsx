"use client";

import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
  OAuthNotMember:        "No RANA membership found for that account. Please sign in with your registered email.",
  OAuthAccountNotLinked: "This email is already registered. Please sign in with your original method.",
  OAuthSignin:           "Could not connect to the sign-in provider. Please try again.",
  Default:               "Sign-in failed. Please try again.",
};

const GoogleLogo = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookLogo = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

export function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/members";
  const errorParam   = searchParams.get("error");

  const [form, setForm]             = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError]           = useState<string | null>(
    errorParam ? (ERROR_MESSAGES[errorParam] ?? ERROR_MESSAGES.Default) : null
  );
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  // Discover which social providers are configured server-side
  useEffect(() => {
    getProviders().then((p) => {
      if (!p) return;
      setAvailableProviders(Object.keys(p).filter((k) => k !== "credentials"));
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  async function handleSocial(provider: string) {
    setSocialLoading(provider);
    await signIn(provider, { callbackUrl });
  }

  const showSocial = availableProviders.length > 0;

  return (
    <>
      {error && (
        <div className="mb-5 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Social buttons — only rendered when providers are configured */}
      {showSocial && (
        <>
          <div className="space-y-2.5 mb-5">
            {availableProviders.includes("google") && (
              <button
                type="button"
                disabled={!!socialLoading}
                onClick={() => handleSocial("google")}
                className="w-full flex items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface transition-colors disabled:opacity-60"
              >
                {socialLoading === "google" ? <Loader2 size={15} className="animate-spin text-muted" /> : GoogleLogo}
                Continue with Google
              </button>
            )}
            {availableProviders.includes("facebook") && (
              <button
                type="button"
                disabled={!!socialLoading}
                onClick={() => handleSocial("facebook")}
                className="w-full flex items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface transition-colors disabled:opacity-60"
              >
                {socialLoading === "facebook" ? <Loader2 size={15} className="animate-spin text-muted" /> : FacebookLogo}
                Continue with Facebook
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] uppercase tracking-widest text-muted">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </>
      )}

      {/* Credentials form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
            Email address
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide">
              Password
            </label>
            <Link href="/members/forgot-password" className="text-xs text-accent hover:text-accent-hover transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-md border border-border bg-background px-3.5 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light hover:text-muted transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? "Signing in…" : "Sign in to Portal"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted">
          Not a member yet?{" "}
          <Link href="/join" className="font-semibold text-accent hover:text-accent-hover transition-colors">
            Apply for membership →
          </Link>
        </p>
      </div>
    </>
  );
}
