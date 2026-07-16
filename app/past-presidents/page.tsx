import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Presidents — RANA",
  description: "Honoring the leaders who have served Rajasthan Alliance of North America.",
};

const PRESIDENTS: {
  name: string;
  year?: string;
  bio?: string;
}[] = [
  {
    name: "Chand Mehta",
    bio: "Chand Mehta has been involved with RANA for many years. He is passionate about serving the community, promoting cultural heritage of Rajasthan and activities that have positive social impact. He and his wife Payal are residents of the Bay Area since 2002.",
  },
  {
    name: "Deepak Sisodia",
  },
  {
    name: "Pallavi Mangal",
  },
  {
    name: "Garima Srivastava",
  },
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
  const init = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0].slice(0, 2);
  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-full border border-accent/30 bg-accent/8 flex items-center justify-center">
      <span className="font-display text-sm font-semibold text-accent tracking-wide">
        {init.toUpperCase()}
      </span>
    </div>
  );
}

export default function PastPresidentsPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Page header */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-3">
            Rajasthan Alliance of North America
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-foreground leading-tight mb-4">
            Past Presidents
          </h1>
          <p className="text-base text-muted max-w-xl leading-relaxed">
            A record of the men and women who have led RANA — each shaping the
            organization's mission to preserve Rajasthani culture and community
            in North America.
          </p>
        </div>
      </div>

      {/* President list */}
      <div className="mx-auto max-w-3xl px-6 py-14">
        <div className="divide-y divide-border">
          {PRESIDENTS.map((p, i) => (
            <div key={`${p.name}-${i}`} className="py-9 first:pt-0 last:pb-0">
              <div className="flex items-start gap-4">
                <Initials name={p.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {p.name}
                    </h2>
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

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted/60 leading-relaxed">
            If you have updates or additions to this list, please contact the RANA board.
          </p>
        </div>
      </div>
    </main>
  );
}
