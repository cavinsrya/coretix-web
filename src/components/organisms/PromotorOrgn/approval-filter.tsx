"use client";

import { useState } from "react";
import { FilterButton } from "@/components/molecules/PromotorComp/filter-button";

interface ApprovalFilterProps {
  onFilterChange: (status: string) => void;
}

export function ApprovalFilter({ onFilterChange }: ApprovalFilterProps) {
  const [filterStatus, setFilterStatus] = useState<string>("pending");

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    onFilterChange(status);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-2">
        <FilterButton
          label="Semua"
          isActive={filterStatus === "all"}
          onClick={() => handleFilterChange("all")}
        />
        <FilterButton
          label="Menunggu Approval"
          isActive={filterStatus === "pending"}
          onClick={() => handleFilterChange("pending")}
        />
        <FilterButton
          label="Approved"
          isActive={filterStatus === "approved"}
          onClick={() => handleFilterChange("approved")}
        />
        <FilterButton
          label="Rejected"
          isActive={filterStatus === "rejected"}
          onClick={() => handleFilterChange("rejected")}
        />
      </div>
    </div>
  );
}
