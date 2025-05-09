import { User, Calendar, Clock, Banknote } from "lucide-react";
import { ApprovalActionButtons } from "@/components/molecules/PromotorComp/approval-action-buttons";

interface ApprovalCardProps {
  order: {
    id: string;
    eventId: string;
    eventName: string;
    customerName: string;
    customerEmail: string;
    purchaseDate: string;
    quantity: number;
    ticketType: string;
    totalPrice: number;
    paymentMethod: string;
    paymentProof: string;
    status: string;
  };
  onViewProof: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function ApprovalCard({
  order,
  onViewProof,
  onApprove,
  onReject,
}: ApprovalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <div>
            <h3 className="font-bold text-lg">{order.eventName}</h3>
            <p className="text-sm text-gray-500">Order #{order.id}</p>
          </div>
          <div
            className={`
              px-3 py-1 rounded-full text-sm font-medium inline-block
              ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              }
              ${
                order.status === "approved" ? "bg-green-100 text-green-800" : ""
              }
              ${order.status === "rejected" ? "bg-red-100 text-red-800" : ""}
            `}
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
                Rp {order.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>

          <ApprovalActionButtons
            orderId={order.id}
            status={order.status}
            onViewProof={onViewProof}
            onApprove={onApprove}
            onReject={onReject}
          />
        </div>
      </div>
    </div>
  );
}
