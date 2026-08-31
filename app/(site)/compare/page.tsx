"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Scale, X, ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Rating } from "@/components/ui/Rating";
import { useCompareStore } from "@/store/compareStore";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { getProductById } from "@/data/products";
import { formatCurrency, cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function ComparePage() {
  useDocumentTitle("Compare Products");
  const ids = useCompareStore((s) => s.ids);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);
  const addToCart = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  const products = ids.map((id) => getProductById(id)).filter((p): p is NonNullable<typeof p> => !!p);

  if (products.length === 0) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          <Scale className="h-9 w-9 text-muted-2" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-white">Nothing to compare yet</h1>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Tap the compare icon on any product to add it here — compare up to 4 side by side.
        </p>
        <Link href="/products">
          <Button className="mt-6">
            Browse Products <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Container>
    );
  }

  const specLabels = Array.from(
    new Set(products.flatMap((p) => p.specs.map((s) => s.label)))
  );

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white md:text-3xl">Compare Products</h1>
          <p className="mt-1 text-sm text-muted">{products.length} of 4 products selected</p>
        </div>
        <button
          onClick={clear}
          className="text-sm font-medium text-muted hover:text-danger cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40 p-3" />
              {products.map((p) => (
                <th key={p.id} className="p-3 text-left align-top">
                  <div className="relative rounded-2xl border border-border bg-card p-4">
                    <button
                      onClick={() => remove(p.id)}
                      className="absolute right-2.5 top-2.5 rounded-full bg-white/5 p-1.5 text-muted-2 hover:text-danger cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <Link href={`/products/${p.slug}`} className="relative block aspect-square overflow-hidden rounded-xl bg-bg-secondary">
                      <SmartImage src={p.thumbnail} alt={p.name} fill sizes="200px" className="object-cover" />
                    </Link>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent-cyan">{p.brand}</p>
                    <Link href={`/products/${p.slug}`} className="mt-1 block text-sm font-semibold text-white hover:text-accent-light line-clamp-2">
                      {p.name}
                    </Link>
                    <p className="mt-2 font-mono text-lg font-bold text-white">{formatCurrency(p.price)}</p>
                    <Button
                      size="sm"
                      fullWidth
                      className="mt-3 justify-center"
                      onClick={() => {
                        addToCart(p.id);
                        setCartOpen(true);
                        toast.success(`${p.name} added to cart`);
                      }}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Add
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 text-sm font-medium text-muted">Rating</td>
              {products.map((p) => (
                <td key={p.id} className="p-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                    <span className="text-sm font-medium text-white">{p.rating}</span>
                    <span className="text-xs text-muted-2">({p.reviewCount})</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 text-sm font-medium text-muted">Stock</td>
              {products.map((p) => (
                <td key={p.id} className="p-3 text-sm">
                  <span className={cn(p.stock > 0 ? "text-success" : "text-danger")}>
                    {p.stock > 0 ? `${p.stock} available` : "Out of stock"}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 text-sm font-medium text-muted">Warranty</td>
              {products.map((p) => (
                <td key={p.id} className="p-3 text-sm text-white">{p.warranty}</td>
              ))}
            </tr>
            {specLabels.map((label, rowIdx) => (
              <tr key={label} className={rowIdx % 2 === 0 ? "bg-card/40" : ""}>
                <td className="p-3 text-sm font-medium text-muted">{label}</td>
                {products.map((p) => {
                  const spec = p.specs.find((s) => s.label === label);
                  return (
                    <td key={p.id} className="p-3 text-sm text-white">
                      {spec?.value ?? <span className="text-muted-2">—</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
