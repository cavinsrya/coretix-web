import type { ReactNode } from "react"

interface ProfileStatItemProps {
  label: string
  value: string | number
  icon?: ReactNode
}

export function ProfileStatItem({ label, value, icon }: ProfileStatItemProps) {
  return (
    <div className="flex justify-between items-center pb-2 border-b">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center">
        <span className="font-bold mr-1">{value}</span>
        {icon}
      </div>
    </div>
  )
}
