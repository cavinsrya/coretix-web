"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import { FormSectionHeader } from "@/components/molecules/PromotorComp/form-section-header";
import { FormField } from "@/components/molecules/PromotorComp/form-field";

interface Ticket {
  id: string;
  name: string;
  price: string | number | null;
  quantity: string | number;
  description?: string;
  isFree?: boolean;
}

interface TicketInfoFormProps {
  formData: {
    ticketType: "free" | "paid";
    tickets: Ticket[];
  };
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function TicketInfoForm({
  formData,
  onChange,
  errors,
}: TicketInfoFormProps) {
  const handleTicketTypeChange = (type: "free" | "paid") => {
    onChange("ticketType", type);

    // Update all tickets to match the new type
    const updatedTickets = formData.tickets.map((ticket) => ({
      ...ticket,
      isFree: type === "free",
      price: type === "free" ? null : ticket.price,
    }));

    onChange("tickets", updatedTickets);
  };

  const addTicket = () => {
    const newTicket = {
      id: Date.now().toString(),
      name: "",
      price: formData.ticketType === "free" ? null : "",
      quantity: "",
      description: "",
      isFree: formData.ticketType === "free",
    };

    onChange("tickets", [...formData.tickets, newTicket]);
  };

  const updateTicket = (id: string, field: keyof Ticket, value: any) => {
    onChange(
      "tickets",
      formData.tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const removeTicket = (id: string) => {
    if (formData.tickets.length > 1) {
      onChange(
        "tickets",
        formData.tickets.filter((ticket) => ticket.id !== id)
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <FormSectionHeader
        title="Informasi Tiket"
        description="Tentukan jenis dan harga tiket untuk event Anda"
      />

      {/* Ticket Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipe Tiket
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.ticketType === "paid"}
              onChange={() => handleTicketTypeChange("paid")}
              className="mr-2"
            />
            <span>Berbayar</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={formData.ticketType === "free"}
              onChange={() => handleTicketTypeChange("free")}
              className="mr-2"
            />
            <span>Gratis</span>
          </label>
        </div>
      </div>

      {/* Ticket Categories */}
      <div className="space-y-6">
        {formData.tickets.map((ticket, index) => (
          <div key={ticket.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Tiket #{index + 1}</h3>
              {formData.tickets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTicket(ticket.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Ticket Name */}
              <FormField
                label="Nama Kategori Tiket"
                htmlFor={`ticket-${ticket.id}-name`}
                required
                error={errors[`ticket-${ticket.id}-name`]}
              >
                <input
                  type="text"
                  id={`ticket-${ticket.id}-name`}
                  value={ticket.name}
                  onChange={(e) =>
                    updateTicket(ticket.id, "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c]"
                  placeholder="Contoh: VIP, Regular, Early Bird"
                />
              </FormField>

              {/* Ticket Quantity */}
              <FormField
                label="Jumlah Tiket"
                htmlFor={`ticket-${ticket.id}-quantity`}
                required
                error={errors[`ticket-${ticket.id}-quantity`]}
              >
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      updateTicket(
                        ticket.id,
                        "quantity",
                        Math.max(1, Number(ticket.quantity) - 1)
                      )
                    }
                    className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id={`ticket-${ticket.id}-quantity`}
                    min="1"
                    value={ticket.quantity}
                    onChange={(e) =>
                      updateTicket(ticket.id, "quantity", e.target.value)
                    }
                    className="w-20 py-2 text-center border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86e64c]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateTicket(
                        ticket.id,
                        "quantity",
                        Number(ticket.quantity) + 1
                      )
                    }
                    className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </FormField>

              {/* Ticket Price (if paid) */}
              {formData.ticketType === "paid" && (
                <FormField
                  label="Harga Tiket"
                  htmlFor={`ticket-${ticket.id}-price`}
                  required
                  error={errors[`ticket-${ticket.id}-price`]}
                >
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      Rp
                    </span>
                    <input
                      type="number"
                      id={`ticket-${ticket.id}-price`}
                      min="0"
                      value={ticket.price || ""}
                      onChange={(e) =>
                        updateTicket(ticket.id, "price", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] pl-10"
                      placeholder="0"
                    />
                  </div>
                </FormField>
              )}

              {/* Ticket Description (optional) */}
              <FormField
                label="Deskripsi Tiket (Opsional)"
                htmlFor={`ticket-${ticket.id}-description`}
                error={errors[`ticket-${ticket.id}-description`]}
              >
                <textarea
                  id={`ticket-${ticket.id}-description`}
                  value={ticket.description || ""}
                  onChange={(e) =>
                    updateTicket(ticket.id, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c]"
                  placeholder="Deskripsi tambahan tentang tiket ini"
                  rows={2}
                />
              </FormField>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addTicket}
          className="w-full border border-dashed border-gray-300 p-3 rounded-md text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Tambah Tipe Tiket
        </button>
      </div>
    </div>
  );
}
