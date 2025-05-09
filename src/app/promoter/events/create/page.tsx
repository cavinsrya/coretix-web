"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EventFormTemplate } from "@/components/templates/event-form-template";
import { EventBasicInfoForm } from "@/components/organisms/PromotorOrgn/event-basic-info-form";
import { TicketInfoForm } from "@/components/organisms/PromotorOrgn/ticket-info-form";
import { VoucherForm } from "@/components/organisms/PromotorOrgn/voucher-form";
import { EventDescriptionForm } from "@/components/organisms/PromotorOrgn/event-description-form";
import { createEvent } from "@/lib/api/axios";
import { useAuth } from "@/app/utils/hook/useAuth";

// Define types for our API request
interface TicketType {
  name: string;
  price: number;
  totalQuantity: number;
}

interface Promotion {
  title: string;
  code: string;
  ammount: number;
  startDate: string;
  endDate: string;
}

export default function CreateEventPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data to match API requirements
  const [formData, setFormData] = useState({
    image: null as File | null,
    title: "",
    description: "",
    category: "",
    location: "",
    price: 0,
    availableSeats: 0,
    startDate: "",
    endDate: "",

    // Ticket Types
    ticketTypes: [] as TicketType[],

    // Promotions
    promotions: [] as Promotion[],

    // UI state for ticket management
    ticketType: "paid" as "free" | "paid",
    tickets: [
      {
        id: "1",
        name: "REGULAR",
        price: "800000",
        quantity: "400",
      },
    ],

    // UI state for promotion management
    vouchers: [
      {
        id: "1",
        title: "PROMOKU",
        code: "PRM123",
        discount: "25000",
        discountType: "fixed" as "percentage" | "fixed",
        startDate: "",
        endDate: "",
        minPurchase: "0",
      },
    ],
  });

  // Effect to sync tickets to ticketTypes
  useEffect(() => {
    const ticketTypes = formData.tickets.map((ticket) => ({
      name: ticket.name,
      price: Number.parseInt(ticket.price) || 0,
      totalQuantity: Number.parseInt(ticket.quantity) || 0,
    }));

    setFormData((prev) => ({
      ...prev,
      ticketTypes,
      availableSeats: ticketTypes.reduce(
        (sum, ticket) => sum + ticket.totalQuantity,
        0
      ),
      price: Math.max(...ticketTypes.map((ticket) => ticket.price), 0),
    }));
  }, [formData.tickets]);

  // Effect to sync vouchers to promotions
  useEffect(() => {
    const promotions = formData.vouchers.map((voucher) => ({
      title: voucher.title || "",
      code: voucher.code || "",
      ammount: Number.parseInt(voucher.discount) || 0,
      startDate: voucher.startDate,
      endDate: voucher.endDate,
    }));

    setFormData((prev) => ({
      ...prev,
      promotions,
    }));
  }, [formData.vouchers]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };

      // Sinkronisasi otomatis
      if (field === "tickets") {
        const ticketTypes = value.map((ticket: any) => ({
          name: ticket.name,
          price: Number(ticket.price) || 0,
          totalQuantity: Number(ticket.quantity) || 0,
        }));

        updatedFormData.ticketTypes = ticketTypes;
        updatedFormData.availableSeats = ticketTypes.reduce(
          (sum: any, ticket: { totalQuantity: any }) =>
            sum + ticket.totalQuantity,
          0
        );
        updatedFormData.price = Math.max(
          ...ticketTypes.map((ticket: { price: any }) => ticket.price),
          0
        );
      }

      if (field === "vouchers") {
        updatedFormData.promotions = value.map((voucher: any) => ({
          title: voucher.title || "",
          code: voucher.code || "",
          ammount: Number(voucher.discount) || 0,
          startDate: voucher.startDate,
          endDate: voucher.endDate,
        }));
      }

      return updatedFormData;
    });

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
    console.log("Validating form...");

    if (!formData.image) newErrors.image = "Banner event wajib diupload";
    if (!formData.title.trim()) newErrors.title = "Nama event wajib diisi";
    if (!formData.category) newErrors.category = "Kategori event wajib dipilih";
    if (!formData.startDate) newErrors.startDate = "Tanggal mulai wajib diisi";
    if (!formData.endDate) newErrors.endDate = "Tanggal selesai wajib diisi";
    if (!formData.location.trim())
      newErrors.location = "Lokasi event wajib diisi";
    if (!formData.description.trim())
      newErrors.description = "Deskripsi event wajib diisi";

    if (formData.ticketTypes.length === 0) {
      newErrors.tickets = "Minimal satu jenis tiket harus ditambahkan";
    }
    console.log("Validation Errors:", newErrors);
    const payload = {
      image: formData.image,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      price: formData.price,
      availableSeats: formData.availableSeats,
      startDate: formData.startDate,
      endDate: formData.endDate,
      ticketTypes: formData.ticketTypes,
      promotions: formData.promotions,
    };

    console.log("Payload JSON yang dikirim:", JSON.stringify(payload, null, 2));

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      if (formData.image) {
        formDataObj.append("image", formData.image);
      }
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formDataObj.append("location", formData.location);
      formDataObj.append("price", formData.price.toString());
      formDataObj.append("availableSeats", formData.availableSeats.toString());
      formDataObj.append("startDate", formData.startDate);
      formDataObj.append("endDate", formData.endDate);
      formDataObj.append("ticketTypes", JSON.stringify(formData.ticketTypes));
      formDataObj.append(
        "promotions",
        JSON.stringify(formData.promotions || [])
      );

      const data = await createEvent(formDataObj);
      console.log("Event created:", data);
      router.push("/promoter/events");
    } catch (error: any) {
      console.error("Error:", error);
      setErrors({ apiError: "Terjadi kesalahan, silakan coba lagi" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map our internal form state to the props expected by our UI components
  const uiFormData = {
    banner: formData.image,
    name: formData.title,
    category: formData.category,
    startDate: formData.startDate,
    endDate: formData.endDate,
    location: formData.location,
    ticketType: formData.ticketType,
    tickets: formData.tickets,
    vouchers: formData.vouchers,
    description: formData.description,
  };

  return (
    <EventFormTemplate
      title="Buat Event Baru"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <EventBasicInfoForm
        formData={uiFormData}
        onChange={(field, value) => {
          // Map UI component field names to our API field names
          const fieldMap: Record<string, string> = {
            banner: "image",
            name: "title",
          };

          handleChange(fieldMap[field] || field, value);
        }}
        errors={errors}
      />

      <TicketInfoForm
        formData={uiFormData}
        onChange={handleChange}
        errors={errors}
      />

      <VoucherForm
        formData={uiFormData}
        onChange={handleChange}
        errors={errors}
      />

      <EventDescriptionForm
        formData={uiFormData}
        onChange={(field, value) => {
          if (field === "description") {
            handleChange("description", value);
          }
        }}
        errors={errors}
      />
    </EventFormTemplate>
  );
}
