"use client";

import Link from "next/link";
import { useState } from "react";
import { X, Tent } from "lucide-react";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-navy text-white py-2 px-4 relative z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 text-sm">
        <Tent size={14} className="text-accent shrink-0" />
        <p className="text-center text-white/80">
          <span className="font-semibold text-white">RANA Yosemite Camping Summit 2026</span>
          {" — "}
          Sept 11–13 · Housekeeping Camp, Yosemite NP{" "}
          <Link href="/events/yosemite-2026/register" className="underline text-accent hover:text-accent-hover font-semibold">
            Join the waitlist →
          </Link>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="ml-auto shrink-0 text-white/40 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
