"use client"

import { notifications, categorySummary } from "@/data/mockData"
import { DetailedResultCard } from "./detailed-result-card"
import { NotificationIcon } from "./notification-icon"
import { ArrowRight, X } from "lucide-react"

interface FullScreenBriefingProps {
  isOpen: boolean
  onClose: () => void
  onDashboard: () => void
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function getFormattedDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const tileColorMap: Record<string, string> = {
  research: "bg-blue-50 border-blue-100",
  shopping: "bg-amber-50 border-amber-100",
  task: "bg-teal-50 border-teal-100",
  health: "bg-emerald-50 border-emerald-100",
}

export function FullScreenBriefing({
  isOpen,
  onClose,
  onDashboard,
}: FullScreenBriefingProps) {
  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto transition-all duration-500 ease-out ${isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
      style={{
        background:
          "linear-gradient(180deg, #EFF6FF 0%, #DBEAFE 40%, #E0F2FE 100%)",
      }}
      role="dialog"
      aria-label="Daily briefing"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        type="button"
        className="fixed right-6 top-6 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-md transition-all hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Close briefing"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mx-auto w-full max-w-6xl px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-foreground text-balance">
            {getGreeting()}, Abdussalam
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {getFormattedDate()}
          </p>
          <p className="mt-3 text-base text-muted-foreground">
            {"\u2019s what I found while you were away"}
          </p>
        </header>

        {/* Content Grid */}
        <div className="flex gap-8">
          {/* Left -- Detailed Cards */}
          <div
            className="flex flex-1 flex-col gap-4"
            style={{ flex: "0 0 60%" }}
          >
            {notifications.map((n, i) => (
              <div
                key={n.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${i * 80}ms`,
                  animationFillMode: "both",
                  animationDuration: "400ms",
                }}
              >
                <DetailedResultCard notification={n} />
              </div>
            ))}
          </div>

          {/* Right -- Summary Sidebar */}
          <aside
            className="sticky top-12 self-start"
            style={{ flex: "0 0 36%" }}
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Summary
            </h2>
            <div className="flex flex-col gap-3">
              {categorySummary.map((cat, i) => (
                <div
                  key={cat.type}
                  className={`flex items-center gap-3 rounded-2xl border p-4 transition-shadow hover:shadow-sm ${tileColorMap[cat.type] ?? "bg-card border-border"}`}
                  style={{
                    animationDelay: `${i * 60 + 200}ms`,
                    animationFillMode: "both",
                    animationDuration: "300ms",
                  }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm">
                    <NotificationIcon
                      name={cat.iconName}
                      className="h-5 w-5 text-foreground/70"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold text-foreground">
                        {cat.count}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cat.headline}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onDashboard}
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </aside>
        </div>
      </div>
    </div>
  )
}
