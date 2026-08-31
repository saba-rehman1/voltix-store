"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";

export function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="bg-bg-secondary py-16 md:py-20">
      <Container>
        <ScrollReveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">
                From the Journal
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">
                Guides &amp; Insights
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors sm:flex"
            >
              View all articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <motion.div whileHover={{ y: -5 }} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge variant="accent" className="absolute left-3 top-3">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-2">
                      {formatDate(post.date)} · {post.readTime}
                    </p>
                    <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold text-white group-hover:text-accent-light transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
