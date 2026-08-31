"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import {
  ProductFilters,
  ActiveFilterPills,
  Filters,
  DEFAULT_FILTERS,
} from "@/components/product/ProductFilters";
import { Drawer } from "@/components/ui/Drawer";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import type { CategorySlug } from "@/types";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const SORT_LABELS: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
  newest: "Newest",
};

function ProductsPageInner() {
  useDocumentTitle("Shop All Products");
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  useEffect(() => {
    const category = searchParams.get("category");
    const saleParam = searchParams.get("sale");
    const filterParam = searchParams.get("filter");
    const brandParam = searchParams.get("brand");

    setFilters((prev) => ({
      ...prev,
      categories: category ? [category] : prev.categories,
      brands: brandParam ? [brandParam] : prev.brands,
    }));

    if (saleParam === "true") setSort("featured");
    if (filterParam === "new") setSort("newest");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [filters, sort]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const saleOnly = searchParams.get("sale") === "true";
  const newOnly = searchParams.get("filter") === "new";

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (saleOnly && !p.flashSale && !p.compareAtPrice) return false;
      if (newOnly && !p.newArrival) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;
      if (filters.inStockOnly && p.stock <= 0) return false;
      if (filters.colors.length && !p.colors?.some((c) => filters.colors.includes(c.name))) return false;
      if (filters.storage.length && !p.storageOptions?.some((s) => filters.storage.includes(s))) return false;
      if (filters.ram.length && !p.ramOptions?.some((r) => filters.ram.includes(r))) return false;
      if (
        filters.processors.length &&
        !p.processorOptions?.some((pr) => filters.processors.includes(pr))
      )
        return false;
      if (filters.screenSizes.length && !(p.screenSize && filters.screenSizes.includes(p.screenSize)))
        return false;
      return true;
    });

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
      case "newest":
        list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return list;
  }, [filters, sort, saleOnly, newOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const productCountByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const productCountByBrand = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.brand] = (map[p.brand] ?? 0) + 1;
    });
    return map;
  }, []);

  const pageTitle = saleOnly ? "Flash Sale" : newOnly ? "New Arrivals" : "All Products";

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-accent-cyan">Shop</p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">{pageTitle}</h1>
        <p className="mt-1.5 text-sm text-muted">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24">
            <ProductFilters
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                router.replace("/products");
              }}
              productCountByCategory={productCountByCategory}
              productCountByBrand={productCountByBrand}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-sm font-medium text-white lg:hidden cursor-pointer"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <ActiveFilterPills
                filters={filters}
                onChange={(f) => {
                  setFilters(f);
                  router.replace("/products");
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center rounded-lg border border-border p-1 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  className={cn("rounded-md p-1.5 cursor-pointer", view === "grid" ? "bg-white/10 text-white" : "text-muted-2")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn("rounded-md p-1.5 cursor-pointer", view === "list" ? "bg-white/10 text-white" : "text-muted-2")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-white outline-none focus:border-accent/60 cursor-pointer"
              >
                {Object.entries(SORT_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    Sort: {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <ProductGridSkeleton count={PAGE_SIZE} />
          ) : paginated.length > 0 ? (
            <>
              <div
                className={cn(
                  "grid gap-4 md:gap-5",
                  view === "grid"
                    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {paginated.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPage(i + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={cn(
                        "h-9 w-9 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                        page === i + 1
                          ? "bg-gradient-to-r from-accent to-accent-cyan text-white"
                          : "border border-border text-muted hover:text-white"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center"
            >
              <p className="text-lg font-semibold text-white">No products match your filters</p>
              <p className="mt-1 text-sm text-muted">Try adjusting or resetting your filters.</p>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="mt-4 flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-white hover:border-accent/50 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" /> Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Drawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} title="Filters" side="left">
        <div className="p-4">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            productCountByCategory={productCountByCategory}
            productCountByBrand={productCountByBrand}
          />
        </div>
      </Drawer>
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Container className="py-10"><ProductGridSkeleton /></Container>}>
      <ProductsPageInner />
    </Suspense>
  );
}
