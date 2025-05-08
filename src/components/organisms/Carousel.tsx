"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

type CarouselProps = {
  slides: Array<{
    id: number;
    image: string;
    title?: string;
  }>;
};

export default function Carousel({ slides }: CarouselProps) {
  return (
    <div className="w-full overflow-hidden px-6">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={16}
        className="!overflow-visible"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="!w-[80%] h-[280px] flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-md"
          >
            <Image
              src={slide.image}
              alt={slide.title ?? "Slide"}
              width={800}
              height={280}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
