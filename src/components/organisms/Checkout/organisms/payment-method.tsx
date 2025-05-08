export function PaymentMethod() {
  return (
    <div className="border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-bold mb-4">Metode Pembayaran</h3>

      <div className="border rounded-md p-3 flex items-center gap-3 bg-gray-50">
        <div className="bg-gray-200 h-6 w-6 rounded"></div>
        <span className="text-gray-600">Bank Transfer</span>
      </div>
    </div>
  )
}
