"use client";

import React from "react";
import SidebarItemMobile from "../molecules/SidebarPromotor/SidebarItemMobile";
import SidebarItem from "../molecules/SidebarPromotor/SidebarItem";

export default function SidebarPromotor({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  return (
    <>
      {/* Tampil hanya di mobile (sm:) */}
      <div className="block sm:hidden">
        <SidebarItemMobile />
      </div>

      {/* Tampil hanya di desktop */}
      <div className="hidden sm:block">
        <SidebarItem collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </>
  );
}
