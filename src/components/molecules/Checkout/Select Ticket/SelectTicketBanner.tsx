import React from "react";
import Image from "next/image";

export default function SelectTicketBanner({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  return (
    <div className="bg-gray-300 h-[200px] md:h-[250px] rounded-lg overflow-hidden relative mb-8">
      {imageUrl ? (
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading Image...
        </div>
      )}
    </div>
  );
}
