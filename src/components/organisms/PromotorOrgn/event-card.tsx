import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventMetaItem } from "@/components/molecules/PromotorComp/event-meta-item";
import { EventStatItem } from "@/components/molecules/PromotorComp/event-stat-item";
import { EventCardActions } from "@/components/molecules/PromotorComp/event-card-actions";

interface EventCardProps {
  id: string;
  title: string;
  banner: string;
  date: string;
  time: string;
  location: string;
  category: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  onDelete: (id: string) => void;
}

export function EventCard({
  id,
  title,
  banner,
  date,
  time,
  location,
  ticketsSold,
  totalTickets,
  revenue,
  onDelete,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-48 w-full">
        <Image
          src={banner || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{title}</h3>

        <div className="space-y-2 mb-4">
          <EventMetaItem icon={Calendar} text={date} />
          <EventMetaItem icon={Clock} text={time} />
          <EventMetaItem icon={MapPin} text={location} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <EventStatItem
            label="Tiket Terjual"
            value={`${ticketsSold}/${totalTickets}`}
          />
          <EventStatItem
            label="Pendapatan"
            value={`Rp ${(revenue / 1000000).toFixed(1)}jt`}
          />
        </div>

        {/* Actions */}
        <EventCardActions eventId={id} onDelete={() => onDelete(id)} />
      </div>
    </div>
  );
}
