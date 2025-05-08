"use client"

import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"

interface EventCardActionsProps {
  eventId: string
  onDelete: () => void
}

export function EventCardActions({ eventId, onDelete }: EventCardActionsProps) {
  return (
    <div className="flex gap-2">
      <Link
        href={`/promoter/events/edit/${eventId}`}
        className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
      >
        <Edit className="h-4 w-4" />
        Edit
      </Link>
      <button
        onClick={onDelete}
        className="flex-1 bg-red-50 text-red-600 font-medium py-2 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </button>
    </div>
  )
}
