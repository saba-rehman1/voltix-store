"use client";

import Link from "next/link";
import { Zap, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
import { useCountdown } from "@/lib/useCountdown";
import { products } from "@/data/products";

const flashProducts = products.filter((p) => p.flashSale);
const endsAt = flashProducts[0]?.flashSaleEndsAt ?? "2026-09-07T23:59:59";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-black/30 font-mono text-xl font-bold text-white backdrop-blur-sm">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1.5 text-[10px] uppercase tracking-wide text-white/60">{label}</span>
    </div>
  );
}

export function FlashSaleSection() {
  const t = useCountdown(endsAt);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-danger/20 bg-gradient-to-br from-danger/15 via-bg-secondary to-accent/10 p-6 md:p-10">
            <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-danger/20 blur-[100px]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-danger/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-danger">
                  <Zap className="h-3.5 w-3.5" /> Flash Sale
                </div>
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Up to 25% off — today only
                </h2>
                <p className="mt-1.5 max-w-md text-sm text-muted">
                  Limited stock on select flagship gear. When the timer hits zero, prices return to normal.
                </p>
              </div>
              <div className="flex gap-2.5 md:gap-3">
                <TimeBlock value={t.days} label="Days" />
                <TimeBlock value={t.hours} label="Hrs" />
                <TimeBlock value={t.minutes} label="Min" />
                <TimeBlock value={t.seconds} label="Sec" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted">{flashProducts.length} deals live now</p>
          <Link
            href="/products?sale=true"
            className="flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors"
          >
            See all deals <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
          {flashProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
