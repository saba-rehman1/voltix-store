"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { useCart } from "@/lib/cart";
import { CartLineItem } from "./CartLineItem";
import { formatCurrency, cn } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
  const {
    cartLines,
    itemCount,
    subtotal,
    shipping,
    amountToFreeShipping,
    freeShippingThreshold,
    updateQuantity,
    removeItem,
    saveForLater,
  } = useCart();

  const progressPct = Math.min(100, ((freeShippingThreshold - amountToFreeShipping) / freeShippingThreshold) * 100);

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={`Your Cart ${itemCount > 0 ? `(${itemCount})` : ""}`}
    >
      {cartLines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            <ShoppingBag className="h-7 w-7 text-muted-2" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Your cart is empty</p>
            <p className="mt-1 text-xs text-muted">Add products you love and they'll show up here.</p>
          </div>
          <Button onClick={() => setCartOpen(false)} variant="primary" size="sm">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {shipping > 0 ? (
            <div className="border-b border-border px-5 py-3.5 sm:px-6">
              <p className="text-xs text-muted">
                Add <span className="font-semibold text-accent-cyan">{formatCurrency(amountToFreeShipping)}</span> more for free shipping
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progressPct}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-b border-border bg-success/10 px-5 py-3 text-xs font-medium text-success sm:px-6">
              <Truck className="h-3.5 w-3.5" /> You've unlocked free shipping!
            </div>
          )}

          <div className="flex-1 divide-y divide-border overflow-y-auto px-5 sm:px-6">
            <AnimatePresence initial={false}>
              {cartLines.map((line) => (
                <CartLineItem
                  key={`${line.product.id}-${line.variant ?? ""}`}
                  line={line}
                  compact
                  onUpdateQty={(qty) => updateQuantity(line.product.id, qty, line.variant)}
                  onRemove={() => removeItem(line.product.id, line.variant)}
                  onSaveForLater={() => saveForLater(line.product.id, line.variant)}
                />
              ))}
            </AnimatePresence>
          </div>

          <div className="shrink-0 border-t border-border p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-mono font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <Link href="/cart" onClick={() => setCartOpen(false)}>
              <Button variant="secondary" fullWidth className="justify-center mb-2.5">
                View Cart
              </Button>
            </Link>
            <Link href="/checkout" onClick={() => setCartOpen(false)}>
              <Button variant="primary" fullWidth className="justify-center">
                Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Drawer>
  );
}
