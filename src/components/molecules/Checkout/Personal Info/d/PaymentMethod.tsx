export default function PaymentMethod() {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">Metode Pembayaran</h3>
      <select className="p-2 border rounded-md w-full">
        <option value="credit_card">Kartu Kredit</option>
        <option value="bank_transfer">Transfer Bank</option>
      </select>
    </div>
  );
}
