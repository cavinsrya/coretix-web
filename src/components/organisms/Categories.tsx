import Heading from "../atoms/Heading";
import CategoryCard from "../molecules/CategoryCard";
import Text from "../atoms/Text";

export default function Categories() {
  return (
    <section className="mb-4">
      <Text
        className="my-4"
        weight="black"
        color="default"
        fontFamily="sans"
        size="xxl"
      >
        Categories
      </Text>

      <CategoryCard />
    </section>
  );
}
