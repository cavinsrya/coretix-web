"use client";

import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
  width: number;
  height: number;
};

export default function Logo({
  className = "",
  width = 150,
  height = 150,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        className={`${className}`}
        src="https://res.cloudinary.com/dohpngcuj/image/upload/v1745572280/logo_coretix.png"
        alt="CoreTix Logo"
        width={width}
        height={height}
      />
    </Link>
  );
}
