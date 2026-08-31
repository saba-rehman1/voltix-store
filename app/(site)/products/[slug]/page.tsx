import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/data/products";
import { ProductDetailView } from "@/components/product/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Voltix Store`,
      description: product.tagline,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">
) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) notFound();

  return <ProductDetailView product={product} />;
}
