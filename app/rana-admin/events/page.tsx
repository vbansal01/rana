"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, Star, StarOff, X, Check, ChevronDown, ChevronUp,
} from "lucide-react";

// - Types -
type EventRow = {
  id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  category?: string;
  image_url?: string;
  imageUrl?: string;   // mock-data key
  featured?: boolean;
};

const CATEGORIES = ["Community", "Holi", "Diwali", "Gala", "Cultural", "Fundraiser", "Sports", "Youth", "Other"];

const EMPTY_FORM = {
  title: "", date: "", location: "", description: "",
  category: "Community", image_url: "", featured: false,
};

type FormData = typeof EMPTY_FORM;

// - Helpers -
function imageOf(e: EventRow) { return e.image_url ?? e.imageUrl ?? ""; }
function normalize(e: EventRow): EventRow {
  return { ...e, image_url: e.image_url ?? e.imageUrl ?? "" };
}

// - Event form (create / edit) -
function EventForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: FormData;
  onSave: (data: FormData) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FormData>(initial);
  const set = (k: keyof FormData, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="rounded-card border border-accent/30 bg-accent/5 p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Title */}
        <div className="sm:col-span-2">
          <label className="label">Event Title *</label>
          <input
            type="text" required value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="RANA Holi Hungama 2026"
            className="field"
          />
        </div>
        {/* Date */}
        <div>
          <label className="label">Date *</label>
          <input
            type="date" required value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="field"
          />
        </div>
        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className="field">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {/* Location */}
        <div className="sm:col-span-2">
          <label className="label">Location</label>
          <input
            type="text" value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="San Jose Civic Center, CA"
            className="field"
          />
        </div>
        {/* Description */}
        <div className="sm:col-span-2">
          <label className="label">Description</label>
          <textarea
            rows={3} value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of the event…"
            className="field resize-none"
          />
        </div>
        {/* Image URL */}
        <div className="sm:col-span-2">
          <label className="label">Image URL <span className="font-normal text-muted">(paste Drive share link or any image URL)</span></label>
          <input
            type="url" value={form.image_url}
            onChange={(e) => set("image_url", e.target.value)}
            placeholder="https://drive.google.com/file/d/…"
            className="field"
          />
        </div>
        {/* Featured */}
        <div className="sm:col-span-2 flex items-center gap-2">
          <input
            id="featured" type="checkbox" checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-border accent-[#C8922A]"
          />
          <label htmlFor="featured" className="text-sm text-foreground cursor-pointer">
            Feature this event on homepage
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => onSave(form)}
          disabled={saving || !form.title || !form.date}
          className="flex items-center gap-2 rounded-md bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
        >
          <Check size={14} />
          {saving ? "Saving…" : "Save Event"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 rounded-md border border-border px-5 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  );
}

// - Page -
export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => setEvents((data as EventRow[]).map(normalize)))
      .catch(() => setError("Failed to load events"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDesc ? -diff : diff;
    });

  // - Create -
  async function handleCreate(data: FormData) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setEvents((ev) => [normalize(json as EventRow), ...ev]);
      setCreating(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSaving(false);
    }
  }

  // - Update -
  async function handleUpdate(id: string, data: FormData) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setEvents((ev) => ev.map((e) => (e.id === id ? normalize(json as EventRow) : e)));
      setEditingId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  // - Delete -
  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (res.ok) setEvents((ev) => ev.filter((e) => e.id !== id));
  }

  // - Toggle featured -
  async function toggleFeatured(e: EventRow) {
    const updated = { ...e, featured: !e.featured };
    const res = await fetch(`/api/admin/events/${e.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: updated.featured }),
    });
    if (res.ok) setEvents((ev) => ev.map((x) => (x.id === e.id ? updated : x)));
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* - Header - */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1">Admin</p>
            <h1 className="font-display text-2xl font-semibold text-foreground">Events</h1>
            <p className="text-sm text-muted mt-0.5">{events.length} total events</p>
          </div>
          <button
            onClick={() => { setCreating(true); setEditingId(null); }}
            className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors shadow-sm"
          >
            <Plus size={15} />
            New Event
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex justify-between">
            {error}
            <button onClick={() => setError(null)}><X size={14} /></button>
          </div>
        )}

        {/* - Create form - */}
        {creating && (
          <div className="mb-6">
            <h2 className="font-semibold text-foreground text-sm mb-3">Create New Event</h2>
            <EventForm
              initial={EMPTY_FORM}
              onSave={handleCreate}
              onCancel={() => setCreating(false)}
              saving={saving}
            />
          </div>
        )}

        {/* - Search + sort - */}
        <div className="flex gap-3 mb-4">
          <input
            type="search"
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            onClick={() => setSortDesc((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted hover:text-foreground transition-colors"
          >
            {sortDesc ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
            {sortDesc ? "Newest first" : "Oldest first"}
          </button>
        </div>

        {/* - Events list - */}
        {loading ? (
          <div className="py-20 text-center text-sm text-muted">Loading events…</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((event) => (
              <div key={event.id}>
                {editingId === event.id ? (
                  <div>
                    <h2 className="font-semibold text-foreground text-sm mb-3">Editing: {event.title}</h2>
                    <EventForm
                      initial={{
                        title: event.title,
                        date: event.date,
                        location: event.location ?? "",
                        description: event.description ?? "",
                        category: event.category ?? "Community",
                        image_url: imageOf(event),
                        featured: event.featured ?? false,
                      }}
                      onSave={(data) => handleUpdate(event.id, data)}
                      onCancel={() => setEditingId(null)}
                      saving={saving}
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 rounded-card border border-border bg-background p-4 hover:border-accent/30 transition-colors group">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-14 rounded-md overflow-hidden bg-surface shrink-0">
                      {imageOf(event) ? (
                        <Image src={imageOf(event)} alt={event.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted">No image</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <p className="font-semibold text-foreground text-sm leading-snug">{event.title}</p>
                        {event.featured && (
                          <span className="shrink-0 rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted mt-0.5">
                        {event.date}
                        {event.location && ` · ${event.location}`}
                        {event.category && ` · ${event.category}`}
                      </p>
                      {event.description && (
                        <p className="text-xs text-muted/70 mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFeatured(event)}
                        title={event.featured ? "Unfeature" : "Feature on homepage"}
                        className="rounded-md p-1.5 text-muted hover:text-accent transition-colors"
                      >
                        {event.featured ? <Star size={15} className="fill-accent text-accent" /> : <StarOff size={15} />}
                      </button>
                      <button
                        onClick={() => { setEditingId(event.id); setCreating(false); }}
                        className="rounded-md p-1.5 text-muted hover:text-foreground transition-colors"
                        title="Edit event"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        className="rounded-md p-1.5 text-muted hover:text-red-500 transition-colors"
                        title="Delete event"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filtered.length === 0 && !loading && (
              <div className="py-16 text-center text-sm text-muted">
                {search ? `No events match "${search}"` : "No events yet. Click New Event to get started."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Field styles via global CSS approach - inline style block */}
      <style jsx global>{`
        .label { display: block; font-size: 0.75rem; font-weight: 500; color: #7A7169; margin-bottom: 0.375rem; }
        .field { width: 100%; border-radius: 0.375rem; border: 1px solid #D9D3C8; background: #F5F0E8; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #0D0D0D; outline: none; }
        .field:focus { ring: 2px; ring-color: rgba(200,146,42,0.4); border-color: #C8922A; }
      `}</style>
    </div>
  );
}
