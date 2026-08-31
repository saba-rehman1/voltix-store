import type { Metadata } from "next";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SmartImage } from "@/components/ui/SmartImage";
import { Badge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/admin/charts/RevenueChart";
import { adminOrders, adminCustomers, topProducts, lowStockProducts, revenueByMonth } from "@/data/admin";

export const metadata: Metadata = {
  title: "Dashboard",
};
import { formatCurrency, formatDate, cn } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "accent" | "success" | "danger" | "warning" | "cyan"> = {
  processing: "warning",
  confirmed: "cyan",
  shipped: "accent",
  delivered: "success",
  cancelled: "danger",
};

export default function AdminDashboardPage() {
  const totalRevenue = revenueByMonth.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = adminOrders.length * 14;
  const totalCustomers = adminCustomers.length * 41;
  const avgOrderValue = totalRevenue / totalOrders;

  const recentOrders = adminOrders.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={<AnimatedCounter value={totalRevenue} prefix="$" />}
          trend="+18.2%"
          accent="accent"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={<AnimatedCounter value={totalOrders} />}
          trend="+12.4%"
          accent="cyan"
        />
        <StatCard
          icon={Users}
          label="Total Customers"
          value={<AnimatedCounter value={totalCustomers} />}
          trend="+9.1%"
          accent="success"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg. Order Value"
          value={<AnimatedCounter value={avgOrderValue} prefix="$" decimals={0} />}
          trend="+4.6%"
          accent="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-muted-2">Last 6 months</p>
            </div>
            <Link href="/admin/analytics" className="flex items-center gap-1 text-xs font-medium text-accent-light hover:text-accent-cyan">
              Full report <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <RevenueChart />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <h2 className="font-display text-base font-semibold text-white">Low Stock Alerts</h2>
          </div>
          <div className="flex flex-col gap-3">
            {lowStockProducts.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                  <SmartImage src={p.thumbnail} alt={p.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">{p.name}</p>
                  <p className="text-[11px] text-muted-2">{p.brand}</p>
                </div>
                <Badge variant={p.stock <= 10 ? "danger" : "warning"}>{p.stock} left</Badge>
              </div>
            ))}
          </div>
          <Link
            href="/admin/products"
            className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-xs font-medium text-white hover:border-accent/40"
          >
            Manage Inventory <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="flex items-center gap-1 text-xs font-medium text-accent-light hover:text-accent-cyan">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="text-xs text-muted-2">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-3 font-mono text-xs text-white">{o.id}</td>
                    <td className="py-3 text-xs text-muted">{o.customer}</td>
                    <td className="py-3 text-xs text-muted-2">{formatDate(o.date)}</td>
                    <td className="py-3">
                      <Badge variant={STATUS_VARIANT[o.status]} className="capitalize">{o.status}</Badge>
                    </td>
                    <td className="py-3 text-right font-mono text-xs font-semibold text-white">
                      {formatCurrency(o.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Top Products</h2>
          <div className="flex flex-col gap-4">
            {topProducts.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-xs font-bold text-muted-2">{i + 1}</span>
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg-secondary">
                  <SmartImage src={p.thumbnail} alt={p.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">{p.name}</p>
                  <p className="text-[11px] text-muted-2">{p.unitsSold} units sold</p>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-success">
                  {formatCurrency(p.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  trend: string;
  accent: "accent" | "cyan" | "success" | "warning";
}) {
  const accentClass = {
    accent: "from-accent/20 to-accent/5 text-accent-light",
    cyan: "from-accent-cyan/20 to-accent-cyan/5 text-accent-cyan",
    success: "from-success/20 to-success/5 text-success",
    warning: "from-warning/20 to-warning/5 text-warning",
  }[accent];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", accentClass)}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="flex items-center gap-0.5 text-xs font-medium text-success">
          <ArrowUpRight className="h-3 w-3" /> {trend}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
