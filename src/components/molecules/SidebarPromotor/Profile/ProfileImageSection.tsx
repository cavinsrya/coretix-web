import { AvatarUpload } from "@/components/atoms/AvatarUpload";
import Button from "@/components/atoms/Button";

type Props = {
  imageSrc: string;
  onUploadClick: () => void;
  onEditClick: () => void;
};

export function ProfileImageSection({
  imageSrc,
  onUploadClick,
  onEditClick,
}: Props) {
  return (
    <div className="flex flex-col items-center">
      <AvatarUpload imageSrc={imageSrc} onClick={onUploadClick} />
      <Button onClick={onEditClick}>Edit Foto</Button>
      <p className="text-xs text-gray-500 mt-1 text-center">
        Maksimum 2MB
        <br />
        Format: JPG, PNG
      </p>
    </div>
  );
}
