"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const has = get().ids.includes(productId);
        set({
          ids: has
            ? get().ids.filter((id) => id !== productId)
            : [...get().ids, productId],
        });
      },
      add: (productId) => {
        if (!get().ids.includes(productId)) {
          set({ ids: [...get().ids, productId] });
        }
      },
      remove: (productId) => {
        set({ ids: get().ids.filter((id) => id !== productId) });
      },
      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: "voltix-wishlist" }
  )
);
