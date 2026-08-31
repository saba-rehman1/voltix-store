"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { products } from "@/data/products";
import type { Category } from "@/types";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export function CategoryPageClient({ category }: { category: Category }) {
  const [sort, setSort] = useState<SortOption>("featured");

  const categoryProducts = useMemo(() => {
    let list = products.filter((p) => p.category === category.slug);
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [category.slug, sort]);

  const brandsInCategory = Array.from(new Set(categoryProducts.map((p) => p.brand)));

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <SmartImage src={category.image} alt={category.name} fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/85 to-bg/60" />
        </div>
        <Container className="relative py-16 md:py-20">
          <ScrollReveal>
            <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <ArrowRight className="h-3 w-3" />
              <span className="text-muted">{category.name}</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-white md:text-4xl">{category.name}</h1>
            <p className="mt-3 max-w-lg text-sm text-muted md:text-base">{category.description}</p>
            <p className="mt-4 text-xs text-muted-2">
              {categoryProducts.length} products · {brandsInCategory.length} brands
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <Container className="py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-accent/60 cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
            {categoryProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <p className="text-sm text-muted">No products in this category yet.</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors"
          >
            Browse all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
