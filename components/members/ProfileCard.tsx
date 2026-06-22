import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Pencil, Users } from "lucide-react";
import type { Member } from "@/lib/types";

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const letters =
    parts.length >= 2
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
  return (
    <span className="text-2xl font-display font-semibold text-white uppercase">
      {letters}
    </span>
  );
}

export function ProfileCard({ member }: { member: Member }) {
  return (
    <div className="rounded-card border border-border bg-background overflow-hidden shadow-card">
      {/* Top banner */}
      <div className="h-16 bg-navy relative">
        <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-accent/10" />
      </div>

      {/* Avatar */}
      <div className="px-5 -mt-8 mb-4 flex items-end justify-between">
        <div className="relative h-16 w-16 rounded-full border-2 border-background shadow-card overflow-hidden bg-navy flex items-center justify-center flex-shrink-0">
          {member.avatarUrl ? (
            <Image
              src={member.avatarUrl}
              alt={member.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <Initials name={member.name} />
          )}
        </div>
        <Link
          href="/members/settings"
          className="mb-1 flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          <Pencil size={11} />
          Edit profile
        </Link>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {/* Name + address */}
        <div>
          <h3 className="font-display font-semibold text-foreground text-base leading-tight">
            {member.name}
          </h3>
          {member.address && (
            <p className="flex items-center gap-1 text-xs text-muted mt-0.5">
              <MapPin size={11} className="shrink-0" />
              {member.address}
            </p>
          )}
          {member.phone && (
            <p className="flex items-center gap-1 text-xs text-muted mt-0.5">
              <Phone size={11} className="shrink-0" />
              {member.phone}
            </p>
          )}
        </div>

        {/* Bio */}
        {member.bio && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted mb-1">
              About
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Family */}
        {member.family && (
          <div className="rounded-md bg-accent/5 border border-accent/15 p-3">
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent mb-1">
              <Users size={11} />
              Family
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">{member.family}</p>
          </div>
        )}

        {/* Placeholder nudge if neither bio nor family set */}
        {!member.bio && !member.family && (
          <Link
            href="/members/settings"
            className="block text-center rounded-md border border-dashed border-border py-3 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
          >
            + Add a bio and family description
          </Link>
        )}
      </div>
    </div>
  );
}
