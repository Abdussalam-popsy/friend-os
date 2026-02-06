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
      <CardContent className={cn("flex flex-col gap-3", compact ? "p-4" : "p-5")}>
        <div className="flex items-center justify-between">
          <CategoryBadge category="Research" />
          <span className="inline-flex items-center rounded-full bg-badge-blue-bg px-2 py-0.5 text-xs font-bold text-badge-blue">
            94%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-semibold text-foreground leading-snug", compact ? "text-sm" : "text-base")}>
            Novel biomarkers for early-stage cancer detection
          </h3>
          <p className="text-xs text-muted-foreground">
            Nature Medicine &middot; Zhang et al.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["Liquid Biopsy", "ctDNA Markers", "Early Detection"].map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
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
