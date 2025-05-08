export function CheckoutFooter() {
  return (
    <footer className="bg-[#050557] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-[#86e64c] rounded-full p-1.5">
                <div className="h-6 w-6 bg-[#050557] rounded-full flex items-center justify-center">
                  <span className="text-[#86e64c] font-bold text-xl">C</span>
                </div>
              </div>
              <span className="text-[#86e64c] font-bold text-xl ml-1">CoreTix</span>
            </div>
            <p className="text-sm font-bold mb-2">"Jual Tiket? Beli Tiket? Semudah Ini!"</p>
            <p className="text-xs text-gray-300">
              Jual tiket lebih mudah, kelola event lebih praktis, hadirkan kemudahan pemesanan otomatis dan proses
              pembayaran tiket yang efisien.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Hubungi Kami</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-white rounded-full p-1 mt-0.5">
                  <span className="block h-3 w-3 bg-[#050557] rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm">+628514386321</p>
                  <p className="text-xs text-gray-300">(Customer Support)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white rounded-full p-1 mt-0.5">
                  <span className="block h-3 w-3 bg-[#050557] rounded-full"></span>
                </div>
                <div>
                  <p className="text-sm">+628111677655</p>
                  <p className="text-xs text-gray-300">(Partnership)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white rounded-full p-1 mt-0.5">
                  <span className="block h-3 w-3 bg-[#050557] rounded-full"></span>
                </div>
                <p className="text-sm">coretixid</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-white rounded-full p-1 mt-0.5">
                  <span className="block h-3 w-3 bg-[#050557] rounded-full"></span>
                </div>
                <p className="text-sm">hello@coretix.id</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Goers Office:</h3>
            <p className="text-sm mb-4">
              Graha Krama Yudha Lt. 4 Unit B<br />
              Jalan Haji Tutty Alawiyah No. 43
              <br />
              Jakarta Selatan 12760
            </p>

            <h3 className="font-bold mb-2">Working Hours:</h3>
            <p className="text-sm">Weekdays @ 09.00 - 20.00</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
          © 2025 PT Coretix Indah Selalu. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
