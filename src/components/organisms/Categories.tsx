import Heading from "../atoms/Heading";
import CategoryCard from "../molecules/CategoryCard";

const CATEGORIES = [
  "Sports",
  "Fashion",
  "Community",
  "Theater",
  "Gigs",
  "Holiday",
  "Conference",
  "Education",
];

export default function Categories() {
  return (
    <section className="mb-8">
      <Heading level={2} className="mb-4">
        Categories
      </Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category} name={category} />
        ))}
      </div>
    </section>
  );
}
