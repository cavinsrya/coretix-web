"use client";

import { useState, useEffect } from "react";
import { EventListTemplate } from "@/components/templates/EventDashboard";
import { EventType } from "@/lib/types/type";

export default function EventsPage() {
  // State management
  const [events, setEvents] = useState<EventType[]>([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  // Fetch initial data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Ganti dengan API call sebenarnya
        const mockEvents: EventType[] = [
          {
            id: "1",
            title: "Konser Band Example",
            date: "15 Agustus 2024",
            time: "19:00 WIB",
            location: "Gelora Bung Karno, Jakarta",
            ticketsSold: 150,
            totalTickets: 500,
            revenue: 75000000,
          },
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete event
  const handleDelete = async (eventId: string) => {
    try {
      // Ganti dengan API delete call
      console.log("Deleting event:", eventId);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <EventListTemplate
        events={events}
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        handleDelete={handleDelete}
      />
    </div>
  );
}
