"use client"

import type { Notification, NotificationType } from "@/data/mockData"
import { NotificationIcon } from "./notification-icon"

const badgeStyles: Record<NotificationType, string> = {
  research: "bg-blue-100/80 text-blue-700",
  shopping: "bg-amber-100/80 text-amber-700",
  calendar: "bg-rose-100/80 text-rose-700",
  health: "bg-emerald-100/80 text-emerald-700",
  task: "bg-teal-100/80 text-teal-700",
}

const badgeLabel: Record<NotificationType, string> = {
  research: "Research",
  shopping: "Deal",
  calendar: "Calendar",
  health: "Wellness",
  task: "Completed",
}

export function NotificationCard({
  notification,
}: {
  notification: Notification
}) {
  return (
    <div className="group cursor-pointer rounded-2xl bg-card p-6 transition-all duration-200 hover:shadow-md">
      {/* Category Badge */}
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${badgeStyles[notification.type]}`}
      >
        <NotificationIcon name={notification.iconName} className="h-3.5 w-3.5" />
        {badgeLabel[notification.type]}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground leading-snug text-balance">
        {notification.title}
      </h3>

      {/* Summary */}
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        {notification.summary}
      </p>

      {/* Timestamp */}
      <p className="mt-3 text-sm text-muted-foreground">
        {notification.timestamp}
      </p>
    </div>
  )
}
