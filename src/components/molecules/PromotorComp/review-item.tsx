import { Star } from "lucide-react"

interface ReviewItemProps {
  id: string
  eventName: string
  customerName: string
  date: string
  rating: number
  review: string
}

export function ReviewItem({ eventName, customerName, date, rating, review }: ReviewItemProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold">{eventName}</h3>
          <p className="text-sm text-gray-500">
            {customerName} • {date}
          </p>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{review}</p>
    </div>
  )
}
