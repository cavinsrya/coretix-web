import { StarIcon } from "lucide-react";

type Props = {
  reviewer: string;
  review: string;
};

export function ReviewItem({ reviewer, review }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="flex items-center mb-2">
        <StarIcon />
        <span className="ml-2 text-sm font-medium">{reviewer}</span>
      </div>
      <p className="text-sm text-gray-700">{review}</p>
    </div>
  );
}
