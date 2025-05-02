"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Text from "./Teks";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  type,
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "px-3 py-1 rounded-md font-medium text-sm transition-colors flex items-center";

  const variantStyles = {
    primary: "bg-white text-[#050a47] hover:bg-gray-100",
    secondary: "bg-[#050a47] text-white hover:bg-[#0a1070]",
    accent:
      "bg-[#86E64C] text-[#050a47] font-figtree font-bold hover:bg-green-600",
    ghost: "text-white hover:bg-white/10",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link type={type} href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
