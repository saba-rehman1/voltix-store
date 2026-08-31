"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { revenueByCategory } from "@/data/admin";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#2563EB", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

export function CategoryRevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={revenueByCategory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#232B38" vertical={false} />
        <XAxis dataKey="category" stroke="#7D8697" fontSize={11} tickLine={false} axisLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
        <YAxis stroke="#7D8697" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
          contentStyle={{ background: "#161B22", border: "1px solid #232B38", borderRadius: "12px", fontSize: "12px" }}
          labelStyle={{ color: "#fff", fontWeight: 600 }}
          formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
        />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
          {revenueByCategory.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
