import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CardActionsProps {
  actions: { label: string; variant?: "default" | "outline" | "ghost" }[]
  compact?: boolean
}

export function CardActions({ actions, compact = false }: CardActionsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", compact && "gap-1.5")}>
      {actions.map((action, i) => (
        <Button
          key={action.label}
          variant={action.variant ?? (i === 0 ? "default" : "outline")}
          size="sm"
          className={cn(
            "rounded-full text-xs font-medium",
            compact && "h-7 px-2.5 text-[11px]",
            i === 0 && !action.variant && "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}
