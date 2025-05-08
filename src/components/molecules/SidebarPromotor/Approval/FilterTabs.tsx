"use client";
import React from "react";

type Props = {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
};

export default function FilterTabs({ filterStatus, setFilterStatus }: Props) {
  const tabs = [
    { label: "Semua", value: "all" },
    { label: "Menunggu Approval", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`px-4 py-2 rounded-md text-sm ${
              filterStatus === tab.value
                ? "bg-[#050557] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
