"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight, Truck, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

interface OrderData {
  id: string;
  date: string;
  items: { productId: string; name: string; image: string; price: number; quantity: number; variant?: string }[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  shipping: number;
  tax: number;
  total: number;
  deliveryLabel: string;
  deliveryEta: string;
  paymentLabel?: string;
  address: string;
}

export default function CheckoutSuccessPage() {
  useDocumentTitle("Order Confirmed");
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("voltix-last-order");
      if (raw) {
        setOrder(JSON.parse(raw));
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-semibold text-white">No recent order found</p>
        <p className="mt-2 text-sm text-muted">Place an order to see your confirmation here.</p>
        <Link href="/products" className="mt-5">
          <Button>Start Shopping</Button>
        </Link>
      </Container>
    );
  }

  if (!order) return null;

  const eta = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <Container className="flex flex-col items-center py-14 md:py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="relative flex h-24 w-24 items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-success/30"
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success to-emerald-400 shadow-[0_0_50px_-8px_rgba(34,197,94,0.6)]">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          >
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Order Confirmed!</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          Thank you for shopping with Voltix Store. A confirmation email is on its way to you.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 w-full max-w-2xl"
      >
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-2">Order Number</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="font-mono text-lg font-bold text-white">{order.id}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(order.id);
                  toast.success("Order number copied");
                }}
                className="text-muted-2 hover:text-white cursor-pointer"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs uppercase tracking-wide text-muted-2">Estimated Delivery</p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-success sm:justify-end">
              <Truck className="h-4 w-4" /> {eta}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Package className="h-4 w-4 text-accent-light" />
            <p className="text-sm font-semibold text-white">
              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {order.items.map((item) => (
              <div key={`${item.productId}-${item.variant ?? ""}`} className="flex items-center gap-3 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                  <SmartImage src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-muted-2">Qty {item.quantity}{item.variant ? ` · ${item.variant}` : ""}</p>
                </div>
                <span className="shrink-0 font-mono text-sm font-semibold text-white">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-mono">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span className="font-mono">-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted">
              <span>Shipping ({order.deliveryLabel})</span>
              <span className="font-mono">{formatCurrency(order.shipping)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Tax</span>
              <span className="font-mono">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-white">
              <span>Total Paid</span>
              <span className="font-mono">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Shipping To</p>
            <p className="mt-1.5 text-sm text-white">{order.address}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">Payment Method</p>
            <p className="mt-1.5 text-sm text-white">{order.paymentLabel ?? "—"}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="flex-1">
            <Button variant="secondary" fullWidth className="justify-center">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/dashboard/orders" className="flex-1">
            <Button fullWidth className="justify-center">
              Track Order <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </Container>
  );
}
