import { PaymentSummaryItem } from "@/components/molecules/Checkout/molecules/payment-summary-item";
import { NavigationButtons } from "@/components/molecules/Checkout/molecules/navigation-buttons";

interface PaymentDetailsProps {
  ticketPrice: number;
  adminFee: number;
  pointsDiscount: number;
  voucherDiscount: number;
  customVoucherDiscount: number;
  totalPrice: number;
  previousLink: string;
  onContinue: () => void;
  continueText: string;
}

export function PaymentDetails({
  ticketPrice,
  adminFee,
  pointsDiscount,
  voucherDiscount,
  customVoucherDiscount,
  totalPrice,
  previousLink,
  onContinue,
  continueText,
}: PaymentDetailsProps) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Detail Pembayaran</h3>

      <div className="space-y-2 mb-4">
        <PaymentSummaryItem label="Harga Tiket" amount={ticketPrice} />
        <PaymentSummaryItem label="Biaya Admin" amount={adminFee} />

        {pointsDiscount > 0 && (
          <PaymentSummaryItem
            label="Point"
            amount={pointsDiscount}
            isDiscount
          />
        )}

        {voucherDiscount > 0 && (
          <PaymentSummaryItem
            label="Voucher"
            amount={voucherDiscount}
            isDiscount
          />
        )}

        {customVoucherDiscount > 0 && (
          <PaymentSummaryItem
            label="Voucher Kustom"
            amount={customVoucherDiscount}
            isDiscount
          />
        )}
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between font-bold">
          <span>Total Harga</span>
          <span>Rp {totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <NavigationButtons
        previousLink={previousLink}
        onContinue={onContinue}
        continueText={continueText}
      />
    </div>
  );
}
