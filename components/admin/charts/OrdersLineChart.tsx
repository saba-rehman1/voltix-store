"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueByMonth } from "@/data/admin";

export function OrdersLineChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={revenueByMonth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#232B38" vertical={false} />
        <XAxis dataKey="month" stroke="#7D8697" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#7D8697" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{ background: "#161B22", border: "1px solid #232B38", borderRadius: "12px", fontSize: "12px" }}
          labelStyle={{ color: "#fff", fontWeight: 600 }}
          formatter={(value) => [value, "Orders"]}
        />
        <Line type="monotone" dataKey="orders" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 3, fill: "#06B6D4" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
