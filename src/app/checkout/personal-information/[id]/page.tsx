"use client";

import { useState, useEffect } from "react";
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
import {
  getEventDetails,
  createTransaction,
  getUserPoints,
  getUserProfile,
} from "@/lib/api/axios";

type AppliedVoucher = {
  id: string;
  code: string;
  discount: number;
};

export default function PersonalInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quantity = Number.parseInt(searchParams.get("qty") || "1");
  const type = searchParams.get("type");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<AppliedVoucher | null>(
    null
  );
  const [appliedCustomVoucher, setAppliedCustomVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const [eventData, setEventData] = useState<any>({
    id: params.id,
    title: "",
    date: "",
    location: "",
    price: 0,
    image: "",
    ticketTypes: [],
    promotions: [],
  });

  const [userPoints, setUserPoints] = useState<number>(0);

  // Sesuaikan useEffect
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventDetails(params.id);
        setEventData(event);
      } catch (error) {
        toast.error("Gagal memuat data event.");
      }
    };

    const fetchUserData = async () => {
      try {
        const profile = await getUserProfile();
        console.log("User Profile:", profile);
        setName(profile.name);
        setEmail(profile.email);
        setUserPoints(profile.points);
        console.log("Name:", name);
        console.log("Email:", email);
      } catch (error) {
        toast.error("Gagal memuat data pengguna.");
      }
    };

    fetchEvent();
    fetchUserData();
  }, [params.id]);

  const selectedTicketType = eventData.ticketTypes.find(
    (t: any) => t.id === Number(type)
  );

  const ticketPrice = selectedTicketType
    ? selectedTicketType.price * quantity
    : 0;
  const adminFee = 2000;
  const pointsDiscount = usePoints ? userPoints : 0;
  const voucherDiscount = selectedVoucher
    ? eventData.promotions.find((v: any) => v.code === selectedVoucher)
        ?.amount || 0
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

  const handleContinue = async () => {
    if (!name || !email) {
      toast.error("Mohon lengkapi semua informasi personal");
      return;
    }

    try {
      const response = await createTransaction({
        ticketTypeId: selectedTicketType?.id,
        promotionCode: selectedVoucher || null,
        voucherCode: appliedCustomVoucher?.code || null,
        usePoint: usePoints,
        quantity,
      });

      toast.success("Transaksi berhasil dibuat!");
      router.push(
        `/checkout/confirmation/${params.id}?transactionId=${response.detail.id}`
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Gagal membuat transaksi. Coba lagi."
      );
    }
  };

  const handleSelectVoucher = (code: string | null) => {
    if (!code) {
      setSelectedVoucher(null);
      return;
    }

    const selected = eventData.promotions.find((v: any) => v.code === code);
    if (selected) {
      setSelectedVoucher({
        id: selected.id.toString(),
        code: selected.code,
        discount: selected.amount,
      });
    }
  };

  return (
    <CheckoutTemplate
      currentStep={2}
      eventImageUrl={eventData.imageUrl}
      eventTitle={eventData.title}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Information */}
        <div className="md:col-span-2">
          <TicketDetails
            eventTitle={eventData.title}
            eventDate={eventData.date}
            ticketPrice={ticketPrice / quantity}
            quantity={quantity}
          />

          <BuyerInformation name={name} email={email} />
        </div>

        {/* Right Column - Payment Details */}
        <div className="md:col-span-1">
          <PaymentMethod />

          <VoucherSection
            selectedVoucher={selectedVoucher}
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
        availableVouchers={eventData.promotions}
        validCustomVouchers={[]}
        selectedVoucher={selectedVoucher?.code || ""}
        appliedCustomVoucher={appliedCustomVoucher}
        quantity={quantity}
        onSelectVoucher={(code) => handleSelectVoucher(code || null)} // Gunakan null jika tidak ada
        onApplyCustomVoucher={setAppliedCustomVoucher}
      />
    </CheckoutTemplate>
  );
}
