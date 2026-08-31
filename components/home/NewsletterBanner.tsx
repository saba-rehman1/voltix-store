"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export function NewsletterBanner() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim().includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Voltix list!");
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20">
      <Container>
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/15 via-bg-secondary to-accent-cyan/10 p-8 text-center md:p-14">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div className="relative mx-auto flex max-w-lg flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-cyan shadow-glow">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-white md:text-3xl">
                Get early access to new drops
              </h2>
              <p className="mt-2 text-sm text-muted">
                Join 40,000+ subscribers for exclusive deals, product launches and tech guides.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-sm flex-col gap-2.5 sm:flex-row">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
                />
                <Button type="submit" className="justify-center whitespace-nowrap">
                  Subscribe <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-3 text-[11px] text-muted-2">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
