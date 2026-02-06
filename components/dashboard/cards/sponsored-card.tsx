import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

interface SponsoredCardProps {
  compact?: boolean
}

export function SponsoredCard({ compact = false }: SponsoredCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-border/60 transition-shadow hover:shadow-md",
        "bg-sponsored-bg",
        compact && "shadow-none"
      )}
    >
      <CardContent className={cn("flex flex-col gap-3", compact ? "p-4" : "p-5")}>
        <CategoryBadge category="Sponsored" />
        {/* Product image placeholder */}
        <div className="flex h-28 items-center justify-center rounded-xl bg-secondary/60">
          <svg
            width="44"
            height="44"
            viewBox="0 0 48 48"
            fill="none"
            className="text-muted-foreground/25"
          >
            <rect x="10" y="8" width="28" height="32" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M16 20H32M16 26H28M16 32H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-semibold text-foreground leading-snug", compact ? "text-sm" : "text-base")}>
            {"ASOS Winter Sale \u2014 Up to 50% Off"}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">{"£24.99"}</span>
            <span className="text-sm text-muted-foreground line-through">{"£49.99"}</span>
            <span className="rounded-full bg-badge-green-bg px-2 py-0.5 text-xs font-bold text-badge-green">
              -50%
            </span>
          </div>
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "Shop Now" },
            { label: "Not Interested", variant: "ghost" },
          ]}
        />
        <button className="self-start text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors">
          Why am I seeing this?
        </button>
      </CardContent>
    </Card>
  )
}
