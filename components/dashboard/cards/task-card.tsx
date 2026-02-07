import { Card, CardContent } from "@/components/ui/card"
import { CategoryBadge } from "@/components/dashboard/category-badge"
import { CardActions } from "@/components/dashboard/card-actions"
import { cn } from "@/lib/utils"

const miniResults = [
  { name: "Personalised Star Map Print", price: "£34.99", retailer: "Not On The High Street" },
  { name: "Jo Malone Miniatures Set", price: "£42.00", retailer: "John Lewis" },
  { name: "Spa Day Gift Voucher", price: "£49.00", retailer: "Treatwell" },
]

interface TaskCardProps {
  compact?: boolean
}

export function TaskCard({ compact = false }: TaskCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-shadow hover:shadow-md", compact && "shadow-none")}>
      <CardContent className={cn("flex flex-col gap-4", compact ? "p-4 gap-3" : "p-6")}>
        <CategoryBadge category="Task" />
        <div className="flex flex-col gap-1">
          <h3 className={cn("font-bold text-foreground leading-snug tracking-tight", compact ? "text-sm" : "text-lg")}>
            Gift Research Complete
          </h3>
          <p className="text-xs text-muted-foreground">
            {"Found 3 birthday gifts for your mum under £50"}
          </p>
        </div>
        <div className="flex flex-col gap-0 rounded-2xl border border-border overflow-hidden">
          {miniResults.map((item, i) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center justify-between px-3 py-2.5",
                i !== miniResults.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">{item.name}</span>
                <span className="text-[11px] text-muted-foreground">{item.retailer}</span>
              </div>
              <span className="text-xs font-semibold text-foreground">{item.price}</span>
            </div>
          ))}
        </div>
        <CardActions
          compact={compact}
          actions={[
            { label: "View All" },
            { label: "Buy Top Pick", variant: "outline" },
            { label: "Refine", variant: "ghost" },
          ]}
        />
      </CardContent>
    </Card>
  )
}
