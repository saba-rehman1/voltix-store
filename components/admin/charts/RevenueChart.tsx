"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueByMonth } from "@/data/admin";
import { formatCurrency } from "@/lib/utils";

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={revenueByMonth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#232B38" vertical={false} />
        <XAxis dataKey="month" stroke="#7D8697" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#7D8697"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            background: "#161B22",
            border: "1px solid #232B38",
            borderRadius: "12px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#fff", fontWeight: 600 }}
          formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
        />
        <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revenueFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
