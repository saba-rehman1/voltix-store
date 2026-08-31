"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STATS = [
  { value: 128000, suffix: "+", label: "Happy Customers" },
  { value: 30, suffix: "+", label: "Curated Products" },
  { value: 99.2, suffix: "%", label: "On-time Delivery", decimals: 1 },
  { value: 40, suffix: "+", label: "Countries Served" },
];

export function StatsBar() {
  return (
    <section className="border-b border-border bg-bg-secondary">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.08}>
              <div className="text-center md:text-left">
                <div className="font-display text-3xl font-bold text-white md:text-4xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <p className="mt-1.5 text-xs uppercase tracking-wide text-muted">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
