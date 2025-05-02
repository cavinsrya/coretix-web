import Text from "../atoms/Teks";

type EventCardProps = {
  title: string;
  date: string;
  venue: string;
  price: string;
};

export default function EventCard({
  title,
  date,
  venue,
  price,
}: EventCardProps) {
  return (
    <div className="bg-white border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-[150px] bg-gray-300"></div>
      <div className="p-3">
        <h3 className="font-semibold">{title}</h3>
        <Text size="xs" color="muted">
          {date}
        </Text>
        <Text size="xs" color="muted">
          {venue}
        </Text>
        <Text size="sm" className="font-medium mt-1">
          {price}
        </Text>
      </div>
    </div>
  );
}
