import { PaymentSummaryItem } from "@/components/molecules/Checkout/molecules/payment-summary-item";
import { NavigationButtons } from "@/components/molecules/Checkout/molecules/navigation-buttons";

interface PaymentDetailsProps {
  ticketPrice: number;
  usePoints: boolean;
  pointsUsed: number;
  voucherDiscount: number;
  customVoucherDiscount: number;
  totalPrice: number;
  previousLink: string;
  onContinue: () => void;
  continueText: string;
}

export function PaymentDetails({
  ticketPrice,
  usePoints,
  pointsUsed,
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

        {pointsUsed > 0 && (
          <PaymentSummaryItem label="Point" amount={pointsUsed} usePoints />
        )}

        {voucherDiscount > 0 && (
          <PaymentSummaryItem
            label="Voucher"
            amount={voucherDiscount}
            usePoints
          />
        )}

        {customVoucherDiscount > 0 && (
          <PaymentSummaryItem
            label="Voucher Kustom"
            amount={customVoucherDiscount}
            usePoints
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
