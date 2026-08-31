"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Heart, Minus, Plus, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/uiStore";
import { getProduct } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn, formatCurrency, discountPercent } from "@/lib/utils";

export function QuickViewModal() {
  const { quickViewSlug, closeQuickView, setCartOpen } = useUIStore();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<string | undefined>();

  const product = quickViewSlug ? getProduct(quickViewSlug) : null;
  const addToCart = useCartStore((s) => s.addItem);
  const isWishlisted = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  useEffect(() => {
    setActiveImage(0);
    setQty(1);
    setColor(product?.colors?.[0]?.name);
  }, [product]);

  if (!product) return null;

  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <Modal open={!!quickViewSlug} onClose={closeQuickView} widthClass="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-5">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-bg-secondary">
            <SmartImage
              src={product.images[activeImage]}
              alt={product.name}
              fill
              sizes="500px"
              className="object-cover"
            />
            {discount > 0 && (
              <Badge variant="danger" className="absolute left-3 top-3">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-colors cursor-pointer",
                  activeImage === i ? "border-accent" : "border-border hover:border-white/30"
                )}
              >
                <SmartImage src={img} alt={`${product.name} ${i + 1}`} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-5 pt-2 md:pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">
            {product.brand}
          </p>
          <h2 className="mt-1 font-display text-xl font-bold text-white">{product.name}</h2>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>

          <div className="mt-3">
            <Rating value={product.rating} count={product.reviewCount} showValue />
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-sm text-muted-2 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted">
                Color: <span className="text-white">{color}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 transition-transform cursor-pointer",
                      color === c.name ? "border-accent-light scale-110" : "border-white/20 hover:scale-105"
                    )}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2.5 text-muted hover:text-white cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="p-2.5 text-muted hover:text-white cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="text-xs text-muted">{product.stock} in stock</span>
          </div>

          <div className="mt-5 flex gap-2.5">
            <Button
              variant="primary"
              className="flex-1 justify-center"
              onClick={() => {
                addToCart(product.id, qty, color);
                setCartOpen(true);
                closeQuickView();
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-danger text-danger")} />
            </Button>
          </div>
          <Button
            variant="secondary"
            className="mt-2.5 justify-center"
            onClick={() => {
              addToCart(product.id, qty, color);
              closeQuickView();
              router.push("/checkout");
            }}
          >
            Buy Now
          </Button>

          <Link
            href={`/products/${product.slug}`}
            onClick={closeQuickView}
            className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-accent-light hover:text-accent-cyan transition-colors"
          >
            View full details <ArrowRight className="h-3 w-3" />
          </Link>

          <div className="mt-5 space-y-1.5 border-t border-border pt-4">
            {product.highlights.slice(0, 3).map((h) => (
              <div key={h} className="flex items-start gap-2 text-xs text-muted">
                <Star className="mt-0.5 h-3 w-3 shrink-0 fill-accent-cyan text-accent-cyan" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
