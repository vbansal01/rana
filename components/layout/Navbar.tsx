"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [memberMenuOpen, setMemberMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="https://rana.org/wp-content/uploads/2025/10/Rana_logo.jpg"
            alt="RANA — Rajasthan Alliance of North America"
            width={120}
            height={48}
            className="h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-85"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150",
                pathname === link.href
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setMemberMenuOpen(!memberMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-surface transition-colors border border-border"
              >
                <User size={15} className="text-accent" />
                <span>{session.user?.name?.split(" ")[0]}</span>
                <ChevronDown
                  size={13}
                  className={cn(
                    "text-muted transition-transform duration-200",
                    memberMenuOpen && "rotate-180"
                  )}
                />
              </button>
              {memberMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-card bg-background border border-border shadow-card-hover py-1 z-50">
                  <Link
                    href="/members"
                    onClick={() => setMemberMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-surface transition-colors"
                  >
                    Member Dashboard
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setMemberMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-surface transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/members/login"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors px-3 py-1.5"
              >
                Member Login
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors shadow-sm"
              >
                Join RANA
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-accent bg-accent/5 font-semibold"
                    : "text-foreground hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              {session ? (
                <>
                  <Link
                    href="/members"
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-surface"
                  >
                    Member Dashboard
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-surface"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/members/login"
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-surface"
                  >
                    Member Login
                  </Link>
                  <Link
                    href="/contact"
                    className="mt-2 block w-full text-center rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
                  >
                    Join RANA
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
