"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:border-white/40 transition-colors"
    >
      <LogOut size={13} />
      Sign out
    </button>
  );
}
