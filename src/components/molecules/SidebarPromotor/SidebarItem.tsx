"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Menu,
  BarChart,
  CalendarCheck,
  CheckCircle,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProfileInfo } from "@/lib/api/axios";
import Link from "next/link";
// import Button from "../atoms/Button";
import Logo from "../../atoms/Logo";
import { log, profile } from "console";

export default function SidebarItem() {
  const [collapsed, setCollapsed] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Dashboard",
      href: "/promoter/dashboard",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      label: "Event Saya",
      href: "/promoter/events",
      icon: <CalendarCheck className="w-5 h-5" />,
    },
    {
      label: "Approval",
      href: "/promoter/approval",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      label: "Profile",
      href: "/promoter/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await fetchProfileInfo();

        setUserId(profile.id);
        setName(profile.name);
        setProfileImg(profile.profileImage);
      } catch (error) {
        toast.error("Gagal memuat data pengguna.");
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div
        className={`bg-[#050557] text-white fixed left-0 top-0 h-screen z-30 transition-all duration-300 hidden lg:block ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-[#ffffff22] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {collapsed && (
              <Image
                src="https://res.cloudinary.com/dohpngcuj/image/upload/v1746104668/Frame_3_utwfrq.png"
                alt="Logo"
                width={50}
                height={50}
                className="hidden lg:block"
              />
            )}
            {!collapsed && <Logo width={150} height={150} />}
          </div>
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Profile */}
        <div
          className={`p-4 border-b border-[#ffffff22] flex ${
            collapsed ? "justify-center" : "items-center gap-3"
          }`}
        >
          {collapsed ? (
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
              <Image
                src={profileImg}
                alt="Profile"
                fill
                className="w-10 rounded-full overflow-hidden"
              />
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                <Image
                  src={profileImg}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium text-sm line-clamp-1">
                  {name}
                </p>
                <p className="text-[#86e64c] text-xs">Promoter</p>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 py-3 ${
                collapsed ? "justify-center" : "px-4"
              } mb-1 rounded-md ${
                pathname === item.href
                  ? "bg-[#ffffff22] text-[#86e64c]"
                  : "text-gray-300 hover:bg-[#ffffff11] hover:text-white"
              }`}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <div className="py-1 border-b border-[#ffffff22]"></div>
          <button
            className={`flex items-center gap-3 py-3 ${
              collapsed ? "justify-center" : "px-4"
            } mb-1 rounded-md w-full text-left text-red-300 hover:bg-[#ffffff11] hover:text-red-200`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>
    </>
  );
}
