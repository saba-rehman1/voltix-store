import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FlashSaleSection } from "@/components/home/FlashSaleSection";
import { ProductRail } from "@/components/home/ProductRail";
import { ValueProps } from "@/components/home/ValueProps";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FaqPreview } from "@/components/home/FaqPreview";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { products } from "@/data/products";

export default function HomePage() {
  const trending = products.filter((p) => p.trending).slice(0, 8);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <Hero />
      <StatsBar />
      <CategoriesSection />
      <ProductRail
        eyebrow="Handpicked"
        title="Featured Products"
        subtitle="Our curators' picks — the best of what's new and noteworthy this season."
        products={featured}
        viewAllHref="/products"
      />
      <FlashSaleSection />
      <ProductRail
        eyebrow="Right now"
        title="Trending Products"
        products={trending}
        viewAllHref="/products?filter=trending"
        bg="secondary"
      />
      <ValueProps />
      <ProductRail
        eyebrow="Customer favorites"
        title="Best Sellers"
        products={bestSellers}
        viewAllHref="/products?filter=bestsellers"
      />
      <ProductRail
        eyebrow="Just landed"
        title="New Arrivals"
        products={newArrivals}
        viewAllHref="/products?filter=new"
        bg="secondary"
      />
      <TestimonialsSection />
      <BlogPreview />
      <FaqPreview />
      <NewsletterBanner />
    </>
  );
}
