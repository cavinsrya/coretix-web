import React from "react";

export function Icon({
  icon: Icon,
  text,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}
    >
      <Icon className="h-4 w-4 text-[#050557] flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
