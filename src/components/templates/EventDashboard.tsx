// EventListTemplate.tsx
import React from "react";
import { EventHeader } from "../organisms/Promotor/EventHeader";
import { EventCard } from "../organisms/Promotor/EventCardList";
import { DeleteModal } from "../organisms/DeleteModal";

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
            <EventCard
              key={event.id}
              event={event}
              onDelete={setDeleteConfirmation}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          {/* Empty State Component */}
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
