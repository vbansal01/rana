import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Users, ArrowRight, Tent, Utensils, Mountain, Clock, Phone, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "RANA Yosemite Camping Summit 2026",
  description: "Sept 11–13, 2026 · Housekeeping Camp, Yosemite National Park. Three days of hiking, yoga, campfire, and community.",
};

const SCHEDULE = [
  {
    day: "Friday, Sept 11",
    items: [
      { time: "5:00 PM",  label: "Check-in at Housekeeping Camp — RANA will check in the whole group. Your name will be on your cabin." },
      { time: "7:30 PM",  label: "Light dinner" },
      { time: "8:30 PM",  label: "Welcome campfire and introductions" },
    ],
  },
  {
    day: "Saturday, Sept 12",
    items: [
      { time: "6:30 AM",  label: "Morning tea" },
      { time: "7:30 AM",  label: "Yoga & laughter therapy — bring your mat and a tarp" },
      { time: "8:30 AM",  label: "Breakfast" },
      { time: "9:30 AM",  label: "Hiking — Vernal Falls, Lower Yosemite Falls, or Valley to Glacier Point (go early, back by lunch)" },
      { time: "1:00 PM",  label: "Lunch" },
      { time: "4:00 PM",  label: "Sitolia, tug-of-war, and kho-kho on the sandy beach. Kids and adults can also cool off in the river." },
      { time: "5:00 PM",  label: "Evening nashta & kids' art activities" },
      { time: "5:30 PM",  label: "New member introductions" },
      { time: "6:00 PM",  label: "Devotional time" },
      { time: "6:30 PM",  label: "Trivia games" },
      { time: "7:30 PM",  label: "Buffet dinner" },
      { time: "8:00 PM",  label: "Talent evening — Bollywood dancing, singing, jokes, campfire games" },
    ],
  },
  {
    day: "Sunday, Sept 13",
    items: [
      { time: "6:30 AM",  label: "Morning tea" },
      { time: "7:30 AM",  label: "Yoga & laughter therapy" },
      { time: "8:30 AM",  label: "Breakfast, hiking, biking, horseback riding (not RANA-organized)" },
      { time: "9:30 AM",  label: "Brunch" },
      { time: "11:00 AM", label: "Check-out. Pack up and keep bags in your car by 11 AM — you can keep exploring the park afterward." },
    ],
  },
];

const HIKES = [
  {
    level: "Easy",
    label: "Lower Yosemite Falls",
    distance: "1.2 mi",
    href: "https://www.alltrails.com/trail/us/california/lower-yosemite-falls-trail",
  },
  {
    level: "Moderate · Most Popular",
    label: "Vernal Falls (Mist Trail)",
    distance: "1.8 mi or 3.1 mi",
    href: "https://www.alltrails.com/trail/us/california/vernal-falls",
    note: "We typically hike here along the John Muir Trail",
  },
  {
    level: "Difficult",
    label: "Valley to Glacier Point",
    distance: "10 mi — start by 8 AM",
    href: "https://www.alltrails.com/trail/us/california/four-mile-trail",
  },
];

const BRING = [
  "Foldable chairs, yoga mat, yoga clothes, and a tarp for campfire seating",
  "Jacket and blanket — nights get cold",
  "Flashlight or LED headlamp and extra batteries",
  "Sunblock and bug spray",
  "Your own reusable cups, plates, and spoons — no disposables will be provided",
  "Drinking water or a refillable bottle (tap water is available)",
  "Bedsheets, blankets, and pillows (or rent bed packs on-site — see logistics below)",
];

const RULES = [
  "Do not litter. Help keep Yosemite Valley beautiful — leave no trace.",
  "Do not store food in your car or outside. Avoid attracting bears and ranger visits.",
  "Don't touch any animals, birds, or rodents — live or dead.",
  "Quiet hours are 10 PM to 7 AM. Please respect fellow campers.",
  "All timings are tentative and may shift. Respect the schedule to make the most of the trip.",
  "Volunteering for tasks is appreciated — it's camping, and it's more fun when everyone pitches in.",
];

export default function YosemiteEventPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1600&q=80"
          alt="Yosemite Valley with Half Dome"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-4xl px-6 pb-10 w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">RANA 2026</p>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-white leading-tight mb-4">
              Yosemite Camping Summit
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-accent" /> Sept 11–13, 2026</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> Housekeeping Camp, Yosemite NP</span>
              <span className="flex items-center gap-1.5"><Users size={14} className="text-accent" /> RANA Family Event</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">

       
	   {/* Sold-out notice
        <div className="flex items-start gap-3 rounded-md border border-accent/30 bg-accent/5 px-4 py-3 mb-10">
          <AlertCircle size={15} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">This event is completely sold out.</span>{" "}
            Join the waitlist and the WhatsApp group to stay in the loop for future openings.
          </p>
        </div>
		 */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Intro */}
            <div>
              <p className="font-display text-lg italic text-muted mb-4">Khamma Ghani!!</p>
              <p className="text-foreground leading-relaxed mb-3">
                Thank you for your overwhelming response to the RANA Yosemite Camping Summit.
                Three days of hiking, yoga, campfire evenings, Rajasthani food, and the kind of
                community bonds that only form under the stars.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                We stay at Housekeeping Camp — a short walk from the Merced River, the John Muir
                trailhead, and some of the most spectacular views on earth.
              </p>
            </div>

            {/* Check-in & Logistics */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Tent size={16} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">Check-in & Logistics</h2>
              </div>
              <div className="space-y-3 text-sm text-foreground">
                <p>Check-in starts at <strong>5 PM on Friday, Sept 11</strong>. RANA will check in the entire group — your names will be listed on your cabin. The first families usually head out around 3 PM after school pickup and arrive around 5 PM. Please plan to check in <strong>before 7:30 PM</strong>; if you're running late, message one of us on WhatsApp.</p>
                <p><strong>Bedding:</strong> Bring your own sheets, blankets, and pillows, or rent bed packs at Housekeeping Camp when you arrive. Double bed pack (2 blankets, 2 sheets, 2 pillows): <strong>$15/night</strong>. Single bed pack: <strong>$9/night</strong>.</p>
                <p><strong>Parking:</strong> Each cabin comes with a 1-car parking permit right by the cabin. If you're sharing a cabin without carpooling, the second car parks in the main lot — it's not far, just not right next to you.</p>
                <p className="text-muted">Phones may have spotty reception inside the park. WhatsApp works better than calls when you have signal.</p>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">Schedule</h2>
              </div>
              <p className="text-xs text-muted mb-5">All timings are tentative — things shift when you&apos;re camping. Respect the schedule and you&apos;ll get the most out of it.</p>
              <div className="space-y-6">
                {SCHEDULE.map((day) => (
                  <div key={day.day}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-3">{day.day}</p>
                    <div className="border-l-2 border-border pl-4 space-y-2.5">
                      {day.items.map((item) => (
                        <div key={item.time} className="flex gap-4">
                          <span className="text-xs font-mono text-muted w-16 shrink-0 pt-0.5">{item.time}</span>
                          <span className="text-sm text-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hikes */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Mountain size={16} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">Hiking Options</h2>
              </div>
              <p className="text-xs text-muted mb-4">Go early — aim to be back by lunch. We typically hike to Vernal Falls along the John Muir Trail.</p>
              <div className="space-y-3">
                {HIKES.map((h) => (
                  <a
                    key={h.label}
                    href={h.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between rounded-md border border-border px-4 py-3 hover:border-accent/40 hover:bg-surface transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{h.label}</p>
                      <p className="text-xs text-muted mt-0.5">{h.distance}</p>
                      {h.note && <p className="text-xs text-muted/70 mt-0.5 italic">{h.note}</p>}
                    </div>
                    <span className="text-xs text-muted shrink-0 ml-4 pt-0.5">{h.level}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* What to bring */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Tent size={16} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">What to Bring</h2>
              </div>
              <ul className="space-y-2">
                {BRING.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="text-accent mt-1 shrink-0">–</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Food */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Utensils size={16} className="text-accent" />
                <h2 className="font-display text-xl font-semibold text-foreground">Food & Water</h2>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-2">
                All meals are included and served RANA-style — wholesome, Rajasthani, and made with love.
                No disposables provided; bring your own reusable cups, plates, and spoons.
                Bring drinking water or a refillable bottle (tap water is available at camp).
              </p>
              <p className="text-sm text-muted">
                Please help keep Yosemite Valley beautiful — don&apos;t leave any plastic or trace behind.{" "}
                <a href="https://sites.google.com/rana.org/2026yosemitecamping-food-menu/home" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">View the food menu →</a>
              </p>
            </div>

            {/* Ground rules */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">A Few Ground Rules</h2>
              <ul className="space-y-2">
                {RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="text-accent mt-1 shrink-0">–</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* CTA card */}
            <div className="rounded-card border border-accent/25 bg-accent/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-1">Sept 11–13, 2026</p>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">Yosemite Camping Summit</h3>
              <p className="text-xs text-muted mb-5">Housekeeping Camp · Yosemite National Park, CA</p>
              <Link
                href="/events/yosemite-2026/register"
                className="flex items-center justify-center gap-2 w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
              >
                Join the Waitlist <ArrowRight size={14} />
              </Link>
              <a
                href="https://chat.whatsapp.com/FGaqCKMjpZ240w8lEWDl2M"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-surface transition-colors mt-2"
              >
                Join WhatsApp Group
              </a>
            </div>

            {/* Location with map */}
            <div className="rounded-card border border-border bg-background overflow-hidden">
              <div className="relative w-full h-48">
                <iframe
                  src="https://maps.google.com/maps?q=37.741518,-119.579662&output=embed&z=16"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Housekeeping Camp, Yosemite"
                  className="absolute inset-0"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-2">Location</p>
                <p className="text-sm font-semibold text-foreground">Housekeeping Camp</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">9005 Southside Drive<br />Yosemite National Park, CA 95389</p>
                <a
                  href="https://maps.app.goo.gl/PtvZYd5inbRByfxF6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline mt-2 block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Contacts */}
            <div className="rounded-card border border-border bg-background p-5">
              <div className="flex items-center gap-2 mb-3">
                <Phone size={13} className="text-muted" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">RANA Contacts</p>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { name: "Ripudaman (RD) Singh", phone: "(408) 431-9460" },
                  { name: "Prakash Sharma",        phone: "(817) 564-6759" },
                  { name: "Naresh Bansal",         phone: "(408) 504-3582" },
                ].map((c) => (
                  <div key={c.name}>
                    <p className="font-medium text-foreground">{c.name}</p>
                    <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`} className="text-xs text-muted hover:text-accent">{c.phone}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Camp & Ranger numbers */}
            <div className="rounded-card border border-border bg-background p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted mb-3">Camp & Park Numbers</p>
              <div className="space-y-2 text-xs text-muted">
                <div>
                  <p className="text-foreground font-medium">Housekeeping Camp</p>
                  <a href="tel:2093728338" className="hover:text-accent">(209) 372-8338</a>
                </div>
                <div>
                  <p className="text-foreground font-medium">Rangers — Public Info</p>
                  <p>(209) 372-0200, then dial 3 → 5</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Ranger Stations</p>
                  <p>(209) 372-0740 · (209) 372-0298</p>
                </div>
              </div>
            </div>

            {/* Park entry */}
            <div className="rounded-card border border-border bg-surface p-4">
              <p className="text-xs font-semibold text-foreground mb-1">Park Entry</p>
              <p className="text-xs text-muted leading-relaxed">No reservation permit needed during event dates. Bring a National Parks Pass or purchase at the gate.</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
