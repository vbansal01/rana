import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "./EventCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MOCK_EVENTS } from "@/lib/mock-data";

export function RecentEvents() {
  const featured = MOCK_EVENTS.filter((e) => e.featured).slice(0, 3);
  const recent = MOCK_EVENTS.filter((e) => !e.featured).slice(0, 4);

  return (
    <section className="py-section bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <SectionLabel className="mb-2">§01 / RECENT EVENTS</SectionLabel>
            <h2 className="font-display text-display-md font-semibold text-foreground">
              Community Highlights
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group"
          >
            All events
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} variant="featured" />
          ))}
        </div>

        <hr className="divider mb-10" />

        {/* Recent list */}
        <div>
          <SectionLabel className="mb-4">MORE FROM THIS SEASON</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recent.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
