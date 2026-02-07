"use client"

import { ResearchCard } from "@/components/dashboard/cards/research-card"
import { ShoppingCard } from "@/components/dashboard/cards/shopping-card"
import { TaskCard } from "@/components/dashboard/cards/task-card"
import { FinanceCard } from "@/components/dashboard/cards/finance-card"
import { HealthCard } from "@/components/dashboard/cards/health-card"
import { SponsoredCard } from "@/components/dashboard/cards/sponsored-card"
import { CurrentlyRunning } from "@/components/dashboard/currently-running"

const cards = [
  <ResearchCard key="research" />,
  <ShoppingCard key="shopping" />,
  <TaskCard key="task" />,
  <FinanceCard key="finance" />,
  <HealthCard key="health" />,
  <SponsoredCard key="sponsored" />,
]

export function TabbedView() {
  return (
    <div className="flex flex-col gap-6">
      <p className="px-8 text-sm text-muted-foreground">
        {"\u2019s what I found while you were away"}
      </p>
      <div className="grid grid-cols-3 gap-5 px-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${i * 60}ms`,
              animationFillMode: "both",
              animationDuration: "400ms",
            }}
          >
            {card}
          </div>
        ))}
      </div>
      <CurrentlyRunning />
    </div>
  )
}
