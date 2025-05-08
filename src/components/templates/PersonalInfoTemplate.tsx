import React from "react";
import ProgressBar from "../molecules/Checkout/Personal Info/ProgressBar";
import PersonalInformation from "../molecules/Checkout/Personal Info/PersonalInformation";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { X, Search, Check } from "lucide-react";
import { toast } from "sonner";

export default function PersonalInfoTemplate({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = Number.parseInt(searchParams.get("qty") || "1");

  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedCustomVoucher, setAppliedCustomVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [voucherError, setVoucherError] = useState("");
  const [searchVoucher, setSearchVoucher] = useState("");

  const [eventData, setEventData] = useState({
    id: params.id,
    title: "Hearts2Hearts The Chase",
    date: "25 Apr - 25 Apr 2025",
    location: "Gelora Bung Karno",
    price: 210000,
    image: "/placeholder.svg?height=300&width=800",
  });

  // Dummy vouchers with additional requirements
  const availableVouchers = [
    {
      id: "v1",
      code: "NEWUSER",
      discount: 20000,
      description: "Diskon Rp 20.000 untuk pengguna baru",
      minTickets: 1,
      expiryDate: "30 Apr 2025",
      remainingUses: 500,
    },
    {
      id: "v2",
      code: "WEEKEND",
      discount: 15000,
      description: "Diskon Rp 15.000 untuk pembelian di akhir pekan",
      minTickets: 2,
      expiryDate: "15 May 2025",
      remainingUses: 200,
    },
    {
      id: "v3",
      code: "GROUPBUY",
      discount: 50000,
      description: "Diskon Rp 50.000 untuk pembelian grup",
      minTickets: 4,
      expiryDate: "10 May 2025",
      remainingUses: 100,
    },
  ];

  // Custom voucher codes for demo
  const validCustomVouchers = [
    {
      code: "SPECIAL25",
      discount: 25000,
    },
    {
      code: "PROMO40",
      discount: 40000,
    },
  ];

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
    setAppliedCustomVoucher(customVoucher);
    setVoucherCode("");
    setVoucherError("");
    toast.success(`Voucher ${customVoucher.code} berhasil diterapkan!`);
  };

  // Filter vouchers based on search
  const filteredVouchers = availableVouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchVoucher.toLowerCase()) ||
      voucher.description.toLowerCase().includes(searchVoucher.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <ProgressBar />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PersonalInformation
              params={{
                id: "",
              }}
            />
          </div>
        </div>
      </div>
      {/* Voucher Modal */}
      {showVoucherModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Pilih Voucher</h2>
              <button
                onClick={() => setShowVoucherModal(false)}
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
                            setSelectedVoucher(isSelected ? null : voucher.id);
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
                      onClick={() => setAppliedCustomVoucher(null)}
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
                  setSelectedVoucher(null);
                  setAppliedCustomVoucher(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                onClick={() => setShowVoucherModal(false)}
                className="px-4 py-2 bg-[#86e64c] text-[#050557] font-medium rounded-md hover:bg-opacity-90 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
