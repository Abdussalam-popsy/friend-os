import { Card, CardContent } from "@/components/ui/card"
import { CardActions } from "@/components/dashboard/card-actions"
import { BrandLogo } from "@/components/shared/brand-logo"
import { cn } from "@/lib/utils"

interface SponsoredCardProps {
  compact?: boolean
}

export function SponsoredCard({ compact = false }: SponsoredCardProps) {
  return (
    <Card className={cn("overflow-hidden border-0 bg-neutral-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]", compact && "shadow-none bg-white")}>
      {/* Cinematic banner — 16:9 */}
      <div className={cn("relative overflow-hidden bg-neutral-100", compact ? "aspect-[4/3]" : "aspect-[16/9]")}>
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop&q=80"
          alt="ASOS New Season"
          className="h-full w-full object-cover"
        />
        {/* Brand logo — top-left */}
        {!compact && (
          <div className="absolute left-3 top-3">
            <BrandLogo
              logoUrl="https://img.logo.dev/asos.com?token=pk_VAMPsVSMSC-VYyGOEOYXqw"
              brandName="ASOS"
              size="md"
              overlay
            />
          </div>
        )}
        {/* Subtle sponsored label — bottom-right */}
        <span className="absolute bottom-2.5 right-2.5 rounded-full bg-white/70 backdrop-blur-sm px-2 py-0.5 text-[9px] font-medium text-neutral-400">
          Sponsored
        </span>
      </div>

      <CardContent className={cn("flex flex-col gap-3", compact ? "p-3 gap-2" : "p-4")}>
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">ASOS</p>
          <h3 className={cn("font-medium text-neutral-900 leading-snug", compact ? "text-sm" : "text-sm")}>
            New Season Edit — Up to 30% Off
          </h3>
          <span className="text-[12px] text-neutral-500">Curated picks for your style</span>
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "Shop Now" },
            { label: "Not Interested", variant: "ghost" },
          ]}
        />
        <button className="self-start text-[10px] text-neutral-400 underline underline-offset-2 hover:text-neutral-600 transition-colors">
          Why am I seeing this?
        </button>
      </CardContent>
    </Card>
  )
}
