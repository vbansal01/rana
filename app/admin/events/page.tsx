"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MOCK_EVENTS } from "@/lib/mock-data";

type EventRow = {
  id: string;
  title: string;
  date: string;
  imageUrl: string | null;
};

// Convert a Google Drive share link to a direct image URL
// Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
// Output: https://lh3.googleusercontent.com/d/FILE_ID
function toDriveDirectUrl(input: string): string {
  // Already a direct URL
  if (input.includes("lh3.googleusercontent.com")) return input;
  // drive.google.com/uc?id=... or /open?id=...
  const ucMatch = input.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;
  // drive.google.com/file/d/FILE_ID/...
  const fileMatch = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
  // Return as-is (user pasted a non-Drive URL - that's fine too)
  return input;
}

// - Single event row -
function EventRow({ event }: { event: EventRow }) {
  const [imageUrl, setImageUrl] = useState<string | null>(event.imageUrl);
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  async function save() {
    if (!input.trim()) return;
    setError(null);
    setSaving(true);
    try {
      const url = toDriveDirectUrl(input.trim());
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: url }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setImageUrl(url);
      setSaved(true);
      setOpen(false);
      setInput("");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div className="relative w-20 h-14 rounded-md overflow-hidden bg-surface flex-shrink-0">
          {imageUrl ? (
            <Image src={imageUrl} alt={event.title} fill className="object-cover" unoptimized />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-xs">No image</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{event.title}</p>
          <p className="text-xs text-muted">{event.date}</p>
          {saved && <p className="text-xs text-green-600 mt-0.5">✓ Saved</p>}
        </div>

        {/* Action button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex-shrink-0 rounded-md border border-border px-4 py-1.5 text-xs font-medium text-muted hover:border-accent hover:text-accent transition-colors"
        >
          {imageUrl ? "Change image" : "Add image"}
        </button>
      </div>

      {/* URL input (expandable) */}
      {open && (
        <div className="mt-3 ml-24 space-y-2">
          <p className="text-xs text-muted">
            Paste a Google Drive share link <span className="text-muted/60">(or any direct image URL)</span>
          </p>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && save()}
              placeholder="https://drive.google.com/file/d/..."
              className="flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <button
              onClick={save}
              disabled={saving || !input.trim()}
              className="rounded-md bg-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setOpen(false); setInput(""); setError(null); }}
              className="rounded-md border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}

// - Page -
export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const rows: EventRow[] = MOCK_EVENTS.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      imageUrl: e.imageUrl ?? null,
    }));
    setEvents(rows);
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1">Admin</p>
          <h1 className="font-display text-display-sm font-semibold text-foreground mb-1">
            Event Images
          </h1>
          <p className="text-sm text-muted">
            Upload images to Google Drive, share them publicly, then paste the link here.
            The image updates live on the website instantly.
          </p>
        </div>

        {/* How-to banner */}
        <div className="mb-6 rounded-card bg-accent/8 border border-accent/20 px-5 py-4 text-sm space-y-1">
          <p className="font-semibold text-foreground">How to add an image from Google Drive</p>
          <ol className="list-decimal list-inside text-muted space-y-0.5 text-xs">
            <li>Upload the photo to your <strong>RANA Events</strong> folder in Google Drive</li>
            <li>Right-click the file → <strong>Share</strong> → <strong>Anyone with the link</strong> → Copy link</li>
            <li>Click <strong>Add image</strong> next to an event below and paste the link</li>
            <li>Hit <strong>Save</strong> - done. The image goes live immediately.</li>
          </ol>
        </div>

        {/* Search */}
        <input
          type="search"
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 rounded-md border border-border bg-surface px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
        />

        {/* Event list */}
        <div className="rounded-card border border-border bg-white shadow-card px-6">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">No events found.</p>
          ) : (
            filtered.map((e) => <EventRow key={e.id} event={e} />)
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Works with Google Drive share links, direct image URLs, or any public image.
        </p>
      </div>
    </main>
  );
}
