import type { ReactNode } from "react";
import Text from "../atoms/Teks";

type ContactItemProps = {
  icon: ReactNode;
  text: string;
  subtext?: string;
};

export default function ContactItem({ icon, text, subtext }: ContactItemProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mt-0.5">
        {icon}
      </div>
      <div>
        <Text size="sm" color="white">
          {text}
        </Text>
        {subtext && (
          <Text size="xs" className="text-gray-300">
            {subtext}
          </Text>
        )}
      </div>
    </div>
  );
}
