"use client"

import { cn } from "@/lib/utils"

const TABS = ["Summary", "Profile", "Research", "Shopping", "Tasks"] as const

export type TabValue = (typeof TABS)[number]

interface TabPillsProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

export function TabPills({ activeTab, onTabChange }: TabPillsProps) {
  return (
    <nav className="px-8" aria-label="Dashboard tabs">
      <div className="flex items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              activeTab === tab
                ? "bg-foreground text-background shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-border hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}
