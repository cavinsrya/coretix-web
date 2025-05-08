import Image from "next/image";

type Props = {
  imageUrl: string;
  alt: string;
};

export function EventImage({ imageUrl, alt }: Props) {
  return (
    <div className="bg-gray-200 h-[300px] md:h-[400px] rounded-lg overflow-hidden relative mb-6">
      <Image src={imageUrl} alt={alt} fill className="object-cover" />
    </div>
  );
}
