import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

interface FinanceCardProps {
  compact?: boolean
}

function MiniSparkline() {
  // Simple SVG sparkline showing price drop
  const points = [
    [0, 8],
    [15, 10],
    [30, 6],
    [45, 12],
    [60, 14],
    [75, 10],
    [90, 16],
    [105, 12],
    [120, 4],
  ]
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")

  return (
    <svg width="128" height="24" viewBox="0 0 128 24" className="text-badge-orange">
      <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={120} cy={4} r="3" fill="currentColor" />
    </svg>
  )
}

export function FinanceCard({ compact = false }: FinanceCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", compact && "shadow-none")}>
      <CardContent className={cn("flex flex-col gap-4", compact ? "p-4 gap-3" : "p-6")}>
        <CategoryBadge category="Finance" />
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-bold text-foreground leading-snug tracking-tight", compact ? "text-sm" : "text-lg")}>
            {"Price Drop Alert \u2014 Save £30"}
          </h3>
          <p className="text-xs text-muted-foreground">Sony WH-1000XM5</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Now</span>
            <span className="text-base font-bold text-badge-green">{"£269"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Was</span>
            <span className="text-base font-medium text-muted-foreground line-through">{"£299"}</span>
          </div>
        </div>
        <div className="rounded-2xl bg-secondary p-3">
          <p className="mb-1.5 text-[11px] text-muted-foreground">Price History</p>
          <MiniSparkline />
        </div>
        <p className="text-xs font-medium text-badge-green">
          {"+£12.45 cashback via TopCashback"}
        </p>
        <CardActions
          compact={compact}
          actions={[
            { label: "Buy with Cashback" },
            { label: "Price History", variant: "outline" },
            { label: "Stop Tracking", variant: "ghost" },
          ]}
        />
      </CardContent>
    </Card>
  )
}
