import Image from "next/image";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

type Props = {
  imageSrc: string;
  onClick: () => void;
};

export function AvatarUpload({ imageSrc, onClick }: Props) {
  // const [profileData, setProfileData] = useState()
  //   const fileInputRef = useRef<HTMLInputElement>(null)

  //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.files && e.target.files[0]) {
  //         const file = e.target.files[0]

  //         // Check file size (max 2MB)
  //         if (file.size > 2 * 1024 * 1024) {
  //           alert("Ukuran file terlalu besar. Maksimum 2MB.")
  //           return
  //         }

  //         const reader = new FileReader()

  //         reader.onloadend = () => {
  //           const result = reader.result as string
  //           setProfileData({
  //             ...profileData,
  //             profileImage: result,
  //           })
  //         }

  //         reader.readAsDataURL(file)
  //       }
  //     }
  return (
    <>
      <div
        className="relative h-32 w-32 rounded-full overflow-hidden mb-4 cursor-pointer group"
        onClick={onClick}
      >
        <Image
          src="/placeholder.svg"
          alt="Profile"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Upload className="h-8 w-8 text-white" />
        </div>
      </div>
      {/* <input
    type="file"
    ref={fileInputRef}
    className="hidden"
    accept="image/*"
    onChange={handleFileChange}
  /> */}
    </>
  );
}
