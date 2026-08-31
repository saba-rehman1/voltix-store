"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const initial =
    direction === "up"
      ? { opacity: 0, y }
      : direction === "down"
      ? { opacity: 0, y: -y }
      : direction === "left"
      ? { opacity: 0, x: y }
      : direction === "right"
      ? { opacity: 0, x: -y }
      : { opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
