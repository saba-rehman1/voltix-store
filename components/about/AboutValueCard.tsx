"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { staggerItem } from "@/components/ui/ScrollReveal";

export function AboutValueCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <motion.div variants={staggerItem} className="rounded-2xl border border-border bg-card p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-cyan/20 text-accent-light">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </motion.div>
  );
}
