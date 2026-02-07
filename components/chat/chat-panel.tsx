"use client"

import { useState, useCallback, useMemo } from "react"
import { MessageList, type ChatMessage } from "./message-list"
import { QuickActions } from "./quick-actions"
import { StylistQuickActions } from "./stylist-quick-actions"
import { ProfileUpdatePrompt } from "./profile-update-prompt"
import { ChatInput } from "./chat-input"
import { useProfile } from "@/lib/profile-context"
import { Minus, Sparkles, MessageCircle } from "lucide-react"

type ChatMode = "chat" | "stylist"

interface Position {
  x: number
  y: number
}

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  bubblePosition: Position
}

let messageIdCounter = 0
function nextId() {
  return `msg-${++messageIdCounter}`
}

function getInitialGreeting(name?: string, topBrand?: string): string {
  const hour = new Date().getHours()
  const displayName = name || "there"

  if (hour < 12) {
    return topBrand
      ? `Morning, ${displayName}! Found some great ${topBrand} deals overnight and put together a few outfit ideas. Want to see what's new?`
      : `Morning, ${displayName}! I found some great deals overnight and put together a few outfit ideas. Want to see what's new?`
  }
  if (hour < 17) {
    return topBrand
      ? `Hey ${displayName}, that ${topBrand} item you've been watching just dropped in price. Want me to show you?`
      : `Hey ${displayName}! I've been tracking some items for you. Want to see what's trending today?`
  }
  return topBrand
    ? `Evening, ${displayName}. Put together a few looks featuring ${topBrand} for the weekend. Want to take a look?`
    : `Evening, ${displayName}. Put together a few looks for the weekend. Want to take a look?`
}

// Simple heuristic: detect when the AI mentions a new style/brand the user might want to save
function detectProfileSuggestion(
  text: string,
  existingTags: string[]
): { suggestion: string; value: string; field: "styleTags" | "brands" } | null {
  const styleKeywords = [
    "techwear",
    "gorpcore",
    "quiet luxury",
    "old money",
    "dark academia",
    "coastal grandmother",
    "cottagecore",
    "Y2K",
    "grunge",
    "bohemian",
    "preppy",
    "punk",
    "normcore",
  ]

  const lower = text.toLowerCase()
  for (const kw of styleKeywords) {
    if (
      lower.includes(kw) &&
      lower.includes("you") &&
      !existingTags.map((t) => t.toLowerCase()).includes(kw)
    ) {
      return {
        suggestion: `Your stylist noticed you're interested in ${kw}`,
        value: kw.charAt(0).toUpperCase() + kw.slice(1),
        field: "styleTags",
      }
    }
  }
  return null
}

export function ChatPanel({ isOpen, onClose, bubblePosition }: ChatPanelProps) {
  const { profile } = useProfile()

  const initialMessages = useMemo<ChatMessage[]>(() => [{
    id: "msg-0",
    role: "assistant",
    content: getInitialGreeting(
      profile?.name,
      profile?.favouriteBrands?.[0]?.name
    ),
  }], []) // eslint-disable-line react-hooks/exhaustive-deps

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<ChatMode>("chat")
  const [profilePrompt, setProfilePrompt] = useState<{
    suggestion: string
    value: string
    field: "styleTags" | "brands"
  } | null>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: nextId(),
        role: "user",
        content: text,
      }
      const updatedMessages = [...messages, userMsg]
      setMessages(updatedMessages)
      setIsLoading(true)
      setProfilePrompt(null)

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            profile: profile
              ? {
                  name: profile.name,
                  brands: profile.favouriteBrands.map((b) => b.name),
                  priceRange: profile.priceRange,
                  styleTags: profile.styleTags,
                  sizes: profile.sizes,
                }
              : undefined,
            mode,
          }),
        })

        const data = await res.json()

        const reply = data.reply ?? "Hmm, I didn't get that. Try again?"
        const assistantMsg: ChatMessage = {
          id: nextId(),
          role: "assistant",
          content: reply,
        }
        setMessages((prev) => [...prev, assistantMsg])

        // In stylist mode, check if the reply suggests a new style
        if (mode === "stylist") {
          const detected = detectProfileSuggestion(
            reply,
            profile?.styleTags ?? []
          )
          if (detected) {
            setProfilePrompt(detected)
          }
        }
      } catch {
        const errorMsg: ChatMessage = {
          id: nextId(),
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting. Try again in a moment.",
        }
        setMessages((prev) => [...prev, errorMsg])
      } finally {
        setIsLoading(false)
      }
    },
    [messages, profile, mode]
  )

  // Panel anchors near the bubble — smart quadrant positioning
  const isRight =
    typeof window !== "undefined"
      ? bubblePosition.x + 24 > window.innerWidth / 2
      : true
  const isBottom =
    typeof window !== "undefined"
      ? bubblePosition.y + 24 > window.innerHeight / 2
      : true

  const panelStyle: React.CSSProperties = {
    width: isOpen ? 440 : 0,
    maxWidth: isOpen ? "calc(100vw - 32px)" : 0,
    height: isOpen ? "70vh" : 0,
    maxHeight: isOpen ? "calc(100vh - 32px)" : 0,
    ...(isRight ? { right: 16 } : { left: Math.max(16, bubblePosition.x) }),
    ...(isBottom
      ? { bottom: 16 }
      : { top: Math.max(16, bubblePosition.y + 56) }),
  }

  const originClass = [
    isBottom ? "origin-bottom" : "origin-top",
    isRight ? "origin-right" : "origin-left",
  ].join(" ")

  return (
    <div
      className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-sm shadow-2xl transition-all duration-300 ease-out ${
        isOpen
          ? `opacity-100 scale-100 ${originClass}`
          : `opacity-0 scale-0 ${originClass} pointer-events-none`
      }`}
      style={panelStyle}
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
            {/* Mode toggle pills */}
            <div className="flex items-center gap-1 mt-0.5">
              <button
                onClick={() => setMode("chat")}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                  mode === "chat"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <MessageCircle className="h-2.5 w-2.5" />
                Chat
              </button>
              <button
                onClick={() => setMode("stylist")}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium transition-all ${
                  mode === "stylist"
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                <Sparkles className="h-2.5 w-2.5" />
                Stylist
              </button>
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
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Profile update prompt (stylist mode) */}
      {profilePrompt && (
        <ProfileUpdatePrompt
          suggestion={profilePrompt.suggestion}
          value={profilePrompt.value}
          field={profilePrompt.field}
          onDismiss={() => setProfilePrompt(null)}
        />
      )}

      {/* Quick Actions — mode-dependent */}
      {mode === "stylist" ? (
        <StylistQuickActions onAction={sendMessage} />
      ) : (
        <QuickActions onAction={sendMessage} />
      )}

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  )
}
