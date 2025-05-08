import Image from "next/image"

interface EventBannerProps {
  imageUrl: string
  title: string
}

export function EventBanner({ imageUrl, title }: EventBannerProps) {
  return (
    <div className="bg-gray-300 h-[200px] md:h-[250px] rounded-lg overflow-hidden relative mb-8">
      <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
    </div>
  )
}
