"use client"

import { LayoutGrid, Columns3, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LayoutMode = "tabbed" | "kanban"

interface TopBarProps {
  layout: LayoutMode
  onToggleLayout: () => void
  onBack?: () => void
}

export function TopBar({ layout, onToggleLayout, onBack }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Back to desktop"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-primary-foreground"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path
              d="M8.5 14.5C9.33 15.83 10.6 16.5 12 16.5C13.4 16.5 14.67 15.83 15.5 14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">
          FriendOS
        </span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleLayout}
        className={cn(
          "gap-2 rounded-lg border-border text-muted-foreground",
          "hover:bg-accent hover:text-foreground transition-colors"
        )}
      >
        {layout === "tabbed" ? (
          <>
            <Columns3 className="h-4 w-4" />
            <span className="text-sm">Kanban</span>
          </>
        ) : (
          <>
            <LayoutGrid className="h-4 w-4" />
            <span className="text-sm">Grid</span>
          </>
        )}
      </Button>
    </header>
  )
}
