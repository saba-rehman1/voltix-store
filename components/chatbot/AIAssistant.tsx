"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X, ShoppingBag, PackageSearch, User } from "lucide-react";
import toast from "react-hot-toast";
import type { Order, Product } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { getAssistantReply, STARTER_SUGGESTIONS } from "@/lib/assistant";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { SmartImage } from "@/components/ui/SmartImage";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: Product[];
  order?: Order;
  suggestions?: string[];
}

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text:
    "Hi, I'm the Voltix AI Assistant. Ask me to recommend gear by budget, compare two products, suggest something for a specific use case, or track an order.",
  suggestions: STARTER_SUGGESTIONS,
};

let mid = 0;
const nextId = () => `m-${Date.now()}-${mid++}`;

export function AIAssistant() {
  const open = useUIStore((s) => s.chatbotOpen);
  const setOpen = useUIStore((s) => s.setChatbotOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setHasOpened(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    const userMsg: ChatMessage = { id: nextId(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 500 + Math.min(trimmed.length * 12, 700);
    const reply = await getAssistantReply(trimmed);
    await new Promise((r) => setTimeout(r, delay));

    setTyping(false);
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        role: "assistant",
        text: reply.text,
        products: reply.products,
        order: reply.order,
        suggestions: reply.suggestions,
      },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
        onClick={() => setOpen(!open)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 22 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={cn(
          "fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_30px_rgba(37,99,235,0.45)] sm:bottom-7 sm:right-7",
          "bg-gradient-to-br from-accent to-accent-cyan"
        )}
      >
        <span className="absolute inset-0 rounded-full bg-accent-cyan/40 animate-pulse-glow" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="relative">
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
        {!hasOpened && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-danger" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[70] flex h-[min(600px,72vh)] flex-col overflow-hidden rounded-3xl shadow-2xl sm:inset-x-auto sm:bottom-28 sm:right-7 sm:w-[400px]"
          >
            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-accent/15 to-accent-cyan/10 px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-semibold text-white">Voltix AI Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Online &middot; ready to help
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onSuggestion={send} />
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-accent-cyan">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-2"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, deals, or your order…"
                className="h-11 flex-1 rounded-full border border-border bg-bg-secondary px-4 text-sm text-white placeholder:text-muted-2 outline-none transition-colors focus:border-accent/60"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || typing}
                whileTap={{ scale: 0.92 }}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white disabled:opacity-40 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  message,
  onSuggestion,
}: {
  message: ChatMessage;
  onSuggestion: (text: string) => void;
}) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex items-start gap-2", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-white/10 text-white" : "bg-card text-accent-cyan"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div className={cn("flex max-w-[85%] flex-col gap-2", isUser && "items-end")}>
        <div
          className={cn(
            "whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-accent to-accent-cyan text-white"
              : "rounded-tl-sm border border-border bg-card text-muted"
          )}
        >
          {message.text}
        </div>

        {message.order && <OrderCard order={message.order} />}

        {message.products && message.products.length > 0 && (
          <div className="flex w-full snap-x gap-2.5 overflow-x-auto pb-1">
            {message.products.map((p) => (
              <ChatProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.suggestions.map((s) => (
              <button
                key={s}
                onClick={() => onSuggestion(s)}
                className="rounded-full border border-border bg-bg-secondary px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:border-accent/50 hover:text-white cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ChatProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const setCartOpen = useUIStore((s) => s.setCartOpen);

  return (
    <div className="w-[150px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-bg-secondary">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square w-full bg-card">
          <SmartImage src={product.thumbnail} alt={product.name} fill sizes="150px" className="object-cover" />
        </div>
        <div className="p-2.5">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">{product.brand}</p>
          <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-white">{product.name}</p>
          <p className="mt-1.5 font-mono text-xs font-bold text-white">{formatCurrency(product.price)}</p>
        </div>
      </Link>
      <button
        onClick={() => {
          addToCart(product.id, 1);
          setCartOpen(true);
          toast.success(`${product.name} added to cart`);
        }}
        className="flex w-full items-center justify-center gap-1.5 border-t border-border py-2 text-[10px] font-semibold text-white transition-colors hover:bg-white/5 cursor-pointer"
      >
        <ShoppingBag className="h-3 w-3" />
        Add to cart
      </button>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Link
      href="/dashboard/orders"
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-bg-secondary p-3 transition-colors hover:border-accent/50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-light">
        <PackageSearch className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-white">{order.id}</p>
        <p className="truncate text-[11px] capitalize text-muted">{order.status.replace(/-/g, " ")}</p>
      </div>
      <span className="text-[11px] font-medium text-accent-light">Details</span>
    </Link>
  );
}
