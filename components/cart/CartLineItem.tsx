"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, Heart, RotateCcw } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatCurrency } from "@/lib/utils";
import type { ResolvedCartLine } from "@/lib/cart";

export function CartLineItem({
  line,
  onUpdateQty,
  onRemove,
  onSaveForLater,
  onMoveToCart,
  compact = false,
}: {
  line: ResolvedCartLine;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  onSaveForLater?: () => void;
  onMoveToCart?: () => void;
  compact?: boolean;
}) {
  const { product, quantity, variant, savedForLater } = line;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      className="flex gap-3 py-4"
    >
      <Link
        href={`/products/${product.slug}`}
        className={compact ? "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bg-secondary" : "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-bg-secondary"}
      >
        <SmartImage src={product.thumbnail} alt={product.name} fill sizes="96px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium text-white hover:text-accent-light">
              {product.name}
            </Link>
            {variant && <p className="mt-0.5 text-xs text-muted-2">{variant}</p>}
          </div>
          <button onClick={onRemove} className="shrink-0 text-muted-2 hover:text-danger cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          {!savedForLater ? (
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => onUpdateQty(quantity - 1)}
                className="p-1.5 text-muted hover:text-white cursor-pointer"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-7 text-center text-xs font-medium">{quantity}</span>
              <button
                onClick={() => onUpdateQty(quantity + 1)}
                className="p-1.5 text-muted hover:text-white cursor-pointer"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onMoveToCart}
              className="flex items-center gap-1.5 text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Move to cart
            </button>
          )}
          <span className="font-mono text-sm font-semibold text-white">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>

        {!savedForLater && onSaveForLater && (
          <button
            onClick={onSaveForLater}
            className="mt-2 flex items-center gap-1.5 self-start text-[11px] font-medium text-muted-2 hover:text-white cursor-pointer"
          >
            <Heart className="h-3 w-3" /> Save for later
          </button>
        )}
      </div>
    </motion.div>
  );
}
