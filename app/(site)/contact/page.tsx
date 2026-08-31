import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the Voltix Store team by email, phone or live chat — or send us a message and we'll respond within one business day.",
};

const CHANNELS = [
  {
    icon: Mail,
    title: "Email",
    detail: "support@voltixstore.com",
    sub: "Replies within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+1 (800) 555-0192",
    sub: "Mon–Fri, 8am–8pm EST",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    detail: "AI Assistant",
    sub: "Bottom-right corner, 24/7",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    detail: "412 Bellevue Ave, Austin, TX",
    sub: "By appointment only",
  },
];

export default function ContactPage() {
  return (
    <Container className="py-8 md:py-12">
      <ScrollReveal>
        <div className="mb-10 max-w-xl text-center mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-cyan">Get in Touch</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">We&apos;d love to hear from you</h1>
          <p className="mt-3 text-muted">
            Questions about an order, a product, or a partnership — send us a message and a real person will
            follow up. For instant answers, try the AI Assistant.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
        <ScrollReveal delay={0.05}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {CHANNELS.map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-cyan/20 text-accent-light">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-2">{c.title}</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">{c.detail}</p>
                  <p className="mt-0.5 text-xs text-muted">{c.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </Container>
  );
}
