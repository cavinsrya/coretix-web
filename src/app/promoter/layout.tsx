import type { ReactNode } from "react";
import SidebarPromotor from "@/components/organisms/SidebarPromotor";

export default function PromoterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Promoter Sidebar */}
      <SidebarPromotor />

      {/* Main Content */}
      <div className="lg:ml-64 pt-0 lg:pt-6 pb-6">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
