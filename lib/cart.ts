"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import { getProductById } from "@/data/products";
import type { Product } from "@/types";

export interface ResolvedCartLine {
  product: Product;
  quantity: number;
  variant?: string;
  savedForLater?: boolean;
  lineTotal: number;
}

const FREE_SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.08;

export function useCart() {
  const { items, couponCode, couponDiscount, applyCoupon, removeCoupon, ...actions } =
    useCartStore();

  const resolved: ResolvedCartLine[] = useMemo(
    () =>
      items.reduce<ResolvedCartLine[]>((acc, item) => {
        const product = getProductById(item.productId);
        if (!product) return acc;
        acc.push({
          product,
          quantity: item.quantity,
          variant: item.variant,
          savedForLater: item.savedForLater,
          lineTotal: product.price * item.quantity,
        });
        return acc;
      }, []),
    [items]
  );

  const cartLines = resolved.filter((l) => !l.savedForLater);
  const savedLines = resolved.filter((l) => l.savedForLater);

  const itemCount = cartLines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = cartLines.reduce((sum, l) => sum + l.lineTotal, 0);
  const discount = subtotal * couponDiscount;
  const discountedSubtotal = subtotal - discount;
  const shipping =
    subtotal === 0 || discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - discountedSubtotal);

  return {
    cartLines,
    savedLines,
    itemCount,
    subtotal,
    discount,
    couponCode,
    couponDiscount,
    shipping,
    tax,
    total,
    amountToFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    applyCoupon,
    removeCoupon,
    ...actions,
  };
}
