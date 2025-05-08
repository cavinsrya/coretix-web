"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Eye, Upload, X } from "lucide-react";
import Image from "next/image";
import { PromoterDashboardTemplate } from "@/components/templates/promoter-dashboard-template";
import { ProfileStatsCard } from "@/components/organisms/PromotorOrgn/profile-stats-card";
import { ReviewsList } from "@/components/organisms/PromotorOrgn/reviews-list";
import { STATIC_ACCOUNTS } from "@/components/static-accounts";

export default function PromoterProfilePage() {
  // Profile data
  const [profileData, setProfileData] = useState({
    name: STATIC_ACCOUNTS.promoter.name,
    email: STATIC_ACCOUNTS.promoter.email,
    phone: "+628123456789",
    company: "Jakarta Event Solutions",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    profileImage: STATIC_ACCOUNTS.promoter.profile,
  });

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reviews data (sample)
  const [reviews, setReviews] = useState([
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
    {
      id: "3",
      eventName: "Business Summit 2025",
      customerName: "Agus Purnomo",
      rating: 5,
      review:
        "Pembicara-pembicara yang luar biasa. Saya mendapatkan banyak insight berharga dari seminar ini.",
      date: "15 Feb 2025",
    },
  ]);

  // Handle profile image change
  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimum 2MB.");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileData({
          ...profileData,
          profileImage: result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the data to an API
    alert("Profil berhasil disimpan!");
  };

  return (
    <PromoterDashboardTemplate title="Profile Promoter">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                  <div
                    className="relative h-32 w-32 rounded-full overflow-hidden mb-4 cursor-pointer group"
                    onClick={handleProfileImageClick}
                  >
                    <Image
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="text-sm text-[#050557] font-medium hover:underline"
                    onClick={handleProfileImageClick}
                  >
                    Ganti Foto
                  </button>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Maksimum 2MB
                    <br />
                    Format: JPG, PNG
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Perusahaan / Promoter
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                      placeholder="Masukkan nama"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email tidak dapat diubah
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nomor Telepon
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                      placeholder="Masukkan nomor telepon"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nama Perusahaan
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={profileData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    placeholder="Masukkan nama perusahaan"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Alamat
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    placeholder="Masukkan alamat"
                  ></textarea>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-[#86e64c] text-[#050557] font-medium py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  className="border border-[#050557] text-[#050557] font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setShowResetPasswordModal(true)}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Stats & Info */}
        <div className="lg:col-span-1">
          <ProfileStatsCard
            totalEvents={8}
            activeEvents={3}
            totalTicketsSold={943}
            averageRating={4.7}
          />
        </div>
      </div>

      {/* Reviews */}
      <ReviewsList reviews={reviews} />

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Reset Password</h2>
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    id="current-password"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Konfirmasi Password Baru
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowResetPasswordModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#86e64c] text-[#050557] font-medium rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PromoterDashboardTemplate>
  );
}
