import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

type Props = {
  event: any;
};

export default function CardEventDetail({ event }: Props) {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Format tanggal dan waktu
  const formattedDate = `${dayjs(event.startDate).format(
    "DD-MMMM-YYYY"
  )} - ${dayjs(event.endDate).format("DD-MMMM-YYYY")}`;
  const formattedTime = `${dayjs(event.startDate).format("HH:mm")} - ${dayjs(
    event.endDate
  ).format("HH:mm")} (WIB)`;

  return (
    <div className="md:col-span-1">
      <div className="border rounded-lg p-4 md:sticky md:top-24">
        <h1 className="text-xl font-bold mb-4">{event.title}</h1>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-[#050557]" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-[#050557]" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-[#050557]" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="border-t pt-4 mb-4">
          <p className="text-sm text-gray-500">Mulai Dari</p>
          <p className="font-bold text-lg">{event.price}</p>
        </div>

        <button
          onClick={() => {
            if (isLoggedIn) {
              router.push(`/checkout/select-ticket/${event.id}`);
            } else {
              alert("You need to login first.");
            }
          }}
          className="block w-full bg-[#86e64c] text-center font-medium py-3 px-4 rounded-md"
        >
          Beli Tiket
        </button>
      </div>
    </div>
  );
}
