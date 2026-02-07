"use client"

import { useEffect, useRef } from "react"
import { ProductCard } from "./product-card"
import { TypingIndicator } from "./typing-indicator"
import { chatProducts } from "@/data/mockData"

export function MessageList() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      role="log"
      aria-label="Chat messages"
    >
      {/* AI greeting */}
      <div className="flex gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          F
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2.5">
          <p className="text-sm leading-relaxed text-secondary-foreground">
            Good morning! I&apos;ve been busy overnight. Want to see what I
            found?
          </p>
        </div>
      </div>

      {/* User message */}
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5">
          <p className="text-sm leading-relaxed text-primary-foreground">
            Find me a suit for a birthday party under £200
          </p>
        </div>
      </div>

      {/* AI searching */}
      <div className="flex gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          F
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2.5">
          <p className="text-sm leading-relaxed text-secondary-foreground">
            On it! Searching across 4 retailers...
          </p>
          <div className="mt-1.5">
            <TypingIndicator />
          </div>
        </div>
      </div>

      {/* AI with product results */}
      <div className="flex gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          F
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2.5">
          <p className="mb-3 text-sm leading-relaxed text-secondary-foreground">
            Found 3 options for you:
          </p>
          <div className="flex flex-col gap-2">
            {chatProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* User reply */}
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5">
          <p className="text-sm leading-relaxed text-primary-foreground">
            I like the second one. Can you find matching shoes?
          </p>
        </div>
      </div>

      {/* AI final reply */}
      <div className="flex gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          F
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-secondary px-4 py-2.5">
          <p className="text-sm leading-relaxed text-secondary-foreground">
            Great taste! Searching for shoes to match... I&apos;ll notify you
            when I find something.
          </p>
        </div>
      </div>
    </div>
  )
}
