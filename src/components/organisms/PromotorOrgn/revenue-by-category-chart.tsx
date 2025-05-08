"use client";

import { SectionHeader } from "@/components/molecules/PromotorComp/section-header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueByCategoryChart() {
  const data = [
    { name: "Konser", value: 3500000 },
    { name: "Seminar", value: 1200000 },
    { name: "Festival", value: 2800000 },
    { name: "Workshop", value: 600000 },
    { name: "Pameran", value: 1500000 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <SectionHeader title="Pendapatan per Kategori" />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}jt`}
            />
            <Tooltip
              formatter={(value) => `Rp${Number(value).toLocaleString()}`}
            />
            <Bar dataKey="value" name="Pendapatan" fill="#86e64c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
