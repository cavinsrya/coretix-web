// src/components/organisms/DeleteModal.tsx
import React from "react";
import Button from "../atoms/Button";

export function DeleteModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">Konfirmasi Hapus</h3>
        <p className="mb-6">
          Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat
          dibatalkan.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700"
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
