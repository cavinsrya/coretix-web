import React from "react";
import SidebarItem from "../molecules/SidebarPromotor/SidebarItem";
import SidebarItemMobile from "../molecules/SidebarPromotor/SidebarItemMobile";

type Props = {
  isOpen: boolean;
};

export default function SidebarPromotor() {
  return (
    <>
      {/* Tampil hanya di mobile (sm:) */}
      <div className="block lg:hidden">
        <SidebarItemMobile />
      </div>

      {/* Tampil hanya di desktop */}
      <div className="hidden sm:block">
        <SidebarItem />
      </div>
    </>
  );
}
