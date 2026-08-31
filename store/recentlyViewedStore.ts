"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  ids: string[];
  add: (productId: string) => void;
  clear: () => void;
}

const MAX_ITEMS = 12;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (productId) => {
        const filtered = get().ids.filter((id) => id !== productId);
        set({ ids: [productId, ...filtered].slice(0, MAX_ITEMS) });
      },
      clear: () => set({ ids: [] }),
    }),
    { name: "voltix-recently-viewed" }
  )
);
