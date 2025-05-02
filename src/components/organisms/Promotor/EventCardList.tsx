import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Ticket,
  Tag,
} from "lucide-react";
import { Icon } from "@/components/atoms/Icon";
import { EventStats } from "@/components/molecules/SidebarPromotor/EventStats";
import { ActionButton } from "@/components/molecules/SidebarPromotor/ActionButton";

export function EventCard({
  event,
  onDelete,
}: {
  event: any;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full aspect-[3/1]">
        <Image
          src={event.banner || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base sm:text-lg mb-2 truncate">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <Icon icon={Calendar} text={event.date} />
          <Icon icon={Clock} text={event.time} />
          <Icon icon={MapPin} text={event.location} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          <EventStats
            label="Tiket Terjual"
            value={`${event.ticketsSold}/${event.totalTickets}`}
          />
          <EventStats
            label="Pendapatan"
            value={`Rp ${(event.revenue / 1000000).toFixed(1)}jt`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link
            href={`/promoter/events/edit/${event.id}`}
            className="bg-gray-100 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit Event
          </Link>
          <ActionButton
            icon={Trash2}
            text="Delete"
            className="bg-red-500 text-white hover:bg-red-100"
            onClick={() => onDelete(event.id)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          <Link
            href={`/promoter/events/tickets/${event.id}`}
            className="bg-blue-50 text-blue-600 font-medium py-2 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          >
            <Ticket className="h-4 w-4" />
            Kelola Tiket
          </Link>
          <Link
            href={`/promoter/events/vouchers/${event.id}`}
            className="bg-green-50 text-green-600 font-medium py-2 rounded-md hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
          >
            <Tag className="h-4 w-4" />
            Kelola Voucher
          </Link>
        </div>
      </div>
    </div>
  );
}
