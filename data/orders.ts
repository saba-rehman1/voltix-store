import type { Order, Address, SavedCard } from "@/types";
import { products } from "./products";

const p = (id: string) => products.find((x) => x.id === id)!;

export const mockOrders: Order[] = [
  {
    id: "VLX-108492",
    date: "2026-08-24",
    status: "delivered",
    items: [
      { productId: "p01", name: p("p01").name, image: p("p01").thumbnail, price: p("p01").price, quantity: 1 },
      { productId: "p28", name: p("p28").name, image: p("p28").thumbnail, price: p("p28").price, quantity: 1 },
    ],
    subtotal: 2598,
    shipping: 0,
    tax: 207.84,
    total: 2805.84,
    trackingSteps: [
      { label: "Order Placed", date: "2026-08-24", done: true },
      { label: "Processing", date: "2026-08-24", done: true },
      { label: "Shipped", date: "2026-08-25", done: true },
      { label: "Out for Delivery", date: "2026-08-27", done: true },
      { label: "Delivered", date: "2026-08-27", done: true },
    ],
    address: "412 Bellevue Ave, Austin, TX 78701",
    eta: "Delivered Aug 27",
  },
  {
    id: "VLX-108551",
    date: "2026-08-29",
    status: "out-for-delivery",
    items: [
      { productId: "p18", name: p("p18").name, image: p("p18").thumbnail, price: p("p18").price, quantity: 1, variant: "Black" },
    ],
    subtotal: 399,
    shipping: 0,
    tax: 31.92,
    total: 430.92,
    trackingSteps: [
      { label: "Order Placed", date: "2026-08-29", done: true },
      { label: "Processing", date: "2026-08-29", done: true },
      { label: "Shipped", date: "2026-08-30", done: true },
      { label: "Out for Delivery", date: "2026-08-31", done: true },
      { label: "Delivered", date: "", done: false },
    ],
    address: "412 Bellevue Ave, Austin, TX 78701",
    eta: "Arriving today, by 8 PM",
  },
  {
    id: "VLX-107920",
    date: "2026-08-15",
    status: "shipped",
    items: [
      { productId: "p07", name: p("p07").name, image: p("p07").thumbnail, price: p("p07").price, quantity: 1, variant: "Titanium Black · 256GB" },
      { productId: "p30", name: p("p30").name, image: p("p30").thumbnail, price: p("p30").price, quantity: 1 },
    ],
    subtotal: 1328,
    shipping: 0,
    tax: 106.24,
    total: 1434.24,
    trackingSteps: [
      { label: "Order Placed", date: "2026-08-15", done: true },
      { label: "Processing", date: "2026-08-15", done: true },
      { label: "Shipped", date: "2026-08-16", done: true },
      { label: "Out for Delivery", date: "", done: false },
      { label: "Delivered", date: "", done: false },
    ],
    address: "77 Harbor View Dr, Seattle, WA 98101",
    eta: "Arriving Sep 3",
  },
  {
    id: "VLX-107655",
    date: "2026-08-02",
    status: "processing",
    items: [
      { productId: "p13", name: p("p13").name, image: p("p13").thumbnail, price: p("p13").price, quantity: 1 },
    ],
    subtotal: 699,
    shipping: 0,
    tax: 55.92,
    total: 754.92,
    trackingSteps: [
      { label: "Order Placed", date: "2026-08-02", done: true },
      { label: "Processing", date: "2026-08-02", done: true },
      { label: "Shipped", date: "", done: false },
      { label: "Out for Delivery", date: "", done: false },
      { label: "Delivered", date: "", done: false },
    ],
    address: "412 Bellevue Ave, Austin, TX 78701",
    eta: "Backordered — arriving Sep 6",
  },
  {
    id: "VLX-106304",
    date: "2026-07-11",
    status: "cancelled",
    items: [
      { productId: "p15", name: p("p15").name, image: p("p15").thumbnail, price: p("p15").price, quantity: 1 },
    ],
    subtotal: 799,
    shipping: 0,
    tax: 63.92,
    total: 862.92,
    trackingSteps: [
      { label: "Order Placed", date: "2026-07-11", done: true },
      { label: "Processing", date: "2026-07-11", done: true },
      { label: "Cancelled", date: "2026-07-12", done: true },
    ],
    address: "412 Bellevue Ave, Austin, TX 78701",
    eta: "Cancelled — refunded Jul 14",
  },
];

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    fullName: "Jordan Blake",
    line1: "412 Bellevue Ave",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "United States",
    phone: "+1 (512) 555-0148",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    fullName: "Jordan Blake",
    line1: "77 Harbor View Dr",
    line2: "Suite 400",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "United States",
    phone: "+1 (206) 555-0117",
  },
];

export const mockCards: SavedCard[] = [
  { id: "card-1", brand: "Visa", last4: "4242", expiry: "09/28", holder: "Jordan Blake", isDefault: true },
  { id: "card-2", brand: "Mastercard", last4: "8390", expiry: "02/27", holder: "Jordan Blake" },
];
