import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface OrderSummaryProps {
  totalPrice: number;
  quantity: number;
  handleContinue: () => void;
  eventTitle: string;
  eventId: string;
}

export default function OrderSummary({
  totalPrice,
  quantity,
  handleContinue,
  eventTitle,
  eventId,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="font-bold mb-4">Your Order</h3>
      <h4 className="font-bold mb-1">{eventTitle}</h4>
      <p className="text-sm text-gray-600 mb-4">
        {quantity} Tickets x Rp
        {quantity > 0 ? (totalPrice / quantity).toLocaleString() : 0}
      </p>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between mb-6">
          <p className="font-medium">Total {quantity} Tickets</p>
          <p className="font-bold">Rp {totalPrice.toLocaleString()}</p>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/event/${eventId}`}
            className="flex items-center gap-1 border font-medium py-3 px-4 rounded-md"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Link>
          <button
            onClick={handleContinue}
            className="flex-1 bg-[#86e64c] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-opacity-90"
          >
            Beli Tiket
          </button>
        </div>
      </div>
    </div>
  );
}
