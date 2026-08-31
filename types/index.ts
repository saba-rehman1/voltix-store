export type CategorySlug =
  | "laptops"
  | "smartphones"
  | "gaming"
  | "headphones"
  | "smartwatches"
  | "accessories";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount?: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  color?: string;
  colorHex?: string;
  storage?: string;
  ram?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  featured?: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  flashSale?: boolean;
  flashSaleEndsAt?: string;
  specs: ProductSpec[];
  highlights: string[];
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  ramOptions?: string[];
  processorOptions?: string[];
  screenSize?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  color?: string;
  warranty: string;
  reviews: Review[];
  tags: string[];
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export type OrderStatus =
  | "processing"
  | "confirmed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  trackingSteps: { label: string; date: string; done: boolean }[];
  address: string;
  eta: string;
}

export interface SavedCard {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex";
  last4: string;
  expiry: string;
  holder: string;
  isDefault?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface CartLineItem {
  productId: string;
  quantity: number;
  variant?: string;
  savedForLater?: boolean;
}
