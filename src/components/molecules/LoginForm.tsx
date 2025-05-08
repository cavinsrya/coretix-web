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
        router.push("/promotor/dashboard");
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
        </div>
      </form>
    </div>
  );
}
