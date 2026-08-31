"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";
import { searchProducts } from "@/lib/search";
import { formatCurrency, discountPercent, cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";

const TRENDING_QUERIES = ["AirBook Pro", "Gaming laptop", "Noise cancelling", "Smart watch", "Under $500"];

export function SearchBar({
  autoFocus,
  onNavigate,
  variant = "default",
}: {
  autoFocus?: boolean;
  onNavigate?: () => void;
  variant?: "default" | "compact";
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = searchProducts(query, 6);
  const showDropdown = focused && query.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToSearch = (q: string) => {
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setFocused(false);
    onNavigate?.();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearch(query);
        }}
        className={cn(
          "flex items-center gap-2 rounded-xl border bg-card px-4 transition-colors",
          focused ? "border-accent/60 ring-2 ring-accent/20" : "border-border",
          variant === "compact" ? "h-10" : "h-11"
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          autoFocus={autoFocus}
          type="text"
          placeholder="Search laptops, phones, headphones..."
          className="w-full bg-transparent text-sm text-white placeholder:text-muted-2 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 text-muted-2 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-border shadow-2xl"
          >
            {results.length > 0 ? (
              <div className="p-2">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={() => {
                      setFocused(false);
                      setQuery("");
                      onNavigate?.();
                    }}
                    className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-white/5 transition-colors"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                      <SmartImage src={p.thumbnail} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-muted">{p.brand} · {p.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-white">{formatCurrency(p.price)}</p>
                      {discountPercent(p.price, p.compareAtPrice) > 0 && (
                        <Badge variant="success" className="mt-0.5">
                          -{discountPercent(p.price, p.compareAtPrice)}%
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
                <button
                  onClick={() => goToSearch(query)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl p-3 text-sm font-medium text-accent-light hover:bg-white/5 cursor-pointer"
                >
                  See all results for &ldquo;{query}&rdquo; <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-sm text-muted">No products found for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-xs text-muted-2">Try checking your spelling or use a different term.</p>
              </div>
            )}
          </motion.div>
        )}
        {focused && !query && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="glass absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-border p-4 shadow-2xl"
          >
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-2">
              <TrendingUp className="h-3.5 w-3.5" /> Trending searches
            </p>
            <div className="flex flex-wrap gap-2">
              {TRENDING_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setQuery(q);
                    goToSearch(q);
                  }}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted hover:text-white hover:border-accent/50 transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
