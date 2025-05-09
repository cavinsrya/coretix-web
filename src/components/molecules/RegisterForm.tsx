"use client";

import Button from "../atoms/Button";
import Text from "../atoms/Text";
import Input from "../atoms/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";
import { registerUser } from "@/lib/api/axios";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referredBy, setReferredBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await registerUser(name, email, password, referredBy);
      const { referralCode } = result;

      if (referralCode) {
        setShowReferralPopup(true); // tampilkan pop-up
      } else {
        alert(
          "Registrasi berhasil!\nKamu mendapatkan voucher diskon Rp10.000."
        );
        window.location.href = "/"; // langsung redirect
      }

      console.log("Referral code kamu:", result.referredBy);
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center md:items-end mt-auto md:mt-0 md:mr-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-md w-full max-w-md rounded-t-lg md:rounded-lg md:shadow-lg md:my-10 sm:mt-[40vh]"
        >
          <div className="p-6 md:p-8">
            <Text
              size="xxl"
              weight="black"
              fontFamily="sans"
              className="text-center"
            >
              Buat Akun Baru
            </Text>
            <Text
              size="sm"
              color="muted"
              fontFamily="sans"
              weight="normal"
              className="mb-6 text-center"
            >
              The faster you register, the faster you get a ticket
            </Text>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-sans font-semibold text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masukkan Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent bg-white bg-opacity-90 font-sans font-light"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-sans font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Masukkan Email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent bg-white bg-opacity-90 font-sans font-light"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent bg-white bg-opacity-90 font-sans font-light"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="referredBy"
                  className="block text-sm font-sans font-semibold text-gray-700 mb-1"
                >
                  Kode Referral (Opsional)
                </label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent bg-white bg-opacity-90 font-sans font-light"
                  placeholder="Masukkan Kode Referral"
                  value={referredBy}
                  onChange={(e) => setReferredBy(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="accent"
                className="w-full py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors justify-center"
                onClick={undefined}
                disabled={loading}
              >
                {" "}
                <Text weight="bold" size="lg" color="white">
                  {" "}
                  {loading ? "Memproses..." : "Daftar"}
                </Text>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Text size="sm" fontFamily="sans" weight="normal">
                Sudah punya akun?{" "}
                <a href="/login" className="text-[#050557] hover:underline">
                  Login
                </a>
              </Text>
            </div>
          </div>
        </form>
      </div>
      {showReferralPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-auto">
            <p className="mb-4 text-gray-800 font-sans">
              Registrasi berhasil!
              <br />
              Referral berhasil digunakan.
              <br />
              Pemilik kode mendapatkan 10.000 poin.
            </p>
            <button
              onClick={() => {
                setShowReferralPopup(false);
                window.location.href = "/login";
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
