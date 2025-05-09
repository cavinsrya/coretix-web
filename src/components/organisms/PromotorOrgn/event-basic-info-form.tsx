"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, ImageIcon } from "lucide-react";
import { FormSectionHeader } from "@/components/molecules/PromotorComp/form-section-header";
import { FormField } from "@/components/molecules/PromotorComp/form-field";

// Event category options
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

interface EventBasicInfoFormProps {
  formData: {
    banner: File | string | null;
    name: string;
    category: string;
    startDate: string;
    endDate: string;
    location: string;
  };
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  isEdit?: boolean;
}

export function EventBasicInfoForm({
  formData,
  onChange,
  errors,
  isEdit = false,
}: EventBasicInfoFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof formData.banner === "string" ? formData.banner : null
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange("banner", file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <FormSectionHeader
        title="Informasi Dasar"
        description="Masukkan informasi dasar tentang event Anda"
      />

      {/* Banner Image */}
      <div className="mb-6">
        <FormField
          label="Banner Event"
          htmlFor="banner"
          required
          error={errors.banner}
        >
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <div className="relative w-full max-w-2xl h-[200px]">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Banner Preview"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <>
                <div className="bg-gray-100 rounded-full p-4 mb-4">
                  <ImageIcon className="h-8 w-8 text-gray-500" />
                </div>
                <p className="text-gray-700 mb-2">
                  Klik untuk upload banner event
                </p>
                <p className="text-gray-500 text-sm">
                  JPG, PNG atau GIF. Maksimum 5MB.
                </p>
              </>
            )}
            <input
              type="file"
              id="banner"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </FormField>
      </div>

      {/* Event Title */}
      <FormField label="Nama Event" htmlFor="name" required error={errors.name}>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
          placeholder="Masukkan nama event"
        />
      </FormField>

      {/* Event Category */}
      <FormField
        label="Kategori Event"
        htmlFor="category"
        required
        error={errors.category}
      >
        <select
          id="category"
          value={formData.category}
          onChange={(e) => onChange("category", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
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
      </FormField>

      {/* Event Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Tanggal Mulai"
          htmlFor="startDate"
          required
          error={errors.startDate}
        >
          <div className="relative">
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </FormField>

        <FormField
          label="Tanggal Berakhir"
          htmlFor="endDate"
          required
          error={errors.endDate}
        >
          <div className="relative">
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </FormField>
      </div>

      {/* Event Location */}
      <FormField
        label="Lokasi"
        htmlFor="location"
        required
        error={errors.location}
      >
        <div className="relative">
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => onChange("location", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent pl-10"
            placeholder="Masukkan lokasi event"
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </FormField>
    </div>
  );
}
