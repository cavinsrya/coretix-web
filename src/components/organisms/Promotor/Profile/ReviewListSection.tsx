import { Star } from "lucide-react";

export type Review = {
  id: string;
  eventName: string;
  customerName: string;
  date: string;
  rating: number;
  review: string;
};

export type ReviewListProps = {
  reviews: Review[];
};

export function ReviewListSection({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{review.eventName}</h3>
              <p className="text-sm text-gray-500">
                {review.customerName} • {review.date}
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{review.review}</p>
        </div>
      ))}
    </div>
  );
}
