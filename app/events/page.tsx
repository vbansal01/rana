import type { Metadata } from "next";
import { EventGallery } from "@/components/events/EventGallery";
import { PhotoRoll } from "@/components/events/PhotoRoll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MOCK_EVENTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Events",
  description: "Browse all RANA community events — galas, festivals, workshops, and more.",
};

export default function EventsPage() {
  return (
    <div className="pt-24">
      {/* Page Header */}
      <div className="bg-navy py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel className="text-accent mb-3">EVENTS & GALLERY</SectionLabel>
          <h1 className="font-display text-display-lg font-semibold text-white mb-4">
            All Events
          </h1>
          <p className="text-white/60 max-w-lg text-sm leading-relaxed">
            Explore every celebration, conference, and cultural gathering organized by RANA
            — from our grandest galas to our most intimate community workshops.
          </p>
        </div>
      </div>

      {/* Photo Roll */}
      <section className="py-section-sm bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel className="mb-4">§01 / PHOTO ROLL — ALL EVENTS</SectionLabel>
          <PhotoRoll events={MOCK_EVENTS} />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-section bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel className="mb-2">§02 / COMPLETE GALLERY</SectionLabel>
            <h2 className="font-display text-display-sm font-semibold text-foreground">
              Browse & Filter
            </h2>
          </div>
          <EventGallery events={MOCK_EVENTS} />
        </div>
      </section>
    </div>
  );
}
