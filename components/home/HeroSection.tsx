"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, CalendarDays, MapPin } from "lucide-react";

const HERO_IMAGE_URL = "/images/hero-rajasthan.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE_URL}
          alt="Rajasthani Ghoomar dancers at Amber Fort"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl">

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-accent shrink-0" />
            <span className="font-accent text-accent/90 text-lg italic tracking-wide">
              Padharo Mhare Desh
            </span>
          </div>

          <h1 className="font-display text-white leading-[1.05] mb-5">
            <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold">
              The Spirit of Rajasthan,
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-accent mt-1">
              Alive in the Bay Area.
            </span>
          </h1>

          <p className="font-accent text-xl sm:text-2xl text-white/75 italic leading-relaxed mb-3 max-w-xl">
            From the golden sands of the Thar to the shores of San Francisco —
            RANA carries the colors, music, and soul of Rajasthan across continents.
          </p>
          <p className="text-sm text-white/55 leading-relaxed mb-8 max-w-lg">
            Rajasthan Alliance of North America is a non-profit community of Rajasthani
            families, professionals, and dreamers united by culture, heritage, and a
            shared love for the Land of Kings.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 active:scale-[0.98]"
            >
              Explore Events <ArrowRight size={15} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Our Story
            </Link>
            <Link
              href="/events/yosemite-2026"
              className="inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/15 px-6 py-3 text-sm font-semibold text-accent hover:bg-accent/25 transition-colors backdrop-blur-sm"
            >
              ⛺ Yosemite Camping 2026
            </Link>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { icon: Users,        value: "25+",  label: "Years of community" },
              { icon: CalendarDays, value: "100+", label: "Events organized" },
              { icon: MapPin,       value: "5",    label: "Chapters across North America" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                  <Icon size={15} className="text-accent" />
                </div>
                <div>
                  <p className="font-display text-white font-semibold text-lg leading-none">{value}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
