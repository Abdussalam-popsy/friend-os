"use client"

import React from "react"

import { Progress } from "@/components/ui/progress"
import { ResearchCard } from "@/components/dashboard/cards/research-card"
import { ShoppingCard } from "@/components/dashboard/cards/shopping-card"
import { TaskCard } from "@/components/dashboard/cards/task-card"
import { FinanceCard } from "@/components/dashboard/cards/finance-card"
import { HealthCard } from "@/components/dashboard/cards/health-card"
import { SponsoredCard } from "@/components/dashboard/cards/sponsored-card"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  title: string
  count: number
  children: React.ReactNode
}

function KanbanColumn({ title, count, children }: KanbanColumnProps) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-[11px] font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-secondary/40 p-3 min-h-[200px]">
        {children}
      </div>
    </div>
  )
}

export function KanbanView() {
  const todoCount = 2
  const inProgressCount = 2
  const doneCount = 2
  const total = todoCount + inProgressCount + doneCount
  const donePercent = Math.round((doneCount / total) * 100)

  return (
    <div className="flex flex-col gap-5 px-8 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        {"Here\u2019s what I found while you were away"}
      </p>
      {/* Overall progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Overall progress</span>
          <span className="text-xs font-semibold text-foreground">{donePercent}%</span>
        </div>
        <Progress value={donePercent} className={cn("h-2 rounded-full")} />
      </div>
      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-4">
        <KanbanColumn title="To Do" count={todoCount}>
          <ResearchCard compact />
          <ShoppingCard compact />
        </KanbanColumn>
        <KanbanColumn title="In Progress" count={inProgressCount}>
          <FinanceCard compact />
          <HealthCard compact />
        </KanbanColumn>
        <KanbanColumn title="Done" count={doneCount}>
          <TaskCard compact />
          <SponsoredCard compact />
        </KanbanColumn>
      </div>
    </div>
  )
}
