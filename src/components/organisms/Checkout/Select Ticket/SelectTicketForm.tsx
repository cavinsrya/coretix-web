// components/organism/Checkout/Select Ticket/SelectTicketForm.tsx
import React from "react";
import { Calendar, Clock, MapPin, Minus, Plus } from "lucide-react";
import dayjs from "dayjs";

interface TicketType {
  id: number;
  name: string;
  price: number;
  availableQty: number;
}

interface SelectTicketFormProps {
  eventData: any;
  selectedTicket: number;
  setSelectedTicket: (id: number) => void;
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

export default function SelectTicketForm({
  eventData,
  selectedTicket,
  setSelectedTicket,
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: SelectTicketFormProps) {
  // Format tanggal dan waktu
  const formattedDate = `${dayjs(eventData.startDate).format(
    "DD MMMM YYYY"
  )} - ${dayjs(eventData.endDate).format("DD MMMM YYYY")}`;
  const formattedTime = `${dayjs(eventData.startDate).format(
    "HH:mm"
  )} - ${dayjs(eventData.endDate).format("HH:mm")} WIB`;
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">{eventData.title}</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{eventData.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {eventData.ticketTypes.map((ticket: TicketType) => (
          <div
            key={ticket.id}
            onClick={() => setSelectedTicket(ticket.id)}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedTicket === ticket.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <h4 className="font-bold">{ticket.name}</h4>
            <p className="text-sm text-gray-600">
              Harga: Rp {ticket.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Sisa: {ticket.availableQty} tiket
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Jumlah Tiket</p>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 border rounded flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="w-8 h-8 bg-[#050557] text-white rounded flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 border rounded flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
