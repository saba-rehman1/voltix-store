"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/search/SearchBar";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { searchProducts } from "@/lib/search";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

function SearchPageInner() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [loading] = useState(false);

  useDocumentTitle(query ? `Results for "${query}"` : "Search");

  const results = useMemo(() => searchProducts(query, 30), [query]);

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6 flex items-center gap-2.5 text-muted">
        <SearchIcon className="h-5 w-5" />
        <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
          {query ? `Results for "${query}"` : "Search Voltix Store"}
        </h1>
      </div>

      <div className="mb-8 max-w-xl">
        <SearchBar />
      </div>

      {query && (
        <p className="mb-6 text-sm text-muted">
          {results.length} product{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      {loading ? (
        <ProductGridSkeleton />
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : query ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-lg font-semibold text-white">No results for &ldquo;{query}&rdquo;</p>
          <p className="mt-1 text-sm text-muted">Try a different search term or browse our categories.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted">Start typing to search laptops, phones, gaming gear & more.</p>
        </div>
      )}
    </Container>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Container className="py-10"><ProductGridSkeleton /></Container>}>
      <SearchPageInner />
    </Suspense>
  );
}
