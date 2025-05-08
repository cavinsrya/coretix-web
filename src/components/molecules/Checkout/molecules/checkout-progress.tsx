interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        {/* First step */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full ${currentStep >= 1 ? "bg-[#050557]" : "bg-gray-200"} flex items-center justify-center text-white z-10`}
          >
            {currentStep >= 1 && <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
          <span className={`${currentStep >= 1 ? "text-[#050557]" : "text-gray-400"} font-medium text-sm mt-2`}>
            Pilih Tiket
          </span>
        </div>

        {/* Connecting line 1-2 */}
        <div className={`h-0.5 ${currentStep >= 2 ? "bg-[#050557]" : "bg-gray-200"} flex-grow mx-2`}></div>

        {/* Second step */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full ${currentStep >= 2 ? "bg-[#050557]" : "bg-gray-200"} flex items-center justify-center text-white z-10`}
          >
            {currentStep >= 2 && <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
          <span className={`${currentStep >= 2 ? "text-[#050557]" : "text-gray-400"} font-medium text-sm mt-2`}>
            Informasi Personal
          </span>
        </div>

        {/* Connecting line 2-3 */}
        <div className={`h-0.5 ${currentStep >= 3 ? "bg-[#050557]" : "bg-gray-200"} flex-grow mx-2`}></div>

        {/* Third step */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full ${currentStep >= 3 ? "bg-[#050557]" : "bg-gray-200"} flex items-center justify-center text-white z-10`}
          >
            {currentStep >= 3 && <div className="w-3 h-3 bg-white rounded-full"></div>}
          </div>
          <span className={`${currentStep >= 3 ? "text-[#050557]" : "text-gray-400"} font-medium text-sm mt-2`}>
            Konfirmasi
          </span>
        </div>
      </div>
    </div>
  )
}
