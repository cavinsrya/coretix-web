import { Calendar, MapPin } from "lucide-react";
import { TicketCounter } from "@/components/molecules/Checkout/molecules/ticket-counter";

interface TicketSelectionProps {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketPrice: number;
  quantity: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
}

export function TicketSelection({
  eventTitle,
  eventDate,
  eventLocation,
  ticketPrice,
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: TicketSelectionProps) {
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{eventTitle}</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{eventDate}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{eventLocation}</span>
        </div>
      </div>

      <div className="inline-block bg-[#050557] text-white text-xs px-3 py-1 rounded-full mb-6">
        Presale 1
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Harga</p>
          <p className="font-bold">Rp {ticketPrice.toLocaleString()}</p>
        </div>

        <TicketCounter
          quantity={quantity}
          onDecrease={onDecreaseQuantity}
          onIncrease={onIncreaseQuantity}
        />
      </div>
    </div>
  );
}
