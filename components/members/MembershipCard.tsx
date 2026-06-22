import { formatDate, getMembershipBadgeColor, getStatusColor } from "@/lib/utils";
import { Shield, Calendar, Hash, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Member } from "@/lib/types";

export function MembershipCard({ member }: { member: Member }) {
  return (
    <div className="relative overflow-hidden rounded-card bg-navy p-6 text-white shadow-card">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-1">
            RANA Membership Card
          </p>
          <h2 className="font-display text-xl font-semibold text-white leading-tight">
            {member.name}
          </h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 border border-accent/30">
          <Shield size={18} className="text-accent" />
        </div>
      </div>

      {/* Details grid */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-[10px] font-semibold tracking-wide uppercase text-white/40 mb-1">
            Member Since
          </p>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-accent" />
            <p className="text-sm font-medium text-white">{formatDate(member.memberSince)}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide uppercase text-white/40 mb-1">
            Member No.
          </p>
          <div className="flex items-center gap-1.5">
            <Hash size={12} className="text-accent" />
            <p className="text-sm font-medium text-white font-mono">{member.memberNumber}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide uppercase text-white/40 mb-1">
            Email
          </p>
          <p className="text-sm text-white/80 truncate">{member.email}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-wide uppercase text-white/40 mb-1">
            Phone
          </p>
          <p className="text-sm text-white/80">{member.phone ?? "—"}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="relative flex items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold capitalize",
            getMembershipBadgeColor(member.membershipType)
          )}
        >
          {member.membershipType} Member
        </span>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold capitalize",
            getStatusColor(member.status)
          )}
        >
          {member.status}
        </span>
      </div>

      {/* Card number strip */}
      <div className="relative mt-5 pt-4 border-t border-white/10">
        <p className="font-mono text-[11px] text-white/25 tracking-[0.3em]">
          RANA •••• •••• {member.memberNumber.slice(-4)}
        </p>
      </div>
    </div>
  );
}
