"use client";

import Link from "next/link";
import { Heart, ArrowRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/store/wishlistStore";
import { getProductById } from "@/data/products";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function WishlistPage() {
  useDocumentTitle("Wishlist");
  const ids = useWishlistStore((s) => s.ids);
  const clear = useWishlistStore((s) => s.clear);

  const items = ids.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => !!p);

  if (items.length === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <Heart className="h-9 w-9 text-muted-2" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Your wishlist is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Tap the heart icon on any product to save it here for later.
        </p>
        <Link href="/products">
          <Button className="mt-6">
            Explore Products <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">My Wishlist</h1>
          <p className="mt-1 text-sm text-muted">{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => {
            clear();
            toast.success("Wishlist cleared");
          }}
          className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-danger cursor-pointer"
        >
          <Trash2 className="h-4 w-4" /> Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-5">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </Container>
  );
}
