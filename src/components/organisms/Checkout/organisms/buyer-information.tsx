"use client";

import type React from "react";

import { InputField } from "@/components/molecules/Checkout/molecules/input-field";

interface BuyerInformationProps {
  name: string;
  email: string;
}

export function BuyerInformation({ name, email }: BuyerInformationProps) {
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
          readOnly // Input ini tidak bisa diubah
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          readOnly // Input ini tidak bisa diubah
          helperText="*E-tiket akan dikirim melalui email ini."
        />
      </div>
    </div>
  );
}
