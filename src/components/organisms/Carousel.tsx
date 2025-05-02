"use client";

import { useState, useEffect, useCallback } from "react";
import CarouselIndicators from "@/components/molecules/CarouselIndicators";

type CarouselProps = {
  slides: Array<{
    id: number;
    image: string;
    title: string;
  }>;
  autoSlideInterval?: number;
};

export default function Carousel({
  slides,
  autoSlideInterval = 3000,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval]);

  return (
    <div className="relative w-full h-[200px] md:h-[300px] rounded-lg overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full bg-gray-300 flex items-center justify-center"
            style={{
              backgroundImage: slide.image ? `url(${slide.image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!slide.image && (
              <span className="text-gray-500 text-lg">{slide.title}</span>
            )}
          </div>
        ))}
      </div>

      <CarouselIndicators
        total={slides.length}
        current={currentSlide}
        onClick={goToSlide}
      />
    </div>
  );
}
