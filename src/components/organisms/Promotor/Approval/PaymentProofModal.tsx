import Image from "next/image";
import { XCircle } from "lucide-react";
import React from "react";

type Props = {
  url: string;
  onClose: () => void;
};

export default function PaymentProofModal({ url, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Bukti Pembayaran</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </div>
        <div className="relative w-full h-[400px]">
          <Image
            src={url}
            alt="Payment Proof"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
