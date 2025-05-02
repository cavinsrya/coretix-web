import type { ReactNode } from "react";

type InputProps = {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  name,
  type = "text",
  placeholder,
  icon,
  className = "",
  value,
  onChange,
}: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-2 rounded-full text-sm text-black focus:outline-none ${className}`}
      />
    </div>
  );
}
