"use client";

import { useState } from "react";
import { formatDate, formatCurrency, getStatusColor, cn } from "@/lib/utils";
import { Receipt, Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { Purchase } from "@/lib/types";

const MOCK_PURCHASES: Purchase[] = [
  {
    id: "p1",
    memberId: "m1",
    description: "Annual Membership Renewal 2026",
    amount: 75,
    date: "2026-01-15",
    category: "Membership",
    status: "completed",
  },
  {
    id: "p2",
    memberId: "m1",
    description: "Annual Gala 2026 — 2 tickets",
    amount: 200,
    date: "2026-03-10",
    category: "Event Ticket",
    status: "completed",
  },
  {
    id: "p3",
    memberId: "m1",
    description: "Leadership Summit Registration",
    amount: 50,
    date: "2026-01-28",
    category: "Event Ticket",
    status: "completed",
  },
  {
    id: "p4",
    memberId: "m1",
    description: "Annual Membership 2025",
    amount: 75,
    date: "2025-01-12",
    category: "Membership",
    status: "completed",
  },
  {
    id: "p5",
    memberId: "m1",
    description: "Diwali Celebration 2025 — Family Pack",
    amount: 120,
    date: "2025-10-20",
    category: "Event Ticket",
    status: "completed",
  },
  {
    id: "p6",
    memberId: "m1",
    description: "RANA Merchandise — T-shirt (L)",
    amount: 28,
    date: "2025-04-18",
    category: "Merchandise",
    status: "completed",
  },
];

export function PurchaseHistory() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = MOCK_PURCHASES.filter(
    (p) =>
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) =>
    sortAsc
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const total = filtered.reduce(
    (sum, p) => (p.status === "completed" ? sum + p.amount : sum),
    0
  );

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light" />
          <input
            type="search"
            placeholder="Search purchases…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-accent w-full sm:w-64"
          />
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <p className="text-xs text-muted">
            Total paid:{" "}
            <span className="font-semibold text-foreground">{formatCurrency(total)}</span>
          </p>
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors"
          >
            Date {sortAsc ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                  Description
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden md:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted text-sm">
                    No purchases found.
                  </td>
                </tr>
              ) : (
                filtered.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="bg-background hover:bg-surface/60 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10">
                          <Receipt size={12} className="text-accent" />
                        </div>
                        <span className="text-foreground font-medium text-sm leading-snug">
                          {purchase.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="rounded-full bg-surface border border-border px-2.5 py-0.5 text-xs text-muted">
                        {purchase.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-xs text-muted">
                      {formatDate(purchase.date)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">
                      {formatCurrency(purchase.amount)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                          getStatusColor(purchase.status)
                        )}
                      >
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
