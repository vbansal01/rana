import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";

const PILLARS = [
  {
    emoji: "🎨",
    title: "Vibrant Festivals",
    body: "From Holi's explosion of colors to the glittering lights of Diwali and the sacred beauty of Gangaur — our festivals are windows into Rajasthan's living soul.",
  },
  {
    emoji: "🎵",
    title: "Music & Dance",
    body: "The haunting melodies of Manganiyar musicians, the swirling grace of Ghoomar, the fire of Kalbeliya dance — Rajasthan's performing arts are among the world's most celebrated.",
  },
  {
    emoji: "🏰",
    title: "Royal Heritage",
    body: "The land of Maharajas — where Amber Fort, Hawa Mahal, and Mehrangarh rise from the desert, each stone a testament to centuries of valor, art, and architecture.",
  },
  {
    emoji: "🍛",
    title: "Cuisine & Traditions",
    body: "Dal Baati Churma cooked on open fires, the spice of Ker Sangri, the sweetness of Ghewar — Rajasthani cuisine is an experience as rich as its history.",
  },
  {
    emoji: "🎨",
    title: "Art & Craft",
    body: "Blue pottery from Jaipur, block-printed fabrics of Sanganer, Bandhani tie-dye, miniature paintings — Rajasthan's artisans have shaped the world's imagination of India.",
  },
  {
    emoji: "🤝",
    title: "Warm Hospitality",
    body: "'Athithi Devo Bhava' — the guest is God. Rajasthani hospitality is legendary, and it's at the heart of everything RANA does for its community.",
  },
];

export function RajasthanRoots() {
  return (
    <section className="py-section bg-navy overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <SectionLabel className="text-accent mb-3">§05 / OUR ROOTS</SectionLabel>
          <h2 className="font-display text-display-lg font-semibold text-white mb-4">
            The Land of Kings,<br />
            <span className="text-accent">In Our Hearts.</span>
          </h2>
          <p className="font-accent text-xl italic text-white/65 leading-relaxed mb-5">
            "Kesariya Balam, Padharo Mhare Desh" —<br />
            O beloved, come to my land.
          </p>
          <p className="text-white/55 text-sm leading-relaxed mb-6">
            Rajasthan — the Great Indian State of Kings — is a land of sand dunes and
            palaces, of ancient folk songs and blazing colors. Its people carry within
            them an unshakeable pride in their heritage and an irrepressible warmth
            toward all who share their world.
          </p>
          <p className="text-white/55 text-sm leading-relaxed mb-8">
            RANA exists to keep that spirit alive on North American soil — for our
            children, our grandchildren, and every Rajasthani who finds a home far
            from the Thar Desert but never truly leaves it behind.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              About RANA
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/40 transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </div>

        {/* Six cultural pillars */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 text-center mb-8">
            The six pillars of Rajasthani culture we celebrate
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map(({ emoji, title, body }) => (
              <div
                key={title}
                className="group rounded-card bg-white/5 border border-white/8 p-6 hover:bg-white/8 hover:border-accent/20 transition-all duration-300"
              >
                <span className="text-2xl mb-3 block">{emoji}</span>
                <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-accent transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom RANA chapters */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 text-center mb-6">
            RANA Chapters across North America
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "San Francisco Bay Area · HQ",
              "New York",
              "Los Angeles",
              "Houston",
              "Chicago",
            ].map((chapter) => (
              <span
                key={chapter}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/60"
              >
                {chapter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
