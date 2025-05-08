"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronLeft, Tag, X, Search, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function PersonalInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = Number.parseInt(searchParams.get("qty") || "1");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usePoints, setUsePoints] = useState(false);
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

  // Dummy points
  const userPoints = 10000;

  const ticketPrice = eventData.price * quantity;
  const adminFee = 2000;
  const pointsDiscount = usePoints ? userPoints : 0;
  const voucherDiscount = selectedVoucher
    ? availableVouchers.find((v) => v.id === selectedVoucher)?.discount || 0
    : 0;
  const customVoucherDiscount = appliedCustomVoucher
    ? appliedCustomVoucher.discount
    : 0;

  const totalPrice =
    ticketPrice +
    adminFee -
    pointsDiscount -
    voucherDiscount -
    customVoucherDiscount;

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

  const handleContinue = () => {
    if (!name || !email || !phone) {
      toast.error("Mohon lengkapi semua informasi personal");
      return;
    }

    // Generate invoice code once
    const invoiceCode = "CRTX" + Math.floor(10000 + Math.random() * 90000);

    // Normally we would save this data to a state management solution or API
    // For this demo, we'll just pass it via URL params
    router.push(
      `/checkout/confirmation/${params.id}?qty=${quantity}&points=${
        usePoints ? userPoints : 0
      }&invoice=${invoiceCode}&voucher=${
        selectedVoucher || ""
      }&voucherDiscount=${voucherDiscount + customVoucherDiscount}`
    );
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
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {/* First step */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#050557] flex items-center justify-center text-white z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-[#050557] font-medium text-sm mt-2">
                Pilih Tiket
              </span>
            </div>

            {/* Connecting line 1-2 */}
            <div className="h-0.5 bg-[#050557] flex-grow mx-2"></div>

            {/* Second step */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#050557] flex items-center justify-center text-white z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="text-[#050557] font-medium text-sm mt-2">
                Informasi Personal
              </span>
            </div>

            {/* Connecting line 2-3 */}
            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>

            {/* Third step */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-white z-10"></div>
              <span className="text-gray-400 font-medium text-sm mt-2">
                Konfirmasi
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - Wrapped in a single card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Personal Information */}
            <div className="md:col-span-2">
              {/* Ticket Details */}
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Detail Tiket</h3>

                <div className="flex gap-4 mb-4">
                  <div className="bg-gray-200 h-[80px] w-[120px] rounded"></div>
                  <div>
                    <h4 className="font-bold">{eventData.title}</h4>
                    <p className="text-sm text-gray-600">{eventData.date}</p>
                  </div>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <p className="text-sm">Harga per Ticket</p>
                  <p className="font-bold">
                    Rp {eventData.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-sm">Jumlah</p>
                  <p className="font-bold">{quantity} Tickets</p>
                </div>
              </div>

              {/* Buyer Information */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">Buyer Informartion</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Make sure all the informations is correct. You cannot change
                  it later
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      *E-tiket akan dikirim melalui email ini.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      No Handphone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Details */}
            <div className="md:col-span-1">
              {/* Payment Method */}
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>

                <div className="border rounded-md p-3 flex items-center gap-3 bg-gray-50">
                  <div className="bg-gray-200 h-6 w-6 rounded"></div>
                  <span className="text-gray-600">Bank Transfer</span>
                </div>
              </div>

              {/* Voucher */}
              <div className="border rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Voucher</h3>

                <button
                  className="w-full border rounded-md p-3 flex items-center justify-between mb-3"
                  onClick={() => setShowVoucherModal(true)}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-[#050557]" />
                    <span>
                      {selectedVoucher
                        ? availableVouchers.find(
                            (v) => v.id === selectedVoucher
                          )?.code
                        : appliedCustomVoucher
                        ? appliedCustomVoucher.code
                        : "Pilih atau Masukkan Voucher"}
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5" />
                </button>

                {/* Display applied vouchers */}
                {(selectedVoucher || appliedCustomVoucher) && (
                  <div className="mt-2 mb-2">
                    <h4 className="text-sm font-medium mb-2">
                      Voucher Diterapkan:
                    </h4>
                    <div className="space-y-2">
                      {selectedVoucher && (
                        <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
                          <span className="font-medium">
                            {
                              availableVouchers.find(
                                (v) => v.id === selectedVoucher
                              )?.code
                            }
                          </span>
                          <span className="text-red-500">
                            -Rp{" "}
                            {availableVouchers
                              .find((v) => v.id === selectedVoucher)
                              ?.discount.toLocaleString() || 0}
                          </span>
                        </div>
                      )}
                      {appliedCustomVoucher && (
                        <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
                          <span className="font-medium">
                            {appliedCustomVoucher.code}
                          </span>
                          <span className="text-red-500">
                            -Rp {appliedCustomVoucher.discount.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Points */}
              <div className="border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Point</h3>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <span className="text-sm">
                        {userPoints.toLocaleString()} Points
                      </span>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={usePoints}
                      onChange={() => setUsePoints(!usePoints)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
                  </label>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Detail Pembayaran</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Harga Tiket</span>
                    <span>Rp {ticketPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Biaya Admin</span>
                    <span>Rp {adminFee.toLocaleString()}</span>
                  </div>

                  {usePoints && (
                    <div className="flex justify-between text-red-500">
                      <span>Point</span>
                      <span>-Rp {pointsDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {selectedVoucher && (
                    <div className="flex justify-between text-red-500">
                      <span>Voucher</span>
                      <span>-Rp {voucherDiscount.toLocaleString()}</span>
                    </div>
                  )}

                  {appliedCustomVoucher && (
                    <div className="flex justify-between text-red-500">
                      <span>Voucher Kustom</span>
                      <span>-Rp {customVoucherDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Harga</span>
                    <span>Rp {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    href={`/checkout/select-ticket/${params.id}`}
                    className="flex items-center justify-center gap-1 border border-[#050557] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </Link>
                  <button
                    onClick={handleContinue}
                    className="flex-1 bg-[#86e64c] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                  >
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
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
