import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  if (variant === "featured") {
    return (
      <div className="group relative overflow-hidden rounded-card bg-navy shadow-card h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
          <span className="absolute top-3 left-3 section-label bg-accent/90 text-white px-2 py-1 rounded text-[10px]">
            {event.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-display text-white font-semibold text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mb-4 flex-1">{event.description}</p>

          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Calendar size={12} />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <MapPin size={12} />
              {event.location}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {event.ticketUrl ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link"
              >
                View details
                <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
              </a>
            ) : (
              <Link
                href={`/events/${event.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link"
              >
                View details
                <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-4 rounded-card border border-border bg-background p-4 hover:shadow-card transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between min-w-0">
        <div>
          <span className="section-label text-[10px]">{event.category}</span>
          <h4 className="font-display font-semibold text-foreground text-sm leading-snug mt-0.5 line-clamp-2">
            {event.title}
          </h4>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs text-muted">
            <Calendar size={11} /> {formatDate(event.date)}
          </span>
        </div>
      </div>
    </div>
  );
}
