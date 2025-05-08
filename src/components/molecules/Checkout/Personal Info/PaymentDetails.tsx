// import React from 'react'
// import { useState } from 'react';
// import { toast } from 'sonner';
// import { useSearchParams } from 'next/navigation';

// export default function PaymentDetails({
//     params,
//   }: {
//     params: { id: string };
//   }) {
//   const searchParams = useSearchParams();
//   const quantity = Number.parseInt(searchParams.get("qty") || "1");
//       const [name, setName] = useState("");
//       const [email, setEmail] = useState("");
//       const [phone, setPhone] = useState("");
//       const [usePoints, setUsePoints] = useState(false);
//       const [showVoucherModal, setShowVoucherModal] = useState(false);
//       const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
//       const [voucherCode, setVoucherCode] = useState("");
//       const [appliedCustomVoucher, setAppliedCustomVoucher] = useState<{
//         code: string;
//         discount: number;
//       } | null>(null);
//       const [voucherError, setVoucherError] = useState("");
//       const [searchVoucher, setSearchVoucher] = useState("");
//       const [eventData, setEventData] = useState({
//         id: params.id,
//         title: "Hearts2Hearts The Chase",
//         date: "25 Apr - 25 Apr 2025",
//         location: "Gelora Bung Karno",
//         price: 210000,
//         image: "/placeholder.svg?height=300&width=800",
//       });

// // Dummy vouchers with additional requirements
// const availableVouchers = [
//     {
//       id: "v1",
//       code: "NEWUSER",
//       discount: 20000,
//       description: "Diskon Rp 20.000 untuk pengguna baru",
//       minTickets: 1,
//       expiryDate: "30 Apr 2025",
//       remainingUses: 500,
//     },
//     {
//       id: "v2",
//       code: "WEEKEND",
//       discount: 15000,
//       description: "Diskon Rp 15.000 untuk pembelian di akhir pekan",
//       minTickets: 2,
//       expiryDate: "15 May 2025",
//       remainingUses: 200,
//     },
//     {
//       id: "v3",
//       code: "GROUPBUY",
//       discount: 50000,
//       description: "Diskon Rp 50.000 untuk pembelian grup",
//       minTickets: 4,
//       expiryDate: "10 May 2025",
//       remainingUses: 100,
//     },
//   ];

//   // Custom voucher codes for demo
//   const validCustomVouchers = [
//     {
//       code: "SPECIAL25",
//       discount: 25000,
//     },
//     {
//       code: "PROMO40",
//       discount: 40000,
//     },
//   ];

//   // Dummy points
//   const userPoints = 10000;

//   const ticketPrice = eventData.price * quantity;
//   const adminFee = 2000;
//   const pointsDiscount = usePoints ? userPoints : 0;
//   const voucherDiscount = selectedVoucher
//     ? availableVouchers.find((v) => v.id === selectedVoucher)?.discount || 0
//     : 0;
//   const customVoucherDiscount = appliedCustomVoucher
//     ? appliedCustomVoucher.discount
//     : 0;

//   // Check if voucher exists
//       const customVoucher = validCustomVouchers.find(
//         (v) => v.code === voucherCode.toUpperCase()
//       );

//       if (!customVoucher) {
//         setVoucherError("Kode voucher tidak ditemukan");
//         return;
//       }

//       // Apply voucher
//       setAppliedCustomVoucher(customVoucher);
//       setVoucherCode("");
//       setVoucherError("");
//       toast.success(`Voucher ${customVoucher.code} berhasil diterapkan!`);
//     };

//   return (
//     <div className="md:col-span-1">
//     {/* Payment Method */}
//     <div className="border rounded-lg p-6 mb-6">
//       <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>

//       <div className="border rounded-md p-3 flex items-center gap-3 bg-gray-50">
//         <div className="bg-gray-200 h-6 w-6 rounded"></div>
//         <span className="text-gray-600">Bank Transfer</span>
//       </div>
//     </div>

//     {/* Voucher */}
//     <div className="border rounded-lg p-6 mb-6">
//       <h3 className="text-lg font-bold mb-4">Voucher</h3>

//       <button
//         className="w-full border rounded-md p-3 flex items-center justify-between mb-3"
//         onClick={() => setShowVoucherModal(true)}
//       >
//         <div className="flex items-center gap-2">
//           <Tag className="h-5 w-5 text-[#050557]" />
//           <span>
//             {selectedVoucher
//               ? availableVouchers.find(
//                   (v) => v.id === selectedVoucher
//                 )?.code
//               : appliedCustomVoucher
//               ? appliedCustomVoucher.code
//               : "Pilih atau Masukkan Voucher"}
//           </span>
//         </div>
//         <ChevronDown className="h-5 w-5" />
//       </button>

//       {/* Display applied vouchers */}
//       {(selectedVoucher || appliedCustomVoucher) && (
//         <div className="mt-2 mb-2">
//           <h4 className="text-sm font-medium mb-2">
//             Voucher Diterapkan:
//           </h4>
//           <div className="space-y-2">
//             {selectedVoucher && (
//               <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
//                 <span className="font-medium">
//                   {
//                     availableVouchers.find(
//                       (v) => v.id === selectedVoucher
//                     )?.code
//                   }
//                 </span>
//                 <span className="text-red-500">
//                   -Rp{" "}
//                   {availableVouchers
//                     .find((v) => v.id === selectedVoucher)
//                     ?.discount.toLocaleString() || 0}
//                 </span>
//               </div>
//             )}
//             {appliedCustomVoucher && (
//               <div className="flex justify-between items-center bg-green-50 p-2 rounded-md border border-green-200">
//                 <span className="font-medium">
//                   {appliedCustomVoucher.code}
//                 </span>
//                 <span className="text-red-500">
//                   -Rp {appliedCustomVoucher.discount.toLocaleString()}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Points */}
//     <div className="border rounded-lg p-6 mb-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h3 className="text-lg font-bold mb-1">Point</h3>
//           <div className="flex items-center gap-1">
//             <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
//             <span className="text-sm">
//               {userPoints.toLocaleString()} Points
//             </span>
//           </div>
//         </div>

//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only peer"
//             checked={usePoints}
//             onChange={() => setUsePoints(!usePoints)}
//           />
//           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
//         </label>
//       </div>
//     </div>

//     {/* Payment Details */}
//     <div className="border rounded-lg p-6">
//       <h3 className="text-lg font-bold mb-4">Detail Pembayaran</h3>

//       <div className="space-y-2 mb-4">
//         <div className="flex justify-between">
//           <span>Harga Tiket</span>
//           <span>Rp {ticketPrice.toLocaleString()}</span>
//         </div>

//         <div className="flex justify-between">
//           <span>Biaya Admin</span>
//           <span>Rp {adminFee.toLocaleString()}</span>
//         </div>

//         {usePoints && (
//           <div className="flex justify-between text-red-500">
//             <span>Point</span>
//             <span>-Rp {pointsDiscount.toLocaleString()}</span>
//           </div>
//         )}

//         {selectedVoucher && (
//           <div className="flex justify-between text-red-500">
//             <span>Voucher</span>
//             <span>-Rp {voucherDiscount.toLocaleString()}</span>
//           </div>
//         )}

//         {appliedCustomVoucher && (
//           <div className="flex justify-between text-red-500">
//             <span>Voucher Kustom</span>
//             <span>-Rp {customVoucherDiscount.toLocaleString()}</span>
//           </div>
//         )}
//       </div>

//       <div className="border-t pt-3">
//         <div className="flex justify-between font-bold">
//           <span>Total Harga</span>
//           <span>Rp {totalPrice.toLocaleString()}</span>
//         </div>
//       </div>

//       <div className="flex gap-3 mt-6">
//         <Link
//           href={`/checkout/select-ticket/${params.id}`}
//           className="flex items-center justify-center gap-1 border border-[#050557] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
//         >
//           <ChevronLeft className="h-4 w-4" />
//           <span>Previous</span>
//         </Link>
//         <button
//           onClick={handleContinue}
//           className="flex-1 bg-[#86e64c] text-[#050557] font-medium py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
//         >
//           Bayar Sekarang
//         </button>
//       </div>
//     </div>
//   </div>
//   )
// }}
