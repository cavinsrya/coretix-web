"use client";

import type React from "react";

import { InputField } from "@/components/molecules/Checkout/molecules/input-field";

interface BuyerInformationProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BuyerInformation({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
}: BuyerInformationProps) {
  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-2">Buyer Information</h3>
      <p className="text-sm text-gray-600 mb-4">
        Make sure all the information is correct. You cannot change it later
      </p>

      <div className="space-y-4">
        <InputField
          id="name"
          label="Nama Lengkap"
          type="text"
          value={name}
          onChange={onNameChange}
          required
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
          required
          helperText="*E-tiket akan dikirim melalui email ini."
        />

        <InputField
          id="phone"
          label="No Handphone"
          type="tel"
          value={phone}
          onChange={onPhoneChange}
          required
        />
      </div>
    </div>
  );
}
