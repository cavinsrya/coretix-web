// EventListTemplate.tsx
import React from "react";
import { EventHeader } from "../organisms/Promotor/EventHeader";
import EventCard from "../molecules/EventCard";
import { DeleteModal } from "../organisms/DeleteModal";
import Link from "next/link";
import { Calendar } from "lucide-react";
import EventCardList from "../organisms/Promotor/EventCardList";

export function EventListTemplate({
  events,
  deleteConfirmation,
  setDeleteConfirmation,
  handleDelete,
}: {
  events: any[];
  deleteConfirmation: string | null;
  setDeleteConfirmation: (id: string | null) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <div>
      <EventHeader />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCardList
              key={event.id}
              event={event}
              onDelete={setDeleteConfirmation}
            />
          ))}
        </div>
      ) : (
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
      )}

      {deleteConfirmation && (
        <DeleteModal
          onCancel={() => setDeleteConfirmation(null)}
          onConfirm={() => handleDelete(deleteConfirmation)}
        />
      )}
    </div>
  );
}
