"use client";

import { useEffect, useState } from "react";
import { Search, Users, Shield, Phone, MapPin, Hash, Calendar } from "lucide-react";

type MemberRow = {
  id: string;
  name: string;
  email: string;
  membership_type: "regular" | "premium" | "lifetime" | "honorary";
  member_since: string;
  member_number: string;
  status: "active" | "expired" | "pending";
  phone?: string;
  address?: string;
  created_at?: string;
};

const TYPE_COLOR: Record<string, string> = {
  lifetime:  "bg-accent/15 text-accent border-accent/25",
  premium:   "bg-navy/10 text-navy border-navy/20",
  honorary:  "bg-purple-50 text-purple-700 border-purple-200",
  regular:   "bg-surface text-muted border-border",
};
const STATUS_COLOR: Record<string, string> = {
  active:  "bg-green-50 text-green-700 border-green-200",
  expired: "bg-red-50 text-red-600 border-red-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function Badge({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${colorClass}`}>
      {label}
    </span>
  );
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "expired" | "pending">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/members")
      .then((r) => r.json())
      .then((data) => setMembers(data as MemberRow[]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.member_number?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: members.length,
    active: members.filter((m) => m.status === "active").length,
    expired: members.filter((m) => m.status === "expired").length,
    pending: members.filter((m) => m.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-8">

        {/* - Header - */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1">Admin</p>
          <h1 className="font-display text-2xl font-semibold text-foreground">Members</h1>
          <p className="text-sm text-muted mt-0.5">{members.length} registered members</p>
        </div>

        {/* - Stats row - */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(["all", "active", "expired", "pending"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-card border p-4 text-left transition-colors ${
                filter === key
                  ? "border-accent bg-accent/8"
                  : "border-border bg-background hover:border-accent/40"
              }`}
            >
              <p className={`text-2xl font-display font-semibold ${filter === key ? "text-accent" : "text-foreground"}`}>
                {counts[key]}
              </p>
              <p className="text-xs text-muted capitalize mt-0.5">{key === "all" ? "Total" : key}</p>
            </button>
          ))}
        </div>

        {/* - Search - */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search by name, email, or member number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-background pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        {/* - Members list - */}
        {loading ? (
          <div className="py-20 text-center text-sm text-muted">Loading members…</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted">
            {search ? `No members match "${search}"` : "No members found."}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="rounded-card border border-border bg-background overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface transition-colors"
                >
                  {/* Avatar initials */}
                  <div className="h-10 w-10 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-sm font-display font-semibold text-white">
                      {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                    </span>
                  </div>

                  {/* Name + email */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{m.name}</p>
                    <p className="text-xs text-muted truncate">{m.email}</p>
                  </div>

                  {/* Badges */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <Badge label={m.membership_type} colorClass={TYPE_COLOR[m.membership_type] ?? TYPE_COLOR.regular} />
                    <Badge label={m.status} colorClass={STATUS_COLOR[m.status] ?? ""} />
                  </div>

                  {/* Member number */}
                  <p className="hidden md:block text-[11px] font-mono text-muted shrink-0">{m.member_number}</p>
                </button>

                {/* Expanded details */}
                {expanded === m.id && (
                  <div className="border-t border-border bg-surface px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                        <Hash size={10} /> Member No.
                      </p>
                      <p className="text-sm font-mono text-foreground">{m.member_number}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                        <Calendar size={10} /> Member Since
                      </p>
                      <p className="text-sm text-foreground">{m.member_since}</p>
                    </div>
                    <div>
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                        <Shield size={10} /> Type
                      </p>
                      <Badge label={m.membership_type} colorClass={TYPE_COLOR[m.membership_type] ?? TYPE_COLOR.regular} />
                    </div>
                    {m.phone && (
                      <div>
                        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                          <Phone size={10} /> Phone
                        </p>
                        <p className="text-sm text-foreground">{m.phone}</p>
                      </div>
                    )}
                    {m.address && (
                      <div>
                        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                          <MapPin size={10} /> Location
                        </p>
                        <p className="text-sm text-foreground">{m.address}</p>
                      </div>
                    )}
                    <div>
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted mb-1">
                        <Users size={10} /> Status
                      </p>
                      <Badge label={m.status} colorClass={STATUS_COLOR[m.status] ?? ""} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
