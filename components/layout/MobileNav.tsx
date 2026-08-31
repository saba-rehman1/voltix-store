"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Gamepad2,
  Headphones,
  Watch,
  Cable,
  ChevronDown,
  Zap,
  User,
  Heart,
  Scale,
  LayoutDashboard,
} from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { useUIStore } from "@/store/uiStore";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Smartphone,
  Gamepad2,
  Headphones,
  Watch,
  Cable,
};

const LINKS = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Flash Sale", href: "/products?sale=true" },
  { label: "All Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function MobileNav() {
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();
  const [shopExpanded, setShopExpanded] = useState(true);

  const close = () => setMobileNavOpen(false);

  return (
    <Drawer
      open={mobileNavOpen}
      onClose={close}
      side="left"
      widthClass="max-w-[340px]"
      title={
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan">
            <Zap className="h-4 w-4 fill-white text-white" />
          </div>
          <span className="font-display text-base font-bold">VOLTIX<span className="text-accent-cyan">.</span></span>
        </div>
      }
    >
      <div className="flex flex-col gap-1 p-4">
        <button
          onClick={() => setShopExpanded((v) => !v)}
          className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5 cursor-pointer"
        >
          Shop by Category
          <ChevronDown className={cn("h-4 w-4 transition-transform", shopExpanded && "rotate-180")} />
        </button>
        {shopExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="grid grid-cols-2 gap-2 px-1 pb-2"
          >
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={close}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-accent/40"
                >
                  {Icon && <Icon className="h-4 w-4 text-accent-light" />}
                  <span className="text-xs font-medium text-white">{cat.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}

        <div className="my-2 h-px bg-border" />

        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={close}
            className="rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <div className="my-2 h-px bg-border" />

        <Link href="/dashboard" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white">
          <User className="h-4 w-4" /> My Account
        </Link>
        <Link href="/dashboard/orders" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white">
          <LayoutDashboard className="h-4 w-4" /> My Orders
        </Link>
        <Link href="/wishlist" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white">
          <Heart className="h-4 w-4" /> Wishlist
        </Link>
        <Link href="/compare" onClick={close} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-white/5 hover:text-white">
          <Scale className="h-4 w-4" /> Compare
        </Link>
      </div>
    </Drawer>
  );
}
