"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export function ProductRail({
  eyebrow,
  title,
  subtitle,
  products,
  viewAllHref,
  bg,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref: string;
  bg?: "secondary";
}) {
  if (products.length === 0) return null;

  return (
    <section className={bg === "secondary" ? "bg-bg-secondary py-16 md:py-20" : "py-16 md:py-20"}>
      <Container>
        <ScrollReveal>
          <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">{eyebrow}</p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">{title}</h2>
              {subtitle && <p className="mt-1.5 max-w-lg text-sm text-muted">{subtitle}</p>}
            </div>
            <Link
              href={viewAllHref}
              className="flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors"
            >
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
