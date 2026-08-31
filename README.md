# Voltix Store

**Premium Tech. Smarter Living.**

A full-featured, production-polish ecommerce storefront built as a portfolio showcase — a complete shopping experience for a premium consumer electronics brand, from browsing and search through checkout, a customer dashboard, an admin back office, and an AI shopping assistant.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** for styling, with a fully custom dark brand theme
- **Framer Motion** for page transitions, scroll reveals, hover states, drawers and micro-interactions
- **Zustand** (with `persist`) for cart, wishlist, compare, recently-viewed and UI state
- **Recharts** for the admin analytics dashboards
- Self-hosted variable fonts via `@fontsource` (Inter, Manrope, JetBrains Mono)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build and run a production bundle:

```bash
npm run build
npm start
```

## What's Included

- **Storefront** — animated hero, categories, flash sales, trending/best-seller/new-arrival rails, testimonials, blog preview and newsletter capture
- **Catalog** — 30 realistic products across 6 categories, each with a full spec sheet, gallery, reviews, variants and related/recently-viewed products
- **Search & filtering** — instant search with scoring, and a full filter/sort UI (category, brand, price, rating, color, storage, RAM, processor, screen size)
- **Cart & checkout** — persistent cart with saved-for-later and coupon codes, and a multi-step checkout (shipping → delivery → payment → review) ending in an animated order confirmation
- **Customer dashboard** — profile, orders with tracking, wishlist, addresses, saved cards and notification preferences
- **Admin dashboard** — orders, products, customers and analytics (revenue, category mix, traffic sources, top products, low-stock alerts) with interactive charts
- **AI Shopping Assistant** — a floating assistant that recommends products by budget or use case, compares two products head-to-head, and tracks orders, all queried live against the real product/order data (`lib/assistant.ts`) — structured so a real backend can be swapped in later behind the same interface
- **Content pages** — Blog (listing + article template), FAQ (searchable, grouped by category), About and Contact
- **SEO** — per-page metadata, Open Graph tags, `sitemap.xml` and `robots.txt`

## Project Structure

```
app/
  (site)/        storefront routes (shares Header/Footer/Cart/AI Assistant chrome)
  admin/         admin back-office routes (separate chrome)
components/      UI primitives, layout, and feature-specific components
data/            typed mock data (products, orders, blog, FAQs, admin)
lib/             hooks and utilities (cart, search, assistant engine, etc.)
store/           Zustand stores (cart, wishlist, compare, UI state)
types/           shared TypeScript interfaces
```

## Notes

- All product imagery is hotlinked from Unsplash; a `SmartImage` wrapper gracefully falls back to a placeholder if an image ever fails to load.
- All checkout, payment and account data is mocked on the frontend — no real payment processing or backend is wired up.
