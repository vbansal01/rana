"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignOutButton } from "@/components/members/SignOutButton";
import { Bell, CalendarDays, Receipt, Settings, Upload, CheckCircle, X } from "lucide-react";

const NAV_TABS = [
  { label: "Dashboard",     href: "/members",               icon: CalendarDays },
  { label: "Purchases",     href: "/members#purchases",     icon: Receipt },
  { label: "Notifications", href: "/members/notifications", icon: Bell },
  { label: "Settings",      href: "/members/settings",      icon: Settings, active: true },
];

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return (
    <span className="text-3xl font-display font-semibold text-white uppercase select-none">
      {letters}
    </span>
  );
}

type FormState = {
  bio: string;
  family: string;
  phone: string;
  address: string;
  avatarUrl: string;
};

const DEFAULT_FORM: FormState = {
  bio: "",
  family: "",
  phone: "",
  address: "",
  avatarUrl: "",
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form,        setForm]        = useState<FormState>(DEFAULT_FORM);
  const [preview,     setPreview]     = useState("");
  const [uploading,   setUploading]   = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging,    setDragging]    = useState(false);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/members/login");
  }, [status, router]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rana_profile");
      if (stored) {
        const parsed = JSON.parse(stored) as FormState;
        setForm(parsed);
        if (parsed.avatarUrl) setPreview(parsed.avatarUrl);
      }
    } catch (_err) {
      // ignore parse errors
    }
  }, []);

  function set(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadFile(file: File) {
    setUploadError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/members/avatar", { method: "POST", body: fd });
      const json = (await res.json()) as { publicUrl?: string; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      URL.revokeObjectURL(objectUrl);
      setPreview(json.publicUrl ?? "");
      setForm((f) => ({ ...f, avatarUrl: json.publicUrl ?? "" }));
    } catch (err: unknown) {
      setPreview("");
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void uploadFile(file);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void uploadFile(file);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem("rana_profile", JSON.stringify(form));
      } catch (_err) {
        // ignore storage errors
      }
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  }

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="bg-navy border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel className="text-accent mb-1">MEMBER PORTAL</SectionLabel>
              <h1 className="font-display text-2xl font-semibold text-white">
                Welcome back, {session?.user?.name?.split(" ")[0]}
              </h1>
            </div>
            <SignOutButton />
          </div>
          <div className="flex gap-1 mt-5 -mb-px">
            {NAV_TABS.map(({ label, href, icon: Icon, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  active
                    ? "border-accent text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SectionLabel className="mb-1">SETTINGS</SectionLabel>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Edit Your Profile
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-card border border-border bg-background p-6">
            <h3 className="font-semibold text-foreground text-sm mb-5">Profile Photo</h3>
            <div className="flex items-start gap-6">
              <div className="relative h-24 w-24 shrink-0">
                <div className="h-24 w-24 rounded-full border-2 border-border bg-navy flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Profile photo"
                      fill
                      className="object-cover rounded-full"
                      unoptimized
                    />
                  ) : (
                    <Initials name={session?.user?.name ?? "RA"} />
                  )}
                </div>
                {preview && !uploading && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      set("avatarUrl", "");
                    }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground/80 flex items-center justify-center hover:bg-foreground transition-colors"
                  >
                    <X size={10} className="text-white" />
                  </button>
                )}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition-colors py-6 ${
                  dragging
                    ? "border-accent bg-accent/8 text-accent"
                    : "border-border hover:border-accent/50 text-muted"
                }`}
              >
                <Upload size={20} />
                <p className="text-sm font-medium text-center">
                  {uploading ? "Uploading..." : "Drop photo here or click to browse"}
                </p>
                <p className="text-xs text-muted/70">JPG, PNG, WebP - Max 3 MB</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={onFileChange}
              />
            </div>
            {uploadError && <p className="mt-3 text-xs text-red-500">{uploadError}</p>}
          </div>

          <div className="rounded-card border border-border bg-background p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">About You</h3>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Software engineer in the Bay Area, passionate about Rajasthani music..."
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
              />
              <p className="text-right text-xs text-muted mt-1">{form.bio.length}/300</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">
                Family
              </label>
              <textarea
                value={form.family}
                onChange={(e) => set("family", e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Married to Priya. Two children - Arjun (8) and Meera (5). From Jodhpur."
                className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
              />
              <p className="text-right text-xs text-muted mt-1">{form.family.length}/300</p>
            </div>
          </div>

          <div className="rounded-card border border-border bg-background p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-sm">Contact Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+1 (408) 555-0100"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1.5">
                  City / State
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="San Jose, CA"
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60 transition-colors"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            {saved && (
              <p className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                <CheckCircle size={15} />
                Saved successfully
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
