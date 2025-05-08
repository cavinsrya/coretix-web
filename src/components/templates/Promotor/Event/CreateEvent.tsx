"use client";
import React from "react";

import { useRouter } from "next/navigation";
import InputEvent from "@/components/molecules/SidebarPromotor/Events/InputEventDetail";
import InputTicketType from "@/components/molecules/SidebarPromotor/Events/InputTicketType";
import InputVoucherEvent from "@/components/molecules/SidebarPromotor/Events/InputVoucherEvent";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/atoms/Button";

export default function CreateEvent() {
  const router = useRouter();
  // Handle back button click
  const handleBack = () => {
    router.push("/promoter/events");
  };
  return (
    <>
      <div className="flex items-center mb-6">
        <Button
          onClick={handleBack}
          className="flex items-center text-[#050557] hover:underline mr-4"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold">Buat Event Baru</h1>
      </div>
      <InputEvent />
      <InputTicketType />
      <InputVoucherEvent />
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="primary"
          className="mt-4 px-6 py-3"
          onClick={handleBack}
        >
          Batal
        </Button>
        <Button type="submit" variant="outlined" className="mt-4 px-6 py-3">
          Simpan Event
        </Button>
      </div>
    </>
  );
}
