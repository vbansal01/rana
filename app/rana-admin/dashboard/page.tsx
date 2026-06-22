"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, CalendarDays, TrendingUp, Star,
  ArrowRight, UserCheck, Clock,
} from "lucide-react";

type MemberRow = {
  id: string; name: string; email: string;
  membership_type: string; status: string;
  member_since: string; member_number: string;
  created_at?: string;
};
type EventRow = { id: string; title: string; featured?: boolean; date?: string };

function StatCard({
  label, value, sub, icon: Icon, accent = false,
}: {
  label: string; value: number | string; sub?: string;
  icon: React.ElementType; accent?: boolean;
}) {
  return (
    <div className={`rounded-card border p-5 ${accent ? "border-accent/30 bg-accent/8" : "border-border bg-background"}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${accent ? "bg-accent/15" : "bg-surface"}`}>
          <Icon size={15} className={accent ? "text-accent" : "text-muted"} />
        </div>
      </div>
      <p className={`text-3xl font-display font-semibold ${accent ? "text-accent" : "text-foreground"}`}>{value}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </div>
  );
}

const TYPE_COLOR: Record<string, string> = {
  lifetime: "bg-accent/15 text-accent border-accent/25",
  premium:  "bg-navy/10 text-navy border-navy/20",
  honorary: "bg-purple-50 text-purple-700 border-purple-200",
  regular:  "bg-surface text-muted border-border",
};
const STATUS_COLOR: Record<string, string> = {
  active:  "bg-green-50 text-green-700 border-green-200",
  expired: "bg-red-50 text-red-600 border-red-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function AdminDashboard() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [events,  setEvents]  = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/members").then((r) => r.json()),
      fetch("/api/admin/events").then((r) => r.json()),
    ]).then(([m, e]) => {
      setMembers(m as MemberRow[]);
      setEvents(e as EventRow[]);
    }).finally(() => setLoading(false));
  }, []);

  const active   = members.filter((m) => m.status === "active").length;
  const pending  = members.filter((m) => m.status === "pending").length;
  const featured = events.filter((e) => e.featured).length;

  // Most recent 5 members
  const recent = [...members]
    .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1">Admin</p>
          <h1 className="font-display text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted mt-0.5">Welcome back — here's a snapshot of RANA.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-muted">Loading…</div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              <StatCard label="Total Members" value={members.length} icon={Users} accent />
              <StatCard label="Active"  value={active}   sub="in good standing" icon={UserCheck} />
              <StatCard label="Pending" value={pending}  sub="awaiting approval" icon={Clock} />
              <StatCard label="Events"  value={events.length} sub={`${featured} featured`} icon={CalendarDays} />
            </div>

            {/* Two-column: recent members + quick actions */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Recent Members */}
              <div className="lg:col-span-2 rounded-card border border-border bg-background">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-semibold text-foreground">Recent Members</h2>
                  <Link href="/rana-admin/members" className="flex items-center gap-1 text-xs text-accent hover:underline">
                    View all <ArrowRight size={11} />
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {recent.length === 0 ? (
                    <p className="px-5 py-8 text-sm text-muted text-center">No members yet.</p>
                  ) : recent.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                      <div className="h-8 w-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                        <span className="text-xs font-display font-semibold text-white">
                          {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                        <p className="text-xs text-muted truncate">{m.email}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${TYPE_COLOR[m.membership_type] ?? TYPE_COLOR.regular}`}>
                        {m.membership_type}
                      </span>
                      <span className={`hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_COLOR[m.status] ?? ""}`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <div className="rounded-card border border-border bg-background p-5">
                  <h2 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h2>
                  <div className="space-y-2">
                    {[
                      { href: "/rana-admin/events", label: "Manage Events", icon: CalendarDays },
                      { href: "/rana-admin/members", label: "Manage Members", icon: Users },
                      { href: "/admin/events", label: "Image Manager", icon: Star },
                    ].map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm text-foreground hover:border-accent/40 hover:bg-surface transition-colors"
                      >
                        <Icon size={14} className="text-muted" />
                        {label}
                        <ArrowRight size={12} className="ml-auto text-muted" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Membership breakdown */}
                <div className="rounded-card border border-border bg-background p-5">
                  <h2 className="text-sm font-semibold text-foreground mb-4">
                    <span className="flex items-center gap-2"><TrendingUp size={14} className="text-muted" /> Membership Mix</span>
                  </h2>
                  {(["regular","premium","lifetime","honorary"] as const).map((t) => {
                    const count = members.filter((m) => m.membership_type === t).length;
                    const pct   = members.length ? Math.round((count / members.length) * 100) : 0;
                    return (
                      <div key={t} className="mb-3 last:mb-0">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="capitalize text-muted">{t}</span>
                          <span className="font-semibold text-foreground">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                          <div
                            className="h-full rounded-full bg-accent transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
