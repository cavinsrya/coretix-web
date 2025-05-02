import React from "react";
import Button from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";

export function ActionButton({
  icon,
  text,
  className = "",
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className={`flex items-center justify-center gap-1 ${className}`}>
      <Icon icon={icon} text={text} />
    </Button>
  );
}
