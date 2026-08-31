"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ThumbsUp, ShieldCheck, Star, Pencil } from "lucide-react";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/types";

export function ProductReviews({
  reviews: initialReviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, pct: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  const handleHelpful = (id: string) => {
    if (helpfulIds.includes(id)) return;
    setHelpfulIds((prev) => [...prev, id]);
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  const handleSubmit = () => {
    if (!title.trim() || !body.trim() || !author.trim()) {
      toast.error("Please fill in your name, a title and your review.");
      return;
    }
    const review: Review = {
      id: `local-${Date.now()}`,
      author: author.trim(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        author.trim()
      )}&background=2563EB&color=fff&bold=true&size=100`,
      rating: newRating,
      date: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      body: body.trim(),
      verified: false,
      helpful: 0,
    };
    setReviews((prev) => [review, ...prev]);
    setFormOpen(false);
    setTitle("");
    setBody("");
    setAuthor("");
    setNewRating(5);
    toast.success("Thanks — your review has been posted!");
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 text-center md:text-left">
          <p className="font-display text-5xl font-bold text-white">{rating.toFixed(1)}</p>
          <div className="mt-2 flex justify-center md:justify-start">
            <Rating value={rating} size={18} />
          </div>
          <p className="mt-1.5 text-sm text-muted">{reviewCount.toLocaleString()} reviews</p>

          <div className="mt-5 flex flex-col gap-2">
            {distribution.map((d) => (
              <div key={d.star} className="flex items-center gap-2 text-xs text-muted">
                <span className="w-8 shrink-0">{d.star}★</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-warning" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="w-6 shrink-0 text-right">{d.count}</span>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-5 w-full justify-center"
            onClick={() => setFormOpen((v) => !v)}
          >
            <Pencil className="h-3.5 w-3.5" /> Write a Review
          </Button>
        </div>

        <div className="flex flex-col gap-5">
          {formOpen && (
            <div className="rounded-2xl border border-accent/30 bg-card p-5">
              <p className="mb-3 text-sm font-semibold text-white">Share your experience</p>
              <div className="mb-3 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setNewRating(s)} className="cursor-pointer">
                    <Star
                      className={cn(
                        "h-6 w-6",
                        s <= newRating ? "fill-warning text-warning" : "text-white/15"
                      )}
                    />
                  </button>
                ))}
              </div>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="mb-2.5 w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60"
              />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Review title"
                className="mb-2.5 w-full rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60"
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell us what you think..."
                rows={3}
                className="mb-3 w-full resize-none rounded-lg border border-border bg-bg-secondary px-3.5 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none focus:border-accent/60"
              />
              <div className="flex gap-2.5">
                <Button size="sm" onClick={handleSubmit}>
                  Submit Review
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {reviews.map((r) => (
            <div key={r.id} className="border-b border-border pb-5 last:border-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <SmartImage src={r.avatar} alt={r.author} fill sizes="36px" className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-white">{r.author}</p>
                      {r.verified && (
                        <span className="flex items-center gap-0.5 text-[10px] font-medium text-success">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-2">{formatDate(r.date)}</p>
                  </div>
                </div>
                <Rating value={r.rating} size={13} />
              </div>
              <p className="mt-3 text-sm font-medium text-white">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
              <button
                onClick={() => handleHelpful(r.id)}
                className={cn(
                  "mt-3 flex items-center gap-1.5 text-xs transition-colors cursor-pointer",
                  helpfulIds.includes(r.id) ? "text-accent-light" : "text-muted-2 hover:text-white"
                )}
              >
                <ThumbsUp className={cn("h-3.5 w-3.5", helpfulIds.includes(r.id) && "fill-current")} />
                Helpful ({r.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
