import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Buying guides, deep dives and explainers on the tech that matters — from laptop chip architecture to noise cancellation, straight from the Voltix Store editorial team.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <Container className="py-8 md:py-12">
      <ScrollReveal>
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">The Journal</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            Guides &amp; Insights
          </h1>
          <p className="mt-3 text-muted">
            Buying guides, deep dives and explainers from our editorial team — written to help you buy smarter,
            not just buy more.
          </p>
        </div>
      </ScrollReveal>

      {featured && (
        <ScrollReveal delay={0.05}>
          <Link href={`/blog/${featured.slug}`} className="group mb-10 grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <SmartImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <Badge variant="accent" className="w-fit">{featured.category}</Badge>
              <h2 className="mt-4 font-display text-2xl font-bold text-white transition-colors group-hover:text-accent-light md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{featured.excerpt}</p>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted-2">
                <SmartImage
                  src={featured.authorAvatar}
                  alt={featured.author}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="font-medium text-white">{featured.author}</span>
                <span>&middot;</span>
                <span>{formatDate(featured.date)}</span>
                <span>&middot;</span>
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.06}>
            <Link href={`/blog/${post.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-white/15">
              <div className="relative aspect-[16/10] overflow-hidden">
                <SmartImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge variant="accent" className="absolute left-3 top-3">{post.category}</Badge>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-2">
                  {formatDate(post.date)} &middot; {post.readTime}
                </p>
                <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold text-white transition-colors group-hover:text-accent-light">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <p className="mt-3 text-xs font-medium text-muted-2">By {post.author}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  );
}
