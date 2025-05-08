"use client";

import React from "react";
import { useState } from "react";
import { EventListTemplate } from "@/components/templates/EventDashboard";

const dummyEvents = [
  {
    id: "1",
    title: "Jakarta Music Festival 2025",
    banner: "/placeholder.svg?height=200&width=350",
    date: "12 Jun - 14 Jun 2025",
    time: "18:00 - 23:00 WIB",
    location: "Gelora Bung Karno, Jakarta",
    category: "Music",
    ticketsSold: 245,
    totalTickets: 500,
    revenue: 123500000,
  },
  {
    id: "2",
    title: "Business Summit 2025",
    banner: "/placeholder.svg?height=200&width=350",
    date: "25 Jul 2025",
    time: "09:00 - 17:00 WIB",
    location: "JCC Senayan, Jakarta",
    category: "Conference",
    ticketsSold: 188,
    totalTickets: 300,
    revenue: 94000000,
  },
];

export default function EventDashboardPage() {
  const [events, setEvents] = useState(dummyEvents);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    setDeleteConfirmation(null);
  };

  return (
    <EventListTemplate
      events={events}
      deleteConfirmation={deleteConfirmation}
      setDeleteConfirmation={setDeleteConfirmation}
      handleDelete={handleDelete}
    />
  );
}
