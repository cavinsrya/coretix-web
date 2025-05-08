import React from "react";
import Text from "../atoms/Text";
import Image from "next/image";

type EventCardProps = {
  imageUrl: string;
  title: string;
  date: string;
  venue: string;
  price: string;
  onDelete?: () => void;
};

export default function EventCard({
  imageUrl,
  title,
  date,
  venue,
  price,
  onDelete,
}: EventCardProps) {
  return (
    <div className="bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-[150px] bg-gray-300">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold">{title}</h3>
        <Text size="xs" color="muted">
          {date}
        </Text>
        <Text size="xs" color="muted">
          {venue}
        </Text>
        <Text size="sm" className="font-medium mt-1">
          {price}
        </Text>
        {onDelete && ( // Tambahkan tombol delete jika onDelete ada
          <button
            onClick={onDelete}
            className="mt-2 text-red-500 text-sm hover:text-red-700"
          >
            Hapus Event
          </button>
        )}
      </div>
    </div>
  );
}
