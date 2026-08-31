"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AccordionItem } from "@/components/shared/Accordion";
import { faqs } from "@/data/faqs";

export function FaqPreview() {
  const items = faqs.slice(0, 5);

  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-3xl">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">FAQ</p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-white md:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-3">
          {items.map((f, i) => (
            <ScrollReveal key={f.question} delay={i * 0.05}>
              <AccordionItem question={f.question} answer={f.answer} defaultOpen={i === 0} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent-cyan transition-colors"
          >
            View all FAQs <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
