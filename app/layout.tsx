import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { PageLoader } from "@/components/ui/PageLoader";
import { ToasterProvider } from "@/components/shared/ToasterProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://voltix.store"),
  title: {
    default: "Voltix Store — Premium Tech. Smarter Living.",
    template: "%s | Voltix Store",
  },
  description:
    "Voltix Store is a premium electronics destination for laptops, smartphones, gaming gear, headphones, smart watches and accessories — curated, fast, and built for people who expect more.",
  keywords: [
    "Voltix Store",
    "premium electronics",
    "laptops",
    "smartphones",
    "gaming",
    "headphones",
    "smart watches",
  ],
  openGraph: {
    title: "Voltix Store — Premium Tech. Smarter Living.",
    description:
      "Curated premium electronics — laptops, smartphones, gaming gear, headphones, smart watches & accessories.",
    siteName: "Voltix Store",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-accent/30">
        <PageLoader />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
