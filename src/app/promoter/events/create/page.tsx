"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventFormTemplate } from "@/components/templates/event-form-template";
import { EventBasicInfoForm } from "@/components/organisms/PromotorOrgn/event-basic-info-form";
import { TicketInfoForm } from "@/components/organisms/PromotorOrgn/ticket-info-form";
import { VoucherForm } from "@/components/organisms/PromotorOrgn/voucher-form";
import { EventDescriptionForm } from "@/components/organisms/PromotorOrgn/event-description-form";
import type { EventFormData } from "../../../../../types/event-form";

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data
  const [formData, setFormData] = useState<EventFormData>({
    banner: null,
    name: "",
    category: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    ticketType: "paid",
    tickets: [
      {
        id: "1",
        name: "",
        quantity: "1",
        price: "",
        isFree: false,
      },
    ],
    vouchers: [],
    description: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for the field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate basic info
    if (!formData.banner) newErrors.banner = "Banner event wajib diupload";
    if (!formData.name.trim()) newErrors.name = "Nama event wajib diisi";
    if (!formData.category) newErrors.category = "Kategori event wajib dipilih";
    if (!formData.startDate) newErrors.startDate = "Tanggal mulai wajib diisi";
    if (!formData.endDate) newErrors.endDate = "Tanggal selesai wajib diisi";
    if (!formData.startTime) newErrors.startTime = "Waktu mulai wajib diisi";
    if (!formData.endTime) newErrors.endTime = "Waktu selesai wajib diisi";
    if (!formData.location.trim())
      newErrors.location = "Lokasi event wajib diisi";

    // Validate tickets
    formData.tickets.forEach((ticket) => {
      if (!ticket.name.toString().trim())
        newErrors[`ticket-${ticket.id}-name`] = "Nama tiket wajib diisi";
      if (formData.ticketType === "paid" && !ticket.price) {
        newErrors[`ticket-${ticket.id}-price`] = "Harga tiket wajib diisi";
      }
      if (!ticket.quantity)
        newErrors[`ticket-${ticket.id}-quantity`] = "Jumlah tiket wajib diisi";
    });

    // Validate vouchers
    formData.vouchers.forEach((voucher) => {
      if (!voucher.code?.trim() && !voucher.title?.trim())
        newErrors[`voucher-${voucher.id}-code`] = "Kode voucher wajib diisi";
      if (!voucher.discount)
        newErrors[`voucher-${voucher.id}-discount`] =
          "Nilai diskon wajib diisi";
      if (!voucher.startDate)
        newErrors[`voucher-${voucher.id}-startDate`] =
          "Tanggal mulai wajib diisi";
      if (!voucher.endDate)
        newErrors[`voucher-${voucher.id}-endDate`] =
          "Tanggal berakhir wajib diisi";
    });

    // Validate description
    if (!formData.description.trim())
      newErrors.description = "Deskripsi event wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorId = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to events page
      router.push("/promoter/events");
    }, 1500);
  };

  return (
    <EventFormTemplate
      title="Buat Event Baru"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <EventBasicInfoForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <TicketInfoForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <VoucherForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <EventDescriptionForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />
    </EventFormTemplate>
  );
}
