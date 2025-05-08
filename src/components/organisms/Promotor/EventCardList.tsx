import React from "react";
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
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EventProps = {
  event: {
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
  };
  onDelete: (id: string) => void;
};

export default function EventCardList({ event, onDelete }: EventProps) {
  const router = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(
    null
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={event.banner || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{event.title}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-[#050557] flex-shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-[#050557] flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-[#050557] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Tiket Terjual</p>
            <p className="font-bold">
              {event.ticketsSold}/{event.totalTickets}
            </p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-xs text-gray-500">Pendapatan</p>
            <p className="font-bold">
              Rp {(event.revenue / 1000000).toFixed(1)}jt
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            href={`/promoter/events/edit/editEvent`}
            className="flex-1 border-2 border-amber-300 text-amber-300 font-medium py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit Event
          </Button>
          <Button
            onClick={() => onDelete(event.id)}
            className="flex-1 border-2 border-red-600 text-red-600 font-medium py-2 rounded-md hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button
            href={`/promoter/events/tickets/${event.id}`}
            className="border-2 border-blue-600 text-blue-600 font-medium py-2 rounded-md hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          >
            <Ticket className="h-4 w-4" />
            Kelola Tiket
          </Button>
          <Button
            href={`/promoter/events/vouchers/${event.id}`}
            className="border-2 border-green-600 text-green-600 font-medium py-2 rounded-md hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
          >
            <Tag className="h-4 w-4" />
            Kelola Voucher
          </Button>
        </div>
      </div>
    </div>
  );
}
