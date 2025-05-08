"use client"

import { Tag } from "lucide-react"

interface VoucherButtonProps {
  selectedVoucherCode?: string
  customVoucherCode?: string
  onClick: () => void
}

export function VoucherButton({ selectedVoucherCode, customVoucherCode, onClick }: VoucherButtonProps) {
  const displayText = selectedVoucherCode || customVoucherCode || "Pilih atau Masukkan Voucher"

  return (
    <button className="w-full border rounded-md p-3 flex items-center justify-between mb-3" onClick={onClick}>
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-[#050557]" />
        <span>{displayText}</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}
