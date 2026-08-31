"use client";

import { useMemo, useState } from "react";
import { Search, Download, Eye } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { adminOrders, type AdminOrder } from "@/data/admin";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const STATUS_VARIANT: Record<AdminOrder["status"], "accent" | "success" | "danger" | "warning" | "cyan"> = {
  processing: "warning",
  confirmed: "cyan",
  shipped: "accent",
  delivered: "success",
  cancelled: "danger",
};

const STATUSES: (AdminOrder["status"] | "all")[] = ["all", "processing", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  useDocumentTitle("Orders", "Voltix Admin");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminOrder["status"] | "all">("all");
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    return adminOrders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (query && !`${o.id} ${o.customer} ${o.email}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 sm:w-72">
          <Search className="h-4 w-4 text-muted-2" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search orders, customers..."
            className="w-full bg-transparent text-sm text-white placeholder:text-muted-2 outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors cursor-pointer",
                  status === s ? "border-accent bg-accent/15 text-accent-light" : "border-border text-muted hover:text-white"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-white hover:border-accent/40 cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-2">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Payment</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 text-right font-medium">Total</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {paginated.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="p-4 font-mono text-xs text-white">{o.id}</td>
                <td className="p-4">
                  <p className="text-xs font-medium text-white">{o.customer}</p>
                  <p className="text-[11px] text-muted-2">{o.email}</p>
                </td>
                <td className="p-4 text-xs text-muted">{formatDate(o.date)}</td>
                <td className="p-4 text-xs text-muted">{o.items}</td>
                <td className="p-4">
                  <span className={cn(
                    "text-xs font-medium",
                    o.payment === "Paid" ? "text-success" : o.payment === "Pending" ? "text-warning" : "text-danger"
                  )}>
                    {o.payment}
                  </span>
                </td>
                <td className="p-4">
                  <Badge variant={STATUS_VARIANT[o.status]} className="capitalize">{o.status}</Badge>
                </td>
                <td className="p-4 text-right font-mono text-xs font-semibold text-white">
                  {formatCurrency(o.total)}
                </td>
                <td className="p-4">
                  <button onClick={() => setSelected(o)} className="text-muted-2 hover:text-white cursor-pointer">
                    <Eye className="h-4 w-4" />
                  </button>
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

      <Modal open={!!selected} onClose={() => setSelected(null)} widthClass="max-w-md">
        {selected && (
          <div className="p-6">
            <h2 className="font-display text-lg font-semibold text-white">Order {selected.id}</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Row label="Customer" value={selected.customer} />
              <Row label="Email" value={selected.email} />
              <Row label="Date" value={formatDate(selected.date)} />
              <Row label="Items" value={String(selected.items)} />
              <Row label="Payment" value={selected.payment} />
              <Row label="Status" value={<Badge variant={STATUS_VARIANT[selected.status]} className="capitalize">{selected.status}</Badge>} />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold text-white">Total</span>
                <span className="font-mono text-lg font-bold text-white">{formatCurrency(selected.total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
