"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Gamepad2,
  Headphones,
  Watch,
  Cable,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { categories } from "@/data/categories";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Laptop,
  Smartphone,
  Gamepad2,
  Headphones,
  Watch,
  Cable,
};

export function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="glass absolute left-1/2 top-full z-50 mt-3 w-[720px] -translate-x-1/2 rounded-2xl border border-border p-6 shadow-2xl"
    >
      <div className="grid grid-cols-3 gap-2">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? Sparkles;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={onNavigate}
              className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-cyan/20 text-accent-light group-hover:from-accent/30 group-hover:to-accent-cyan/30 transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{cat.name}</p>
                <p className="mt-0.5 text-xs text-muted line-clamp-2">{cat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-gradient-to-r from-accent/10 to-accent-cyan/10 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Flash Sale is live</p>
          <p className="text-xs text-muted">Save up to 25% on select gear — today only.</p>
        </div>
        <Link
          href="/products?sale=true"
          onClick={onNavigate}
          className="flex items-center gap-1 text-sm font-medium text-accent-light hover:gap-2 transition-all"
        >
          Shop now <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
