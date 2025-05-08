"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryCard() {
  const router = useRouter();

  const categories = [
    {
      name: "Sports",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587992/Frame_1_uyng60.png",
    },
    {
      name: "Art",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587993/Frame_3_csvr8i.png",
    },
    {
      name: "Attraction",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587993/Frame_6_e6jhna.png",
    },
    {
      name: "Conference",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587992/Frame_5_r3ldgp.png",
    },
    {
      name: "Community",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587992/Frame_5_r3ldgp.png",
    },
    {
      name: "Concert",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587992/Frame_2_a0bsbu.png",
    },
    {
      name: "Theater",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587991/Frame_4_qcqvgp.png",
    },
    {
      name: "Education",
      image:
        "https://res.cloudinary.com/dohpngcuj/image/upload/v1746587993/Frame_8_yjwkda.png",
    },
    // dan seterusnya
  ];

  // Handle category click
  const handleCategoryClick = (category: string) => {
    router.push(`/explore?category=${category}`);
  };
  return (
    <div className="flex overflow-x-auto pb-4 md:grid md:grid-cols-4 gap-4 scrollbar-hide touch-pan-x">
      {categories.map((category) => (
        <div
          key={category.name}
          className="relative bg-[#ffffff] shadow-md border border[#f1f1f1] h-[90px] rounded-lg overflow-hidden min-w-[200px] md:min-w-0 flex-shrink-0 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex"
          onClick={() => handleCategoryClick(category.name)}
        >
          {/* Container untuk gambar */}
          <div className="w-1/3 h-full relative">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Container untuk teks */}
          <div className="w-2/3 flex items-center px-4">
            <span className="text-black font-bold text-lg md:text-xl">
              {category.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
