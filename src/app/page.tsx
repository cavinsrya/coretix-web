import React from "react";
import HomeTemplate from "@/components/templates/HomeTemplates";
import { fetchAllEvents } from "@/lib/api/axios";
import dayjs from "dayjs";

// // Mock data
const CAROUSEL_SLIDES = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dohpngcuj/image/upload/v1746550733/20220921-hitc-banner_1__waifu2x_art_noise2_scale_1_ci6nnk.png",
    title: "Latest Gigs",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dohpngcuj/image/upload/v1746522352/Group_86_2__waifu2x_noise2_scale2x_1_hsjelh.png",
    title: "Upcoming Events",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dohpngcuj/image/upload/v1746522080/image_4_zcg1gv.png",
    title: "Special Promotions",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dohpngcuj/image/upload/v1746518084/bannerpromo_qxhstl.png",
    title: "Featured Artists",
  },
];

type Event = {
  id: number; // Pastikan ada id
  imageUrl: string;
  title: string;
  startDate: string;
  location: string;
  isFree: boolean;
  price: number;
  category: string;
};

export default async function Home() {
  const today = dayjs();

  const formatEvent = (event: Event) => ({
    id: event.id,
    imageUrl: event.imageUrl,
    title: event.title,
    date: dayjs(event.startDate).format("D MMM YYYY"),
    venue: event.location,
    price: event.isFree ? "Free" : `Rp${event.price.toLocaleString("id-ID")}`,
  });

  const allEvents = (await fetchAllEvents()) as Event[]; // Data sudah langsung array events

  const upcomingEvents = allEvents
    .filter((event) => dayjs(event.startDate).isAfter(today))
    .slice(0, 4)
    .map(formatEvent);

  const latestGigs = allEvents
    .filter((event) => event.category === "PERTANDINGAN")
    .slice(0, 4)
    .map(formatEvent);

  const popularEvents = allEvents
    .filter((event) => event.location.toLowerCase() === "jakarta")
    .slice(0, 4)
    .map(formatEvent);

  return (
    <>
      <HomeTemplate
        carouselSlides={CAROUSEL_SLIDES}
        upcomingEvents={upcomingEvents}
        latestGigs={latestGigs}
        popularEvents={popularEvents}
      />
    </>
  );
}
