"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    setIsLoggedIn(!!token);
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <div className="md:hidden">
      <IconButton onClick={() => setIsOpen(true)} ariaLabel="Open menu">
        <Menu className="h-6 w-6 text-white" />
      </IconButton>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#050a47] z-50 p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-8">
          <IconButton onClick={() => setIsOpen(false)} ariaLabel="Close menu">
            <X className="h-6 w-6 text-white" />
          </IconButton>
        </div>

        <div className="flex flex-col gap-6 text-white">
          <Button
            href="/explore"
            variant="ghost"
            className="text-lg justify-center"
          >
            Explore
          </Button>

          {!isLoggedIn ? (
            <>
              <Button
                href="/register"
                variant="primary"
                className="text-lg justify-center"
              >
                Daftar
              </Button>
              <Button
                href="/login"
                variant="accent"
                className="text-lg justify-center"
              >
                Masuk
              </Button>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold text-center">
                Hi, {userName}
              </div>
              <Button
                href="/profile"
                variant="ghost"
                className="justify-center text-base"
              >
                Profile
              </Button>
              <Button
                href="/my-ticket"
                variant="ghost"
                className="justify-center text-base"
              >
                My Ticket
              </Button>
              <div className="text-center border-t border-white pt-2 text-sm font-medium">
                Poin: 0
              </div>
              <button
                onClick={handleLogout}
                className="text-center text-red-400 hover:underline text-sm mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
