import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { blogPosts, getBlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { ShareButton } from "@/components/shared/ShareButton";

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Voltix Store Journal`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((b) => b.slug !== post.slug && b.category === post.category).slice(0, 3);
  const fallbackRelated = related.length
    ? related
    : blogPosts.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <article>
      <Container className="max-w-3xl py-8 md:py-12">
        <ScrollReveal>
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the Journal
          </Link>

          <Badge variant="accent">{post.category}</Badge>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <SmartImage src={post.authorAvatar} alt={post.author} width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-sm font-semibold text-white">{post.author}</p>
                <p className="text-xs text-muted-2">
                  {formatDate(post.date)} &middot; {post.readTime}
                </p>
              </div>
            </div>
            <ShareButton title={post.title} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <SmartImage src={post.image} alt={post.title} fill sizes="768px" className="object-cover" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col gap-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-muted md:text-base">
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </Container>

      <div className="border-t border-border bg-bg-secondary py-14">
        <Container>
          <h2 className="mb-6 font-display text-xl font-bold text-white md:text-2xl">More from the Journal</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {fallbackRelated.map((r, i) => (
              <ScrollReveal key={r.id} delay={i * 0.06}>
                <Link href={`/blog/${r.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SmartImage
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-display text-sm font-semibold text-white group-hover:text-accent-light transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-2">{formatDate(r.date)}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </div>
    </article>
  );
}
