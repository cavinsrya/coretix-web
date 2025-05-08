import type { ReactNode } from "react";

interface PromoterDashboardTemplateProps {
  title: string;
  children: ReactNode;
  actionButton?: ReactNode;
}

export function PromoterDashboardTemplate({
  title,
  children,
  actionButton,
}: PromoterDashboardTemplateProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {actionButton}
      </div>
      {children}
    </div>
  );
}
