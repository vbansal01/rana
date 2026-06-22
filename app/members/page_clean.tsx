import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { MembershipCard } from "@/components/members/MembershipCard";
import { PurchaseHistory } from "@/components/members/PurchaseHistory";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CalendarDays, Receipt, Bell, Settings } from "lucide-react";
import Link from "next/link";
import type { Member } from "@/lib/types";
import { SignOutButton } from "@/components/members/SignOutButton";

export const metadata: Metadata = {
  title: "Member Dashboard",
  description: "Your RANA membership portal — purchases, events, and profile.",
};

// In production, fetch real data from Supabase using the session user id
async function getMemberData(userId: string): Promise<Member> {
  return {
    id: userId,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    membershipType: "premium",
    memberSince: "2021-03-15",
    memberNumber: "RANA-2021-00842",
    status: "active",
    phone: "+1 (312) 555-0197",
    address: "Chicago, IL",
  };
}

export default async function MembersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/members/login");

  const member = await getMemberData((session.user as any).id ?? "demo");

  const NAV_TABS = [
    { label: "Dashboard", href: "/members", icon: CalendarDays, active: true },
    { label: "Purchases", href: "/members#purchases", icon: Receipt },
    { label: "Notifications", href: "/members/notifications", icon: Bell },
    { label: "Settings", href: "/members/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Page header */}
      <div className="bg-navy border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel className="text-accent mb-1">MEMBER PORTAL</SectionLabel>
              <h1 className="font-display text-2xl font-semibold text-white">
                Welcome back, {session.user.name?.split(" ")[0]}
              </h1>
            </div>
            <SignOutButton />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-5 -mb-px">
            {NAV_TABS.map(({ label, href, icon: Icon, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${
                  active
                    ? "border-accent text-white"
                    : "border-transparent text-white/50 hover:text-white/80"
                }`}
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: membership card + quick info */}
          <div className="lg:col-span-1 space-y-5">
            <MembershipCard member={member} />

            {/* Quick actions */}
            <div className="rounded-card border border-border bg-background p-5">
              <h3 className="font-display font-semibold text-foreground text-sm mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Register for an event", href: "/events", icon: CalendarDays },
                  { label: "View all purchases", href: "#purchases", icon: Receipt },
                  { label: "Update profile", href: "/members/settings", icon: Settings },
                ].map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-surface transition-colors group"
                  >
                    <Icon size={14} className="text-accent shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Membership renewal notice */}
            {member.status === "active" && (
              <div className="rounded-card border border-accent/20 bg-accent/5 p-4">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                  Membership Active
                </p>
                <p className="text-xs text-muted leading-relaxed">
                  Your {member.membershipType} membership is in good standing. Thank you
                  for being part of RANA.
                </p>
              </div>
            )}
          </div>

          {/* Right: purchase history */}
          <div id="purchases" className="lg:col-span-2">
            <div className="rounded-card border border-border bg-background p-6">
              <div className="mb-6">
                <SectionLabel className="mb-1">PURCHASE HISTORY</SectionLabel>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Your Transactions
                </h2>
              </div>
              <PurchaseHistory />
            </div>

            {/* Upcoming events teaser */}
            <div className="mt-5 rounded-card border border-border bg-background p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <SectionLabel className="mb-1">UPCOMING FOR MEMBERS</SectionLabel>
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    Don&apos;t miss out
                  </h3>
                </div>
                <Link
                  href="/events"
                  className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  All events →
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { title: "Annual Gala 2026", date: "Apr 15, 2026", location: "Chicago Marriott", price: "$100/ticket" },
                  { title: "Spring Cultural Festival", date: "Mar 22, 2026", location: "Millennium Park", price: "Free for members" },
                ].map((event) => (
                  <div
                    key={event.title}
                    className="flex items-center justify-between gap-4 rounded-md border border-border p-3 hover:bg-surface transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{event.title}</p>
                      <p className="text-xs text-muted">{event.date} · {event.location}</p>
                    </div>
                    <span className="text-xs font-semibold text-accent shrink-0">{event.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
