"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Scale, Search, ShoppingBag, User, Zap, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCompareStore } from "@/store/compareStore";
import { MegaMenu } from "./MegaMenu";
import { SearchBar } from "@/components/search/SearchBar";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Flash Sale", href: "/products?sale=true" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  const { setCartOpen, setMobileNavOpen } = useUIStore();
  const cartCount = useCartStore((s) =>
    s.items.filter((i) => !i.savedForLater).reduce((sum, i) => sum + i.quantity, 0)
  );
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const compareCount = useCompareStore((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileSearchOpen(false);
    setShopOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-bg border-b border-transparent"
      )}
    >
      <div className="hidden md:block border-b border-white/5 bg-gradient-to-r from-accent/10 via-transparent to-accent-cyan/10">
        <Container>
          <div className="flex h-8 items-center justify-center gap-2 text-[11px] text-muted">
            <Zap className="h-3 w-3 text-accent-cyan" />
            <span>Free express shipping on orders over $75 — Premium Tech, Smarter Living.</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex h-16 items-center gap-4 md:gap-6">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="rounded-lg p-2 text-white hover:bg-white/5 lg:hidden cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-[22px] w-[22px]" />
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan shadow-glow">
              <Zap className="h-[18px] w-[18px] fill-white text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              VOLTIX<span className="text-accent-cyan">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-white transition-colors cursor-pointer">
                Shop
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", shopOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {shopOpen && <MegaMenu onNavigate={() => setShopOpen(false)} />}
              </AnimatePresence>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 max-w-md md:block">
            <SearchBar variant="compact" />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="rounded-lg p-2.5 text-white hover:bg-white/5 md:hidden cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/compare"
              className="relative hidden rounded-lg p-2.5 text-white hover:bg-white/5 sm:flex cursor-pointer"
              aria-label="Compare"
            >
              <Scale className="h-5 w-5" />
              {compareCount > 0 && <CountBadge count={compareCount} />}
            </Link>

            <Link
              href="/wishlist"
              className="relative rounded-lg p-2.5 text-white hover:bg-white/5 cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
            </Link>

            <Link
              href="/dashboard"
              className="hidden rounded-lg p-2.5 text-white hover:bg-white/5 sm:flex cursor-pointer"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-lg p-2.5 text-white hover:bg-white/5 cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <CountBadge count={cartCount} accent />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-visible md:hidden"
            >
              <div className="pb-4">
                <SearchBar autoFocus onNavigate={() => setMobileSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

function CountBadge({ count, accent }: { count: number; accent?: boolean }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={cn(
        "absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white",
        accent ? "bg-gradient-to-br from-accent to-accent-cyan" : "bg-danger"
      )}
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}
