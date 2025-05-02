"use client";

import type { ReactNode } from "react";

type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
};

export default function IconButton({
  children,
  onClick,
  className = "",
  ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md hover:bg-gray-100/10 transition-colors ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
