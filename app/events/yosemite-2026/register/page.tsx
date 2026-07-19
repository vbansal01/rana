"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  adults: string;
  children: string;
  childrenAges: string;
  dietary: string;
  message: string;
};

export default function YosemiteRegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", adults: "2",
    children: "0", childrenAges: "", dietary: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Demo: simulate submission delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 border border-green-200 mb-5">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">You're on the waitlist!</h1>
          <p className="text-sm text-muted mb-1">
            Thank you, <span className="font-semibold text-foreground">{form.name.split(" ")[0]}</span>! We've received your interest for the RANA Yosemite Camping Summit 2026.
          </p>
          <p className="text-sm text-muted mb-8">
            We'll reach out to <span className="text-foreground">{form.email}</span> if a spot becomes available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://chat.whatsapp.com/FGaqCKMjpZ240w8lEWDl2M"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Join WhatsApp Group
            </a>
            <Link href="/events" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background transition-colors">
              All Events
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const inputClass = "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors";
  const labelClass = "block text-xs font-semibold text-foreground uppercase tracking-wide mb-1.5";

  return (
    <main className="min-h-screen bg-surface">
      <div className="mx-auto max-w-xl px-6 py-12">

        <Link href="/events/yosemite-2026" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={13} /> Back to event details
        </Link>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-1">Sept 11–13, 2026 · Yosemite</p>
          <h1 className="font-display text-2xl font-semibold text-foreground">Join the Waitlist</h1>
          <p className="text-sm text-muted mt-1.5 leading-relaxed">
            The 2026 Camping Summit is currently full. Add yourself to the waitlist and we'll contact you if a spot opens up.
          </p>
        </div>

        <div className="rounded-card border border-border bg-background p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full name</label>
                <input type="text" required placeholder="Rahul Sharma" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email address</label>
                <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Phone number</label>
              <input type="tel" placeholder="+1 (408) 555-0100" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Number of adults</label>
                <select value={form.adults} onChange={(e) => set("adults", e.target.value)} className={inputClass}>
                  {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Number of children</label>
                <select value={form.children} onChange={(e) => set("children", e.target.value)} className={inputClass}>
                  {[0,1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            {parseInt(form.children) > 0 && (
              <div>
                <label className={labelClass}>Children's ages</label>
                <input type="text" placeholder="e.g. 5, 8, 12" value={form.childrenAges} onChange={(e) => set("childrenAges", e.target.value)} className={inputClass} />
              </div>
            )}

            <div>
              <label className={labelClass}>Dietary requirements</label>
              <input type="text" placeholder="Vegetarian, vegan, allergies…" value={form.dietary} onChange={(e) => set("dietary", e.target.value)} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Anything else? (optional)</label>
              <textarea rows={3} placeholder="Accessibility needs, questions…" value={form.message} onChange={(e) => set("message", e.target.value)} className={`${inputClass} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-accent py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {loading ? "Submitting…" : "Join the Waitlist"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted mt-5">
          Questions? Join the{" "}
          <a href="https://chat.whatsapp.com/FGaqCKMjpZ240w8lEWDl2M" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            WhatsApp group
          </a>{" "}
          or contact RD Singh at (408) 431-9460.
        </p>
      </div>
    </main>
  );
}
