import React from "react";

export default function ProgressBar() {
  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center mb-8">
          {/* First step */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#050557] flex items-center justify-center text-white z-10">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-[#050557] font-medium text-sm mt-2">
              Pilih Tiket
            </span>
          </div>

          {/* Connecting line 1-2 */}
          <div className="h-0.5 bg-[#050557] flex-grow mx-2"></div>

          {/* Second step */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#050557] flex items-center justify-center text-white z-10">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-[#050557] font-medium text-sm mt-2">
              Informasi Personal
            </span>
          </div>

          {/* Connecting line 2-3 */}
          <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>

          {/* Third step */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-white z-10"></div>
            <span className="text-gray-400 font-medium text-sm mt-2">
              Konfirmasi
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
