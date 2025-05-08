"use client";

import { PromoterDashboardTemplate } from "@/components/templates/promoter-dashboard-template";
import { PromoterStatsGrid } from "@/components/organisms/PromotorOrgn/promoter-stats-grid";
import { SalesChartCard } from "@/components/organisms/PromotorOrgn/sales-chart-card";
import { TicketDistributionChart } from "@/components/organisms/PromotorOrgn/ticket-distribution-chart";
import { RevenueByCategoryChart } from "@/components/organisms/PromotorOrgn/revenue-by-category-chart";

export default function PromoterDashboard() {
  // Summary data
  const summaryData = {
    remainingTickets: 547,
    ticketsSold: 943,
    totalRevenue: 42650000,
    activeEvents: 8,
  };

  return (
    <PromoterDashboardTemplate title="Dashboard">
      {/* Summary Cards */}
      <PromoterStatsGrid
        remainingTickets={summaryData.remainingTickets}
        ticketsSold={summaryData.ticketsSold}
        totalRevenue={summaryData.totalRevenue}
        activeEvents={summaryData.activeEvents}
      />

      {/* Charts */}
      <div className="mb-6">
        <SalesChartCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TicketDistributionChart />
        <RevenueByCategoryChart />
      </div>
    </PromoterDashboardTemplate>
  );
}
