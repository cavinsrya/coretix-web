import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export function EventHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Event Saya</h1>
      <Link
        href="/promoter/events/create"
        className="bg-[#86e64c] text-[#050557] font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Buat Event
      </Link>
    </div>
  );
}
