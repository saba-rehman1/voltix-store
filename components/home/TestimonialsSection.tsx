"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal, StaggerContainer, staggerItem } from "@/components/ui/ScrollReveal";
import { Rating } from "@/components/ui/Rating";
import { SmartImage } from "@/components/ui/SmartImage";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <ScrollReveal>
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">
              Testimonials
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">
              Loved by thousands of customers
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              className="relative flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <Quote className="h-6 w-6 text-accent/40" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <SmartImage src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-muted-2">{t.role}</p>
                </div>
                <Rating value={t.rating} size={12} className="ml-auto" />
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
