import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SignOutButton } from "@/components/members/SignOutButton";
import { Bell, CalendarDays, Receipt, Settings } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notifications — RANA Member Portal",
};

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "event",
    title: "RANA Holi Hungama 2026 — Early bird closes soon",
    body: "Early bird pricing ends March 1. Register now and save $15 per ticket.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "membership",
    title: "Membership renewal reminder",
    body: "Your annual membership renews on June 1. No action needed — auto-renew is on.",
    time: "3 days ago",
    read: false,
  },
  {
    id: "3",
    type: "event",
    title: "Thank you for attending RANA Diwali 2024!",
    body: "We hope you had a wonderful evening. Photos from the event are now available in the gallery.",
    time: "Nov 12, 2024",
    read: true,
  },
  {
    id: "4",
    type: "receipt",
    title: "Receipt: RANA Diwali 2024 — Gold Table",
    body: "Your payment of $150.00 was received. A receipt has been saved to your purchase history.",
    time: "Nov 1, 2024",
    read: true,
  },
  {
    id: "5",
    type: "event",
    title: "Spring Cultural Festival 2025 — Save the date",
    body: "Join us on March 22, 2025 at Millennium Park for our Spring Cultural Festival. Free for all RANA members.",
    time: "Oct 5, 2024",
    read: true,
  },
];

const TYPE_ICON: Record<string, string> = {
  event: "🎉",
  membership: "🛡️",
  receipt: "🧾",
};

const NAV_TABS = [
  { label: "Dashboard", href: "/members", icon: CalendarDays },
  { label: "Purchases", href: "/members#purchases", icon: Receipt },
  { label: "Notifications", href: "/members/notifications", icon: Bell, active: true },
  { label: "Settings", href: "/members/settings", icon: Settings },
];

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/members/login");

  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Header bar */}
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
                {label === "Notifications" && unread > 0 && (
                  <span className="ml-0.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold text-white leading-none">
                    {unread}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <SectionLabel className="mb-1">NOTIFICATIONS</SectionLabel>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Your Inbox {unread > 0 && <span className="text-accent">({unread} new)</span>}
            </h2>
          </div>
          {unread > 0 && (
            <button className="text-xs font-semibold text-accent hover:text-accent-hover transition-colors">
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`rounded-card border p-4 transition-colors ${
                n.read
                  ? "border-border bg-background"
                  : "border-accent/20 bg-accent/5"
              }`}
            >
              <div className="flex gap-3">
                <span className="text-xl mt-0.5 shrink-0">{TYPE_ICON[n.type] ?? "📣"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${n.read ? "text-foreground" : "text-foreground"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-accent mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1 leading-relaxed">{n.body}</p>
                  <p className="text-[10px] text-muted/60 mt-2">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
