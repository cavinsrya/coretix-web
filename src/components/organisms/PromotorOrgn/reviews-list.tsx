import { ReviewItem } from "@/components/molecules/ReviewItem";

interface ReviewsListProps {
  reviews: Array<{
    id: string;
    eventName: string;
    customerName: string;
    rating: number;
    review: string;
    date: string;
  }>;
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">Ulasan Event (dari Pengguna)</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem reviewer={""} key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
}
