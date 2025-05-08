"use client";

import { FormField } from "@/components/molecules/PromotorComp/form-field";
import { FormSectionHeader } from "@/components/molecules/PromotorComp/form-section-header";

interface EventDescriptionFormProps {
  formData: {
    description: string;
  };
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function EventDescriptionForm({
  formData,
  onChange,
  errors,
}: EventDescriptionFormProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <FormSectionHeader
        title="Deskripsi Event"
        description="Berikan deskripsi detail tentang event Anda"
      />

      <FormField
        label="Deskripsi"
        htmlFor="description"
        required
        error={errors.description}
      >
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#86e64c] focus:border-transparent"
          placeholder="Deskripsikan event Anda secara detail"
          rows={10}
        />
      </FormField>
    </div>
  );
}
