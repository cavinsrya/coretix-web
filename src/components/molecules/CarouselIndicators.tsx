"use client";

type CarouselIndicatorsProps = {
  total: number;
  current: number;
  onClick?: (index: number) => void;
};

export default function CarouselIndicators({
  total,
  current,
  onClick,
}: CarouselIndicatorsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-colors ${
            index === current ? "bg-green-500" : "bg-gray-400"
          }`}
          onClick={() => onClick && onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
