"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EventDetailTemplate } from "@/components/templates/EventDetailTemplate";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import { fetchEventById } from "@/lib/api/axios";

export default function Page() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();
  const eventId = Array.isArray(params?.id) ? params.id[0] : params?.id; // Handle array or string

  useEffect(() => {
    // Jangan melakukan request jika eventId tidak valid
    if (!eventId) {
      setError(true);
      setLoading(false);
      return;
    }

    const getEventDetails = async () => {
      try {
        const data = await fetchEventById(eventId); // Pastikan eventId sudah terisi
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId]); // Efek hanya berjalan jika eventId berubah

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div>Failed to load event details.</div>;

  return (
    <>
      <Header />
      <EventDetailTemplate eventId={eventId as string} />{" "}
      {/* Pastikan eventId valid */}
      <Footer />
    </>
  );
}
