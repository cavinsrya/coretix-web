import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="bg-[#050557] rounded-full p-1.5">
        <div className="h-6 w-6 bg-[#050557] rounded-full flex items-center justify-center">
          <span className="text-[#86e64c] font-bold text-xl">C</span>
        </div>
      </div>
      <span className="text-[#050557] font-bold text-xl ml-1">CoreTix</span>
    </Link>
  )
}
