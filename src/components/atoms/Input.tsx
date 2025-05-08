import type { ReactNode } from "react";

type InputProps = {
  id: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  ref?: React.Ref<HTMLInputElement>;
  accept?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  id,
  label,
  name,
  type = "text",
  placeholder,
  icon,
  ref,
  className = "",
  value,
  onChange,
}: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        </>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        ref={ref}
        accept="image/*"
        onChange={onChange}
        className={`w-full ${
          icon ? "pl-10" : "pl-4"
        } pr-4 py-2 rounded-full text-sm text-black focus:outline-none ${className}`}
      />
    </div>
  );
}
