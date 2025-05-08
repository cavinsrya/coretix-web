import { NavigationButtons } from "@/components/molecules/Checkout/molecules/navigation-buttons";

interface OrderSummaryProps {
  eventTitle: string;
  quantity: number;
  ticketPrice: number;
  totalPrice: number;
  previousLink: string;
  onContinue: () => void;
  continueText: string;
}

export function OrderSummary({
  eventTitle,
  quantity,
  ticketPrice,
  totalPrice,
  previousLink,
  onContinue,
  continueText,
}: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="font-bold mb-4">Your Order</h3>
      <h4 className="font-bold mb-1">{eventTitle}</h4>
      <p className="text-sm text-gray-600 mb-4">
        {quantity} Tickets x Rp{ticketPrice.toLocaleString()}
      </p>

      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between mb-6">
          <p className="font-medium">Total {quantity} Tickets</p>
          <p className="font-bold">Rp {totalPrice.toLocaleString()}</p>
        </div>

        <NavigationButtons
          previousLink={previousLink}
          onContinue={onContinue}
          continueText={continueText}
        />
      </div>
    </div>
  );
}
