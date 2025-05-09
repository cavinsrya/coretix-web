export interface Ticket {
  id: string;
  name: string;
  price: string | number | null;
  quantity: string | number;
  description?: string;
  isFree: boolean;
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

// types/event-form.ts
export type Promotion = {
  title: string;
  code: string;
  amount: number;
  startDate: string;
  endDate: string;
};

export type EventFormData = {
  banner: string | File | null;
  name: string;
  category: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  ticketType: string;
  tickets: {
    id: string;
    name: string;
    quantity: string;
    price: string;
    isFree: boolean;
  }[];
  promotions: Promotion[]; // ✅ Tambahkan ini
  description: string;
};
