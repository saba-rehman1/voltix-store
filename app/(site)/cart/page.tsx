"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ShoppingBag, ArrowRight, Tag, X, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function CartPage() {
  useDocumentTitle("Shopping Cart");
  const {
    cartLines,
    savedLines,
    subtotal,
    discount,
    couponCode,
    shipping,
    tax,
    total,
    amountToFreeShipping,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [promo, setPromo] = useState("");

  const handleApply = () => {
    if (!promo.trim()) return;
    const result = applyCoupon(promo);
    if (result.success) {
      toast.success(result.message);
      setPromo("");
    } else {
      toast.error(result.message);
    }
  };

  if (cartLines.length === 0 && savedLines.length === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <ShoppingBag className="h-9 w-9 text-muted-2" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Looks like you haven't added anything yet. Explore our collection and find something you'll love.
        </p>
        <Link href="/products">
          <Button className="mt-6">
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-10">
      <Link href="/products" className="mb-4 flex items-center gap-1.5 text-sm text-muted hover:text-white w-fit">
        <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
      </Link>
      <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Shopping Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {cartLines.length > 0 && (
            <div className="rounded-2xl border border-border bg-card px-5 divide-y divide-border sm:px-6">
              <AnimatePresence initial={false}>
                {cartLines.map((line) => (
                  <CartLineItem
                    key={`${line.product.id}-${line.variant ?? ""}`}
                    line={line}
                    onUpdateQty={(qty) => updateQuantity(line.product.id, qty, line.variant)}
                    onRemove={() => removeItem(line.product.id, line.variant)}
                    onSaveForLater={() => saveForLater(line.product.id, line.variant)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {savedLines.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-4 font-display text-lg font-semibold text-white">
                Saved for Later ({savedLines.length})
              </h2>
              <div className="rounded-2xl border border-border bg-card px-5 divide-y divide-border sm:px-6">
                <AnimatePresence initial={false}>
                  {savedLines.map((line) => (
                    <CartLineItem
                      key={`${line.product.id}-${line.variant ?? ""}`}
                      line={line}
                      onUpdateQty={(qty) => updateQuantity(line.product.id, qty, line.variant)}
                      onRemove={() => removeItem(line.product.id, line.variant)}
                      onMoveToCart={() => moveToCart(line.product.id, line.variant)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-white">Order Summary</h2>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted">Promo code</p>
              {couponCode ? (
                <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success/10 px-3.5 py-2.5">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                    <Tag className="h-3.5 w-3.5" /> {couponCode} applied
                  </span>
                  <button onClick={removeCoupon} className="text-success cursor-pointer">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    placeholder="Enter code"
                    className="w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60"
                  />
                  <Button size="sm" variant="secondary" onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              )}
              <p className="mt-1.5 text-[11px] text-muted-2">Try VOLTIX10, WELCOME15 or FLASH20</p>
            </div>

            {amountToFreeShipping > 0 && cartLines.length > 0 && (
              <p className="mt-4 rounded-lg bg-white/5 px-3.5 py-2.5 text-xs text-muted">
                Add <span className="font-semibold text-accent-cyan">{formatCurrency(amountToFreeShipping)}</span> more for free shipping
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5 text-sm">
              <Row label="Subtotal" value={formatCurrency(subtotal)} />
              {discount > 0 && <Row label="Discount" value={`-${formatCurrency(discount)}`} valueClass="text-success" />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatCurrency(shipping)} valueClass={shipping === 0 ? "text-success" : undefined} />
              <Row label="Estimated Tax" value={formatCurrency(tax)} />
              <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                <span className="font-semibold text-white">Total</span>
                <span className="font-mono text-xl font-bold text-white">{formatCurrency(total)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button
                fullWidth
                size="lg"
                className="mt-5 justify-center"
                disabled={cartLines.length === 0}
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={`font-mono font-medium text-white ${valueClass ?? ""}`}>{value}</span>
    </div>
  );
}
