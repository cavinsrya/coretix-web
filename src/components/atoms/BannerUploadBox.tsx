// components/atoms/BannerUploadBox.tsx
import React from "react";
import { ImageIcon } from "lucide-react";

interface BannerUploadBoxProps {
  onClick: () => void;
}

export default function BannerUploadBox({ onClick }: BannerUploadBoxProps) {
  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <ImageIcon className="h-8 w-8 text-gray-500" />
      </div>
      <p className="text-gray-700 mb-2">Klik untuk upload banner event</p>
      <p className="text-gray-500 text-sm">JPG, PNG atau GIF. Maksimum 5MB.</p>
    </div>
  );
}
