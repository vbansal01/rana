"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", totpCode: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Login failed");
      router.push("/rana-admin/events");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      {/* Decorative bg circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent/5" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 border border-accent/30 mb-4">
            <Shield size={24} className="text-accent" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-white">Admin Portal</h1>
          <p className="text-sm text-white/40 mt-1">RANA · Secure Access</p>
        </div>

        {/* Form card */}
        <div className="rounded-card border border-white/10 bg-white/5 backdrop-blur-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="admin@rana.org"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 pr-10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Google Authenticator Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                required
                maxLength={6}
                value={form.totpCode}
                onChange={(e) => setForm((f) => ({ ...f, totpCode: e.target.value.replace(/\D/g, "") }))}
                className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/25 tracking-[0.3em] text-center font-mono focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="000000"
              />
              <p className="text-[10px] text-white/30 mt-1 text-center">
                6-digit code from your Google Authenticator app
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-red-500/10 border border-red-500/20 px-3 py-2">
                <p className="text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || form.totpCode.length < 6}
              className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {loading ? "Verifying…" : "Sign in to Admin"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/20">
          This page is not publicly linked. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
