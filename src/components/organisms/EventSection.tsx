import React from "react";
import Heading from "../atoms/Heading";
import EventCard from "../molecules/EventCard";
import Link from "next/link";

type EventSectionProps = {
  title: string;
  events: Array<{
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
};

export default function EventSection({ title, events }: EventSectionProps) {
  return (
    <section className="mb-8">
      <Heading level={2} className="mb-4">
        {title}
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <Link href={`/event/${event.id}`} key={index}>
            <EventCard
              imageUrl={event.imageUrl}
              title={event.title}
              date={event.date}
              venue={event.venue}
              price={event.price}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
