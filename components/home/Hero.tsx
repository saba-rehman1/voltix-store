"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Rating } from "@/components/ui/Rating";
import { formatCurrency } from "@/lib/utils";
import { getProduct } from "@/data/products";

const heroProduct = getProduct("voltix-airbook-pro-16-m4")!;
const heroProduct2 = getProduct("orion-16-pro-max")!;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-accent-cyan/15 blur-[120px]" />
      </div>

      <Container className="relative py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="cyan" className="mb-5">
                <Sparkles className="h-3 w-3" /> New Season Collection — 2026
              </Badge>
            </motion.div>

            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              {["Premium", "Tech."].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-3 inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-gradient inline-block"
              >
                Smarter Living.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
            >
              Curated laptops, smartphones, gaming gear and audio — chosen for people
              who expect precision engineering and design that lasts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/products"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
              >
                Shop Collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-white hover:border-white/30 transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-white" /> Watch Story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent-cyan" /> 2-Year Warranty
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-cyan" /> Free Express Shipping
              </div>
              <div className="flex items-center gap-2">
                <Rating value={4.9} size={12} /> 12,000+ reviews
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 to-accent-cyan/20 blur-2xl" />
              <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 p-3">
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                  <SmartImage
                    src={heroProduct.images[0]}
                    alt={heroProduct.name}
                    fill
                    sizes="480px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                scale: { duration: 0.6, delay: 0.8 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="glass absolute -left-4 bottom-8 hidden w-48 rounded-2xl border border-white/10 p-3 shadow-2xl sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-bg-secondary">
                  <SmartImage src={heroProduct2.thumbnail} alt={heroProduct2.name} fill sizes="44px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white">{heroProduct2.name}</p>
                  <p className="font-mono text-xs font-bold text-accent-cyan">
                    {formatCurrency(heroProduct2.price)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: [0, 12, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.95 },
                scale: { duration: 0.6, delay: 0.95 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }}
              className="glass absolute -right-2 top-4 hidden rounded-2xl border border-white/10 px-4 py-3 shadow-2xl md:block"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-2">Rated</p>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold text-white">4.9</span>
                <Rating value={4.9} size={12} />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
