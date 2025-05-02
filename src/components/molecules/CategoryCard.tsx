import Text from "../atoms/Teks";

type CategoryCardProps = {
  name: string;
};

export default function CategoryCard({ name }: CategoryCardProps) {
  return (
    <div className="bg-gray-300 p-4 rounded-md text-center hover:bg-gray-200 transition-colors cursor-pointer">
      <Text>{name}</Text>
    </div>
  );
}
