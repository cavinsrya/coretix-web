interface TicketDetailsProps {
  eventTitle: string
  eventDate: string
  ticketPrice: number
  quantity: number
}

export function TicketDetails({ eventTitle, eventDate, ticketPrice, quantity }: TicketDetailsProps) {
  return (
    <div className="border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Detail Tiket</h3>

      <div className="flex gap-4 mb-4">
        <div className="bg-gray-200 h-[80px] w-[120px] rounded"></div>
        <div>
          <h4 className="font-bold">{eventTitle}</h4>
          <p className="text-sm text-gray-600">{eventDate}</p>
        </div>
      </div>

      <div className="flex justify-between border-t pt-4">
        <p className="text-sm">Harga per Ticket</p>
        <p className="font-bold">Rp {ticketPrice.toLocaleString()}</p>
      </div>

      <div className="flex justify-between mt-2">
        <p className="text-sm">Jumlah</p>
        <p className="font-bold">{quantity} Tickets</p>
      </div>
    </div>
  )
}
