import React from "react";
import LoginForm from "../molecules/LoginForm";
import Image from "next/image";

export default function LoginTemplate() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
        <Image
          src="https://res.cloudinary.com/dohpngcuj/image/upload/v1746096677/bgnew_vztodh.png"
          alt="bg-login"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <LoginForm />
    </>
  );
}
