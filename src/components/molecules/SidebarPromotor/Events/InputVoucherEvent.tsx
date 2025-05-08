import React from "react";
import { useState } from "react";
import { Plus, Trash, Minus, Calendar } from "lucide-react";
import { z } from "zod";
import { voucherSchema, VoucherData } from "@/lib/validations/voucherSchema";
import { DatePicker } from "@/components/atoms/DatePicker";

export default function InputVoucherEvent() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof VoucherData, string>>
  >({});

  const handleSubmit = () => {
    const result = voucherSchema.safeParse({ name, startDate, endDate });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof VoucherData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("✅ Valid:", result.data);
      // TODO: Kirim data ke backend / API
    }
  };

  // Vouchers state
  const [vouchers, setVouchers] = useState<
    Array<{
      title: string;
      discount: number;
      minTickets: number;
      startDate: string;
      endDate: string;
    }>
  >([]);

  // Add new voucher
  const addVoucher = () => {
    setVouchers([
      ...vouchers,
      {
        title: "",
        discount: 0,
        minTickets: 1,
        startDate: "",
        endDate: "",
      },
    ]);
  };

  // Update voucher
  const updateVoucher = (index: number, field: string, value: any) => {
    const updatedVouchers = [...vouchers];
    // @ts-ignore
    updatedVouchers[index][field] = value;
    setVouchers(updatedVouchers);
  };

  // Remove voucher
  const removeVoucher = (index: number) => {
    const updatedVouchers = vouchers.filter((_, i) => i !== index);
    setVouchers(updatedVouchers);
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Voucher Diskon</h2>

      <div className="space-y-6">
        {vouchers.map((voucher, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Voucher #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeVoucher(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Voucher Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Voucher
                </label>
                <input
                  type="text"
                  value={voucher.title}
                  onChange={(e) =>
                    updateVoucher(index, "title", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                  placeholder="Contoh: EARLYBIRD, WEEKEND25"
                  required
                />
              </div>

              {/* Voucher Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Potongan Harga
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={voucher.discount}
                    onChange={(e) =>
                      updateVoucher(
                        index,
                        "discount",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              {/* Minimum Tickets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Pembelian Tiket
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      updateVoucher(
                        index,
                        "minTickets",
                        Math.max(1, voucher.minTickets - 1)
                      )
                    }
                    className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={voucher.minTickets}
                    onChange={(e) =>
                      updateVoucher(
                        index,
                        "minTickets",
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    className="w-20 py-2 text-center border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updateVoucher(index, "minTickets", voucher.minTickets + 1)
                    }
                    className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Voucher Validity Period */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tanggal Mulai
                </label>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  placeholder="Pilih tanggal mulai"
                />
                {errors.startDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tanggal Berakhir
                </label>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  placeholder="Pilih tanggal berakhir"
                />
                {errors.endDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addVoucher}
          className="w-full border border-dashed border-gray-300 p-3 rounded-md text-gray-500 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Tambah Voucher
        </button>
      </div>
    </div>
  );
}
