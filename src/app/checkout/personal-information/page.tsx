"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CheckoutTemplate } from "@/components/templates/checkout-template";
import { TicketDetails } from "@/components/organisms/Checkout/organisms/ticket-details";
import { BuyerInformation } from "@/components/organisms/Checkout/organisms/buyer-information";
import { PaymentMethod } from "@/components/organisms/Checkout/organisms/payment-method";
import { VoucherSection } from "@/components/organisms/Checkout/organisms/voucher-section";
import { PointsSection } from "@/components/organisms/Checkout/organisms/points-section";
import { PaymentDetails } from "@/components/organisms/Checkout/organisms/payment-details";
import { VoucherModal } from "@/components/organisms/Checkout/organisms/voucher-modal";

export default function PersonalInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = Number.parseInt(searchParams.get("qty") || "1");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [appliedCustomVoucher, setAppliedCustomVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const [eventData, setEventData] = useState({
    id: params.id,
    title: "Hearts2Hearts The Chase",
    date: "25 Apr - 25 Apr 2025",
    location: "Gelora Bung Karno",
    price: 210000,
    image: "/placeholder.svg?height=300&width=800",
  });

  // Dummy vouchers with additional requirements
  const availableVouchers = [
    {
      id: "v1",
      code: "NEWUSER",
      discount: 20000,
      description: "Diskon Rp 20.000 untuk pengguna baru",
      minTickets: 1,
      expiryDate: "30 Apr 2025",
      remainingUses: 500,
    },
    {
      id: "v2",
      code: "WEEKEND",
      discount: 15000,
      description: "Diskon Rp 15.000 untuk pembelian di akhir pekan",
      minTickets: 2,
      expiryDate: "15 May 2025",
      remainingUses: 200,
    },
    {
      id: "v3",
      code: "GROUPBUY",
      discount: 50000,
      description: "Diskon Rp 50.000 untuk pembelian grup",
      minTickets: 4,
      expiryDate: "10 May 2025",
      remainingUses: 100,
    },
  ];

  // Custom voucher codes for demo
  const validCustomVouchers = [
    {
      code: "SPECIAL25",
      discount: 25000,
    },
    {
      code: "PROMO40",
      discount: 40000,
    },
  ];

  // Dummy points
  const userPoints = 10000;

  const ticketPrice = eventData.price * quantity;
  const adminFee = 2000;
  const pointsDiscount = usePoints ? userPoints : 0;
  const voucherDiscount = selectedVoucher
    ? availableVouchers.find((v) => v.id === selectedVoucher)?.discount || 0
    : 0;
  const customVoucherDiscount = appliedCustomVoucher
    ? appliedCustomVoucher.discount
    : 0;

  const totalPrice =
    ticketPrice +
    adminFee -
    pointsDiscount -
    voucherDiscount -
    customVoucherDiscount;

  const handleContinue = () => {
    if (!name || !email || !phone) {
      toast.error("Mohon lengkapi semua informasi personal");
      return;
    }

    // Generate invoice code once
    const invoiceCode = "CRTX" + Math.floor(10000 + Math.random() * 90000);

    // Normally we would save this data to a state management solution or API
    // For this demo, we'll just pass it via URL params
    router.push(
      `/checkout/confirmation/${params.id}?qty=${quantity}&points=${
        usePoints ? userPoints : 0
      }&invoice=${invoiceCode}&voucher=${
        selectedVoucher || ""
      }&voucherDiscount=${voucherDiscount + customVoucherDiscount}`
    );
  };

  const selectedVoucherObject = selectedVoucher
    ? {
        id: selectedVoucher,
        code:
          availableVouchers.find((v) => v.id === selectedVoucher)?.code || "",
        discount:
          availableVouchers.find((v) => v.id === selectedVoucher)?.discount ||
          0,
      }
    : null;

  return (
    <CheckoutTemplate
      currentStep={2}
      eventImageUrl={eventData.image}
      eventTitle={eventData.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="md:col-span-2">
          <TicketDetails
            eventTitle={eventData.title}
            eventDate={eventData.date}
            ticketPrice={eventData.price}
            quantity={quantity}
          />

          <BuyerInformation
            name={name}
            email={email}
            phone={phone}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPhoneChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Right Column - Payment Details */}
        <div className="md:col-span-1">
          <PaymentMethod />

          <VoucherSection
            selectedVoucher={selectedVoucherObject}
            appliedCustomVoucher={appliedCustomVoucher}
            onVoucherClick={() => setShowVoucherModal(true)}
          />

          <PointsSection
            points={userPoints}
            usePoints={usePoints}
            onTogglePoints={() => setUsePoints(!usePoints)}
          />

          <PaymentDetails
            ticketPrice={ticketPrice}
            adminFee={adminFee}
            pointsDiscount={pointsDiscount}
            voucherDiscount={voucherDiscount}
            customVoucherDiscount={customVoucherDiscount}
            totalPrice={totalPrice}
            previousLink={`/checkout/select-ticket/${params.id}`}
            onContinue={handleContinue}
            continueText="Bayar Sekarang"
          />
        </div>
      </div>

      <VoucherModal
        show={showVoucherModal}
        onClose={() => setShowVoucherModal(false)}
        availableVouchers={availableVouchers}
        validCustomVouchers={validCustomVouchers}
        selectedVoucher={selectedVoucher}
        appliedCustomVoucher={appliedCustomVoucher}
        quantity={quantity}
        onSelectVoucher={setSelectedVoucher}
        onApplyCustomVoucher={setAppliedCustomVoucher}
      />
    </CheckoutTemplate>
  );
}
