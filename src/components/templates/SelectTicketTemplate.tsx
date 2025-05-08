// components/templates/SelectTicketTemplate.tsx
import React from "react";
import SelectTicketProgress from "../organisms/Checkout/Select Ticket/SelectTicketProgress";
import SelectTicketBanner from "../molecules/Checkout/Select Ticket/SelectTicketBanner";
import SelectTicketForm from "../organisms/Checkout/Select Ticket/SelectTicketForm";
import OrderSummary from "../molecules/Checkout/Select Ticket/OrderSummary";

interface SelectTicketTemplateProps {
  eventData: any;
  quantity: number;
  selectedTicket: number;
  setSelectedTicket: (id: number) => void;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  handleContinue: () => void;
}

export default function SelectTicketTemplate({
  eventData,
  quantity,
  selectedTicket,
  setSelectedTicket,
  decreaseQuantity,
  increaseQuantity,
  handleContinue,
}: SelectTicketTemplateProps) {
  // Mendapatkan harga dari tipe tiket yang dipilih
  const selectedTicketData = eventData.ticketTypes.find(
    (ticket: any) => ticket.id === selectedTicket
  );

  const totalPrice = selectedTicketData
    ? selectedTicketData.price * quantity
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <div className="container mx-auto px-4 py-8">
        <SelectTicketProgress />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <SelectTicketBanner
            imageUrl={eventData.imageUrl}
            title={eventData.title}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SelectTicketForm
                eventData={eventData}
                quantity={quantity}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                selectedTicket={selectedTicket}
                setSelectedTicket={setSelectedTicket}
              />
            </div>
            <div className="md:col-span-1">
              <OrderSummary
                totalPrice={totalPrice}
                quantity={quantity}
                handleContinue={handleContinue}
                eventTitle={eventData.title}
                eventId={eventData.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
