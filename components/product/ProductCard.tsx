"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, Scale, ShoppingBag, Star, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { cn, formatCurrency, discountPercent } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCompareStore } from "@/store/compareStore";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const router = useRouter();
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isCompared = useCompareStore((s) => s.has(product.id));
  const toggleCompare = useCompareStore((s) => s.toggle);
  const addToCart = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const openQuickView = useUIStore((s) => s.openQuickView);

  const discount = discountPercent(product.price, product.compareAtPrice);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist", { icon: "❤️" });
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    const result = toggleCompare(product.id);
    if (result.message) {
      toast.error(result.message);
    } else {
      toast.success(result.added ? "Added to compare" : "Removed from compare");
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    openQuickView(product.slug);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = typeof window !== "undefined" ? `${window.location.origin}/products/${product.slug}` : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user cancelled share — no-op
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product.id, 1);
    setCartOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(product.id, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-white/15"
    >
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-bg-secondary">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <SmartImage
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {discount > 0 && <Badge variant="danger">-{discount}%</Badge>}
            {product.newArrival && <Badge variant="cyan">New</Badge>}
            {product.bestSeller && <Badge variant="accent">Bestseller</Badge>}
            {outOfStock && <Badge variant="neutral">Out of stock</Badge>}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            <IconAction active={isWishlisted} onClick={handleWishlist} label="Wishlist">
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
            </IconAction>
            <IconAction active={isCompared} onClick={handleCompare} label="Compare">
              <Scale className="h-4 w-4" />
            </IconAction>
            <IconAction onClick={handleQuickView} label="Quick view">
              <Eye className="h-4 w-4" />
            </IconAction>
            <IconAction onClick={handleShare} label="Share">
              <Share2 className="h-4 w-4" />
            </IconAction>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/85 to-transparent p-3 pt-8 transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-bg transition-colors hover:bg-white/90 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-cyan">
            {product.brand}
          </p>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-white">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            <span className="font-medium text-white">{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>
          {lowStock && !outOfStock && (
            <p className="mt-1 text-[11px] font-medium text-warning">
              Only {product.stock} left
            </p>
          )}
          <div className="mt-auto flex items-end justify-between pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-white">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-xs text-muted-2 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="text-[11px] font-semibold text-accent-light hover:text-accent-cyan transition-colors disabled:opacity-40 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function IconAction({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors cursor-pointer",
        active
          ? "bg-accent text-white"
          : "bg-black/50 text-white hover:bg-black/70"
      )}
    >
      {children}
    </button>
  );
}
