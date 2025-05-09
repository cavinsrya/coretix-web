"use client";

import { useState } from "react";
import { FilterButton } from "@/components/molecules/PromotorComp/filter-button";

interface ApprovalFilterProps {
  onFilterChange: (status: string) => void;
}

export function ApprovalFilter({ onFilterChange }: ApprovalFilterProps) {
  const [filterStatus, setFilterStatus] = useState<string>(
    "WAITING_CONFIRMATION"
  );

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
          isActive={filterStatus === "WAITING_CONFIRMATION"}
          onClick={() => handleFilterChange("WAITING_CONFIRMATION")}
        />
        <FilterButton
          label="Approved"
          isActive={filterStatus === "DONE"}
          onClick={() => handleFilterChange("DONE")}
        />
        <FilterButton
          label="Rejected"
          isActive={filterStatus === "REJECTED"}
          onClick={() => handleFilterChange("REJECTED")}
        />
      </div>
    </div>
  );
}
