import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = {
  Organization: [
    { label: "About RANA", href: "/about" },
    { label: "Leadership", href: "/about#leadership" },
    { label: "History", href: "/about#history" },
    { label: "Bylaws & Governance", href: "/about#bylaws" },
  ],
  Community: [
    { label: "Events", href: "/events" },
    { label: "Photo Gallery", href: "/events#gallery" },
    { label: "News", href: "/news" },
    { label: "Newsletter", href: "/newsletter" },
  ],
  Members: [
    { label: "Member Login", href: "/members/login" },
    { label: "Join RANA", href: "/join" },
    { label: "Membership Benefits", href: "/join#benefits" },
    { label: "Sponsors", href: "/#sponsors" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {/* Top band */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Image
                  src="https://rana.org/wp-content/uploads/2025/10/Rana_logo.jpg"
                  alt="RANA — Rajasthan Alliance of North America"
                  width={140}
                  height={56}
                  className="h-14 w-auto object-contain brightness-110"
                />
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
                Preserving our rich cultural heritage while building bridges for the next generation of our community.
              </p>

              {/* Contact */}
              <div className="space-y-2 text-sm text-white/60">
                <a href="mailto:info@rana.org" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail size={14} />
                  info@rana.org
                </a>
                <a href="tel:4083597262" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone size={14} />
                  408-359-RANA (7262)
                </a>
                <p className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  1313 N Milpitas Blvd #285, Milpitas, CA 95035
                </p>
              </div>

              {/* Social */}
              <div className="flex gap-3 mt-6">
                {[
                  { Icon: Facebook, href: "https://www.facebook.com/ranabayarea", label: "Facebook" },
                  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { Icon: Twitter, href: "https://twitter.com/RANACalifornia", label: "Twitter" },
                  { Icon: Youtube, href: "https://www.youtube.com/user/RANABayArea", label: "YouTube" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors text-white/70 hover:text-white"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                  {section}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} Rajasthan Association of North America. All rights reserved.
        </p>
        <div className="flex gap-4">
          {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
