import { Star } from "lucide-react";
import { ProfileStatItem } from "@/components/molecules/PromotorComp/profile-stat-item";

interface ProfileStatsCardProps {
  totalEvents: number;
  activeEvents: number;
  totalTicketsSold: number;
  averageRating: number;
}

export function ProfileStatsCard({
  totalEvents,
  activeEvents,
  totalTicketsSold,
  averageRating,
}: ProfileStatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">Statistik Event</h2>
      <div className="space-y-4">
        <ProfileStatItem label="Total Event" value={totalEvents} />
        <ProfileStatItem label="Event Aktif" value={activeEvents} />
        <ProfileStatItem label="Total Tiket Terjual" value={totalTicketsSold} />
        <ProfileStatItem
          label="Rating Rata-rata"
          value={averageRating}
          icon={<Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
        />
      </div>
    </div>
  );
}
