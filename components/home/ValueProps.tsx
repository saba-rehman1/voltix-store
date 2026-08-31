"use client";

import { Truck, ShieldCheck, RotateCcw, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StaggerContainer, staggerItem } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";

const PROPS = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    desc: "On all orders over $75, delivered in 1-2 business days.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic & Warrantied",
    desc: "100% genuine products, backed by manufacturer warranty.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "No-questions-asked returns within 30 days of delivery.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Real humans and our AI assistant, always ready to help.",
  },
];

export function ValueProps() {
  return (
    <section className="border-y border-border bg-bg-secondary py-14">
      <Container>
        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROPS.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerItem}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-cyan/20 text-accent-light">
                <p.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{p.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
