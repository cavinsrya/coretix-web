"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/atoms/Button";
import IconButton from "@/components/atoms/IconButton";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <IconButton onClick={() => setIsOpen(true)} ariaLabel="Open menu">
        <Menu className="h-6 w-6 text-white" />
      </IconButton>

      {/* Overlay - only visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
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

        <div className="flex flex-col gap-6">
          <Button
            href="/explore"
            variant="ghost"
            className="text-lg justify-center"
          >
            Explore
          </Button>
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
        </div>
      </div>
    </div>
  );
}
