"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { trafficSources } from "@/data/admin";

const COLORS = ["#2563EB", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"];

export function TrafficPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={trafficSources}
          dataKey="value"
          nameKey="source"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={3}
          strokeWidth={0}
        >
          {trafficSources.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#161B22", border: "1px solid #232B38", borderRadius: "12px", fontSize: "12px" }}
          labelStyle={{ color: "#fff" }}
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend
          verticalAlign="bottom"
          height={50}
          formatter={(value) => <span style={{ color: "#B8C0CC", fontSize: "12px" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
