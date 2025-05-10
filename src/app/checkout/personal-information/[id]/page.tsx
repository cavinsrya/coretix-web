"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useAuth } from "@/app/utils/hook/useAuth";
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
  fetchProfileInfo,
} from "@/lib/api/axios";

type AppliedVoucher = {
  id: string;
  code: string;
  discount: number;
};

export default function PersonalInfoPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id; // Pastikan ID adalah string

  const quantity = Number.parseInt(searchParams.get("qty") || "1");
  const type = searchParams.get("type");
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<AppliedVoucher | null>(
    null
  );
  const [appliedCustomVoucher, setAppliedCustomVoucher] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const [eventData, setEventData] = useState<any>({
    id: eventId || "",
    title: "",
    date: "",
    location: "",
    price: 0,
    image: "",
    ticketTypes: [],
    promotions: [],
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!eventId) return;
        const event = await getEventDetails(eventId);
        setEventData(event);
      } catch (error) {
        toast.error("Gagal memuat data event.");
      }
    };

    const fetchUserData = async () => {
      try {
        const profile = await fetchProfileInfo();
        setUserId(profile.id);
        setName(profile.name);
        setEmail(profile.email);
        setUserPoints(profile.points);
      } catch (error) {
        toast.error("Gagal memuat data pengguna.");
      }
    };

    fetchEvent();
    fetchUserData();
  }, [eventId]);

  const selectedTicketType = eventData.ticketTypes.find(
    (t: any) => t.id === Number(type)
  );

  const ticketPrice = selectedTicketType
    ? selectedTicketType.price * quantity
    : 0;
  const pointsDiscount = usePoints ? userPoints : 0;
  const voucherDiscount = selectedVoucher
    ? eventData.promotions.find((v: any) => v.code === selectedVoucher)
        ?.amount || 0
    : 0;
  const customVoucherDiscount = appliedCustomVoucher
    ? appliedCustomVoucher.discount
    : 0;
  const totalPrice =
    ticketPrice - pointsDiscount - voucherDiscount - customVoucherDiscount;

  const handleContinue = async () => {
    try {
      const response = await createTransaction({
        userId: userId as number,
        ticketTypeId: selectedTicketType?.id,
        promotionCode: selectedVoucher?.code || undefined, // atau pakai kode khusus jika berbeda
        voucherCode: appliedCustomVoucher?.code || undefined,
        usePoints: usePoints,
      });

      console.log(usePoints);

      toast.success("Transaksi berhasil dibuat!");
      router.push(
        `/checkout/confirmation/${eventId}?transactionId=${response.detail.id}`
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Gagal membuat transaksi. Coba lagi."
      );
    }
  };
  console.log("point", usePoints);
  console.log("ticketype", selectedTicketType);
  console.log("total", totalPrice);

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
        <div className="md:col-span-2">
          <TicketDetails
            eventTitle={eventData.title}
            eventDate={eventData.date}
            eventImage={eventData.imageUrl}
            ticketPrice={ticketPrice / quantity}
            quantity={quantity}
          />

          <BuyerInformation name={name} email={email} />
        </div>

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
            usePoints={usePoints}
            pointsUsed={pointsDiscount}
            voucherDiscount={voucherDiscount}
            customVoucherDiscount={customVoucherDiscount}
            totalPrice={totalPrice}
            previousLink={`/checkout/select-ticket/${eventId}`}
            onContinue={handleContinue} // Pastikan ini ada
            continueText="Bayar Sekarang"
          />
        </div>
      </div>
    </CheckoutTemplate>
  );
}
