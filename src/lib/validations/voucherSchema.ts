import { z } from "zod";

export const voucherSchema = z
  .object({
    name: z.string().min(1, "Nama voucher wajib diisi"),
    startDate: z.date({
      required_error: "Tanggal mulai wajib diisi",
      invalid_type_error: "Tanggal mulai tidak valid",
    }),
    endDate: z.date({
      required_error: "Tanggal berakhir wajib diisi",
      invalid_type_error: "Tanggal berakhir tidak valid",
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "Tanggal berakhir harus setelah tanggal mulai",
    path: ["endDate"],
  });

export type VoucherData = z.infer<typeof voucherSchema>;
