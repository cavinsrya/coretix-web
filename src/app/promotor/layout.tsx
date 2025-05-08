"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SidebarPromotor from "@/components/organisms/SidebarPromotor";

export default function PromoterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  //   const router = useRouter()
  //   const [isLoggedIn, setIsLoggedIn] = useState(false)
  //   const [isPromoter, setIsPromoter] = useState(false)
  //   const [isLoading, setIsLoading] = useState(true)

  //   useEffect(() => {
  //     // Check if user is logged in and is a promoter
  //     const user = localStorage.getItem("currentUser")
  //     if (user) {
  //       try {
  //         const userData = JSON.parse(user)
  //         setIsLoggedIn(true)
  //         setIsPromoter(userData.role === "promoter")
  //       } catch (e) {
  //         setIsLoggedIn(false)
  //         setIsPromoter(false)
  //       }
  //     } else {
  //       setIsLoggedIn(false)
  //       setIsPromoter(false)
  //     }
  //     setIsLoading(false)
  //   }, [])

  //   // Redirect if not logged in or not a promoter
  //   useEffect(() => {
  //     if (!isLoading && (!isLoggedIn || !isPromoter)) {
  //       router.push("/login")
  //     }
  //   }, [isLoading, isLoggedIn, isPromoter, router])

  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#050557]"></div>
  //       </div>
  //     )
  //   }

  //   if (!isLoggedIn || !isPromoter) {
  //     return null // Will redirect in useEffect
  //   }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Promoter Sidebar */}
      <SidebarPromotor />

      {/* Main Content */}
      <div className="lg:ml-64 pt-0 lg:pt-6 pb-6">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </div>
  );
}
