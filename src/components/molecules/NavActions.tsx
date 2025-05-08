"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import { ChevronDown, Compass, LogOut, Ticket, User2 } from "lucide-react";
import Text from "@/components/atoms/Text";

export default function NavActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/"; // redirect ke home
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <Button href="/explore" variant="ghost">
          Explore
        </Button>
        <Button href="/register" variant="primary" className="py-2 px-4">
          Daftar
        </Button>
        <Button href="/login" variant="accent" className="py-2 px-4">
          Masuk
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Button href="/explore" variant="ghost">
          <Compass className="w-4 h-4" />
          <Text className="ml-2" color="white">
            Explore
          </Text>
        </Button>
        <Button
          className="flex items-center gap-2 bg-white text-[#050a47] px-4 py-2 rounded-xl text-sm font-semibold"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Hi, {userName} <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-[#050a47] rounded-md shadow-lg py-2 z-50">
          <Button
            href="/profile"
            variant="primary"
            className="justify-start w-full px-4 py-2 text-left"
          >
            <User2 className="h-4 w-4" />
            <Text className="ml-2">Profile</Text>
          </Button>
          <Button
            href="/my-ticket"
            variant="primary"
            className="justify-start w-full px-4 py-2 text-left"
          >
            <Ticket className="h-4 w-4" />
            <Text className="ml-2">Ticket Saya</Text>
          </Button>
          <div className="px-4 py-2 text-sm font-medium border-t">Poin: 0</div>
          <Button onClick={handleLogout} className="w-full text-left px-4 py-2">
            <LogOut className="h-4 w-4" />
            <Text className="ml-2 text-red-600 hover:bg-red-100 text-sm">
              Logout
            </Text>
          </Button>
        </div>
      )}
    </div>
  );
}
