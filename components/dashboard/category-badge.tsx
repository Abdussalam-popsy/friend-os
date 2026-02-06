import { cn } from "@/lib/utils"

export type CardCategory =
  | "Research"
  | "Shopping"
  | "Task"
  | "Finance"
  | "Health"
  | "Sponsored"

const categoryStyles: Record<CardCategory, string> = {
  Research: "bg-badge-blue-bg text-badge-blue",
  Shopping: "bg-badge-green-bg text-badge-green",
  Task: "bg-badge-purple-bg text-badge-purple",
  Finance: "bg-badge-orange-bg text-badge-orange",
  Health: "bg-badge-red-bg text-badge-red",
  Sponsored: "bg-badge-gray-bg text-badge-gray",
}

interface CategoryBadgeProps {
  category: CardCategory
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        categoryStyles[category],
        className
      )}
    >
      {category}
    </span>
  )
}
