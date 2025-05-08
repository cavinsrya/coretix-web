import { useState } from "react";
import Button from "@/components/atoms/Button";

interface VoucherSectionProps {
  selectedVoucher: string | null;
  setSelectedVoucher: (voucher: string | null) => void;
}

export default function VoucherSection({
  selectedVoucher,
  setSelectedVoucher,
}: VoucherSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">Voucher</h3>
      <Button
        onClick={() => setSelectedVoucher(selectedVoucher ? null : "NEWUSER")}
        className="bg-blue-500 text-white"
      >
        {selectedVoucher ? "Remove Voucher" : "Apply Voucher"}
      </Button>
    </div>
  );
}
