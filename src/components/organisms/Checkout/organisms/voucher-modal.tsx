"use client";

import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { toast } from "sonner";

interface Voucher {
  id: string;
  code: string;
  discount: number;
  description: string;
  minTickets: number;
  expiryDate: string;
  remainingUses: number;
}

interface CustomVoucher {
  code: string;
  discount: number;
}

interface VoucherModalProps {
  show: boolean;
  onClose: () => void;
  availableVouchers: Voucher[];
  validCustomVouchers: CustomVoucher[];
  selectedVoucher: string | null;
  appliedCustomVoucher: { code: string; discount: number } | null;
  quantity: number;
  onSelectVoucher: (voucherId: string | null) => void;
  onApplyCustomVoucher: (
    voucher: { code: string; discount: number } | null
  ) => void;
}

export function VoucherModal({
  show,
  onClose,
  availableVouchers,
  validCustomVouchers,
  selectedVoucher,
  appliedCustomVoucher,
  quantity,
  onSelectVoucher,
  onApplyCustomVoucher,
}: VoucherModalProps) {
  const [searchVoucher, setSearchVoucher] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherError, setVoucherError] = useState("");

  if (!show) return null;

  // Filter vouchers based on search
  const filteredVouchers = availableVouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchVoucher.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchVoucher.toLowerCase())
  );

  const handleApplyVoucher = () => {
    if (!voucherCode.trim()) {
      setVoucherError("Kode voucher tidak boleh kosong");
      return;
    }

    // Check if voucher exists
    const customVoucher = validCustomVouchers.find(
      (v) => v.code === voucherCode.toUpperCase()
    );

    if (!customVoucher) {
      setVoucherError("Kode voucher tidak ditemukan");
      return;
    }

    // Apply voucher
    onApplyCustomVoucher(customVoucher);
    setVoucherCode("");
    setVoucherError("");
    toast.success(`Voucher ${customVoucher.code} berhasil diterapkan!`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pilih Voucher</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Voucher */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari voucher..."
            value={searchVoucher}
            onChange={(e) => setSearchVoucher(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Available Vouchers */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Voucher Tersedia</h3>
          <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1">
            {filteredVouchers.length > 0 ? (
              filteredVouchers.map((voucher) => {
                const isDisabled = quantity < voucher.minTickets;
                const isSelected = selectedVoucher === voucher.id;
                return (
                  <div
                    key={voucher.id}
                    className={`p-3 rounded-md border ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                        : isSelected
                        ? "bg-green-50 border-green-200 cursor-pointer"
                        : "hover:bg-gray-50 cursor-pointer border-gray-200"
                    }`}
                    onClick={() => {
                      if (!isDisabled) {
                        onSelectVoucher(isSelected ? null : voucher.id);
                      }
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{voucher.code}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <span className="text-red-500">
                        -Rp {voucher.discount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {voucher.description}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        Min. {voucher.minTickets} tiket
                      </p>
                      <p className="text-xs text-gray-500">
                        Exp: {voucher.expiryDate}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Tersisa: {voucher.remainingUses}x
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500">
                Tidak ada voucher yang sesuai
              </div>
            )}
          </div>
        </div>

        {/* Input Voucher Code */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Punya Kode Voucher?</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Masukkan kode voucher"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              onClick={handleApplyVoucher}
              className="px-4 py-2 bg-[#050557] text-white rounded-md hover:bg-opacity-90"
            >
              Terapkan
            </button>
          </div>
          {voucherError && (
            <p className="text-red-500 text-sm">{voucherError}</p>
          )}

          {/* Applied Custom Voucher */}
          {appliedCustomVoucher && (
            <div className="mt-3 p-3 rounded-md bg-green-50 border border-green-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {appliedCustomVoucher.code}
                  </span>
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <button
                  onClick={() => onApplyCustomVoucher(null)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Hapus
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Diskon: Rp {appliedCustomVoucher.discount.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              onSelectVoucher(null);
              onApplyCustomVoucher(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#86e64c] text-[#050557] font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
