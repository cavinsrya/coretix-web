import type { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  children?: ReactNode
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-lg">{title}</h3>
      {children}
    </div>
  )
}
