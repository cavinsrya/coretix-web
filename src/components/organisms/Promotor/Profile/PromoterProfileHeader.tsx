import { ProfileImageSection } from "@/components/molecules/SidebarPromotor/Profile/ProfileImageSection";
import { PromoterProfileForm } from "./PromotorProfileForm";

type Props = {
  imageSrc: string;
  onUploadClick: () => void;
  onEditClick: () => void;
  //   stats: { rating: number; events: number; ticketsSold: number };
  formName: string;
  formEmail: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function PromoterProfileHeader({
  imageSrc,
  onUploadClick,
  onEditClick,
  //   stats,
  formName,
  formEmail,
  onChangeName,
  onChangeEmail,
  onSave,
  onCancel,
}: Props) {
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the data to an API
    alert("Profil berhasil disimpan!");
  };
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <ProfileImageSection
              imageSrc={imageSrc}
              onUploadClick={onUploadClick}
              onEditClick={onEditClick}
            />
            <PromoterProfileForm
              name={formName}
              email={formEmail}
              onChangeName={onChangeName}
              onChangeEmail={onChangeEmail}
              onSave={onSave}
              onCancel={onCancel}
            />
            {/* <div className="text-center">
              <h2 className="text-lg font-bold">{name}</h2>
              <p className="text-sm text-gray-600">{shortBio}</p>
            </div> */}
          </div>
        </form>
      </div>
    </div>
  );
}
