"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PromoterDashboardTemplate } from "@/components/templates/promoter-dashboard-template";
import { EventsGrid } from "@/components/organisms/PromotorOrgn/events-grid";

export default function PromoterEventsPage() {
  const actionButton = (
    <Link
      href="/promoter/events/create"
      className="bg-[#86e64c] text-[#050557] font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2"
    >
      <Plus className="h-5 w-5" />
      Buat Event
    </Link>
  );

  return (
    <PromoterDashboardTemplate title="Event Saya" actionButton={actionButton}>
      <EventsGrid />
    </PromoterDashboardTemplate>
  );
}
