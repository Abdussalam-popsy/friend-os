"use client"

import { useState } from "react"
import { TopBar } from "@/components/dashboard/top-bar"
import { TabPills, type TabValue } from "@/components/dashboard/tab-pills"
import { TabbedView } from "@/components/dashboard/tabbed-view"
import { KanbanView } from "@/components/dashboard/kanban-view"

type LayoutMode = "tabbed" | "kanban"

export function Dashboard() {
  const [layout, setLayout] = useState<LayoutMode>("tabbed")
  const [activeTab, setActiveTab] = useState<TabValue>("Summary")

  return (
    <div className="flex min-h-screen flex-col bg-background pb-24">
      <TopBar
        layout={layout}
        onToggleLayout={() =>
          setLayout((prev) => (prev === "tabbed" ? "kanban" : "tabbed"))
        }
      />
      <div className="flex flex-col gap-4">
        <TabPills activeTab={activeTab} onTabChange={setActiveTab} />
        {layout === "tabbed" ? <TabbedView /> : <KanbanView />}
      </div>
      {/* Bottom-right corner reserved for chat icon (View 3) */}
    </div>
  )
}
