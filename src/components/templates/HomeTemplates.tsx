import React from "react";
import Header from "@/components/organisms/Header";
import Carousel from "@/components/organisms/Carousel";
import Categories from "@/components/organisms/Categories";
import EventSection from "@/components/organisms/EventSection";
import Footer from "@/components/organisms/Footer";
import "swiper/css";

type HomeTemplateProps = {
  carouselSlides: Array<{
    id: number;
    image: string;
    title: string;
  }>;
  upcomingEvents: Array<{
    id: number; // ubah dari string ke number
    imageUrl: string;
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
  latestGigs: Array<{
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
  popularEvents: Array<{
    id: number;
    imageUrl: string;
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
};

export default function HomeTemplate({
  carouselSlides,
  upcomingEvents,
  latestGigs,
  popularEvents,
}: HomeTemplateProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Carousel slides={carouselSlides} />
          <Categories />
          <EventSection title="Upcoming Events" events={upcomingEvents} />
          <EventSection title="Gigs Terbaru" events={latestGigs} />

          {/* Mid Banner */}
          <div className="w-full h-[150px] bg-gray-300 rounded-lg mb-8"></div>

          <EventSection title="Populer di Jakarta" events={popularEvents} />

          {/* Large Banner */}
          <div className="w-full h-[200px] bg-gray-300 rounded-lg mb-8"></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
