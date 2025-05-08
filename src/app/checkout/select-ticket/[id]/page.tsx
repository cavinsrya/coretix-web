"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckoutTemplate } from "@/components/templates/checkout-template";
import { TicketSelection } from "@/components/organisms/Checkout/organisms/ticket-selection";
import { OrderSummary } from "@/components/organisms/Checkout/organisms/order-summary";
import { getEventDetails } from "@/lib/api/axios";
import { useParams } from "next/navigation";

export default function SelectTicketPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id; // Pastikan ID adalah string
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState<any>({
    id: eventId || "",
    title: "",
    date: "",
    location: "",
    price: 0,
    image: "",
    ticketTypes: [],
  });

  const [selectedTicketType, setSelectedTicketType] = useState<number | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) return;

        const event = await getEventDetails(eventId); // ID sudah dipastikan string
        setEventData({
          id: event.id,
          title: event.title,
          date: `${new Date(event.startDate).toLocaleDateString()} - ${new Date(
            event.endDate
          ).toLocaleDateString()}`,
          location: event.location,
          image: event.imageUrl,
          ticketTypes: event.ticketTypes || [],
        });
      } catch (error) {
        alert("Gagal mengambil data event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSelectTicketType = (ticketId: number) => {
    setSelectedTicketType(ticketId);
    setQuantity(1); // Reset quantity saat ticket type berubah
  };

  const handleQuantityChange = (amount: number) => {
    if (selectedTicketType) {
      setQuantity((prev) => Math.max(1, prev + amount));
    }
  };

  const totalPrice = selectedTicketType
    ? eventData.ticketTypes.find((t: any) => t.id === selectedTicketType)
        ?.price * quantity || 0
    : 0;

  const handleContinue = () => {
    if (!selectedTicketType) {
      alert("Pilih tipe ticket terlebih dahulu.");
      return;
    }

    router.push(
      `/checkout/personal-information/${eventId}?type=${selectedTicketType}&qty=${quantity}`
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <CheckoutTemplate
      currentStep={1}
      eventImageUrl={eventData.image}
      eventTitle={eventData.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Ticket Selection */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Select Your Tickets</h2>

          <TicketSelection
            eventTitle={eventData.title}
            eventDate={eventData.date}
            eventLocation={eventData.location}
            ticketTypes={eventData.ticketTypes}
            selectedTicketType={selectedTicketType}
            onSelectTicketType={handleSelectTicketType}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-1">
          <OrderSummary
            eventTitle={eventData.title}
            quantity={quantity}
            ticketPrice={totalPrice}
            totalPrice={totalPrice}
            previousLink={`/event/${eventId}`}
            onContinue={handleContinue}
            continueText="Beli Tiket"
          />
        </div>
      </div>
    </CheckoutTemplate>
  );
}
