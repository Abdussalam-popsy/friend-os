"use client"

import { useState, useCallback, useMemo } from "react"
import { notifications } from "@/data/mockData"
import type { Notification } from "@/data/mockData"
import { getTypeConfig } from "@/data/notification-type-config"
import { NotificationIcon } from "@/components/notifications/notification-icon"
import { CurrentlyRunning } from "@/components/dashboard/currently-running"
import { cn } from "@/lib/utils"

// ─── Helpers ────────────────────────────────────────────────────────────────────

/** Parse relative timestamp like "3 hours ago" into a minutes-ago number */
function parseRelativeTimestamp(ts: string): number {
  const match = ts.match(/(\d+)\s*(hour|minute|min|second|day)/i)
  if (!match) return 0
  const value = parseInt(match[1], 10)
  const unit = match[2].toLowerCase()
  if (unit.startsWith("day")) return value * 60 * 24
  if (unit.startsWith("hour")) return value * 60
  if (unit.startsWith("min")) return value
  return 0 // seconds → ~0 minutes
}

/** Convert relative timestamp to a display label ("Today · 2:41 PM" style) */
function timestampToLabel(ts: string): string {
  const minutesAgo = parseRelativeTimestamp(ts)
  if (minutesAgo < 60) return "Just now"
  const hoursAgo = Math.floor(minutesAgo / 60)
  if (hoursAgo < 24) {
    // Approximate the clock time from "X hours ago"
    const now = new Date()
    const then = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000)
    const timeStr = then.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    return `Today · ${timeStr}`
  }
  const daysAgo = Math.floor(hoursAgo / 24)
  if (daysAgo === 1) return "Yesterday"
  return `${daysAgo} days ago`
}

interface TimeCluster {
  label: string
  items: Notification[]
}

/** Group notifications into time clusters (items within 90 min → same cluster) */
function clusterByTime(items: Notification[]): TimeCluster[] {
  // Sort by minutes ago (ascending = most recent first has smallest number)
  const sorted = [...items].sort(
    (a, b) => parseRelativeTimestamp(a.timestamp) - parseRelativeTimestamp(b.timestamp)
  )

  const clusters: TimeCluster[] = []
  let currentCluster: Notification[] = []
  let currentMinutesAgo = -Infinity

  for (const item of sorted) {
    const minutesAgo = parseRelativeTimestamp(item.timestamp)
    if (
      currentCluster.length === 0 ||
      Math.abs(minutesAgo - currentMinutesAgo) <= 90
    ) {
      currentCluster.push(item)
      currentMinutesAgo = minutesAgo
    } else {
      clusters.push({
        label: timestampToLabel(currentCluster[0].timestamp),
        items: currentCluster,
      })
      currentCluster = [item]
      currentMinutesAgo = minutesAgo
    }
  }
  if (currentCluster.length > 0) {
    clusters.push({
      label: timestampToLabel(currentCluster[0].timestamp),
      items: currentCluster,
    })
  }

  return clusters
}

// ─── Stack card height constants ────────────────────────────────────────────────
const CARD_H = 72
const GAP = 8

// ─── Feed Card ──────────────────────────────────────────────────────────────────

function FeedCard({ notification }: { notification: Notification }) {
  const config = getTypeConfig(notification.type)

  return (
    <div className="flex w-full items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)]">
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          config.iconBg
        )}
      >
        <NotificationIcon name={notification.iconName} className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold leading-tight text-foreground truncate">
          {notification.title}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
          {notification.summary}
        </p>
      </div>

      {/* Tag + time */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-wider",
            config.tagColor
          )}
        >
          {config.label}
        </span>
        <span className="text-[10px] text-muted-foreground/70">
          {notification.timestamp}
        </span>
      </div>
    </div>
  )
}

// ─── Stacked Cluster ────────────────────────────────────────────────────────────

function StackedCluster({ items }: { items: Notification[] }) {
  const [expanded, setExpanded] = useState(false)
  const total = items.length

  const toggle = useCallback(() => setExpanded((p) => !p), [])

  const expandedListH = total * CARD_H + (total - 1) * GAP
  const collapsedH = CARD_H + (Math.min(total, 3) - 1) * 8

  return (
    <div
      className="relative transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        height: expanded ? expandedListH : collapsedH,
      }}
    >
      {items.map((n, i) => {
        const visibleInStack = i < 3
        const stackIndex = i

        const collapsedScale = 1 - stackIndex * 0.03
        const collapsedY = stackIndex * 8
        const collapsedOpacity = visibleInStack ? 1 - stackIndex * 0.12 : 0

        const expandedY = i * (CARD_H + GAP)
        const config = getTypeConfig(n.type)

        return (
          <div
            key={n.id}
            className="absolute top-0 left-0 right-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              height: CARD_H,
              zIndex: expanded ? total - i : visibleInStack ? 3 - stackIndex : 0,
              transform: expanded
                ? `translateY(${expandedY}px) scale(1)`
                : `translateY(${collapsedY}px) scale(${collapsedScale})`,
              opacity: expanded ? 1 : collapsedOpacity,
              transitionDelay: expanded
                ? `${i * 30}ms`
                : `${(total - 1 - i) * 20}ms`,
            }}
          >
            <button
              type="button"
              onClick={toggle}
              className={cn(
                "flex h-full w-full items-center gap-3 rounded-2xl border border-border/50 bg-card px-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-shadow duration-200",
                expanded && "hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)]",
                !expanded && i === 0 && "hover:shadow-[0_2px_6px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)]"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity duration-300",
                  config.iconBg,
                  !expanded && i > 0 ? "opacity-0" : "opacity-100"
                )}
              >
                <NotificationIcon name={n.iconName} className="h-5 w-5" />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "min-w-0 flex-1 transition-opacity duration-300",
                  !expanded && i > 0 ? "opacity-0" : "opacity-100"
                )}
              >
                <p className="text-[13px] font-semibold leading-tight text-foreground truncate text-left">
                  {n.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground truncate text-left">
                  {n.summary}
                </p>
              </div>

              {/* Tag + time */}
              <div
                className={cn(
                  "flex shrink-0 flex-col items-end gap-1 transition-opacity duration-300",
                  !expanded && i > 0 ? "opacity-0" : "opacity-100"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-wider",
                    config.tagColor
                  )}
                >
                  {config.label}
                </span>
                <span className="text-[10px] text-muted-foreground/70">
                  {n.timestamp}
                </span>
              </div>
            </button>
          </div>
        )
      })}

      {/* Stack count badge */}
      {!expanded && total > 1 && (
        <span className="absolute -left-2 -top-2 z-[10] flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shadow ring-2 ring-white">
          {total}
        </span>
      )}
    </div>
  )
}

// ─── Feed View ──────────────────────────────────────────────────────────────────

export function FeedView() {
  const clusters = useMemo(() => clusterByTime(notifications), [])

  return (
    <div className="flex flex-col gap-6 px-8 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Here&apos;s what&apos;s new in your style feed.
      </p>

      {/* Time-grouped clusters */}
      <div className="flex flex-col gap-6">
        {clusters.map((cluster, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            {/* Time header */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider whitespace-nowrap">
                {cluster.label}
              </span>
              <div className="h-px flex-1 bg-border/40" />
            </div>

            {/* Cards — single item renders flat, multiple items render as stack */}
            {cluster.items.length === 1 ? (
              <FeedCard notification={cluster.items[0]} />
            ) : (
              <StackedCluster items={cluster.items} />
            )}
          </div>
        ))}
      </div>

      <CurrentlyRunning />
    </div>
  )
}
