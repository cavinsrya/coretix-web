"use client";

import Button from "../atoms/Button";
import Text from "../atoms/Teks";
import Input from "../atoms/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center md:items-end mt-auto md:mt-0 md:mr-50">
        <div className="bg-white/70 backdrop-blur-md w-full max-w-md rounded-t-lg md:rounded-lg md:shadow-lg md:my-10 sm:mt-[40vh]">
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
              The faster you register, the faster you get a ticket"
            </Text>

            <div className="space-y-4">
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
                  type="email"
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
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent bg-white bg-opacity-90 font-sans font-light"
                    placeholder="Masukkan Kembali Password"
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
                  htmlFor="referralCode"
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
                />
              </div>

              <Button
                type="submit"
                variant="accent"
                className="w-full py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors justify-center"
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
        </div>
      </div>
    </>
  );
}
