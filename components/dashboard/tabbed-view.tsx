"use client"

import { ResearchCard } from "@/components/dashboard/cards/research-card"
import { ShoppingCard } from "@/components/dashboard/cards/shopping-card"
import { TaskCard } from "@/components/dashboard/cards/task-card"
import { FinanceCard } from "@/components/dashboard/cards/finance-card"
import { HealthCard } from "@/components/dashboard/cards/health-card"
import { SponsoredCard } from "@/components/dashboard/cards/sponsored-card"
import { CurrentlyRunning } from "@/components/dashboard/currently-running"

export function TabbedView() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <p className="px-8 text-sm text-muted-foreground">
        {"Here\u2019s what I found while you were away"}
      </p>
      <div className="grid grid-cols-3 gap-4 px-8">
        <ResearchCard />
        <ShoppingCard />
        <TaskCard />
        <FinanceCard />
        <HealthCard />
        <SponsoredCard />
      </div>
      <CurrentlyRunning />
    </div>
  )
}
