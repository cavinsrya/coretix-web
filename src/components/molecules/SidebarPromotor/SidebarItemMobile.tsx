"use client";

import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
import { useState } from "react";
import Link from "next/link";
// import Button from "../atoms/Button";
import Logo from "../../atoms/Logo";

export default function SidebarItemMobile() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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
  return (
    <>
      {/* Mobile Header */}
      <div className="bg-[#050557] text-white lg:hidden py-4 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Logo width={150} height={150} />
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-16 left-0 w-64 bg-[#050557] h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar content - mobile */}
            <div className="p-4 border-b border-[#ffffff22] flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden relative mb-3">
                <Image
                  src="/placeholder.svg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-white font-medium">Ismaya Group</p>
                <p className="text-[#86e64c] text-sm">Promoter</p>
              </div>
            </div>

            <nav className="mt-4 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 py-3 px-4 mb-1 rounded-md ${
                    pathname === item.href
                      ? "bg-[#ffffff22] text-[#86e64c]"
                      : "text-gray-300 hover:bg-[#ffffff11] hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <button className="flex items-center gap-3 py-3 px-4 mb-1 rounded-md w-full text-left text-red-300 hover:bg-[#ffffff11] hover:text-red-200">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
