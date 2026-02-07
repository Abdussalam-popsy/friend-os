import { cn } from "@/lib/utils"
import { NotificationIcon } from "@/components/notifications/notification-icon"

export type CardCategory =
  | "Research"
  | "Shopping"
  | "Task"
  | "Finance"
  | "Health"
  | "Sponsored"

const categoryStyles: Record<CardCategory, string> = {
  Research: "bg-blue-100/80 text-blue-700",
  Shopping: "bg-amber-100/80 text-amber-700",
  Task: "bg-teal-100/80 text-teal-700",
  Finance: "bg-amber-100/80 text-amber-700",
  Health: "bg-emerald-100/80 text-emerald-700",
  Sponsored: "bg-badge-gray-bg text-badge-gray",
}

const categoryIcons: Record<CardCategory, string> = {
  Research: "document-text",
  Shopping: "tag",
  Task: "check-circle",
  Finance: "arrow-trending-up",
  Health: "heart",
  Sponsored: "sparkles",
}

interface CategoryBadgeProps {
  category: CardCategory
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
        categoryStyles[category],
        className
      )}
    >
      <NotificationIcon name={categoryIcons[category]} className="h-3.5 w-3.5" />
      {category}
    </span>
  )
}
