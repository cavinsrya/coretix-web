import React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function PersonalInformation({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const quantity = Number.parseInt(searchParams.get("qty") || "1");
  const [eventData, setEventData] = useState({
    id: params.id,
    title: "Hearts2Hearts The Chase",
    date: "25 Apr - 25 Apr 2025",
    location: "Gelora Bung Karno",
    price: 210000,
    image: "/placeholder.svg?height=300&width=800",
  });
  return (
    <div className="md:col-span-2">
      {/* Ticket Details */}
      <div className="border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">Detail Tiket</h3>

        <div className="flex gap-4 mb-4">
          <div className="bg-gray-200 h-[80px] w-[120px] rounded"></div>
          <div>
            <h4 className="font-bold">{eventData.title}</h4>
            <p className="text-sm text-gray-600">{eventData.date}</p>
          </div>
        </div>

        <div className="flex justify-between border-t pt-4">
          <p className="text-sm">Harga per Ticket</p>
          <p className="font-bold">Rp {eventData.price.toLocaleString()}</p>
        </div>

        <div className="flex justify-between mt-2">
          <p className="text-sm">Jumlah</p>
          <p className="font-bold">{quantity} Tickets</p>
        </div>
      </div>

      {/* Buyer Information */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">Buyer Informartion</h3>
        <p className="text-sm text-gray-600 mb-4">
          Make sure all the informations is correct. You cannot change it later
        </p>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              *E-tiket akan dikirim melalui email ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
