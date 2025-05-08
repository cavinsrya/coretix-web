"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface NavigationButtonsProps {
  previousLink: string;
  onContinue: () => void;
  continueText: string;
}

export function NavigationButtons({
  previousLink,
  onContinue,
  continueText,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 mt-6">
      <Link
        href={previousLink}
        className="flex items-center justify-center gap-1 border border-[#050557] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Link>
      <button
        onClick={onContinue}
        disabled={false}
        className="flex-1 bg-[#86e64c] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
      >
        {continueText}
      </button>
    </div>
  );
}
