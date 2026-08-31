import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqPageClient } from "@/components/faq/FaqPageClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about orders, shipping, returns, warranty, payments and your Voltix Store account — or ask the AI Assistant for anything else.",
};

export default function FaqPage() {
  return (
    <Container className="max-w-3xl py-8 md:py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">Support</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Can&apos;t find what you&apos;re looking for? Our AI Assistant in the bottom-right corner can answer
          product-specific questions instantly.
        </p>
      </div>
      <FaqPageClient />
    </Container>
  );
}
