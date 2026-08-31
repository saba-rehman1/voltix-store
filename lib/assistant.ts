import { products } from "@/data/products";
import { mockOrders } from "@/data/orders";
import { searchProducts } from "@/lib/search";
import { formatCurrency } from "@/lib/utils";
import type { CategorySlug, Order, Product } from "@/types";

/**
 * Voltix AI Shopping Assistant — reply engine
 * -------------------------------------------
 * This is a deterministic, rule-based engine that inspects the shopper's
 * message and returns a structured reply (text + optional product/order
 * attachments) by querying the site's real product & order catalogs.
 *
 * It is intentionally written as a single async entry point,
 * `getAssistantReply(message, history)`, that returns a Promise. Nothing
 * about the calling component depends on the reply being computed locally —
 * to wire up a real LLM backend later, replace the body of this function
 * with a `fetch("/api/assistant", { method: "POST", body: ... })` call and
 * keep the same `AssistantReply` return shape. Every helper below
 * (`recommendByBudget`, `compareProducts`, `recommendForUseCase`,
 * `trackOrder`) can also be exposed as standalone tool-calls for a future
 * function-calling / RAG setup.
 */

export interface AssistantReply {
  text: string;
  products?: Product[];
  order?: Order;
  suggestions?: string[];
}

const CATEGORY_KEYWORDS: Record<CategorySlug, string[]> = {
  laptops: ["laptop", "laptops", "notebook", "macbook", "ultrabook"],
  smartphones: ["phone", "phones", "smartphone", "smartphones", "iphone", "mobile"],
  gaming: ["console", "consoles", "ps5", "playstation", "xbox", "handheld", "controller", "gaming pc", "gaming"],
  headphones: ["headphone", "headphones", "earbuds", "anc", "noise cancel", "noise-cancel"],
  smartwatches: ["watch", "watches", "smartwatch", "smartwatches", "fitness tracker"],
  accessories: ["accessory", "accessories", "charger", "cable", "mouse", "keyboard", "hub"],
};

const USE_CASE_RULES: { keywords: string[]; label: string; filter: (p: Product) => boolean }[] = [
  {
    keywords: ["video editing", "video editor", "content creation", "rendering", "4k editing"],
    label: "video editing",
    filter: (p) => p.category === "laptops" && (p.tags.includes("creator") || p.tags.includes("flagship") || (p.ram ? parseInt(p.ram) >= 32 : false)),
  },
  {
    keywords: ["photography", "photo editing", "photographer"],
    label: "photography",
    filter: (p) => p.tags.includes("camera") || p.tags.includes("leica"),
  },
  {
    keywords: ["travel", "lightweight", "portable", "on the go", "frequent flyer"],
    label: "travel",
    filter: (p) => p.tags.includes("ultralight") || p.tags.includes("business") || p.tags.includes("travel"),
  },
  {
    keywords: ["competitive gaming", "esports", "fps", "ranked"],
    label: "competitive gaming",
    filter: (p) => p.tags.includes("esports") || p.tags.includes("high-refresh"),
  },
  {
    keywords: ["music production", "audiophile", "critical listening", "mixing", "studio"],
    label: "critical listening",
    filter: (p) => p.tags.includes("audiophile") || p.category === "headphones",
  },
  {
    keywords: ["business", "work", "office", "meetings", "productivity"],
    label: "business & productivity",
    filter: (p) => p.tags.includes("business") || (p.category === "laptops" && p.tags.includes("ultralight")),
  },
  {
    keywords: ["students", "student", "college", "school"],
    label: "students",
    filter: (p) => p.price < 1000 && (p.category === "laptops" || p.category === "smartphones"),
  },
];

function detectCategory(msg: string): CategorySlug | null {
  for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS) as [CategorySlug, string[]][]) {
    if (keywords.some((k) => msg.includes(k))) return slug;
  }
  return null;
}

function extractBudget(msg: string): number | null {
  const patterns = [
    /under\s*\$?\s*([\d,]+)/i,
    /below\s*\$?\s*([\d,]+)/i,
    /less than\s*\$?\s*([\d,]+)/i,
    /within\s*\$?\s*([\d,]+)/i,
    /budget of\s*\$?\s*([\d,]+)/i,
    /\$\s*([\d,]+)\s*budget/i,
    /max(?:imum)?\s*\$?\s*([\d,]+)/i,
  ];
  for (const re of patterns) {
    const m = msg.match(re);
    if (m) return parseInt(m[1].replace(/,/g, ""), 10);
  }
  return null;
}

function topByRating(list: Product[], n = 4) {
  return [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, n);
}

/** Recommend products, optionally scoped by category and/or a max budget. */
export function recommendByBudget(category: CategorySlug | null, budget: number | null): Product[] {
  let pool = products;
  if (category) pool = pool.filter((p) => p.category === category);
  if (budget) pool = pool.filter((p) => p.price <= budget);
  return topByRating(pool, 4);
}

/** Suggest products matching a described use-case (e.g. "video editing"). */
export function recommendForUseCase(msg: string): { label: string; products: Product[] } | null {
  for (const rule of USE_CASE_RULES) {
    if (rule.keywords.some((k) => msg.includes(k))) {
      const matches = topByRating(products.filter(rule.filter), 4);
      if (matches.length) return { label: rule.label, products: matches };
    }
  }
  return null;
}

function findClosestProduct(term: string): Product | null {
  const t = term.trim().toLowerCase();
  if (!t) return null;
  const direct = products.find(
    (p) => p.name.toLowerCase() === t || p.slug === t.replace(/\s+/g, "-")
  );
  if (direct) return direct;
  const scored = searchProducts(t, 1);
  return scored[0] ?? null;
}

/** Compare two products referenced by free-text names (e.g. from "X vs Y"). */
export function compareProducts(a: string, b: string): { pa: Product; pb: Product } | null {
  const pa = findClosestProduct(a);
  const pb = findClosestProduct(b);
  if (!pa || !pb || pa.id === pb.id) return null;
  return { pa, pb };
}

function buildComparisonText(pa: Product, pb: Product): string {
  const lines = [
    `Here's how the ${pa.name} stacks up against the ${pb.name}:`,
    ``,
    `• Price — ${pa.name}: ${formatCurrency(pa.price)} · ${pb.name}: ${formatCurrency(pb.price)}`,
    `• Rating — ${pa.name}: ${pa.rating}★ (${pa.reviewCount} reviews) · ${pb.name}: ${pb.rating}★ (${pb.reviewCount} reviews)`,
  ];
  const specA = pa.specs[0];
  const specB = pb.specs[0];
  if (specA && specB) {
    lines.push(`• ${specA.label} — ${pa.name}: ${specA.value} · ${pb.name}: ${specB.value}`);
  }
  const ramA = pa.ram, ramB = pb.ram;
  if (ramA || ramB) lines.push(`• Memory — ${pa.name}: ${ramA ?? "—"} · ${pb.name}: ${ramB ?? "—"}`);

  const winner = pa.rating === pb.rating ? (pa.price <= pb.price ? pa : pb) : pa.rating > pb.rating ? pa : pb;
  const loser = winner.id === pa.id ? pb : pa;
  lines.push(``);
  lines.push(
    `My pick: the ${winner.name} — it ${
      winner.rating !== loser.rating ? "edges ahead on rating" : "gives you more for the price"
    } while the ${loser.name} is still a solid choice if ${
      loser.price < winner.price ? "budget is the priority" : "you prefer its design"
    }.`
  );
  return lines.join("\n");
}

const ORDER_ID_RE = /VLX-\d{5,7}/i;

/** Track a specific order by ID, or fall back to the shopper's most recent order. */
export function trackOrder(msg: string): Order | null {
  const idMatch = msg.match(ORDER_ID_RE);
  if (idMatch) {
    const found = mockOrders.find((o) => o.id.toLowerCase() === idMatch[0].toLowerCase());
    if (found) return found;
  }
  const active = mockOrders.find((o) => o.status !== "delivered" && o.status !== "cancelled");
  return active ?? mockOrders[0] ?? null;
}

function orderStatusText(order: Order): string {
  const eta = order.eta ? ` ${order.eta}.` : "";
  return `Order ${order.id} is currently **${order.status.replace(/-/g, " ")}**.${eta} It contains ${
    order.items.length
  } item${order.items.length > 1 ? "s" : ""} totaling ${formatCurrency(order.total)}.`;
}

const GREETING_RE = /^\s*(hi|hello|hey|yo|sup|good (morning|afternoon|evening))\b/i;
const HELP_RE = /what can you do|help me|your capabilities|how do you work/i;
const THANKS_RE = /^\s*(thanks|thank you|thx|appreciate it)/i;

export const STARTER_SUGGESTIONS = [
  "Recommend a gaming laptop under $1500",
  "Compare Orion 16 Pro Max vs Galactic S25 Ultra",
  "Best headphones for travel",
  "Track my order",
];

export async function getAssistantReply(rawMessage: string): Promise<AssistantReply> {
  const msg = rawMessage.trim().toLowerCase();

  if (!msg) {
    return { text: "Go ahead — ask me about a product, a comparison, or an order." };
  }

  if (GREETING_RE.test(msg)) {
    return {
      text:
        "Hey there! I'm the Voltix AI Assistant. I can recommend products by budget, compare two items head-to-head, suggest gear for a specific use case, or track an existing order. What can I help with?",
      suggestions: STARTER_SUGGESTIONS,
    };
  }

  if (THANKS_RE.test(msg)) {
    return { text: "Anytime! Let me know if there's anything else you'd like me to find." };
  }

  if (HELP_RE.test(msg)) {
    return {
      text:
        "I can help in a few ways:\n\n• \"Recommend a gaming laptop under $1500\"\n• \"Compare [Product A] vs [Product B]\"\n• \"What's the best laptop for video editing?\"\n• \"Track my order\" or \"Where is VLX-108551?\"",
      suggestions: STARTER_SUGGESTIONS,
    };
  }

  // Order tracking
  if (/track|order status|where is my order|my order|shipment|delivery status/.test(msg) || ORDER_ID_RE.test(msg)) {
    const order = trackOrder(msg);
    if (order) {
      return { text: orderStatusText(order), order };
    }
    return { text: "I couldn't find an order matching that. Try an order ID like VLX-108551, or check your dashboard's Orders tab." };
  }

  // Comparison
  const compareMatch = msg.match(/(?:compare\s+)?(.+?)\s+(?:vs\.?|versus)\s+(.+)/i) ?? (msg.startsWith("compare ") ? msg.slice(8).split(/\s+and\s+/i) : null);
  if (compareMatch) {
    const a = Array.isArray(compareMatch) ? compareMatch[0] : compareMatch[1];
    const b = Array.isArray(compareMatch) ? compareMatch[1] : compareMatch[2];
    if (a && b) {
      const result = compareProducts(a, b);
      if (result) {
        return { text: buildComparisonText(result.pa, result.pb), products: [result.pa, result.pb] };
      }
      return {
        text: "I couldn't confidently match both of those to products in our catalog. Try naming them more precisely, e.g. \"Orion 16 Pro Max vs Galactic S25 Ultra\".",
      };
    }
  }

  // Use-case based recommendation
  const useCase = recommendForUseCase(msg);
  if (useCase) {
    return {
      text: `For ${useCase.label}, here's what I'd recommend from our lineup:`,
      products: useCase.products,
    };
  }

  // Budget / category recommendation
  const category = detectCategory(msg);
  const budget = extractBudget(msg);
  if (category || budget || /recommend|suggest|looking for|need a|show me/.test(msg)) {
    const picks = recommendByBudget(category, budget);
    if (picks.length) {
      const scope = category ? categoryLabel(category) : "products";
      const budgetText = budget ? ` under ${formatCurrency(budget)}` : "";
      return {
        text: `Here are top-rated ${scope}${budgetText} I'd suggest:`,
        products: picks,
      };
    }
    if (budget) {
      return { text: `I couldn't find anything in stock at that price point — want me to check a slightly higher budget?` };
    }
  }

  // Fallback: free-text search against the catalog
  const searchResults = searchProducts(rawMessage, 4);
  if (searchResults.length) {
    return { text: `Here's what I found related to "${rawMessage.trim()}":`, products: searchResults };
  }

  return {
    text:
      "I'm not quite sure how to help with that yet — I'm best at product recommendations, comparisons, use-case suggestions, and order tracking. Try one of these:",
    suggestions: STARTER_SUGGESTIONS,
  };
}

function categoryLabel(slug: CategorySlug): string {
  const map: Record<CategorySlug, string> = {
    laptops: "laptops",
    smartphones: "smartphones",
    gaming: "gaming picks",
    headphones: "headphones",
    smartwatches: "smart watches",
    accessories: "accessories",
  };
  return map[slug];
}
