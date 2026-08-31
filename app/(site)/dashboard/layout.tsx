import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export const metadata: Metadata = {
  title: {
    default: "My Account",
    template: "%s | My Account",
  },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return (
    <Container className="py-8 md:py-10">
      <h1 className="mb-6 font-display text-2xl font-bold text-white md:text-3xl">My Account</h1>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </Container>
  );
}
