"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CardActions } from "@/components/dashboard/card-actions"
import { StylingPreview } from "@/components/dashboard/cards/styling-preview"
import { cn } from "@/lib/utils"

interface OutfitCardProps {
  compact?: boolean
}

const OUTFIT_ITEMS = [
  { name: "Relaxed Wool Blazer", brand: "COS", price: "£89", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=300&fit=crop&q=80" },
  { name: "Heavyweight Cotton Tee", brand: "Arket", price: "£28", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop&q=80" },
  { name: "Wide-Leg Chinos", brand: "Uniqlo U", price: "£49", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=300&fit=crop&q=80" },
  { name: "New Balance 990v6", brand: "New Balance", price: "£185", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop&q=80" },
]

export function OutfitCard({ compact = false }: OutfitCardProps) {
  const [showStyling, setShowStyling] = useState(false)

  return (
    <>
      <Card className={cn("overflow-hidden border-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]", compact && "shadow-none")}>
        {/* 2×2 image grid with occasion badge */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-0.5 bg-neutral-200">
            {OUTFIT_ITEMS.map((item) => (
              <div key={item.name} className="aspect-square overflow-hidden bg-neutral-100">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          {/* Occasion badge — overlaid bottom-right */}
          {!compact && (
            <span className="absolute bottom-2.5 right-2.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-neutral-700 shadow-sm border border-white/40">
              Smart Casual
            </span>
          )}
        </div>

        <CardContent className={cn("flex flex-col gap-3", compact ? "p-3 gap-2" : "p-4")}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className={cn("font-medium text-neutral-900 leading-snug", compact ? "text-sm" : "text-sm")}>
                Smart Casual Friday Look
              </h3>
              {compact && (
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                  Smart Casual
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">4 items</span>
              <span className="text-sm font-bold text-neutral-900">£247</span>
            </div>
          </div>

          {/* Style Outfit button */}
          <button
            type="button"
            onClick={() => setShowStyling(true)}
            className="flex items-center gap-1.5 self-start rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm"
          >
            <Sparkles className="h-3 w-3" />
            Style Outfit
          </button>

          <CardActions
            compact={compact}
            actions={[
              { label: "Buy All" },
              { label: "Edit Outfit", variant: "outline" },
              { label: "Save", variant: "outline" },
            ]}
          />
        </CardContent>
      </Card>

      <StylingPreview
        isOpen={showStyling}
        onClose={() => setShowStyling(false)}
        productName="Smart Casual Friday Look"
        brand="COS, Arket, Uniqlo U, New Balance"
      />
    </>
  )
}
