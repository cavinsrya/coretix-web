"use client";
import { Plus, Trash2 } from "lucide-react";
import { FormField } from "@/components/molecules/PromotorComp/form-field";
import { FormSectionHeader } from "@/components/molecules/PromotorComp/form-section-header";
import type { Voucher } from "../../../../types/event-form";

interface VoucherFormProps {
  formData: {
    vouchers: Voucher[];
  };
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function VoucherForm({ formData, onChange, errors }: VoucherFormProps) {
  const addVoucher = () => {
    const newVoucher: Voucher = {
      id: Date.now().toString(),
      code: "",
      discount: "",
      discountType: "percentage",
      minPurchase: "",
      startDate: "",
      endDate: "",
      maxUses: "",
    };

    onChange("vouchers", [...formData.vouchers, newVoucher]);
  };

  const removeVoucher = (id: string) => {
    onChange(
      "vouchers",
      formData.vouchers.filter((voucher) => voucher.id !== id)
    );
  };

  const updateVoucher = (id: string, field: keyof Voucher, value: any) => {
    onChange(
      "vouchers",
      formData.vouchers.map((voucher) =>
        voucher.id === id ? { ...voucher, [field]: value } : voucher
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <FormSectionHeader
        title="Voucher Diskon (Opsional)"
        description="Buat voucher diskon untuk meningkatkan penjualan tiket"
      />

      {formData.vouchers.map((voucher, index) => (
        <div
          key={voucher.id}
          className="border border-gray-200 rounded-lg p-4 mb-4"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Voucher {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeVoucher(voucher.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <FormField
            label="Kode Voucher"
            htmlFor={`voucher-code-${voucher.id}`}
            required
            error={errors[`voucher-${voucher.id}-code`]}
          >
            <input
              type="text"
              id={`voucher-code-${voucher.id}`}
              value={voucher.code || ""}
              onChange={(e) =>
                updateVoucher(voucher.id, "code", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: SUMMER25"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Nilai Diskon"
              htmlFor={`voucher-discount-${voucher.id}`}
              required
              error={errors[`voucher-${voucher.id}-discount`]}
            >
              <input
                type="number"
                id={`voucher-discount-${voucher.id}`}
                value={voucher.discount}
                onChange={(e) =>
                  updateVoucher(voucher.id, "discount", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan nilai diskon"
                min="0"
              />
            </FormField>

            <FormField
              label="Tipe Diskon"
              htmlFor={`voucher-discountType-${voucher.id}`}
              required
              error={errors[`voucher-${voucher.id}-discountType`]}
            >
              <select
                id={`voucher-discountType-${voucher.id}`}
                value={voucher.discountType || "percentage"}
                onChange={(e) =>
                  updateVoucher(
                    voucher.id,
                    "discountType",
                    e.target.value as "percentage" | "fixed"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Persentase (%)</option>
                <option value="fixed">Nominal (Rp)</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="Minimum Pembelian (Rp)"
            htmlFor={`voucher-minPurchase-${voucher.id}`}
            error={errors[`voucher-${voucher.id}-minPurchase`]}
          >
            <input
              type="number"
              id={`voucher-minPurchase-${voucher.id}`}
              value={voucher.minPurchase || ""}
              onChange={(e) =>
                updateVoucher(voucher.id, "minPurchase", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0 untuk tidak ada minimum"
              min="0"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Tanggal Mulai"
              htmlFor={`voucher-startDate-${voucher.id}`}
              required
              error={errors[`voucher-${voucher.id}-startDate`]}
            >
              <input
                type="date"
                id={`voucher-startDate-${voucher.id}`}
                value={voucher.startDate}
                onChange={(e) =>
                  updateVoucher(voucher.id, "startDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>

            <FormField
              label="Tanggal Berakhir"
              htmlFor={`voucher-endDate-${voucher.id}`}
              required
              error={errors[`voucher-${voucher.id}-endDate`]}
            >
              <input
                type="date"
                id={`voucher-endDate-${voucher.id}`}
                value={voucher.endDate}
                onChange={(e) =>
                  updateVoucher(voucher.id, "endDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </FormField>
          </div>

          <FormField
            label="Maksimum Penggunaan"
            htmlFor={`voucher-maxUses-${voucher.id}`}
            error={errors[`voucher-${voucher.id}-maxUses`]}
          >
            <input
              type="number"
              id={`voucher-maxUses-${voucher.id}`}
              value={voucher.maxUses || ""}
              onChange={(e) =>
                updateVoucher(voucher.id, "maxUses", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kosongkan untuk tidak terbatas"
              min="1"
            />
          </FormField>
        </div>
      ))}

      <button
        type="button"
        onClick={addVoucher}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <Plus className="h-4 w-4 mr-1" />
        Tambah Voucher
      </button>
    </div>
  );
}
