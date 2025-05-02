import React from "react";

export function EventStats({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-2 rounded">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
