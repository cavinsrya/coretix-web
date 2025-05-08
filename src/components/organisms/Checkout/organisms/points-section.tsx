"use client";

import { PointsToggle } from "@/components/molecules/Checkout/molecules/points-toggle";

interface PointsSectionProps {
  points: number;
  usePoints: boolean;
  onTogglePoints: () => void;
}

export function PointsSection({
  points,
  usePoints,
  onTogglePoints,
}: PointsSectionProps) {
  return (
    <div className="border rounded-lg p-6 mb-6">
      <PointsToggle
        points={points}
        usePoints={usePoints}
        onToggle={onTogglePoints}
      />
    </div>
  );
}
