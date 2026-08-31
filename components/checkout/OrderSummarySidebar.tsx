"use client";

import { ShieldCheck, Lock } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart";

export function OrderSummarySidebar({
  shippingOverride,
  shippingLabel,
}: {
  shippingOverride?: number;
  shippingLabel?: string;
} = {}) {
  const { cartLines, subtotal, discount, couponCode, shipping: cartShipping, tax: cartTax, total: cartTotal } = useCart();

  const shipping = shippingOverride ?? cartShipping;
  const discountedSubtotal = subtotal - discount;
  const tax = shippingOverride !== undefined ? discountedSubtotal * 0.08 : cartTax;
  const total = shippingOverride !== undefined ? discountedSubtotal + shipping + tax : cartTotal;

  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>

      <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
        {cartLines.map((line) => (
          <div key={`${line.product.id}-${line.variant ?? ""}`} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
              <SmartImage src={line.product.thumbnail} alt={line.product.name} fill sizes="48px" className="object-cover" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">{line.product.name}</p>
              {line.variant && <p className="truncate text-[11px] text-muted-2">{line.variant}</p>}
            </div>
            <span className="shrink-0 font-mono text-xs font-semibold text-white">
              {formatCurrency(line.product.price * line.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-mono text-white">{formatCurrency(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted">Discount {couponCode && `(${couponCode})`}</span>
            <span className="font-mono text-success">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-muted">Shipping{shippingLabel ? ` (${shippingLabel})` : ""}</span>
          <span className="font-mono text-white">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Tax</span>
          <span className="font-mono text-white">{formatCurrency(tax)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-semibold text-white">Total</span>
          <span className="font-mono text-xl font-bold text-white">{formatCurrency(total)}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[11px] text-muted-2">
        <div className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5 text-accent-cyan" /> 256-bit SSL encrypted checkout
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-accent-cyan" /> Buyer protection guaranteed
        </div>
      </div>
    </div>
  );
}
