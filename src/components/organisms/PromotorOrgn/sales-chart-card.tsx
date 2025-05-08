"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/molecules/PromotorComp/section-header";
import { FilterButton } from "@/components/molecules/PromotorComp/filter-button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataPoint = {
  name: string;
  value: number;
};

type ChartData = DataPoint[];

export function SalesChartCard() {
  const [timeframe, setTimeframe] = useState<"day" | "month" | "year">("day");
  const [chartData, setChartData] = useState<ChartData>([]);

  useEffect(() => {
    // Generate random data based on timeframe
    if (timeframe === "day") {
      const hourlyData = Array.from({ length: 24 }, (_, i) => ({
        name: `${i}:00`,
        value: Math.floor(Math.random() * 15) + 1,
      }));
      setChartData(hourlyData);
    } else if (timeframe === "month") {
      const daysInMonth = 30;
      const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
        name: `${i + 1}`,
        value: Math.floor(Math.random() * 50) + 10,
      }));
      setChartData(dailyData);
    } else {
      const monthlyData = [
        { name: "Jan", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Feb", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Mar", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Apr", value: Math.floor(Math.random() * 200) + 100 },
        { name: "May", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Jun", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Jul", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Aug", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Sep", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Oct", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Nov", value: Math.floor(Math.random() * 200) + 100 },
        { name: "Dec", value: Math.floor(Math.random() * 200) + 100 },
      ];
      setChartData(monthlyData);
    }
  }, [timeframe]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <SectionHeader title="Penjualan Tiket">
        <div className="flex gap-2">
          <FilterButton
            label="Hari Ini"
            isActive={timeframe === "day"}
            onClick={() => setTimeframe("day")}
          />
          <FilterButton
            label="Bulan Ini"
            isActive={timeframe === "month"}
            onClick={() => setTimeframe("month")}
          />
          <FilterButton
            label="Tahun Ini"
            isActive={timeframe === "year"}
            onClick={() => setTimeframe("year")}
          />
        </div>
      </SectionHeader>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Jumlah Tiket Terjual"
              stroke="#050557"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
