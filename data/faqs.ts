import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    category: "Orders",
    question: "How long does it take to process my order?",
    answer:
      "Orders are processed within 1 business day. You'll receive a confirmation email the moment your order is placed, and a shipping notification with tracking as soon as it leaves our warehouse.",
  },
  {
    category: "Orders",
    question: "Can I change or cancel my order after placing it?",
    answer:
      "You can modify or cancel your order within 60 minutes of checkout from your Dashboard → Orders page. After that window, the order enters fulfillment and can no longer be changed automatically — contact support and we'll do our best to help.",
  },
  {
    category: "Shipping",
    question: "What are my shipping options?",
    answer:
      "We offer Standard (3-5 business days, free over $75), Express (1-2 business days) and Overnight delivery. Exact rates and ETAs are calculated at checkout based on your address.",
  },
  {
    category: "Shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes — Voltix Store ships to over 40 countries. International orders may be subject to customs duties and import taxes, which are calculated and shown at checkout.",
  },
  {
    category: "Returns",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day, no-questions-asked return window on every product. Items must be in original condition with all packaging and accessories. Refunds are issued to your original payment method within 5-7 business days of us receiving the return.",
  },
  {
    category: "Returns",
    question: "How do I start a return or exchange?",
    answer:
      "Head to Dashboard → Orders, select the order, and click 'Start Return'. We'll email a prepaid shipping label for eligible items — no need to visit a store or call support.",
  },
  {
    category: "Warranty",
    question: "What warranty coverage comes with my purchase?",
    answer:
      "Every product ships with the manufacturer warranty listed on its product page (typically 1-2 years). Voltix Care extended protection plans are available at checkout for accidental damage coverage beyond the standard warranty.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay and Stripe-powered debit/credit payments. All transactions are encrypted end-to-end.",
  },
  {
    category: "Payments",
    question: "Is it safe to save my card on Voltix Store?",
    answer:
      "Yes. We never store raw card numbers on our servers — saved cards are tokenized through our PCI-DSS Level 1 certified payment processor, so your details stay protected at every step.",
  },
  {
    category: "Products",
    question: "Are Voltix Store products genuine and new?",
    answer:
      "Every product sold on Voltix Store is 100% authentic and brand new, sourced directly from manufacturers and authorized distributors. We never sell refurbished items without clear labeling and a discounted price.",
  },
  {
    category: "Products",
    question: "How do I know which specs are right for me?",
    answer:
      "Each product page includes a full specification breakdown, and our AI Shopping Assistant (bottom-right corner) can recommend the right configuration based on your budget and use case — just ask.",
  },
  {
    category: "Account",
    question: "Do I need an account to place an order?",
    answer:
      "No — guest checkout is available. Creating a free account lets you track orders, save addresses and cards, build a wishlist, and check out faster next time.",
  },
];
