"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, ChevronUp, ChevronDown } from "lucide-react";
import { CheckoutTemplate } from "@/components/templates/checkout-template";
import { getTransactionById, uploadPaymentProof } from "@/lib/api/axios";

export default function ConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = Number.parseInt(searchParams.get("qty") || "1");
  const pointsUsed = Number.parseInt(searchParams.get("points") || "0");
  const invoiceCode = searchParams.get("invoice") || "CRTX12345";
  const voucherDiscount = Number.parseInt(
    searchParams.get("voucherDiscount") || "0"
  );
  const voucherId = searchParams.get("voucher") || "";

  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [eventData, setEventData] = useState<any>(null);

  // Calculate payment deadline
  const currentDate = new Date();
  const paymentDeadline = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
  const formattedDeadline = `${paymentDeadline.getDate()} Apr ${paymentDeadline.getFullYear()} ${String(
    paymentDeadline.getHours()
  ).padStart(2, "0")}:${String(paymentDeadline.getMinutes()).padStart(2, "0")}`;

  // Fetch transaction
  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionId = Number(searchParams.get("transactionId"));
      if (!transactionId || isNaN(transactionId)) {
        console.error("Invalid transaction ID:", transactionId);
        return;
      }
      try {
        const data = await getTransactionById(transactionId);
        console.log("Fetched transaction:", data);
        setEventData(data.event);
        setTotalPrice(data.totalPrice);
      } catch (err: any) {
        console.error(
          "Gagal memuat data transaksi:",
          err.response?.data || err
        );
      }
    };

    fetchTransaction();
  }, [searchParams]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(timer);
        // Handle timeout, e.g., redirect or show message
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaymentComplete = async () => {
    if (!selectedFile) {
      alert("Mohon upload bukti pembayaran terlebih dahulu");
      return;
    }

    try {
      await uploadPaymentProof({
        transactionId: Number(searchParams.get("transactionId")),
        file: selectedFile,
      });

      alert("Pembayaran berhasil! Tiket akan dikirim ke email Anda.");
      router.push("/");
    } catch (error: any) {
      console.error("Upload gagal:", error);
      alert("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
    }
  };

  return (
    <CheckoutTemplate
      currentStep={3}
      eventImageUrl={eventData?.imageUrl}
      eventTitle={eventData?.title}
    >
      {/* Countdown and Payment Info */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-lg font-medium mb-2">
            Waktu Menyelesaikan Pembayaran Tersisa
          </h2>
          <div className="text-4xl font-bold text-green-500 mb-2">
            {String(hours).padStart(2, "0")} :{" "}
            {String(minutes).padStart(2, "0")} :{" "}
            {String(seconds).padStart(2, "0")}
          </div>

          <div className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mb-4">
            Waiting For Payment
          </div>

          <p className="text-sm mb-1">Batas Pembayaran: {formattedDeadline}</p>
          <p className="text-xs text-gray-500">
            Jika kamu melewati batas pembayaran, pesanan tiketmu akan secara
            otomatis dibatalkan
          </p>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-bold">Bank Transfer</h3>
            <div className="bg-gray-200 h-8 w-16 rounded"></div>
          </div>

          <div className="px-4 pb-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Kode Invoice</p>
              <p className="font-bold">{invoiceCode}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Transfer Ke</p>
              <p className="font-bold">5321020321 A/n CoreTix Bahagia Selalu</p>
            </div>

            <div className="mb-2">
              <p className="text-sm text-gray-500 mb-1">Total Pembayaran</p>
              <p className="font-bold">
                Rp {totalPrice?.toLocaleString?.() || "-"}
              </p>
            </div>

            <button
              className="flex items-center text-sm font-medium"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <ChevronUp className="h-4 w-4 mr-1" />
              ) : (
                <ChevronDown className="h-4 w-4 mr-1" />
              )}
              {showDetails ? "Sembunyikan Detail" : "Lihat Detail"}
            </button>

            {showDetails && (
              <div className="mt-3 pt-3 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Harga Tiket</span>
                  <span className="text-sm">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </div>

                {pointsUsed > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span className="text-sm">Point</span>
                    <span className="text-sm">
                      -Rp {pointsUsed.toLocaleString()}
                    </span>
                  </div>
                )}

                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span className="text-sm">Voucher</span>
                    <span className="text-sm">
                      -Rp {voucherDiscount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upload Payment Proof */}
        <div className="bg-white rounded-lg border mb-6">
          <div className="p-4">
            <h3 className="font-bold mb-4">Upload Payment Proof</h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {previewUrl ? (
                <div className="mb-4">
                  <Image
                    src={previewUrl || "/placeholder.svg"}
                    alt="Payment proof preview"
                    width={200}
                    height={200}
                    className="mx-auto object-contain h-[200px]"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mb-4">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">
                    Click to upload{" "}
                    <span className="text-gray-400">or drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-400">PNG/JPG (max. 10MB)</p>
                </div>
              )}

              <input
                type="file"
                id="payment-proof"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="payment-proof"
                className="inline-block bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {previewUrl ? "Change File" : "Select File"}
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handlePaymentComplete}
          className="w-full bg-[#86e64c] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors mb-8"
        >
          Telah Melakukan Pembayaran
        </button>
      </div>
    </CheckoutTemplate>
  );
}
