"use client";

import { PromoterDashboardTemplate } from "@/components/templates/promoter-dashboard-template";
import { ApprovalList } from "@/components/organisms/PromotorOrgn/approval-list";

export default function ApprovalPage() {
  return (
    <PromoterDashboardTemplate title="Approval Tiket">
      <ApprovalList />
    </PromoterDashboardTemplate>
  );
}
