import React from "react";
import { useState } from "react";
import { Plus, Trash, Minus } from "lucide-react";

export default function InputTicketType() {
  // Ticket types state
  const [ticketTypes, setTicketTypes] = useState<
    Array<{
      name: string;
      quantity: number;
      price: number | null;
      isFree: boolean;
    }>
  >([
    { name: "Presale 1", quantity: 100, price: 100000, isFree: false },
    { name: "Presale 2", quantity: 100, price: 150000, isFree: false },
    { name: "Regular", quantity: 200, price: 200000, isFree: false },
  ]);

  // Add new ticket type
  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { name: "", quantity: 1, price: null, isFree: false },
    ]);
  };

  // Update ticket type
  const updateTicketType = (index: number, field: string, value: any) => {
    const updatedTicketTypes = [...ticketTypes];

    if (field === "isFree") {
      updatedTicketTypes[index].isFree = value;
      if (value) {
        updatedTicketTypes[index].price = null;
      }
    } else {
      // @ts-ignore
      updatedTicketTypes[index][field] = value;
    }

    setTicketTypes(updatedTicketTypes);
  };

  // Remove ticket type
  const removeTicketType = (index: number) => {
    if (ticketTypes.length > 1) {
      const updatedTicketTypes = ticketTypes.filter((_, i) => i !== index);
      setTicketTypes(updatedTicketTypes);
    }
  };
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Tipe Tiket</h2>

        <div className="space-y-6">
          {ticketTypes.map((ticket, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Tiket #{index + 1}</h3>
                {ticketTypes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTicketType(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Ticket Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kategori Tiket
                  </label>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) =>
                      updateTicketType(index, "name", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    placeholder="Contoh: VIP, Regular, Early Bird"
                    required
                  />
                </div>

                {/* Ticket Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Tiket
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateTicketType(
                          index,
                          "quantity",
                          Math.max(1, ticket.quantity - 1)
                        )
                      }
                      className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={ticket.quantity}
                      onChange={(e) =>
                        updateTicketType(
                          index,
                          "quantity",
                          Number.parseInt(e.target.value) || 1
                        )
                      }
                      className="w-20 py-2 text-center border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateTicketType(index, "quantity", ticket.quantity + 1)
                      }
                      className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Free or Paid */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Tiket
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!ticket.isFree}
                        onChange={() =>
                          updateTicketType(index, "isFree", false)
                        }
                        className="mr-2"
                      />
                      <span>Berbayar</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={ticket.isFree}
                        onChange={() => updateTicketType(index, "isFree", true)}
                        className="mr-2"
                      />
                      <span>Gratis</span>
                    </label>
                  </div>
                </div>

                {/* Ticket Price (if paid) */}
                {!ticket.isFree && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harga Tiket
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        Rp
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={ticket.price || ""}
                        onChange={(e) =>
                          updateTicketType(
                            index,
                            "price",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
                        placeholder="0"
                        required={!ticket.isFree}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTicketType}
            className="w-full border border-dashed border-gray-300 p-3 rounded-md text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Tambah Tipe Tiket
          </button>
        </div>
      </div>
    </>
  );
}
