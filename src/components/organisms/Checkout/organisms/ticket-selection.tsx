// TicketSelection.tsx
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { TicketCounter } from "@/components/molecules/Checkout/molecules/ticket-counter";

interface TicketSelectionProps {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  ticketTypes: { id: number; name: string; price: number }[];
  selectedTicketType: number | null;
  onSelectTicketType: (ticketId: number) => void;
  quantity: number;
  onQuantityChange: (amount: number) => void;
}

export function TicketSelection({
  eventTitle,
  eventDate,
  eventLocation,
  ticketTypes,
  selectedTicketType,
  onSelectTicketType,
  quantity,
  onQuantityChange,
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

      {/* Tipe Ticket */}
      <div className="space-y-3 mb-4">
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className={`p-4 rounded-lg border cursor-pointer ${
              selectedTicketType === ticket.id
                ? "bg-[#050557] text-white"
                : "bg-gray-100"
            }`}
            onClick={() => onSelectTicketType(ticket.id)}
          >
            <h4 className="font-bold">{ticket.name}</h4>
            <p className="text-sm">Rp {ticket.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Input Quantity (Hanya muncul jika ada tipe ticket yang dipilih) */}
      {selectedTicketType && (
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Jumlah Tiket</p>
          <TicketCounter
            quantity={quantity}
            onDecrease={() => onQuantityChange(-1)}
            onIncrease={() => onQuantityChange(1)}
          />
        </div>
      )}
    </div>
  );
}
