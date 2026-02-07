"use client"

import { MessageList } from "./message-list"
import { QuickActions } from "./quick-actions"
import { ChatInput } from "./chat-input"
import { Minus } from "lucide-react"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-sm shadow-2xl transition-all duration-300 ease-out ${
        isOpen
          ? "h-[70vh] w-[40vw] min-w-[380px] max-w-[560px] opacity-100 scale-100 origin-bottom-right"
          : "h-0 w-0 opacity-0 scale-0 origin-bottom-right pointer-events-none"
      }`}
      role="dialog"
      aria-label="FriendOS chat"
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            F
          </div>
          <div>
            <h2 className="text-sm font-semibold text-card-foreground">
              FriendOS
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Minimize chat"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Quick Actions */}
      <QuickActions />

      {/* Input */}
      <ChatInput />
    </div>
  )
}
