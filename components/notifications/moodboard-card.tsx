"use client"

import type { Notification } from "@/data/mockData"
import { BrandLogo } from "@/components/shared/brand-logo"
import { cn } from "@/lib/utils"

interface MoodboardCardProps {
  notification: Notification
  onClick: () => void
  index: number
  isVisible: boolean
}

const ASPECT_MAP = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  standard: "aspect-square",
} as const

export function MoodboardCard({
  notification,
  onClick,
  index,
  isVisible,
}: MoodboardCardProps) {
  const aspect = ASPECT_MAP[notification.masonrySize ?? "standard"]
  const details = notification.details
  const isOutfit = notification.type === "outfit" && details?.outfitItems

  // Get price display
  const priceDisplay =
    details?.salePrice ?? details?.currentPrice ?? details?.totalPrice

  return (
    <div
      className={cn(
        "break-inside-avoid mb-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-3 scale-[0.97]",
      )}
      style={{
        transitionDelay: isVisible ? `${index * 50 + 100}ms` : "0ms",
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative block w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
      >
        {/* Image area */}
        <div className={cn("relative overflow-hidden", aspect)}>
          {/* Outfit type: 2×2 grid */}
          {isOutfit && details?.outfitItems ? (
            <div className="grid grid-cols-2 gap-0.5 h-full w-full bg-neutral-200">
              {details.outfitItems.slice(0, 4).map((item) => (
                <div key={item.name} className="overflow-hidden bg-neutral-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-200" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Single image */
            <img
              src={notification.image}
              alt={notification.title}
              className={cn(
                "h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]",
                notification.type === "drop" && "opacity-85",
              )}
            />
          )}

          {/* Brand logo — always visible, top-left */}
          {details?.brandLogoUrl && (
            <div className="absolute left-2.5 top-2.5 z-10">
              <BrandLogo
                logoUrl={details.brandLogoUrl}
                brandName={details.brand}
                size="sm"
                overlay
              />
            </div>
          )}

          {/* Type-specific always-visible badges */}
          {notification.type === "deal" && details?.discount && (
            <span className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
              {details.discount}
            </span>
          )}

          {notification.type === "trending" && details?.socialProof && (
            <span className="absolute bottom-2.5 left-2.5 right-2.5 z-10 rounded-xl bg-white/80 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-medium text-neutral-700 shadow-sm border border-white/40 text-center">
              {details.socialProof}
            </span>
          )}

          {notification.type === "drop" && details?.dropDate && (
            <span className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-neutral-700 shadow-sm border border-white/40">
              {details.dropDate}
            </span>
          )}

          {notification.type === "sponsored" && (
            <span className="absolute bottom-2 right-2 z-10 rounded-full bg-white/60 backdrop-blur-sm px-2 py-0.5 text-[9px] font-medium text-neutral-400">
              Sponsored
            </span>
          )}

          {notification.type === "outfit" && details?.occasion && (
            <span className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-neutral-700 shadow-sm border border-white/40">
              {details.occasion}
            </span>
          )}

          {/* Hover reveal: gradient scrim + text */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-x-0 bottom-0 px-3.5 pb-3.5 pt-10">
              <h3 className="text-[13px] font-semibold text-white leading-snug line-clamp-2">
                {details?.productName ?? details?.collectionName ?? notification.title}
              </h3>
              {priceDisplay && (
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-[12px] font-bold text-white">
                    {priceDisplay}
                  </span>
                  {details?.originalPrice && details.salePrice && (
                    <span className="text-[10px] text-white/60 line-through">
                      {details.originalPrice}
                    </span>
                  )}
                </div>
              )}
              {details?.brand && (
                <p className="mt-0.5 text-[11px] text-white/60">
                  {details.brand}
                  {details.storeName ? ` · ${details.storeName}` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}
