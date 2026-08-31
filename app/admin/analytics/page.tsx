import type { Metadata } from "next";
import { RevenueChart } from "@/components/admin/charts/RevenueChart";
import { OrdersLineChart } from "@/components/admin/charts/OrdersLineChart";
import { CategoryRevenueChart } from "@/components/admin/charts/CategoryRevenueChart";
import { TrafficPieChart } from "@/components/admin/charts/TrafficPieChart";
import { revenueByMonth, topProducts } from "@/data/admin";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AdminAnalyticsPage() {
  const totalRevenue = revenueByMonth.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = revenueByMonth.reduce((s, m) => s + m.orders, 0);
  const growth =
    ((revenueByMonth[revenueByMonth.length - 1].revenue - revenueByMonth[0].revenue) / revenueByMonth[0].revenue) *
    100;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total Revenue (6mo)" value={formatCurrency(totalRevenue)} />
        <MetricCard label="Total Orders (6mo)" value={totalOrders.toLocaleString()} />
        <MetricCard label="Growth Rate" value={`+${growth.toFixed(1)}%`} positive />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Revenue Trend</h2>
          <RevenueChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Orders Trend</h2>
          <OrdersLineChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Revenue by Category</h2>
          <CategoryRevenueChart />
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-white">Traffic Sources</h2>
          <TrafficPieChart />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-white">Monthly Sales Report</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-2">
                <th className="p-3 font-medium">Month</th>
                <th className="p-3 font-medium">Orders</th>
                <th className="p-3 font-medium">Revenue</th>
                <th className="p-3 font-medium">Avg. Order Value</th>
              </tr>
            </thead>
            <tbody>
              {revenueByMonth.map((m) => (
                <tr key={m.month} className="border-b border-border last:border-0">
                  <td className="p-3 text-white">{m.month} 2026</td>
                  <td className="p-3 text-muted">{m.orders}</td>
                  <td className="p-3 font-mono font-semibold text-white">{formatCurrency(m.revenue)}</td>
                  <td className="p-3 font-mono text-muted">{formatCurrency(m.revenue / m.orders)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-base font-semibold text-white">Top Performing Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-2">
                <th className="p-3 font-medium">Product</th>
                <th className="p-3 font-medium">Units Sold</th>
                <th className="p-3 font-medium">Revenue</th>
                <th className="p-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="p-3 text-white">{p.name}</td>
                  <td className="p-3 text-muted">{p.unitsSold}</td>
                  <td className="p-3 font-mono font-semibold text-success">{formatCurrency(p.revenue)}</td>
                  <td className="p-3 text-muted">{p.rating} ★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-2 font-display text-2xl font-bold ${positive ? "text-success" : "text-white"}`}>{value}</p>
    </div>
  );
}
