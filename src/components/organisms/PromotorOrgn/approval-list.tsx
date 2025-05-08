"use client";

import { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import Image from "next/image";
import { ApprovalCard } from "./approval-card";
import { ApprovalFilter } from "./approval-filter";

// Sample ticket order data
const dummyOrders = [
  {
    id: "1",
    eventId: "1",
    eventName: "Jakarta Music Festival 2025",
    customerName: "Budi Santoso",
    customerEmail: "budi@example.com",
    purchaseDate: "15 May 2025 10:30",
    quantity: 2,
    ticketType: "VIP",
    totalAmount: 500000,
    paymentMethod: "Bank Transfer",
    paymentProof: "/placeholder.svg?height=600&width=400",
    status: "pending",
  },
  {
    id: "2",
    eventId: "1",
    eventName: "Jakarta Music Festival 2025",
    customerName: "Siti Nuraini",
    customerEmail: "siti@example.com",
    purchaseDate: "15 May 2025 11:45",
    quantity: 1,
    ticketType: "Regular",
    totalAmount: 150000,
    paymentMethod: "Bank Transfer",
    paymentProof: "/placeholder.svg?height=600&width=400",
    status: "pending",
  },
  {
    id: "3",
    eventId: "2",
    eventName: "Business Summit 2025",
    customerName: "Agus Purnomo",
    customerEmail: "agus@example.com",
    purchaseDate: "14 May 2025 09:15",
    quantity: 3,
    ticketType: "Early Bird",
    totalAmount: 750000,
    paymentMethod: "Bank Transfer",
    paymentProof: "/placeholder.svg?height=600&width=400",
    status: "pending",
  },
];

export function ApprovalList() {
  const [orders, setOrders] = useState(dummyOrders);
  const [viewProof, setViewProof] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("pending");

  // Handle approve order
  const handleApprove = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "approved" } : order
      )
    );

    // In a real app, you would send approval email here
    alert(`Approval email will be sent to customer for order #${orderId}`);
  };

  // Handle reject order
  const handleReject = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "rejected" } : order
      )
    );

    // In a real app, you would send rejection email here
    alert(`Rejection email will be sent to customer for order #${orderId}`);
  };

  // Filter orders based on status
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  return (
    <>
      <ApprovalFilter onFilterChange={setFilterStatus} />

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <ApprovalCard
              key={order.id}
              order={order}
              onViewProof={() => setViewProof(order.paymentProof)}
              onApprove={() => handleApprove(order.id)}
              onReject={() => handleReject(order.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Tidak ada transaksi</h3>
          <p className="text-gray-500">
            {filterStatus === "pending" &&
              "Tidak ada transaksi yang menunggu approval"}
            {filterStatus === "approved" &&
              "Tidak ada transaksi yang sudah diapprove"}
            {filterStatus === "rejected" && "Tidak ada transaksi yang ditolak"}
            {filterStatus === "all" && "Belum ada transaksi"}
          </p>
        </div>
      )}

      {/* Payment Proof Modal */}
      {viewProof && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setViewProof(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Bukti Pembayaran</h3>
              <button
                onClick={() => setViewProof(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative w-full h-[400px]">
              <Image
                src={viewProof || "/placeholder.svg"}
                alt="Payment Proof"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
