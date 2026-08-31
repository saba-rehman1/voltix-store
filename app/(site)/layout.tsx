import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { AIAssistant } from "@/components/chatbot/AIAssistant";
import { PageTransition } from "@/components/shared/PageTransition";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <MobileNav />
      <CartDrawer />
      <QuickViewModal />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}
