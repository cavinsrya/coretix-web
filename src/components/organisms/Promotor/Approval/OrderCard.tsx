"use client";
import {
  Calendar,
  Clock,
  User,
  Banknote,
  Eye,
  XCircle,
  CheckCircle,
} from "lucide-react";
import React from "react";

type Order = {
  id: string;
  eventName: string;
  customerName: string;
  purchaseDate: string;
  quantity: number;
  ticketType: string;
  totalAmount: number;
  paymentProof: string;
  status: string;
};

type Props = {
  order: Order;
  onViewProof: (url: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export default function OrderCard({
  order,
  onViewProof,
  onApprove,
  onReject,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-3">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <div>
            <h3 className="font-bold text-lg">{order.eventName}</h3>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
              order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status === "pending" && "Menunggu Approval"}
            {order.status === "approved" && "Approved"}
            {order.status === "rejected" && "Rejected"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#050557]" />
              <span className="text-sm">{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#050557]" />
              <span className="text-sm">{order.purchaseDate}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#050557]" />
              <span className="text-sm">
                {order.ticketType} - {order.quantity} tiket
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-[#050557]" />
              <span className="text-sm">
                Rp {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              onClick={() => onViewProof(order.paymentProof)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center gap-1"
            >
              <Eye className="h-4 w-4" /> Lihat Bukti
            </button>
            {order.status === "pending" && (
              <>
                <button
                  onClick={() => onReject(order.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 flex items-center gap-1"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => onApprove(order.id)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" /> Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
