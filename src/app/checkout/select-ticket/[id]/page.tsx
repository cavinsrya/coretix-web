"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckoutTemplate } from "@/components/templates/checkout-template";
import { TicketSelection } from "@/components/organisms/Checkout/organisms/ticket-selection";
import { OrderSummary } from "@/components/organisms/Checkout/organisms/order-summary";
import { getEventDetails } from "@/lib/api/axios";

export default function SelectTicketPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(2);
  const [eventData, setEventData] = useState<any>({
    id: params.id,
    title: "",
    date: "",
    location: "",
    price: 0,
    image: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventDetails(params.id);
        setEventData({
          id: event.id,
          title: event.title,
          date: `${new Date(event.startDate).toLocaleDateString()} - ${new Date(
            event.endDate
          ).toLocaleDateString()}`,
          location: event.location,
          price: event.price,
          image: event.imageUrl,
        });
      } catch (error) {
        alert("Gagal mengambil data event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = eventData.price * quantity;

  const handleContinue = () => {
    router.push(`/checkout/personal-info/${params.id}?qty=${quantity}`);
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
            ticketPrice={eventData.price}
            quantity={quantity}
            onDecreaseQuantity={decreaseQuantity}
            onIncreaseQuantity={increaseQuantity}
          />
        </div>

        {/* Right Column - Order Summary */}
        <div className="md:col-span-1">
          <OrderSummary
            eventTitle={eventData.title}
            quantity={quantity}
            ticketPrice={eventData.price}
            totalPrice={totalPrice}
            previousLink={`/event/${params.id}`}
            onContinue={handleContinue}
            continueText="Beli Tiket"
          />
        </div>
      </div>
    </CheckoutTemplate>
  );
}

// // checkout/select-ticket/[id]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import SelectTicketTemplate from "@/components/templates/SelectTicketTemplate";
// import { fetchEventById } from "@/lib/api/axios";

// export default function page() {
//   const router = useRouter();
//   const params = useParams();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedTicket, setSelectedTicket] = useState<number>(0);
//   const [eventData, setEventData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadEvent = async () => {
//       try {
//         const eventId = Array.isArray(params?.id) ? params.id[0] : params.id;
//         if (eventId) {
//           const event = await fetchEventById(eventId);
//           setEventData(event);
//           setSelectedTicket(event.ticketTypes[0]?.id); // Pilih tiket pertama secara default
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch event data:", error);
//         setLoading(false);
//       }
//     };
//     loadEvent();
//   }, [params]);

//   const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);
//   const increaseQuantity = () => setQuantity(quantity + 1);

//   const handleContinue = () => {
//     if (eventData) {
//       router.push(
//         `/checkout/personal-info/${eventData.id}?qty=${quantity}&ticketType=${selectedTicket}`
//       );
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!eventData) {
//     return <div>Error loading event data.</div>;
//   }

//   return (
//     <SelectTicketTemplate
//       eventData={eventData}
//       quantity={quantity}
//       decreaseQuantity={decreaseQuantity}
//       increaseQuantity={increaseQuantity}
//       selectedTicket={selectedTicket}
//       setSelectedTicket={setSelectedTicket}
//       handleContinue={handleContinue}
//     />
//   );
// }
