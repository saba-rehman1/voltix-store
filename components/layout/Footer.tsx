"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { Zap, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { categories } from "@/data/categories";

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Track Order", href: "/dashboard/orders" },
];

const HELP_LINKS = [
  { label: "Shipping Info", href: "/faq" },
  { label: "Returns & Exchanges", href: "/faq" },
  { label: "Warranty", href: "/faq" },
  { label: "Admin Dashboard", href: "/admin" },
];

function FacebookIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.44c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H7.99v2.96h2.47V21h3.04Z" />
    </svg>
  );
}
function InstagramIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7.2 8.6L4.4 20h1.8l6.1-6.6 4.5 6.6H20l-7.5-9 6.4-7.5h-1.8l-5.6 6-4-6H4Z" />
    </svg>
  );
}
function YoutubeIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay", "Stripe"];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim().includes("@")) {
      toast.error("Enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! Welcome to Voltix.");
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-bg-secondary bg-noise">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-cyan shadow-glow">
                <Zap className="h-[18px] w-[18px] fill-white text-white" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                VOLTIX<span className="text-accent-cyan">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Premium Tech. Smarter Living. Curated electronics for people who expect
              more from what they own.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-muted">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent-light" />
                548 Innovation Way, Austin, TX 78701
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent-light" />
                +1 (800) 555-0192
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-light" />
                support@voltix.store
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:border-accent/50 hover:text-white transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-white">Categories</h4>
            <ul className="flex flex-col gap-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="text-sm text-muted hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-white">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-semibold text-white">Stay in the loop</h4>
            <p className="mb-3 text-sm text-muted">Get early access to drops & deals.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              />
              <Button type="submit" size="sm" variant="primary" className="justify-center">
                Subscribe <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-muted-2">
            © {new Date().getFullYear()} Voltix Store. All rights reserved. Design & development portfolio project.
          </p>
          <div className="flex items-center gap-2">
            {PAYMENT_METHODS.map((p) => (
              <span
                key={p}
                className="rounded-md border border-border bg-card px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
