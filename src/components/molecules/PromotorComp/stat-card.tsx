import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  iconColor: string
  bgColor: string
  label: string
  value: string | number
}

export function StatCard({ icon: Icon, iconColor, bgColor, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
      <div className={`rounded-full ${bgColor} p-3 mr-4`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}
