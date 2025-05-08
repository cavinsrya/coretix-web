import { CreditCard, Calendar, TrendingUp, TicketCheck } from "lucide-react";
import { StatCard } from "@/components/molecules/PromotorComp/stat-card";

interface PromoterStatsGridProps {
  remainingTickets: number;
  ticketsSold: number;
  totalRevenue: number;
  activeEvents: number;
}

export function PromoterStatsGrid({
  remainingTickets,
  ticketsSold,
  totalRevenue,
  activeEvents,
}: PromoterStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        icon={TicketCheck}
        iconColor="text-[#050557]"
        bgColor="bg-blue-100"
        label="Tiket Tersisa"
        value={remainingTickets}
      />

      <StatCard
        icon={Calendar}
        iconColor="text-green-600"
        bgColor="bg-green-100"
        label="Tiket Terjual"
        value={ticketsSold}
      />

      <StatCard
        icon={CreditCard}
        iconColor="text-purple-600"
        bgColor="bg-purple-100"
        label="Total Pendapatan"
        value={`Rp ${(totalRevenue / 1000000).toFixed(1)}jt`}
      />

      <StatCard
        icon={TrendingUp}
        iconColor="text-yellow-600"
        bgColor="bg-yellow-100"
        label="Event Aktif"
        value={activeEvents}
      />
    </div>
  );
}
