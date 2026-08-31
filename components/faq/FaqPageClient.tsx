"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AccordionItem } from "@/components/shared/Accordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/faqs";

const CATEGORIES = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export function FaqPageClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesQuery =
        !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqs>();
    for (const f of filtered) {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs…"
          className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-white placeholder:text-muted-2 outline-none transition-colors focus:border-accent/60"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
              category === c
                ? "border-accent bg-accent/15 text-accent-light"
                : "border-border bg-card text-muted hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {grouped.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted">No FAQs match &ldquo;{query}&rdquo; — try the AI Assistant instead.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {grouped.map(([cat, items]) => (
            <div key={cat}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-2">{cat}</h2>
              <div className="flex flex-col gap-3">
                {items.map((f, i) => (
                  <ScrollReveal key={f.question} delay={Math.min(i * 0.04, 0.2)}>
                    <AccordionItem question={f.question} answer={f.answer} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
