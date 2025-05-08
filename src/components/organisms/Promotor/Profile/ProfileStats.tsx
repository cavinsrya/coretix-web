import { Star } from "lucide-react";

type Props = {
  rating: number;
  events: number;
  eventsActive: number;
  ticketsSold: number;
};

export function PromotorProfileStats({
  rating,
  events,
  ticketsSold,
  eventsActive,
}: Props) {
  return (
    // <div className="flex items-center space-x-4 text-sm text-gray-600">
    //   <div className="flex items-center space-x-1">
    //     <StarIcon />
    //     <span>{rating}</span>
    //   </div>
    //   <div>|</div>
    //   <div>{events} Event</div>
    //   <div>|</div>
    //   <div>{ticketsSold} Tiket Terjual</div>
    // </div>

    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Statistik Event</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-gray-600">Total Event</span>
            <span className="font-bold">{events}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-gray-600">Event Aktif</span>
            <span className="font-bold">{eventsActive}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b">
            <span className="text-gray-600">Total Tiket Terjual</span>
            <span className="font-bold">{ticketsSold}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{rating}</span>
            <div className="flex items-center">
              <span className="font-bold mr-1">4.7</span>
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
