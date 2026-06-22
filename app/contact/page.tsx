import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with RANA — for membership, events, sponsorship, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-12 mb-14">
          <SectionLabel className="mb-3">GET IN TOUCH</SectionLabel>
          <h1 className="font-display text-display-lg font-semibold text-foreground mb-3">
            Contact RANA
          </h1>
          <p className="text-muted max-w-md mx-auto text-sm">
            Questions about membership, events, or sponsorship? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "info@rana.org", href: "mailto:info@rana.org" },
              { icon: Phone, label: "Phone", value: "(312) 555-0100", href: "tel:+13125550100" },
              { icon: MapPin, label: "Region", value: "Chicago Metropolitan Area, IL" },
              { icon: Clock, label: "Response time", value: "Within 2 business days" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-foreground font-medium hover:text-accent transition-colors">{value}</a>
                  ) : (
                    <p className="text-foreground font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3 rounded-card border border-border bg-background p-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">Send a message</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">First name</label>
                  <input type="text" className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent" placeholder="Rahul" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">Last name</label>
                  <input type="text" className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent" placeholder="Sharma" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">Email</label>
                <input type="email" className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">Subject</label>
                <select className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent bg-background">
                  <option value="">Select a topic</option>
                  <option value="membership">Membership inquiry</option>
                  <option value="events">Events</option>
                  <option value="sponsorship">Sponsorship</option>
                  <option value="general">General question</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-foreground mb-1.5">Message</label>
                <textarea rows={5} className="w-full rounded-md border border-border px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent resize-none" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="w-full rounded-md bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
