import Image from "next/image"

export default function AIBreakfastPoster() {
  return (
    <div className="w-full max-w-md mx-auto bg-white relative overflow-hidden aspect-[3/4]">
      {/* Hero Banner - Top 40% */}
      <div className="w-full h-[32%] relative">
        <Image src="/banner-image.png" alt="AI and humans collaborating in coffee shop" fill className="object-cover" />
      </div>

      {/* Main Content */}
      <div className="px-6 pt-4 pb-16">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-none text-black mb-2">AI Breakfast #3</h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-medium text-[#444444] mb-4 leading-tight">
          A gathering of AI enthusiasts and professionals to show how we're using AI for work, play and life. Come share
          your AI creations.
        </p>

        {/* Event Details */}
        <div className="text-base sm:text-lg font-medium text-black mb-4 leading-relaxed space-y-1">
          <div>📅 Thursday 17 Jul | 8 – 9 am</div>
          <div>📍 BAKER&SPICE 会德丰国际广场店</div>
          <div className="pl-4 text-sm sm:text-base">南京西路 1717 号南院首层 101</div>
          <div className="pl-4 text-sm sm:text-base">1717 West Nanjing Rd, Wheelock Square</div>
          <div className="pl-4 text-sm sm:text-base">– long table in back</div>
        </div>

        {/* Call to Action */}
        <div className="text-base sm:text-lg font-medium text-[#006E3C] leading-relaxed mb-6">
          <div>Bring a demo, mock-up, or idea.</div>
          <div>5-min lightning shares welcome.</div>
        </div>
      </div>

      {/* QR Code - Bottom Right */}
      <div className="absolute bottom-4 right-4">
        <Image
          src="/qr-code.png"
          alt="WeChat QR Code to join event"
          width={120}
          height={120}
          className="w-[120px] h-[120px]"
        />
      </div>

      {/* Attribution - Bottom Left */}
      <div className="absolute bottom-4 left-4">
        <p className="text-xs italic text-[#999999]">Poster design: OpenAI o3 × v0</p>
      </div>
    </div>
  )
}
