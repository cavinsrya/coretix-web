import React, { useState } from "react";
import Link from "next/link";

type Props = {
  event: any;
};

export function EventDetails({ event }: Props) {
  const [activeTab, setActiveTab] = useState("deskripsi");

  console.log("Event Data:", event); // DEBUG

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto">
          <button
            className={`py-3 px-6 font-medium whitespace-nowrap ${
              activeTab === "deskripsi"
                ? "text-[#050557] border-b-2 border-[#050557]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("deskripsi")}
          >
            Deskripsi
          </button>
          <button
            className={`py-3 px-6 font-medium whitespace-nowrap ${
              activeTab === "syarat"
                ? "text-[#050557] border-b-2 border-[#050557]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("syarat")}
          >
            Syarat & Ketentuan
          </button>
          <button
            className={`py-3 px-6 font-medium whitespace-nowrap ${
              activeTab === "voucher"
                ? "text-[#050557] border-b-2 border-[#050557]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("voucher")}
          >
            Voucher
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "deskripsi" ? (
            <div>
              {/* Organizer */}
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-200 h-10 w-10 rounded-full overflow-hidden"></div>
                <div>
                  <p className="text-xs text-gray-500">Diselenggarakan Oleh</p>
                  <Link href={`/`} className="font-medium hover:underline">
                    {event.organizer?.name || "Loading..."}
                  </Link>
                </div>
              </div>

              {/* Event Title */}
              <h2 className="text-xl font-bold mb-4">{event.title}</h2>

              {/* Event Description */}
              <div className="space-y-4 mb-8">
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
          ) : activeTab === "syarat" ? (
            <div className="text-gray-700">
              <h3 className="font-bold mb-4">Syarat & Ketentuan</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                  Tiket yang sudah dibeli tidak dapat dikembalikan atau ditukar
                  dengan uang.
                </li>
                <li>
                  Pembeli wajib mengikuti seluruh peraturan yang berlaku di
                  tempat acara.
                </li>
                <li>
                  Penyelenggara berhak menolak pengunjung yang tidak memenuhi
                  syarat.
                </li>
                <li>
                  Penyelenggara berhak mengubah jadwal acara tanpa pemberitahuan
                  sebelumnya.
                </li>
                <li>
                  Harap tunjukkan tiket elektronik dan kartu identitas saat
                  memasuki venue.
                </li>
              </ul>
            </div>
          ) : (
            <div className="text-gray-700">
              <h3 className="font-bold mb-4">Voucher Tersedia</h3>
              <div className="space-y-3">
                {event.promotions && event.promotions.length > 0 ? (
                  event.promotions.map((voucher: any) => (
                    <div key={voucher.id} className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{voucher.code}</span>
                        <span className="text-red-500">
                          -Rp {voucher.amount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{voucher.title}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Kuota: {voucher.quota - voucher.used} /{" "}
                          {voucher.quota}
                        </p>
                        <p className="text-xs text-gray-500">
                          Exp: {new Date(voucher.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Tidak ada voucher tersedia</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
