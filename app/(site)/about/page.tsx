import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AboutValues } from "@/components/about/AboutValues";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Voltix Store curates premium tech from the world's best brands — 30+ hand-picked products, a 30-day return policy, and an AI shopping assistant built to help you buy smarter.",
};

const TEAM = [
  { name: "Sasha Reyes", role: "Founder & CEO" },
  { name: "Marcus Cole", role: "Head of Curation" },
  { name: "Priya Natarajan", role: "Head of Engineering" },
  { name: "Devon Ruiz", role: "Head of Customer Experience" },
];

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=161B22&color=B8C0CC&bold=true&size=200`;

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="section-glow absolute inset-0" />
        <Container className="relative py-16 md:py-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">Our Story</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl">
              Premium tech, <span className="text-gradient">chosen carefully.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Voltix Store started with a simple frustration: shopping for electronics online meant wading through
              thousands of near-identical listings to find the handful worth buying. We built the store we wished
              existed — every product tested, every spec sheet verified, every question answerable in seconds.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="border-b border-border bg-bg-secondary">
        <Container>
          <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {[
              { value: 128000, suffix: "+", label: "Happy Customers" },
              { value: 30, suffix: "+", label: "Curated Products" },
              { value: 2022, suffix: "", label: "Founded" },
              { value: 40, suffix: "+", label: "Countries Served" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.08}>
                <div className="text-center md:text-left">
                  <div className="font-display text-3xl font-bold text-white md:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-1.5 text-xs uppercase tracking-wide text-muted">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-10 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">What we stand for</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Four principles behind every product we sell
              </h2>
            </div>
          </ScrollReveal>

          <AboutValues />
        </Container>
      </section>

      <section className="border-y border-border bg-bg-secondary py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-10 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">Leadership</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                The team behind Voltix Store
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {TEAM.map((m, i) => (
              <ScrollReveal key={m.name} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-card p-5 text-center">
                  <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full border border-border">
                    <SmartImage src={avatar(m.name)} alt={m.name} fill sizes="80px" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-muted">{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="mb-10 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">In their words</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                Trusted by tens of thousands of shoppers
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <p className="flex-1 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3">
                    <SmartImage src={t.avatar} alt={t.name} width={36} height={36} className="rounded-full" />
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-muted-2">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-gradient-to-br from-accent/10 to-accent-cyan/10 py-16 md:py-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Ready to find your next favorite device?
          </h2>
          <p className="max-w-md text-sm text-muted">
            Browse the full catalog, or let our AI Assistant recommend something in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button size="lg">Shop All Products</Button>
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors">
              Contact Us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
