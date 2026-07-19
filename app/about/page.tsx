import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Users, Target, Heart, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About RANA",
  description:
    "Learn about the Rajasthan Association of North America — our mission, history, leadership, and past presidents.",
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
  { name: "Ripudaman Singh Rana", title: "President", tenure: "2026–Present" },
  { name: "Prakash Sharma", title: "Vice President", tenure: "2026–Present" },
  { name: "Rajiv Sharma", title: "Secretary General", tenure: "2023–Present" },
  { name: "Sunita Rathore", title: "Treasurer", tenure: "2024–Present" },
];

const PRESIDENTS: { name: string; year?: string; bio?: string }[] = [
  {
    name: "Chand Mehta",
    bio: "Chand Mehta has been involved with RANA for many years. He is passionate about serving the community, promoting cultural heritage of Rajasthan and activities that have positive social impact. He and his wife Payal are residents of the Bay Area since 2002.",
  },
  { name: "Deepak Sisodia" },
  { name: "Pallavi Mangal" },
  { name: "Garima Srivastava" },
  {
    name: "Lovkesh Karwal",
    bio: "Lovkesh is passionate about preserving our rich culture and heritage. He has been volunteering with RANA for many years.",
  },
  {
    name: "Nirmal Jain",
    year: "2015",
    bio: "Nirmal Jain has been part of RANA for several years. He did his engineering from Malaviya Jaipur and MS from Arizona State. Nirmal is known for remarkable involvement with San Francisco Bay Area communities and does humanitarian and charitable work. He held the RANA presidency in 2015 and was instrumental in building relationships with other Bay Area organizations. Nirmal designs cutting-edge technologies and enjoys angel investing and real estate.",
  },
  {
    name: "Sunita Singh, Ph.D",
    bio: "Born in Rajasthan, Sunita is an accomplished executive, philanthropist, and art creator. She drove the vision for RANA as a social platform — bringing USA-based Non-Resident Rajasthanis together to experience Rajasthani culture and collaborate on social causes with long-term community impact.",
  },
  {
    name: "Nikunj Mehta",
    year: "2012",
    bio: "Nikunj led RANA in 2012 as President. He conceived and contributed to several community initiatives and has held many positions within RANA over the years. Nikunj holds a B.Engg from Mumbai University and a Ph.D from the University of Southern California, and is co-founder of Falkonry — a technology company.",
  },
  {
    name: "Vikram Bhandari",
    bio: "Vikram is the CEO of Yantra Inc., a Silicon Valley technology company with offices in California, Pune, and Bangalore. He has been involved with RANA for a number of years and previously held the President position, stewarding RANA toward its strategic goals.",
  },
  {
    name: "Lalit Mathur",
    bio: "Leela and Lalit Mathur are founding members of RANA and have dedicated themselves to its mission for over 25 years. Their commitment to move Rajasthan forward led to the formation of the Jaipur–Fremont sister city relationship — a lasting mark of their leadership.",
  },
  {
    name: "Raj Nathawat",
    year: "2009",
    bio: "Raj hails from a small village near Jaipur, Devon Ka Vaas. An energetic and passionate community leader, his tenure as President in 2009 brought RANA new spirit, ethnicity, and passion — elevating the organization to new heights.",
  },
  {
    name: "Sanjay Bhandari",
    bio: "Sanjay is a technocrat innovating next-generation technology, having worked with companies like IBM and Marvell Semiconductors. As past President, he was instrumental in organizing the Rajasthan Convention in New York.",
  },
  {
    name: "Vinod Jain",
    bio: "Vinod is an entrepreneur, founder, and CEO of Namo Solutions — a technology company with offices in California, Bangalore, and Udaipur. As past President, he demonstrated strong leadership in delivering on the RANA mission.",
  },
];

function Initials({ name }: { name: string }) {
  const parts = name.replace(/,.*/, "").trim().split(" ");
  const init =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
      <span className="font-display text-sm font-semibold text-accent tracking-wide">
        {init.toUpperCase()}
      </span>
    </div>
  );
}

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

      {/* Past Presidents */}
      <section id="past-presidents" className="py-section bg-surface">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <SectionLabel className="mb-2">§05 / PAST PRESIDENTS</SectionLabel>
            <h2 className="font-display text-display-md font-semibold text-foreground mb-3">
              Past Presidents
            </h2>
            <p className="text-muted leading-relaxed max-w-xl">
              A record of the men and women who have led RANA — each shaping the
              organization&apos;s mission to preserve Rajasthani culture and community
              in North America.
            </p>
          </div>

          <div className="divide-y divide-border">
            {PRESIDENTS.map((p, i) => (
              <div key={`${p.name}-${i}`} className="py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <Initials name={p.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {p.name}
                      </h3>
                      {p.year && (
                        <span className="text-xs font-medium text-accent/80 tracking-wide">
                          President {p.year}
                        </span>
                      )}
                    </div>
                    {p.bio ? (
                      <p className="text-sm text-muted leading-relaxed">{p.bio}</p>
                    ) : (
                      <p className="text-sm text-muted/50 italic">—</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-xs text-muted/60 leading-relaxed">
              If you have updates or additions to this list, please contact the RANA board.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
