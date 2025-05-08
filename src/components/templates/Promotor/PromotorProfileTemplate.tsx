import { PromoterProfileHeader } from "@/components/organisms/Promotor/Profile/PromoterProfileHeader";
import { PromoterProfileForm } from "@/components/organisms/Promotor/Profile/PromotorProfileForm";
import { PromotorProfileStats } from "@/components/organisms/Promotor/Profile/ProfileStats";
import {
  ReviewListProps,
  ReviewListSection,
  type Review,
} from "@/components/organisms/Promotor/Profile/ReviewListSection";
import { on } from "events";

type Props = {
  imageSrc: string;
  onUploadClick: () => void;
  onEditClick: () => void;
  name: string;
  email: string;
  formEmail: string;
  formName: string;
  shortBio: string;
  stats: { rating: number; events: number; ticketsSold: number };
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  rating: number;
  events: number;
  eventsActive: number;
  ticketsSold: number;
  reviews: Review[];
};

export function PromoterProfileTemplate({
  imageSrc,
  onUploadClick,
  onEditClick,
  formName,
  formEmail,
  onChangeName,
  onChangeEmail,
  onSave,
  onCancel,
  rating,
  events,
  eventsActive,
  ticketsSold,
  reviews,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PromoterProfileHeader
          imageSrc={imageSrc}
          onUploadClick={onUploadClick}
          onEditClick={onEditClick}
          formName={formName}
          formEmail={formEmail}
          onChangeName={onChangeName}
          onChangeEmail={onChangeEmail}
          onSave={onSave}
          onCancel={onCancel}
        />

        <PromotorProfileStats
          rating={rating}
          events={events}
          eventsActive={eventsActive}
          ticketsSold={ticketsSold}
        />
      </div>
      <ReviewListSection reviews={reviews} />
    </>
  );
}
