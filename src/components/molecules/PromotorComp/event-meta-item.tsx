import type { LucideIcon } from "lucide-react"

interface EventMetaItemProps {
  icon: LucideIcon
  text: string
}

export function EventMetaItem({ icon: Icon, text }: EventMetaItemProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Icon className="h-4 w-4 text-[#050557] flex-shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  )
}
