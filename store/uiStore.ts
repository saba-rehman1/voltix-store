"use client";

import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  chatbotOpen: boolean;
  quickViewSlug: string | null;
  setCartOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setChatbotOpen: (open: boolean) => void;
  toggleChatbot: () => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  cartOpen: false,
  mobileNavOpen: false,
  searchOpen: false,
  chatbotOpen: false,
  quickViewSlug: null,
  setCartOpen: (open) => set({ cartOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setChatbotOpen: (open) => set({ chatbotOpen: open }),
  toggleChatbot: () => set((s) => ({ chatbotOpen: !s.chatbotOpen })),
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
