export interface Ticket {
  id: string;
  name: string;
  price: string | number | null;
  quantity: string | number;
  description?: string;
  isFree?: boolean;
}

export interface Voucher {
  id: string;
  code?: string;
  title?: string;
  discount: string | number;
  discountType?: "percentage" | "fixed";
  minPurchase?: string | number;
  minTickets?: string | number;
  startDate: string;
  endDate: string;
  maxUses?: string | number;
}

export interface EventFormData {
  banner: File | string | null;
  name: string;
  title?: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  ticketType: "free" | "paid";
  tickets: Ticket[];
  vouchers: Voucher[];
  description: string;
}
