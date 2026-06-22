import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MOCK_SPONSORS } from "@/lib/mock-data";

const TIER_LABELS: Record<string, string> = {
  platinum: "Platinum Partner",
  gold: "Gold Partner",
  silver: "Silver Partner",
  community: "Community Partner",
};

const TIER_COLORS: Record<string, string> = {
  platinum: "border-t-[3px] border-t-slate-400",
  gold: "border-t-[3px] border-t-accent",
  silver: "border-t-[3px] border-t-slate-300",
  community: "border-t-[3px] border-t-border",
};

export function SponsorsSection() {
  const platinum = MOCK_SPONSORS.filter((s) => s.tier === "platinum");
  const gold = MOCK_SPONSORS.filter((s) => s.tier === "gold");
  const silver = MOCK_SPONSORS.filter((s) => s.tier === "silver");
  const community = MOCK_SPONSORS.filter((s) => s.tier === "community");

  return (
    <section id="sponsors" className="py-section bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionLabel className="mb-2">§02 / SPONSORS</SectionLabel>
          <h2 className="font-display text-display-md font-semibold text-foreground mb-3">
            Our Valued Sponsors
          </h2>
          <p className="text-muted text-sm max-w-lg mx-auto">
            These organizations share our vision of a thriving, connected community.
            Their generous support makes our events and programs possible.
          </p>
        </div>

        {/* Platinum */}
        {platinum.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-light text-center mb-5">
              Platinum Partners
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              {platinum.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} size="lg" />
              ))}
            </div>
          </div>
        )}

        {/* Gold */}
        {gold.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-light text-center mb-5">
              Gold Partners
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {gold.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Silver + Community */}
        <div className="flex flex-wrap justify-center gap-3">
          {[...silver, ...community].map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} size="sm" />
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-12 rounded-card bg-navy p-8 text-center">
          <p className="font-accent text-2xl italic text-white/80 mb-2">
            "Together we achieve more"
          </p>
          <h3 className="font-display text-xl font-semibold text-white mb-4">
            Become a RANA Sponsor
          </h3>
          <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
            Partner with us to reach the vibrant Rajasthani community across North America.
            Multiple tiers available to fit every budget.
          </p>
          <Link
            href="/contact?subject=sponsorship"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Inquire About Sponsorship
          </Link>
        </div>
      </div>
    </section>
  );
}

function SponsorCard({
  sponsor,
  size,
}: {
  sponsor: (typeof MOCK_SPONSORS)[0];
  size: "lg" | "md" | "sm";
}) {
  const sizeClasses = {
    lg: "w-56 p-5",
    md: "w-44 p-4",
    sm: "w-36 p-3",
  };

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center text-center rounded-card bg-background border border-border hover:shadow-card-hover hover:border-accent/30 transition-all duration-200 ${sizeClasses[size]}`}
    >
      {/* Logo placeholder */}
      <div
        className={`mb-3 flex items-center justify-center rounded-md bg-surface font-display font-bold text-accent ${
          size === "lg" ? "h-14 w-28 text-xl" : size === "md" ? "h-10 w-20 text-base" : "h-8 w-16 text-sm"
        }`}
      >
        {sponsor.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
      </div>
      <p
        className={`font-semibold text-foreground leading-tight group-hover:text-accent transition-colors ${
          size === "lg" ? "text-sm" : "text-xs"
        }`}
      >
        {sponsor.name}
      </p>
      {sponsor.tagline && size === "lg" && (
        <p className="text-[11px] text-muted mt-1 leading-tight">{sponsor.tagline}</p>
      )}
      <span
        className={`mt-2 text-[10px] font-semibold uppercase tracking-wide ${
          sponsor.tier === "platinum"
            ? "text-slate-500"
            : sponsor.tier === "gold"
            ? "text-accent"
            : "text-muted-light"
        }`}
      >
        {TIER_LABELS[sponsor.tier]}
      </span>
    </a>
  );
}
