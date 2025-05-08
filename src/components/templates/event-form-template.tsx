"use client";

import type React from "react";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface EventFormTemplateProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  backLink?: string;
}

export function EventFormTemplate({
  title,
  children,
  onSubmit,
  isSubmitting,
  backLink = "/promoter/events",
}: EventFormTemplateProps) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          href={backLink}
          className="flex items-center text-[#050557] hover:underline mr-4"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Kembali
        </Link>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {children}

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3">
          <Link
            href={backLink}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#86e64c] text-[#050557] font-medium rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
