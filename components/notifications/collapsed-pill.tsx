"use client"

import { Bell } from "lucide-react"

export function CollapsedPill({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="animate-soft-pulse fixed top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <Bell className="h-4 w-4" />
      <span className="text-sm font-medium">3 updates</span>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
      </span>
    </button>
  )
}
