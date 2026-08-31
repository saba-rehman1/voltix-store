"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Package, RotateCcw } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { mockOrders } from "@/data/orders";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import type { OrderStatus } from "@/types";

const STATUS_VARIANT: Record<OrderStatus, "accent" | "success" | "danger" | "warning" | "cyan" | "neutral"> = {
  processing: "warning",
  confirmed: "cyan",
  shipped: "accent",
  "out-for-delivery": "cyan",
  delivered: "success",
  cancelled: "danger",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Processing",
  confirmed: "Confirmed",
  shipped: "Shipped",
  "out-for-delivery": "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const FILTERS: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
  useDocumentTitle("Orders", "My Account");
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(mockOrders[0]?.id ?? null);

  const orders = mockOrders.filter((o) => filter === "all" || o.status === filter);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
              filter === f.id
                ? "border-accent bg-accent/15 text-accent-light"
                : "border-border text-muted hover:text-white"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const isOpen = expanded === order.id;
          return (
            <div key={order.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : order.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                    <Package className="h-5 w-5 text-accent-light" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-white">{order.id}</p>
                    <p className="text-xs text-muted-2">Placed {formatDate(order.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={STATUS_VARIANT[order.status]}>{STATUS_LABEL[order.status]}</Badge>
                  <span className="font-mono text-sm font-semibold text-white">{formatCurrency(order.total)}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-2 transition-transform", isOpen && "rotate-180")} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-border"
                  >
                    <div className="p-5">
                      <div className="mb-5 flex flex-col divide-y divide-border">
                        {order.items.map((item) => (
                          <div key={item.productId + (item.variant ?? "")} className="flex items-center gap-3 py-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                              <SmartImage src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <Link href={`/products/${item.productId}`} className="truncate text-sm font-medium text-white hover:text-accent-light">
                                {item.name}
                              </Link>
                              <p className="text-xs text-muted-2">Qty {item.quantity}{item.variant ? ` · ${item.variant}` : ""}</p>
                            </div>
                            <span className="font-mono text-sm font-semibold text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.status !== "cancelled" && (
                        <div className="mb-5">
                          <div className="flex items-center justify-between">
                            {order.trackingSteps.map((step, i) => (
                              <div key={step.label} className="flex flex-1 flex-col items-center text-center">
                                <div className="flex w-full items-center">
                                  {i > 0 && (
                                    <div
                                      className={cn(
                                        "h-0.5 flex-1",
                                        order.trackingSteps[i - 1].done ? "bg-accent" : "bg-border"
                                      )}
                                    />
                                  )}
                                  <div
                                    className={cn(
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                                      step.done ? "border-accent bg-accent text-white" : "border-border text-muted-2"
                                    )}
                                  >
                                    {step.done && <Check className="h-3 w-3" />}
                                  </div>
                                  {i < order.trackingSteps.length - 1 && (
                                    <div
                                      className={cn(
                                        "h-0.5 flex-1",
                                        step.done ? "bg-accent" : "bg-border"
                                      )}
                                    />
                                  )}
                                </div>
                                <span className={cn("mt-2 text-[10px]", step.done ? "text-white" : "text-muted-2")}>
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                          <p className="mt-4 text-center text-xs font-medium text-accent-cyan">{order.eta}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted">
                        <span>Shipping to: {order.address}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-3.5 w-3.5" /> Return / Exchange
                          </Button>
                          <Link href={`/products`}>
                            <Button size="sm" variant="secondary">
                              Buy Again
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted">
            No orders in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
