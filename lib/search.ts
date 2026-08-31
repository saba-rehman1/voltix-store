import { products } from "@/data/products";
import type { Product } from "@/types";

export function searchProducts(query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = products
    .map((p) => {
      const name = p.name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const category = p.category.toLowerCase();
      const tags = p.tags.join(" ").toLowerCase();

      let score = 0;
      if (name === q) score += 100;
      if (name.startsWith(q)) score += 50;
      if (name.includes(q)) score += 30;
      if (brand.includes(q)) score += 20;
      if (category.includes(q)) score += 15;
      if (tags.includes(q)) score += 10;
      if (p.tagline.toLowerCase().includes(q)) score += 5;

      return { product: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.product);
}
