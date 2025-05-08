"use client"

import { Minus, Plus } from "lucide-react"

interface TicketCounterProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

export function TicketCounter({ quantity, onDecrease, onIncrease }: TicketCounterProps) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onDecrease} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
        <Minus className="h-4 w-4" />
      </button>

      <div className="w-8 h-8 bg-[#050557] text-white rounded flex items-center justify-center">{quantity}</div>

      <button onClick={onIncrease} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
