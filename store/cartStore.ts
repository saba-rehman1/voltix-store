"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLineItem } from "@/types";

interface CartState {
  items: CartLineItem[];
  couponCode: string | null;
  couponDiscount: number;
  addItem: (productId: string, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  saveForLater: (productId: string, variant?: string) => void;
  moveToCart: (productId: string, variant?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const VALID_COUPONS: Record<string, number> = {
  VOLTIX10: 0.1,
  WELCOME15: 0.15,
  FLASH20: 0.2,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,

      addItem: (productId, quantity = 1, variant) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.variant === variant && !i.savedForLater
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return {
            items: [...state.items, { productId, quantity, variant, savedForLater: false }],
          };
        });
      },

      removeItem: (productId, variant) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variant === variant)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      saveForLater: (productId, variant) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, savedForLater: true }
              : i
          ),
        }));
      },

      moveToCart: (productId, variant) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variant === variant
              ? { ...i, savedForLater: false }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        const discount = VALID_COUPONS[normalized];
        if (!discount) {
          return { success: false, message: "Invalid or expired coupon code." };
        }
        set({ couponCode: normalized, couponDiscount: discount });
        return {
          success: true,
          message: `Coupon applied — ${discount * 100}% off your order!`,
        };
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),
    }),
    { name: "voltix-cart" }
  )
);
