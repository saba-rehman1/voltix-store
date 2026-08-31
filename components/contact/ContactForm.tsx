"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

const TOPICS = ["Order Support", "Product Question", "Returns & Warranty", "Partnerships", "Other"];

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent — we'll be in touch soon");
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-xl font-bold text-white">Message sent</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out — our team typically replies within one business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <input required placeholder="Jordan Blake" className={inputClass} />
        </Field>
        <Field label="Email Address">
          <input required type="email" placeholder="you@example.com" className={inputClass} />
        </Field>
      </div>

      <Field label="Topic">
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                topic === t
                  ? "border-accent bg-accent/15 text-accent-light"
                  : "border-border bg-bg-secondary text-muted hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Order Number (optional)">
        <input placeholder="VLX-108551" className={inputClass} />
      </Field>

      <Field label="Message">
        <textarea required rows={5} placeholder="How can we help?" className={`${inputClass} resize-none`} />
      </Field>

      <Button type="submit" size="lg" fullWidth loading={submitting} disabled={submitting}>
        Send Message
      </Button>
    </form>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-bg-secondary px-4 text-sm text-white placeholder:text-muted-2 outline-none transition-colors focus:border-accent/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
