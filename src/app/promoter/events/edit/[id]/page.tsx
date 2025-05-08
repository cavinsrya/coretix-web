"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EventFormTemplate } from "@/components/templates/event-form-template";
import { EventBasicInfoForm } from "@/components/organisms/PromotorOrgn/event-basic-info-form";
import { TicketInfoForm } from "@/components/organisms/PromotorOrgn/ticket-info-form";
import { VoucherForm } from "@/components/organisms/PromotorOrgn/voucher-form";
import { EventDescriptionForm } from "@/components/organisms/PromotorOrgn/event-description-form";
import {
  EventFormData,
  Voucher,
  Ticket,
} from "../../../../../../types/event-form";

// Sample event data for editing
const sampleEvents = [
  {
    id: "1",
    title: "Jakarta Music Festival 2025",
    category: "Konser",
    startDate: "2025-06-12",
    endDate: "2025-06-14",
    startTime: "18:00",
    endTime: "23:00",
    location: "Gelora Bung Karno, Jakarta",
    description:
      "Jakarta Music Festival adalah festival musik terbesar di Jakarta yang menampilkan berbagai musisi lokal dan internasional. Event ini akan berlangsung selama 3 hari dengan berbagai genre musik.",
    banner: "/placeholder.svg?height=200&width=350",
    ticketTypes: [
      { id: "1", name: "Regular", quantity: 300, price: 150000, isFree: false },
      { id: "2", name: "VIP", quantity: 100, price: 500000, isFree: false },
      { id: "3", name: "VVIP", quantity: 50, price: 1000000, isFree: false },
    ],
    vouchers: [
      {
        id: "1",
        title: "EARLYBIRD",
        discount: 50000,
        minTickets: 1,
        startDate: "2025-05-01",
        endDate: "2025-05-15",
      },
      {
        id: "2",
        title: "GROUP4",
        discount: 200000,
        minTickets: 4,
        startDate: "2025-05-01",
        endDate: "2025-06-01",
      },
    ],
  },
  {
    id: "2",
    title: "Business Summit 2025",
    category: "Conference",
    startDate: "2025-07-25",
    endDate: "2025-07-25",
    startTime: "09:00",
    endTime: "17:00",
    location: "JCC Senayan, Jakarta",
    description:
      "Business Summit 2025 adalah konferensi bisnis yang menghadirkan para pembicara dari berbagai industri untuk berbagi pengalaman dan pengetahuan mereka.",
    banner: "/placeholder.svg?height=200&width=350",
    ticketTypes: [
      {
        id: "1",
        name: "Standard",
        quantity: 200,
        price: 300000,
        isFree: false,
      },
      { id: "2", name: "Premium", quantity: 100, price: 500000, isFree: false },
    ],
    vouchers: [
      {
        id: "1",
        title: "BIZPRO",
        discount: 100000,
        minTickets: 1,
        startDate: "2025-06-01",
        endDate: "2025-07-01",
      },
    ],
  },
];

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const eventId = params.id;
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
    tickets: [],
    vouchers: [],
    description: "",
  });

  // Load event data
  useEffect(() => {
    // In a real app, you would fetch this from an API
    const event = sampleEvents.find((e) => e.id === eventId);

    if (event) {
      // Transform the data to match our form structure
      const tickets: Ticket[] = event.ticketTypes.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        quantity: ticket.quantity.toString(),
        price: ticket.isFree ? null : ticket.price.toString(),
        isFree: ticket.isFree,
      }));

      const vouchers: Voucher[] = event.vouchers.map((voucher) => ({
        id: voucher.id,
        code: voucher.title, // Map title to code for compatibility
        title: voucher.title,
        discount: voucher.discount.toString(),
        minTickets: voucher.minTickets?.toString() || "1",
        startDate: voucher.startDate,
        endDate: voucher.endDate,
      }));

      setFormData({
        banner: event.banner,
        name: event.title,
        category: event.category,
        startDate: event.startDate,
        endDate: event.endDate,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        ticketType: tickets.some((t) => t.isFree) ? "free" : "paid",
        tickets,
        vouchers,
        description: event.description,
      });
    }
  }, [eventId]);

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
      title="Edit Event"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      backLink="/promoter/events"
    >
      <EventBasicInfoForm
        formData={formData}
        onChange={handleChange}
        errors={errors}
        isEdit={true}
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
