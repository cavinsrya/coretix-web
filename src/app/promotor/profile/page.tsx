"use client";

import { useState } from "react";
import { PromoterProfileTemplate } from "@/components/templates/Promotor/PromotorProfileTemplate";

export default function PromoterProfilePage() {
  const [name, setName] = useState("Coretix ID");
  const [email, setEmail] = useState(
    "Promotor konser terbesar di Asia Tenggara."
  );
  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const reviews = [
    {
      id: "1",
      eventName: "Jakarta Music Festival 2025",
      customerName: "Budi Santoso",
      rating: 5,
      review:
        "Event yang sangat terorganisir dengan baik. Sound system dan lighting sangat bagus. Tidak ada kendala sama sekali saat masuk venue.",
      date: "20 Jan 2025",
    },
    {
      id: "2",
      eventName: "Jakarta Music Festival 2025",
      customerName: "Siti Nuraini",
      rating: 4,
      review:
        "Acara yang menyenangkan. Namun sedikit terlambat dari jadwal yang dijanjikan.",
      date: "21 Jan 2025",
    },
  ];

  const handleSave = () => {
    setName(formName);
    setEmail(formEmail);
  };

  const handleCancel = () => {
    setFormName(name);
    setFormEmail(email);
  };

  return (
    <PromoterProfileTemplate
      imageSrc="/profile.jpg"
      onUploadClick={() => console.log("Upload clicked")}
      onEditClick={() => console.log("Edit clicked")}
      name={name}
      email={email}
      stats={{ rating: 4.5, events: 15, ticketsSold: 1200 }}
      formName={formName}
      formEmail={formEmail}
      onChangeName={(e) => setFormName(e.target.value)}
      onChangeEmail={(e) => setFormEmail(e.target.value)}
      onSave={handleSave}
      onCancel={handleCancel}
      reviews={reviews}
      rating={0}
      events={0}
      eventsActive={0}
      ticketsSold={0}
      shortBio={""}
    />
  );
}
