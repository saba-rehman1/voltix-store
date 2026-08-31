"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/wishlistStore";
import { getProductById } from "@/data/products";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function DashboardWishlistPage() {
  useDocumentTitle("Wishlist", "My Account");
  const ids = useWishlistStore((s) => s.ids);
  const items = ids.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => !!p);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
        <Heart className="h-8 w-8 text-muted-2" />
        <p className="mt-3 text-sm font-medium text-white">No saved items yet</p>
        <p className="mt-1 text-xs text-muted">Products you wishlist will appear here.</p>
        <Link href="/products" className="mt-4">
          <Button size="sm">
            Browse Products <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
