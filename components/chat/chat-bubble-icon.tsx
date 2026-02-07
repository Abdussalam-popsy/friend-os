"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"

interface ChatBubbleIconProps {
  onClick: () => void
  hasUnread: boolean
}

export function ChatBubbleIcon({ onClick, hasUnread }: ChatBubbleIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isHovered && (
        <div className="absolute bottom-14 right-0 rounded-lg bg-foreground px-3 py-1.5 text-xs text-primary-foreground shadow-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-1 duration-200">
          Ask FriendOS
          <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-foreground" />
        </div>
      )}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Open FriendOS chat"
      >
        <MessageSquare className="h-5 w-5 text-primary-foreground" />
        {hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-primary animate-pulse" />
        )}
      </button>
    </div>
  )
}
