"use client";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { loginSchema } from "@/lib/validations/auth";
import { loginUser } from "@/lib/api/axios";
import { toast } from "sonner";
import Logo from "../atoms/Logo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/hook/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();
  const { login } = useAuth(); // Gunakan hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors({
        email: fieldErrors.email?._errors[0],
        password: fieldErrors.password?._errors[0],
      });
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const data = await loginUser(email, password);
      const { access_token, name, role, id } = data;

      // Simpan login dengan hook
      login(access_token, name, role, id);

      toast.success("Login berhasil!");

      // Redirect menggunakan router
      if (role === "ORGANIZER") {
        router.push("/promoter/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login gagal, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Masuk ke akun kamu
          </Text>
          <Text
            size="sm"
            color="muted"
            fontFamily="sans"
            weight="normal"
            className="mb-6 text-center"
          >
            The faster you fill up, the faster you get a ticket
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
              Belum punya akun?{" "}
              <a href="/register" className="text-[#050557] hover:underline">
                Register
              </a>
            </Text>
          </div>
        </div>
        {/* <div className="p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <Logo width={150} height={150} />
          </div>

          <Text
            size="xxl"
            weight="black"
            fontFamily="sans"
            className="text-center"
          >
            Masuk ke akun kamu
          </Text>

          <div className="space-y-4">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Masukkan Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            <Button type="submit" variant="accent" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </div>
        </div> */}
      </form>
    </div>
  );
}
