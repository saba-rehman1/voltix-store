"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareState {
  ids: string[];
  toggle: (productId: string) => { added: boolean; message?: string };
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        const has = get().ids.includes(productId);
        if (has) {
          set({ ids: get().ids.filter((id) => id !== productId) });
          return { added: false };
        }
        if (get().ids.length >= MAX_COMPARE) {
          return {
            added: false,
            message: `You can compare up to ${MAX_COMPARE} products at once.`,
          };
        }
        set({ ids: [...get().ids, productId] });
        return { added: true };
      },
      remove: (productId) => set({ ids: get().ids.filter((id) => id !== productId) }),
      has: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: "voltix-compare" }
  )
);
