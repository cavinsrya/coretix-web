"use client";

import { VoucherButton } from "@/components/molecules/Checkout/molecules/voucher-button";

interface AppliedVoucher {
  id: string;
  code: string;
  discount: number;
}

interface VoucherSectionProps {
  selectedVoucher: AppliedVoucher | null;
  appliedCustomVoucher: AppliedCustomVoucher | null;
  onVoucherClick: () => void;
}

interface AppliedCustomVoucher {
  code: string;
  discount: number;
}

export function VoucherSection({
  selectedVoucher,
  appliedCustomVoucher,
  onVoucherClick,
}: VoucherSectionProps) {
  return (
    <div className="border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Voucher</h3>

      <VoucherButton
        selectedVoucherCode={selectedVoucher?.code}
        customVoucherCode={appliedCustomVoucher?.code}
        onClick={onVoucherClick}
      />

      {/* Display applied vouchers */}
      {(selectedVoucher || appliedCustomVoucher) && (
        <div className="mt-2 mb-2">
          <h4 className="text-sm font-medium mb-2">Voucher Diterapkan:</h4>
          <div className="space-y-2">
            {selectedVoucher && (
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
                <span className="font-medium">{selectedVoucher.code}</span>
                <span className="text-red-500">
                  -Rp {selectedVoucher.discount.toLocaleString()}
                </span>
              </div>
            )}
            {appliedCustomVoucher && (
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
                <span className="font-medium">{appliedCustomVoucher.code}</span>
                <span className="text-red-500">
                  -Rp {appliedCustomVoucher.discount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
