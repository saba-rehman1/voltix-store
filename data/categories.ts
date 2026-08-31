import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "laptops",
    name: "Laptops",
    description: "Power and portability for creators, developers & professionals.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    icon: "Laptop",
  },
  {
    slug: "smartphones",
    name: "Smartphones",
    description: "Flagship phones with the latest cameras, chips & displays.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    icon: "Smartphone",
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Consoles, controllers & peripherals built for competitive play.",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=1200&auto=format&fit=crop",
    icon: "Gamepad2",
  },
  {
    slug: "headphones",
    name: "Headphones",
    description: "Studio-grade sound and industry-leading noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    icon: "Headphones",
  },
  {
    slug: "smartwatches",
    name: "Smart Watches",
    description: "Track fitness, health & notifications from your wrist.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    icon: "Watch",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The essential gear that completes your setup.",
    image: "https://images.unsplash.com/photo-1618410320928-25228d811631?q=80&w=1200&auto=format&fit=crop",
    icon: "Cable",
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
