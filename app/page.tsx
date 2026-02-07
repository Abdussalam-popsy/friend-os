"use client"

import { useState, useCallback, useEffect } from "react"
import { DesktopBackground } from "@/components/notifications/desktop-background"
import { CollapsedPill } from "@/components/notifications/collapsed-pill"
import { SidePanel } from "@/components/notifications/side-panel"
import { FullScreenBriefing } from "@/components/notifications/full-screen-briefing"
import { Dashboard } from "@/components/dashboard/dashboard"
import { ChatBubbleIcon } from "@/components/chat/chat-bubble-icon"
import { ChatPanel } from "@/components/chat/chat-panel"

type ViewState = "desktop" | "panel" | "briefing" | "dashboard"

export default function Page() {
  const [view, setView] = useState<ViewState>("desktop")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatUnread, setChatUnread] = useState(true)

  // View transitions
  const openPanel = useCallback(() => setView("panel"), [])
  const openBriefing = useCallback(() => setView("briefing"), [])
  const openDashboard = useCallback(() => setView("dashboard"), [])
  const backToDesktop = useCallback(() => setView("desktop"), [])

  // Chat toggle — independent of view state
  const toggleChat = useCallback(() => {
    setChatOpen((prev) => {
      if (!prev) setChatUnread(false)
      return !prev
    })
  }, [])

  // Keyboard shortcut: Escape closes panel/briefing back to desktop
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (chatOpen) {
          setChatOpen(false)
        } else if (view === "panel" || view === "briefing") {
          setView("desktop")
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [view, chatOpen])

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Layer 0: Desktop background — always rendered, dimmed when panel open */}
      <DesktopBackground dimmed={view === "panel"} />

      {/* Layer 1: Desktop clock + notification pill */}
      <div
        className={`absolute inset-0 z-10 transition-opacity duration-300 ${
          view === "desktop" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute bottom-8 left-8 select-none">
          <DesktopClock />
        </div>
      </div>

      {/* Notification pill — visible on desktop */}
      {view === "desktop" && <CollapsedPill onClick={openPanel} />}

      {/* Layer 2: Side panel — slides in from right */}
      <SidePanel
        isOpen={view === "panel"}
        onClose={backToDesktop}
        onViewFullSummary={openBriefing}
      />

      {/* Layer 3: Full-screen briefing */}
      <FullScreenBriefing
        isOpen={view === "briefing"}
        onClose={backToDesktop}
        onDashboard={openDashboard}
      />

      {/* Layer 4: Dashboard */}
      <div
        className={`absolute inset-0 z-30 overflow-y-auto transition-all duration-500 ease-out ${
          view === "dashboard"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Dashboard onBack={backToDesktop} />
      </div>

      {/* Layer 5: Chat — independent overlay, always available */}
      {!chatOpen && (
        <ChatBubbleIcon onClick={toggleChat} hasUnread={chatUnread} />
      )}
      <ChatPanel isOpen={chatOpen} onClose={toggleChat} />
    </main>
  )
}

function DesktopClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours % 12 || 12

  return (
    <div className="text-foreground/70">
      <p className="text-5xl font-light tabular-nums tracking-tight">
        {displayHours}:{minutes} <span className="text-2xl">{period}</span>
      </p>
      <p className="mt-1 text-sm font-medium text-foreground/50">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  )
}
