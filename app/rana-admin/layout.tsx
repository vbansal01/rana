"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CalendarDays, LogOut, Shield, ImageIcon } from "lucide-react";

const NAV = [
  { label: "Events",  href: "/rana-admin/events",  icon: CalendarDays },
  { label: "Members", href: "/rana-admin/members", icon: Users },
  { label: "Images",  href: "/admin/events",        icon: ImageIcon },
];

function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/rana-admin/login");
  }

  if (pathname === "/rana-admin/login") return null;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-56 bg-navy border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/20 border border-accent/30">
          <Shield size={14} className="text-accent" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white leading-none">RANA Admin</p>
          <p className="text-[10px] text-white/30 mt-0.5">Secure Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent/15 text-accent border border-accent/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin  = pathname === "/rana-admin/login";

  return (
    <div className="min-h-screen bg-surface">
      {!isLogin && <AdminSidebar />}
      <div className={!isLogin ? "ml-56" : ""}>{children}</div>
    </div>
  );
}
