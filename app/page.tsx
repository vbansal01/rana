import { HeroSection } from "@/components/home/HeroSection";
import { RecentEvents } from "@/components/home/RecentEvents";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { RajasthanRoots } from "@/components/home/RajasthanRoots";
import { PhotoRoll } from "@/components/events/PhotoRoll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MOCK_EVENTS } from "@/lib/mock-data";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <AnnouncementBanner />
      <HeroSection />
      <RecentEvents />

      {/* Photo Roll section */}
      <section className="py-section-sm bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <SectionLabel className="mb-2">§03 / PHOTO ROLL</SectionLabel>
              <h2 className="font-display text-display-sm font-semibold text-foreground">
                Moments That Matter
              </h2>
            </div>
            <Link
              href="/events"
              className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Full gallery →
            </Link>
          </div>
          <PhotoRoll events={MOCK_EVENTS} />
        </div>
      </section>

      {/* Mission quote */}
      <section className="py-section bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-border max-w-[80px]" />
            <SectionLabel>§04 / MISSION</SectionLabel>
            <div className="h-px flex-1 bg-border max-w-[80px]" />
          </div>
          <p className="font-accent text-3xl sm:text-4xl italic text-navy/80 leading-relaxed mb-6">
            "Bridging our roots with our future — for every Rajasthani across North America."
          </p>
          <p className="text-muted text-sm max-w-xl mx-auto leading-relaxed mb-8">
            RANA has been the heart of the Rajasthani community in North America for over
            25 years, fostering cultural pride, professional excellence, and enduring friendship.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/80 transition-colors"
            >
              Our Story
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
            >
              Join RANA
            </Link>
          </div>
        </div>
      </section>

      <RajasthanRoots />
      <SponsorsSection />
    </>
  );
}
