import HomeTemplate from "@/components/templates/HomeTemplates";

// Mock data
const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "",
    title: "Upcoming Events",
  },
  {
    id: 2,
    image: "",
    title: "Special Promotions",
  },
  {
    id: 3,
    image: "",
    title: "Featured Artists",
  },
];

const EVENTS = [
  {
    title: "Joyland Festival 2025",
    date: "Sat, Jun 15 • 15:00 PM",
    venue: "GBK Hall",
    price: "Rp 245.000",
  },
  {
    title: "The Chase Concert",
    date: "Sat, Jun 15 • 20:00 PM",
    venue: "Istora Senayan",
    price: "Rp 750.000",
  },
  {
    title: "Bruno Mars Asia Tour",
    date: "Wed, Jul 27 • 07:00 PM",
    venue: "Jakarta International Stadium",
    price: "Rp 1.292.000",
  },
  {
    title: "Head in the Clouds 2025",
    date: "Sat, Aug 24 • 03:00 PM",
    venue: "Gelora Bung Karno",
    price: "Rp 490.000",
  },
];

export default function Home() {
  return (
    <HomeTemplate
      carouselSlides={CAROUSEL_SLIDES}
      upcomingEvents={EVENTS}
      latestGigs={EVENTS}
      popularEvents={EVENTS}
    />
  );
}
