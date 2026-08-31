"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { products as seedProducts } from "@/data/products";
import { categories } from "@/data/categories";
import { formatCurrency, cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  useDocumentTitle("Products", "Voltix Admin");
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (query && !`${p.name} ${p.brand} ${p.sku}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [products, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed from catalog");
  };

  const handleSaveEdit = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditing(null);
    toast.success("Product updated");
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 sm:w-72">
            <Search className="h-4 w-4 text-muted-2" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search products, SKU..."
              className="w-full bg-transparent text-sm text-white placeholder:text-muted-2 outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-white outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <Button size="sm" onClick={() => setAddOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Add Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-2">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Rating</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                      <SmartImage src={p.thumbnail} alt={p.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-white">{p.name}</p>
                      <p className="text-[11px] text-muted-2">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs capitalize text-muted">{p.category}</td>
                <td className="p-4 font-mono text-xs font-semibold text-white">{formatCurrency(p.price)}</td>
                <td className="p-4 text-xs">
                  <span className={cn(p.stock === 0 ? "text-danger" : p.stock <= 10 ? "text-warning" : "text-muted")}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4 text-xs text-muted">{p.rating} ★</td>
                <td className="p-4">
                  <Badge variant={p.stock === 0 ? "danger" : p.stock <= 10 ? "warning" : "success"}>
                    {p.stock === 0 ? "Out of stock" : p.stock <= 10 ? "Low stock" : "In stock"}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditing(p)} className="text-muted-2 hover:text-white cursor-pointer">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-muted-2 hover:text-danger cursor-pointer">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-8 w-8 rounded-lg text-xs font-medium cursor-pointer",
                page === i + 1 ? "bg-gradient-to-r from-accent to-accent-cyan text-white" : "border border-border text-muted hover:text-white"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} widthClass="max-w-md">
        {editing && <ProductForm product={editing} onSave={handleSaveEdit} onCancel={() => setEditing(null)} />}
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} widthClass="max-w-md">
        <ProductForm
          onSave={(p) => {
            setProducts((prev) => [{ ...p, id: `p-new-${Date.now()}` }, ...prev]);
            setAddOpen(false);
            toast.success("Product added to catalog");
          }}
          onCancel={() => setAddOpen(false)}
        />
      </Modal>
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    brand: product?.brand ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    category: product?.category ?? "accessories",
  });

  const handleSubmit = () => {
    if (!form.name || !form.brand || form.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    onSave({
      ...(product ?? seedProducts[0]),
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    } as Product);
  };

  return (
    <div className="p-6">
      <h2 className="mb-5 font-display text-lg font-semibold text-white">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <div className="flex flex-col gap-3.5">
        <TextField label="Product Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <TextField label="Brand" value={form.brand} onChange={(v) => setForm({ ...form, brand: v })} />
        <div className="grid grid-cols-2 gap-3.5">
          <TextField label="Price ($)" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} />
          <TextField label="Stock" type="number" value={String(form.stock)} onChange={(v) => setForm({ ...form, stock: Number(v) })} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}
            className="w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 flex gap-2.5">
        <Button onClick={handleSubmit}>Save Product</Button>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
