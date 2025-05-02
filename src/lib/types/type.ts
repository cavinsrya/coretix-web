// types/event.ts
export interface EventType {
  id: string;
  title: string;
  banner?: string;
  date: string;
  time: string;
  location: string;
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
}
