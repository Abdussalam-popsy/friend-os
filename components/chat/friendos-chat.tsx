"use client"

import { useState } from "react"
import { ChatBubbleIcon } from "./chat-bubble-icon"
import { ChatPanel } from "./chat-panel"

export function FriendOSChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
  }

  return (
    <>
      {!isOpen && <ChatBubbleIcon onClick={handleOpen} hasUnread={hasUnread} />}
      <ChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
