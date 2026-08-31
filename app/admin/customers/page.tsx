"use client";

import { useMemo, useState } from "react";
import { Search, Mail } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { adminCustomers } from "@/data/admin";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function AdminCustomersPage() {
  useDocumentTitle("Customers", "Voltix Admin");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo(
    () => adminCustomers.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 sm:w-72">
        <Search className="h-4 w-4 text-muted-2" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search customers..."
          className="w-full bg-transparent text-sm text-white placeholder:text-muted-2 outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-2">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Total Spent</th>
              <th className="p-4 font-medium">Joined</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {paginated.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      <SmartImage src={c.avatar} alt={c.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-white">{c.name}</p>
                      <p className="text-[11px] text-muted-2">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs text-muted">{c.orders}</td>
                <td className="p-4 font-mono text-xs font-semibold text-white">{formatCurrency(c.totalSpent)}</td>
                <td className="p-4 text-xs text-muted-2">{formatDate(c.joined)}</td>
                <td className="p-4">
                  <Badge variant={c.status === "vip" ? "accent" : c.status === "new" ? "cyan" : "neutral"} className="capitalize">
                    {c.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <a href={`mailto:${c.email}`} className="text-muted-2 hover:text-white cursor-pointer">
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-medium cursor-pointer",
                page === i + 1 ? "bg-gradient-to-r from-accent to-accent-cyan text-white" : "border border-border text-muted hover:text-white"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
