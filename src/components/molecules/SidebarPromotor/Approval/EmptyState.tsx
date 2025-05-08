import { CheckCircle } from "lucide-react";
import React from "react";

type Props = {
  filterStatus: string;
};

export default function EmptyState({ filterStatus }: Props) {
  const message = {
    pending: "Tidak ada transaksi yang menunggu approval",
    approved: "Tidak ada transaksi yang sudah diapprove",
    rejected: "Tidak ada transaksi yang ditolak",
    all: "Belum ada transaksi",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-10 text-center">
      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">Tidak ada transaksi</h3>
      <p className="text-gray-500">
        {message[filterStatus as keyof typeof message]}
      </p>
    </div>
  );
}
