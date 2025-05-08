import type { ReactNode } from "react";
import { CheckoutHeader } from "../organisms/Checkout/organisms/checkout-header";
import { CheckoutProgress } from "../molecules/Checkout/molecules/checkout-progress";
import { CheckoutFooter } from "../organisms/Checkout/organisms/checkout-footer";
import { EventBanner } from "../organisms/Checkout/organisms/event-banner";

interface CheckoutTemplateProps {
  currentStep: 1 | 2 | 3;
  eventImageUrl: string;
  eventTitle: string;
  children: ReactNode;
}

export function CheckoutTemplate({
  currentStep,
  eventImageUrl,
  eventTitle,
  children,
}: CheckoutTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fa]">
      <CheckoutHeader />

      <div className="container mx-auto px-4 py-8">
        <CheckoutProgress currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <EventBanner imageUrl={eventImageUrl} title={eventTitle} />
          {children}
        </div>
      </div>

      <CheckoutFooter />
    </div>
  );
}
