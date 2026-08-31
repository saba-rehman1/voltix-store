"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">
                Explore
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors"
            >
              View all products <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <ScrollReveal key={cat.slug} delay={i * 0.06}>
                <Link href={`/category/${cat.slug}`} className="group block">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <SmartImage
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-sm font-semibold text-white">{cat.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{count} products</p>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
