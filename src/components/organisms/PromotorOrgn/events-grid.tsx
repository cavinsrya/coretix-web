"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { EventCard } from "./event-card";

// Sample event data
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
  {
    id: "3",
    title: "Culinary Expo",
    banner: "/placeholder.svg?height=200&width=350",
    date: "30 Aug - 1 Sep 2025",
    time: "10:00 - 20:00 WIB",
    location: "ICE BSD, Tangerang",
    category: "Exhibition",
    ticketsSold: 510,
    totalTickets: 800,
    revenue: 102000000,
  },
];

export function EventsGrid() {
  const [events, setEvents] = useState(dummyEvents);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  const handleDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setDeleteConfirmation(null);
  };

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-10 text-center">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Belum ada event</h3>
        <p className="text-gray-500 mb-6">Anda belum membuat event apapun</p>
        <Link
          href="/promoter/events/create"
          className="inline-block bg-[#86e64c] text-[#050557] font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Buat Event Sekarang
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onDelete={() => setDeleteConfirmation(event.id)}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
            <p className="mb-6">
              Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmation)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
