import React from "react";
import BannerUploadBox from "@/components/atoms/BannerUploadBox";
import { useRef, useState } from "react";
import Text from "@/components/atoms/Text";
import Image from "next/image";
import Input from "@/components/atoms/Input";
import { DatePicker } from "@/components/atoms/DatePicker";

import { MapPin } from "lucide-react";

export default function InputEvent() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const categories = [
    "Konser",
    "Festival",
    "Seminar",
    "Workshop",
    "Exhibition",
    "Conference",
    "Sports",
    "Arts",
    "Community",
  ];

  //Handle banner image selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  // Event details state
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  // Date and time state
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Handle event data changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Text className="text-lg font-medium mb-4">Banner Event</Text>

        <div onClick={() => fileInputRef.current?.click()}>
          {bannerImage ? (
            <div className="relative w-full max-w-2xl h-[200px] cursor-pointer">
              <Image
                src={bannerImage}
                alt="Banner Preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <BannerUploadBox onClick={() => fileInputRef.current?.click()} />
          )}
        </div>
        <Input
          id="bannerUpload"
          name="bannerUpload"
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      {/* Event Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Detail Event</h2>

        <div className="space-y-4">
          {/* Event Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Event
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
              placeholder="Masukkan nama event"
              required
            />
          </div>

          {/* Event Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kategori Event
            </label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
              required
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Mulai
              </label>
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                placeholder="Pilih tanggal mulai"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Berakhir
              </label>
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                placeholder="Pilih tanggal berakhir"
              />
            </div>
          </div>

          {/* Event Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lokasi
            </label>
            <div className="relative">
              <input
                id="location"
                name="location"
                type="text"
                value={eventData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
                placeholder="Masukkan lokasi event"
                required
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
