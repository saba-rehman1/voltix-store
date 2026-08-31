import { products } from "./products";
import { categories } from "./categories";

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  total: number;
  status: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment: "Paid" | "Pending" | "Refunded";
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  orders: number;
  totalSpent: number;
  joined: string;
  status: "active" | "vip" | "new";
}

const FIRST_NAMES = ["Daniel", "Priya", "Marco", "Alex", "Grace", "Jordan", "Sam", "Nina", "Chris", "Owen", "Isabelle", "Ben", "Aisha", "Leo", "Devon", "Farah", "Katie", "Ravi", "Micah", "Yuki", "Elena", "Paul", "Trent", "Zoe", "Cody", "Aria", "Wesley", "Nadia", "Marcus", "Ivy"];
const LAST_NAMES = ["Reyes", "Kapoor", "Torres", "Whitfield", "Lin", "Blake", "Kim", "Foster", "Diaz", "Vance", "Moreau", "Chen", "Malik", "Novak", "Reid", "Haddad", "Brooks", "Sharma", "Jensen", "Tanaka", "Voss", "Garrett", "Holt", "Park", "Mills", "Nakamura", "Adler", "Farrow", "Lopez", "Chase"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

export const adminCustomers: AdminCustomer[] = FIRST_NAMES.map((first, i) => {
  const last = LAST_NAMES[i];
  const name = `${first} ${last}`;
  const orders = Math.floor(rand() * 12) + 1;
  const totalSpent = Math.round((orders * (150 + rand() * 900)) * 100) / 100;
  return {
    id: `cust-${i + 1}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@email.com`,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${["2563EB", "06B6D4", "22C55E", "F59E0B"][i % 4]}&color=fff&bold=true&size=100`,
    orders,
    totalSpent,
    joined: `202${4 + (i % 2)}-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 27) + 1).padStart(2, "0")}`,
    status: totalSpent > 4000 ? "vip" : orders <= 1 ? "new" : "active",
  };
});

export const adminOrders: AdminOrder[] = Array.from({ length: 28 }).map((_, i) => {
  const customer = adminCustomers[i % adminCustomers.length];
  const items = Math.floor(rand() * 3) + 1;
  const total = Math.round((items * (120 + rand() * 800)) * 100) / 100;
  const statuses: AdminOrder["status"][] = ["processing", "confirmed", "shipped", "delivered", "delivered", "delivered", "cancelled"];
  const status = statuses[Math.floor(rand() * statuses.length)];
  const day = 31 - i;
  return {
    id: `VLX-${109000 - i * 17}`,
    customer: customer.name,
    email: customer.email,
    date: `2026-08-${String(Math.max(1, day % 28) + 1).padStart(2, "0")}`,
    items,
    total,
    status,
    payment: status === "cancelled" ? "Refunded" : rand() > 0.1 ? "Paid" : "Pending",
  };
});

export const revenueByMonth = [
  { month: "Mar", revenue: 84200, orders: 312 },
  { month: "Apr", revenue: 91500, orders: 340 },
  { month: "May", revenue: 88700, orders: 328 },
  { month: "Jun", revenue: 102300, orders: 378 },
  { month: "Jul", revenue: 118900, orders: 421 },
  { month: "Aug", revenue: 134600, orders: 468 },
];

export const revenueByCategory = categories.map((c) => {
  const catProducts = products.filter((p) => p.category === c.slug);
  const revenue = catProducts.reduce((sum, p) => sum + p.price * (20 + Math.floor(rand() * 60)), 0);
  return { category: c.name, revenue: Math.round(revenue) };
});

export const topProducts = [...products]
  .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
  .slice(0, 6)
  .map((p, i) => ({
    ...p,
    unitsSold: 480 - i * 62,
    revenue: p.price * (480 - i * 62),
  }));

export const lowStockProducts = products.filter((p) => p.stock <= 20).sort((a, b) => a.stock - b.stock);

export const trafficSources = [
  { source: "Organic Search", value: 38 },
  { source: "Direct", value: 27 },
  { source: "Social", value: 18 },
  { source: "Email", value: 11 },
  { source: "Referral", value: 6 },
];
