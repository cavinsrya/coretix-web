import { useState, useEffect } from "react";
import { fetchEventById } from "@/lib/api/axios";
import { EventImage } from "../molecules/Event Detail/EventImage";
import { EventDetails } from "../organisms/User/Event Detail/EventDetail";
import CardEventDetail from "../organisms/User/Event Detail/CardEventDetail";

type Props = {
  eventId: string;
};

export function EventDetailTemplate({ eventId }: Props) {
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const event = await fetchEventById(eventId);
        setEventData(event);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details.");
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="container mx-auto px-4 py-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Event Image and Description */}
          <div className="md:col-span-2">
            <EventImage
              imageUrl={eventData?.imageUrl || ""}
              alt={eventData?.title || "Event"}
            />
            <div className="border rounded-lg overflow-hidden">
              <EventDetails event={eventData} />
            </div>
          </div>
          <CardEventDetail event={eventData} />
        </div>
      </main>
    </div>
  );
}
