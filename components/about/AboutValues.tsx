"use client";

import { Sparkles, ShieldCheck, Leaf, Users } from "lucide-react";
import { StaggerContainer } from "@/components/ui/ScrollReveal";
import { AboutValueCard } from "@/components/about/AboutValueCard";

const VALUES = [
  {
    icon: Sparkles,
    title: "Curated, not crowded",
    desc: "We stock 30 hand-picked products, not 30,000. Every item earns its place through hands-on testing.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity guaranteed",
    desc: "Every product ships sealed, genuine, and backed by full manufacturer warranty — no grey-market imports.",
  },
  {
    icon: Leaf,
    title: "Built to last",
    desc: "We favor repairable, well-supported hardware over disposable gadgets — better for you and the planet.",
  },
  {
    icon: Users,
    title: "People-first support",
    desc: "Real humans and our AI assistant work together so you always get a fast, accurate answer.",
  },
];

export function AboutValues() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {VALUES.map((v) => (
        <AboutValueCard key={v.title} icon={v.icon} title={v.title} desc={v.desc} />
      ))}
    </StaggerContainer>
  );
}
