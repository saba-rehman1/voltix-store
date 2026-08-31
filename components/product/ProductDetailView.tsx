"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Scale,
  Share2,
  ChevronRight,
  Check,
} from "lucide-react";
import type { Product } from "@/types";
import { cn, formatCurrency, discountPercent } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "./ProductGallery";
import { DeliveryInfo } from "./DeliveryInfo";
import { ProductReviews } from "./ProductReviews";
import { ProductCard } from "./ProductCard";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCompareStore } from "@/store/compareStore";
import { useUIStore } from "@/store/uiStore";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";
import { getRelatedProducts, getProductById } from "@/data/products";

type Tab = "description" | "specs" | "reviews";

export function ProductDetailView({ product }: { product: Product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]?.name);
  const [storage, setStorage] = useState(product.storageOptions?.[0]);
  const [ram, setRam] = useState(product.ramOptions?.[0]);
  const [tab, setTab] = useState<Tab>("description");

  const addToCart = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isCompared = useCompareStore((s) => s.has(product.id));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const addRecentlyViewed = useRecentlyViewedStore((s) => s.add);
  const recentIds = useRecentlyViewedStore((s) => s.ids);

  useEffect(() => {
    addRecentlyViewed(product.id);
  }, [product.id, addRecentlyViewed]);

  const discount = discountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stock <= 0;
  const variantLabel = [color, storage, ram].filter(Boolean).join(" · ") || undefined;

  const related = getRelatedProducts(product, 4);
  const recentlyViewed = recentIds
    .filter((id) => id !== product.id)
    .map((id) => getProductById(id))
    .filter((p): p is Product => !!p)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id, qty, variantLabel);
    setCartOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product.id, qty, variantLabel);
    router.push("/checkout");
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {}
  };

  return (
    <Container className="py-8 md:py-10">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-2">
        <Link href="/" className="hover:text-white">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/category/${product.category}`} className="capitalize hover:text-white">
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-muted line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">
              {product.brand}
            </p>
            {product.newArrival && <Badge variant="cyan">New</Badge>}
            {product.bestSeller && <Badge variant="accent">Bestseller</Badge>}
          </div>
          <h1 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} showValue />
            <span className="text-muted-2">·</span>
            <span className="text-xs font-mono text-muted-2">SKU {product.sku}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-lg text-muted-2 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            {discount > 0 && <Badge variant="danger">Save {discount}%</Badge>}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {outOfStock ? (
              <span className="font-medium text-danger">Out of stock</span>
            ) : product.stock <= 5 ? (
              <span className="font-medium text-warning">Only {product.stock} left in stock</span>
            ) : (
              <span className="flex items-center gap-1 font-medium text-success">
                <Check className="h-3.5 w-3.5" /> In stock, ready to ship
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="mb-2.5 text-sm font-medium text-white">
                Color: <span className="font-normal text-muted">{color}</span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform cursor-pointer",
                      color === c.name ? "border-accent-light scale-110" : "border-white/20 hover:scale-105"
                    )}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.storageOptions && product.storageOptions.length > 0 && (
            <VariantPicker label="Storage" options={product.storageOptions} value={storage} onChange={setStorage} />
          )}
          {product.ramOptions && product.ramOptions.length > 0 && (
            <VariantPicker label="Memory" options={product.ramOptions} value={ram} onChange={setRam} />
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-muted hover:text-white cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                className="p-3 text-muted hover:text-white cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
              }}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-danger text-danger")} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const r = toggleCompare(product.id);
                if (r.message) toast.error(r.message);
                else toast.success(r.added ? "Added to compare" : "Removed from compare");
              }}
              aria-label="Compare"
            >
              <Scale className={cn("h-4 w-4", isCompared && "text-accent-light")} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare} aria-label="Share">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              className="flex-1 justify-center"
              disabled={outOfStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 justify-center"
              disabled={outOfStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2">
            {product.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                {h}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <DeliveryInfo warranty={product.warranty} />
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex gap-6 border-b border-border">
          {(["description", "specs", "reviews"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative pb-4 text-sm font-medium capitalize transition-colors cursor-pointer",
                tab === t ? "text-white" : "text-muted hover:text-white"
              )}
            >
              {t === "specs" ? "Specifications" : t}
              {t === "reviews" && ` (${product.reviewCount})`}
              {tab === t && (
                <motion.div
                  layoutId="product-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="max-w-3xl text-sm leading-relaxed text-muted">
              <p>{product.description}</p>
            </div>
          )}
          {tab === "specs" && (
            <div className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b border-border py-2.5 text-sm">
                  <span className="text-muted">{s.label}</span>
                  <span className="text-right font-medium text-white">{s.value}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "reviews" && (
            <ProductReviews reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-xl font-bold text-white">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-xl font-bold text-white">Recently viewed</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {recentlyViewed.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function VariantPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-5">
      <p className="mb-2.5 text-sm font-medium text-white">
        {label}: <span className="font-normal text-muted">{value}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer",
              value === opt
                ? "border-accent bg-accent/15 text-accent-light"
                : "border-border text-muted hover:text-white"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
