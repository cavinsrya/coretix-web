"use client";

import { SectionHeader } from "@/components/molecules/PromotorComp/section-header";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function TicketDistributionChart() {
  // Sample data
  const data = [
    { name: "Terjual", value: 63, color: "#050557" },
    { name: "Tersisa", value: 37, color: "#86e64c" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <SectionHeader title="Distribusi Tiket" />
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
