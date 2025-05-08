// app/approval/page.tsx
"use client";
import { useState } from "react";
import FilterTabs from "@/components/molecules/SidebarPromotor/Approval/FilterTabs";
import OrderCard from "@/components/organisms/Promotor/Approval/OrderCard";
import EmptyState from "@/components/molecules/SidebarPromotor/Approval/EmptyState";
import PaymentProofModal from "@/components/organisms/Promotor/Approval/PaymentProofModal";

// Contoh dummy data
const mockOrders = [
  {
    id: "ORD001",
    eventName: "Event A",
    customerName: "John Doe",
    purchaseDate: "2025-05-01",
    quantity: 2,
    ticketType: "VIP",
    totalAmount: 500000,
    paymentProof: "/dummy.jpg",
    status: "pending",
  },
  {
    id: "ORD003",
    eventName: "Event V",
    customerName: "Bambang",
    purchaseDate: "2025-06-01",
    quantity: 1,
    ticketType: "VVIP",
    totalAmount: 1200000,
    paymentProof: "/dummy.jpg",
    status: "rejected",
  },
];

export default function ApprovalPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProofUrl, setSelectedProofUrl] = useState("");
  const [orders, setOrders] = useState(mockOrders);

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Approval Transaksi</h1>

      <FilterTabs
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {filteredOrders.length === 0 ? (
        <EmptyState filterStatus={filterStatus} />
      ) : (
        filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewProof={(url) => setSelectedProofUrl(url)}
            onApprove={(id) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === id ? { ...o, status: "approved" } : o
                )
              );
            }}
            onReject={(id) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === id ? { ...o, status: "rejected" } : o
                )
              );
            }}
          />
        ))
      )}

      {selectedProofUrl && (
        <PaymentProofModal
          url={selectedProofUrl}
          onClose={() => setSelectedProofUrl("")}
        />
      )}
    </>
  );
}
