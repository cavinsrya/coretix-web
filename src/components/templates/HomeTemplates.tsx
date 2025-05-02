import Header from "@/components/organisms/Header";
import Carousel from "@/components/organisms/Carousel";
import Categories from "@/components/organisms/Categories";
import EventSection from "@/components/organisms/EventSection";
import Footer from "@/components/organisms/Footer";

type HomeTemplateProps = {
  carouselSlides: Array<{
    id: number;
    image: string;
    title: string;
  }>;
  upcomingEvents: Array<{
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
  latestGigs: Array<{
    title: string;
    date: string;
    venue: string;
    price: string;
  }>;
  popularEvents: Array<{
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
          <Carousel slides={carouselSlides} autoSlideInterval={3000} />
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
