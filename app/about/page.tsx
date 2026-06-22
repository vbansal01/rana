import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Users, Target, Heart, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About RANA",
  description:
    "Learn about the Rajasthan Association of North America — our mission, history, and leadership.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Cultural Heritage",
    body: "We celebrate and preserve the rich traditions, arts, and languages of Rajasthan for generations to come.",
  },
  {
    icon: Users,
    title: "Community",
    body: "Building lifelong friendships and support networks for Rajasthanis across the continent.",
  },
  {
    icon: Target,
    title: "Excellence",
    body: "Empowering our members to achieve their fullest potential in professional and personal life.",
  },
  {
    icon: Award,
    title: "Service",
    body: "Giving back through scholarships, charitable programs, and civic engagement.",
  },
];

const LEADERSHIP = [
  { name: "Anil Mehta", title: "President", tenure: "2024–Present" },
  { name: "Priya Joshi", title: "Vice President", tenure: "2024–Present" },
  { name: "Rajiv Sharma", title: "Secretary General", tenure: "2023–Present" },
  { name: "Sunita Rathore", title: "Treasurer", tenure: "2024–Present" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="bg-navy py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel className="text-accent mb-4">§01 / ABOUT RANA</SectionLabel>
          <h1 className="font-display text-display-lg font-semibold text-white mb-6">
            Our Story
          </h1>
          <p className="font-accent text-2xl italic text-white/70 leading-relaxed">
            &ldquo;A community bound not just by geography, but by shared values, history,
            and an unbreakable sense of belonging.&rdquo;
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-section bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel className="mb-3">§02 / MISSION</SectionLabel>
              <h2 className="font-display text-display-md font-semibold text-foreground mb-5">
                Who We Are
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Founded in 2009, the Rajasthan Alliance of North America (RANA) is the
                premier cultural and community organization dedicated to preserving and
                promoting the languages, literature, history, traditions, heritage,
                religions, and culture of Rajasthan in India.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Based in the San Francisco Bay Area, RANA brings together professionals,
                families, and students united by their roots in the land of maharajas —
                and by their dreams in their new home in North America.
              </p>
              <p className="text-muted leading-relaxed">
                From our legendary annual Holi Hungama and Royal Diwali to the Gangaur
                Festival, camping trips, and community service through RANA Saheli, RANA
                YUVA, and our Adopt a Village program — we create spaces where heritage
                flourishes and community thrives.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2009", label: "Year founded" },
                { value: "2,400+", label: "Members" },
                { value: "30+", label: "Cities represented" },
                { value: "$200K+", label: "Scholarships awarded" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-card border border-border bg-surface p-6 text-center">
                  <p className="font-display text-3xl font-semibold text-accent mb-1">{value}</p>
                  <p className="text-xs text-muted uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel className="mb-2">§03 / VALUES</SectionLabel>
            <h2 className="font-display text-display-md font-semibold text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-card bg-background border border-border p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 mb-4">
                  <Icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-section bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel className="mb-2">§04 / LEADERSHIP</SectionLabel>
            <h2 className="font-display text-display-md font-semibold text-foreground">
              Executive Board 2024&ndash;26
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEADERSHIP.map(({ name, title, tenure }) => (
              <div key={name} className="rounded-card border border-border bg-surface p-6 text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-navy flex items-center justify-center font-display font-bold text-xl text-accent">
                  {name[0]}
                </div>
                <p className="font-display font-semibold text-foreground text-base">{name}</p>
                <p className="text-sm text-accent font-semibold mt-0.5">{title}</p>
                <p className="text-xs text-muted mt-1">{tenure}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
