"use client"

import { CheckCircle, Eye, XCircle } from "lucide-react"

interface ApprovalActionButtonsProps {
  orderId: string
  status: string
  onViewProof: () => void
  onApprove: () => void
  onReject: () => void
}

export function ApprovalActionButtons({
  orderId,
  status,
  onViewProof,
  onApprove,
  onReject,
}: ApprovalActionButtonsProps) {
  return (
    <div className="flex justify-end items-center gap-2">
      <button
        onClick={onViewProof}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1"
      >
        <Eye className="h-4 w-4" />
        Lihat Bukti
      </button>

      {status === "pending" && (
        <>
          <button
            onClick={onReject}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </button>
          <button
            onClick={onApprove}
            className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 flex items-center gap-1"
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </button>
        </>
      )}
    </div>
  )
}
