"use client";

import { useState } from "react";
import { ChevronDown, X, RotateCcw } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { categories } from "@/data/categories";
import { brands, allColors, allStorage, allRam, allProcessors, allScreenSizes } from "@/data/products";

export interface Filters {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  colors: string[];
  storage: string[];
  ram: string[];
  processors: string[];
  screenSizes: string[];
}

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  brands: [],
  minPrice: 0,
  maxPrice: 3500,
  minRating: 0,
  inStockOnly: false,
  colors: [],
  storage: [],
  ram: [],
  processors: [],
  screenSizes: [],
};

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-sm font-semibold text-white cursor-pointer"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 text-muted-2 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-3.5 flex flex-col gap-2.5">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-muted hover:text-white transition-colors">
      <span className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
            checked ? "border-accent bg-accent" : "border-border"
          )}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-white stroke-[2.5]">
              <path d="M2 6l2.5 2.5L10 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className={checked ? "text-white" : ""}>{label}</span>
      </span>
      {typeof count === "number" && <span className="text-xs text-muted-2">{count}</span>}
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

export function ProductFilters({
  filters,
  onChange,
  productCountByCategory,
  productCountByBrand,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  productCountByCategory: Record<string, number>;
  productCountByBrand: Record<string, number>;
}) {
  const toggleArray = (key: keyof Filters, value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    filters.storage.length +
    filters.ram.length +
    filters.processors.length +
    filters.screenSizes.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minPrice > DEFAULT_FILTERS.minPrice || filters.maxPrice < DEFAULT_FILTERS.maxPrice ? 1 : 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-display text-base font-semibold text-white">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="flex items-center gap-1 text-xs font-medium text-accent-light hover:text-accent-cyan cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        {categories.map((c) => (
          <CheckRow
            key={c.slug}
            label={c.name}
            checked={filters.categories.includes(c.slug)}
            onChange={() => toggleArray("categories", c.slug)}
            count={productCountByCategory[c.slug] ?? 0}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand">
        {brands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => toggleArray("brands", b)}
            count={productCountByBrand[b] ?? 0}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) || 0 })}
            className="w-full rounded-lg border border-border bg-bg-secondary px-2.5 py-1.5 text-xs text-white outline-none focus:border-accent/60"
          />
          <span className="text-muted-2">—</span>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) || 0 })}
            className="w-full rounded-lg border border-border bg-bg-secondary px-2.5 py-1.5 text-xs text-white outline-none focus:border-accent/60"
          />
        </div>
        <input
          type="range"
          min={0}
          max={3500}
          step={50}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="mt-1 w-full accent-accent"
        />
        <p className="text-xs text-muted-2">
          {formatCurrency(filters.minPrice)} – {formatCurrency(filters.maxPrice)}
        </p>
      </FilterSection>

      <FilterSection title="Rating">
        {[4, 3, 2, 1].map((r) => (
          <CheckRow
            key={r}
            label={`${r}★ & up`}
            checked={filters.minRating === r}
            onChange={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Availability">
        <CheckRow
          label="In Stock Only"
          checked={filters.inStockOnly}
          onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </FilterSection>

      <FilterSection title="Color" defaultOpen={false}>
        {allColors.map((c) => (
          <CheckRow
            key={c}
            label={c}
            checked={filters.colors.includes(c)}
            onChange={() => toggleArray("colors", c)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Storage" defaultOpen={false}>
        {allStorage.map((s) => (
          <CheckRow
            key={s}
            label={s}
            checked={filters.storage.includes(s)}
            onChange={() => toggleArray("storage", s)}
          />
        ))}
      </FilterSection>

      <FilterSection title="RAM" defaultOpen={false}>
        {allRam.map((r) => (
          <CheckRow
            key={r}
            label={r}
            checked={filters.ram.includes(r)}
            onChange={() => toggleArray("ram", r)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Processor" defaultOpen={false}>
        {allProcessors.map((p) => (
          <CheckRow
            key={p}
            label={p}
            checked={filters.processors.includes(p)}
            onChange={() => toggleArray("processors", p)}
          />
        ))}
      </FilterSection>

      <div className="pt-4">
        <p className="mb-3 text-sm font-semibold text-white">Screen Size</p>
        <div className="flex flex-wrap gap-2">
          {allScreenSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleArray("screenSizes", s)}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                filters.screenSizes.includes(s)
                  ? "border-accent bg-accent/15 text-accent-light"
                  : "border-border text-muted hover:text-white"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ActiveFilterPills({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const pills: { label: string; onRemove: () => void }[] = [
    ...filters.categories.map((c) => ({
      label: c,
      onRemove: () => onChange({ ...filters, categories: filters.categories.filter((x) => x !== c) }),
    })),
    ...filters.brands.map((b) => ({
      label: b,
      onRemove: () => onChange({ ...filters, brands: filters.brands.filter((x) => x !== b) }),
    })),
    ...filters.colors.map((c) => ({
      label: c,
      onRemove: () => onChange({ ...filters, colors: filters.colors.filter((x) => x !== c) }),
    })),
    ...(filters.minRating > 0
      ? [{ label: `${filters.minRating}★ & up`, onRemove: () => onChange({ ...filters, minRating: 0 }) }]
      : []),
    ...(filters.inStockOnly
      ? [{ label: "In Stock", onRemove: () => onChange({ ...filters, inStockOnly: false }) }]
      : []),
  ];

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills.map((p, i) => (
        <button
          key={`${p.label}-${i}`}
          onClick={p.onRemove}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-white hover:border-danger/50 cursor-pointer capitalize"
        >
          {p.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
