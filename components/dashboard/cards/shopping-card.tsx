import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

interface ShoppingCardProps {
  compact?: boolean
}

export function ShoppingCard({ compact = false }: ShoppingCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", compact && "shadow-none")}>
      <CardContent className={cn("flex flex-col gap-3", compact ? "p-4" : "p-5")}>
        <CategoryBadge category="Shopping" />
        {/* Product image placeholder */}
        <div className="flex h-32 items-center justify-center rounded-xl bg-secondary">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="text-muted-foreground/30"
          >
            <rect x="8" y="14" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M8 22H40" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="30" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M28 27L33 22L40 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-semibold text-foreground leading-snug", compact ? "text-sm" : "text-base")}>
            Nike Dunk Low Retro
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-foreground">
              {"£89.99"}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {"£119.99"}
            </span>
            <span className="rounded-full bg-badge-green-bg px-2 py-0.5 text-xs font-bold text-badge-green">
              -25%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">END Clothing</p>
          <p className="text-xs font-medium text-badge-orange">
            {"Found in your size \u00B7 Only 2 left"}
          </p>
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "Buy Now" },
            { label: "Compare", variant: "outline" },
            { label: "Save", variant: "outline" },
          ]}
        />
      </CardContent>
    </Card>
  )
}
