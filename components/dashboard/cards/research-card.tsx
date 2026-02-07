import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

interface ResearchCardProps {
  compact?: boolean
}

export function ResearchCard({ compact = false }: ResearchCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", compact && "shadow-none")}>
      <CardContent className={cn("flex flex-col gap-4", compact ? "p-4 gap-3" : "p-6")}>
        <div className="flex items-center justify-between">
          <CategoryBadge category="Research" />
          <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            94% match
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-bold text-foreground leading-snug tracking-tight", compact ? "text-sm" : "text-lg")}>
            Novel biomarkers for early-stage cancer detection
          </h3>
          <p className="text-sm text-muted-foreground">
            Nature Medicine &middot; Zhang et al.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Liquid Biopsy", "ctDNA Markers", "Early Detection"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "Read Paper" },
            { label: "Save", variant: "outline" },
            { label: "Dismiss", variant: "ghost" },
          ]}
        />
      </CardContent>
    </Card>
  )
}
