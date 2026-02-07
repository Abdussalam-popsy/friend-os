"use client"

import type { Notification, NotificationType } from "@/data/mockData"
import { NotificationIcon } from "./notification-icon"
import { ExternalLink, ShoppingCart } from "lucide-react"

const badgeColorMap: Record<NotificationType, string> = {
  research: "bg-blue-100/80 text-blue-700",
  shopping: "bg-amber-100/80 text-amber-700",
  calendar: "bg-rose-100/80 text-rose-700",
  health: "bg-emerald-100/80 text-emerald-700",
  task: "bg-teal-100/80 text-teal-700",
}

const badgeLabelMap: Record<NotificationType, string> = {
  research: "Research",
  shopping: "Deal",
  calendar: "Calendar",
  health: "Wellness",
  task: "Completed",
}

export function DetailedResultCard({
  notification,
}: {
  notification: Notification
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Type Badge */}
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${badgeColorMap[notification.type]}`}
        >
          <NotificationIcon
            name={notification.iconName}
            className="h-3.5 w-3.5"
          />
          {badgeLabelMap[notification.type]}
        </span>
        {notification.details?.relevanceScore && (
          <span className="inline-flex items-center rounded-full bg-emerald-100/80 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            {notification.details.relevanceScore}% match
          </span>
        )}
      </div>

      {/* Title & Summary */}
      <h3 className="text-lg font-bold tracking-tight text-foreground">{notification.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        {notification.summary}
      </p>

      {/* Research details */}
      {notification.type === "research" && notification.details?.journal && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">
            {notification.details.journal}
          </p>
          {notification.details.keyFindings && (
            <ul className="mt-2 flex flex-col gap-1">
              {notification.details.keyFindings.map((finding) => (
                <li
                  key={finding}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {finding}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Read Paper
          </button>
        </div>
      )}

      {/* Shopping details */}
      {notification.type === "shopping" && notification.details && (
        <div className="mt-4">
          <div className="flex items-center gap-3 rounded-2xl bg-muted p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-card shadow-sm">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {notification.details.productName}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  {notification.details.salePrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {notification.details.originalPrice}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Buy Now
          </button>
        </div>
      )}

      {/* Health details */}
      {notification.type === "health" && notification.details && (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            {notification.details.metric}
          </p>
          <p className="mt-1 text-sm text-emerald-700 leading-relaxed">
            {notification.details.recommendation}
          </p>
        </div>
      )}

      {/* Task details */}
      {notification.type === "task" && notification.details?.taskList && (
        <ul className="mt-4 flex flex-col gap-1.5">
          {notification.details.taskList.map((task) => (
            <li
              key={task}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <NotificationIcon
                name="check-circle"
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
              />
              {task}
            </li>
          ))}
        </ul>
      )}

      {/* Calendar details */}
      {notification.type === "calendar" && (
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open Calendar
        </button>
      )}
    </div>
  )
}
