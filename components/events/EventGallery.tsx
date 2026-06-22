"use client";

import Image from "next/image";
import { useState } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import type { Event } from "@/lib/types";

const CATEGORIES = ["All", "Holi", "Festival", "Diwali", "Picnic", "Camping", "Community"];

interface EventGalleryProps {
  events: Event[];
}

export function EventGallery({ events }: EventGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxEvent, setLightboxEvent] = useState<Event | null>(null);

  const filtered =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
              activeCategory === cat
                ? "bg-accent text-white shadow-sm"
                : "bg-surface text-muted border border-border hover:border-accent/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((event, i) => (
          <div
            key={event.id}
            className="group cursor-pointer rounded-card overflow-hidden border border-border hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 bg-background"
            onClick={() => setLightboxEvent(event)}
          >
            <div className="relative overflow-hidden">
              <div
                className={cn(
                  "relative",
                  i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="absolute top-3 left-3 section-label bg-accent/90 text-white px-2 py-1 rounded text-[10px]">
                {event.category}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {event.title}
              </h3>
              <p className="text-xs text-muted line-clamp-2 mb-3">{event.description}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-muted">
                  <Calendar size={11} /> {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted">
                  <MapPin size={11} /> {event.location.split(",")[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm"
          onClick={() => setLightboxEvent(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-card overflow-hidden bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxEvent(null)}
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 border border-border shadow-sm hover:bg-surface transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <div className="relative aspect-[16/9]">
              <Image
                src={lightboxEvent.imageUrl}
                alt={lightboxEvent.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="section-label">{lightboxEvent.category}</span>
                  <h2 className="font-display text-xl font-semibold text-foreground mt-1">
                    {lightboxEvent.title}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">
                {lightboxEvent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-xs text-muted">
                  <Calendar size={13} className="text-accent" />
                  {formatDate(lightboxEvent.date)}
                </span>
                <span className="flex items-center gap-2 text-xs text-muted">
                  <MapPin size={13} className="text-accent" />
                  {lightboxEvent.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
