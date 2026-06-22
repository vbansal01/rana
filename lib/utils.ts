import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getMembershipBadgeColor(type: string): string {
  const map: Record<string, string> = {
    lifetime: "bg-accent/20 text-accent-hover border border-accent/30",
    honorary: "bg-navy/10 text-navy border border-navy/20",
    premium: "bg-amber-50 text-amber-800 border border-amber-200",
    regular: "bg-surface text-muted border border-border",
  };
  return map[type] ?? map.regular;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    expired: "text-red-700 bg-red-50 border border-red-200",
    pending: "text-amber-700 bg-amber-50 border border-amber-200",
    completed: "text-emerald-700 bg-emerald-50 border border-emerald-200",
    refunded: "text-blue-700 bg-blue-50 border border-blue-200",
  };
  return map[status] ?? "text-muted bg-surface border border-border";
}
