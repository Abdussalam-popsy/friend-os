import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

interface HealthCardProps {
  compact?: boolean
}

const dataPoints = [
  { label: "Avg screen-off", value: "1:24 AM" },
  { label: "Tomorrow's first event", value: "9:00 AM" },
  { label: "Recommended bedtime", value: "11:30 PM" },
]

export function HealthCard({ compact = false }: HealthCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", compact && "shadow-none")}>
      <CardContent className={cn("flex flex-col gap-4", compact ? "p-4 gap-3" : "p-6")}>
        <CategoryBadge category="Health" />
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-bold text-foreground leading-snug tracking-tight", compact ? "text-sm" : "text-lg")}>
            Sleep Pattern Alert
          </h3>
          <p className="text-xs text-muted-foreground">
            {"You\u2019ve been up past midnight 4/5 nights this week"}
          </p>
        </div>
        <div className="flex flex-col gap-0 rounded-2xl bg-secondary overflow-hidden">
          {dataPoints.map((dp, i) => (
            <div
              key={dp.label}
              className={cn(
                "flex items-center justify-between px-3 py-2.5",
                i !== dataPoints.length - 1 && "border-b border-border"
              )}
            >
              <span className="text-xs text-muted-foreground">{dp.label}</span>
              <span className="text-xs font-semibold text-foreground">{dp.value}</span>
            </div>
          ))}
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "Set Reminder" },
            { label: "Got It", variant: "outline" },
          ]}
        />
      </CardContent>
    </Card>
  )
}
