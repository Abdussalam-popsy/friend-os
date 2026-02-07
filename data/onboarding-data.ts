import type { BrandEntry } from "@/lib/profile-types"

// ── Style archetypes with mood board images ──────────────────────────────────

export interface StyleArchetype {
  id: string
  label: string
  imageUrl: string
}

export const STYLE_ARCHETYPES: StyleArchetype[] = [
  {
    id: "streetwear",
    label: "Streetwear",
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=400&fit=crop",
  },
  {
    id: "minimalist",
    label: "Minimalist",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  },
  {
    id: "smart-casual",
    label: "Smart Casual",
    imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300&h=400&fit=crop",
  },
  {
    id: "scandi",
    label: "Scandi",
    imageUrl: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=300&h=400&fit=crop",
  },
  {
    id: "workwear",
    label: "Workwear",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
  },
  {
    id: "athleisure",
    label: "Athleisure",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop",
  },
  {
    id: "avant-garde",
    label: "Avant-Garde",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop",
  },
  {
    id: "classic",
    label: "Classic",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=400&fit=crop",
  },
]

// ── Brand directory (~30 fashion brands with Logo.dev URLs) ──────────────────

const TOKEN = "pk_VAMPsVSMSC-VYyGOEOYXqw"
const logo = (domain: string) => `https://img.logo.dev/${domain}?token=${TOKEN}`

export const BRAND_DIRECTORY: BrandEntry[] = [
  { name: "Nike", logoUrl: logo("nike.com") },
  { name: "Adidas", logoUrl: logo("adidas.com") },
  { name: "New Balance", logoUrl: logo("newbalance.com") },
  { name: "Carhartt WIP", logoUrl: logo("carhartt-wip.com") },
  { name: "Stüssy", logoUrl: logo("stussy.com") },
  { name: "COS", logoUrl: logo("cos.com") },
  { name: "Arket", logoUrl: logo("arket.com") },
  { name: "ASOS", logoUrl: logo("asos.com") },
  { name: "Zara", logoUrl: logo("zara.com") },
  { name: "H&M", logoUrl: logo("hm.com") },
  { name: "Uniqlo", logoUrl: logo("uniqlo.com") },
  { name: "Acne Studios", logoUrl: logo("acnestudios.com") },
  { name: "A.P.C.", logoUrl: logo("apc.fr") },
  { name: "Norse Projects", logoUrl: logo("norseprojects.com") },
  { name: "Our Legacy", logoUrl: logo("ourlegacy.com") },
  { name: "Stone Island", logoUrl: logo("stoneisland.com") },
  { name: "The North Face", logoUrl: logo("thenorthface.com") },
  { name: "Patagonia", logoUrl: logo("patagonia.com") },
  { name: "Arc'teryx", logoUrl: logo("arcteryx.com") },
  { name: "Lululemon", logoUrl: logo("lululemon.com") },
  { name: "Ralph Lauren", logoUrl: logo("ralphlauren.com") },
  { name: "Tommy Hilfiger", logoUrl: logo("tommy.com") },
  { name: "Lacoste", logoUrl: logo("lacoste.com") },
  { name: "Fred Perry", logoUrl: logo("fredperry.com") },
  { name: "Puma", logoUrl: logo("puma.com") },
  { name: "Converse", logoUrl: logo("converse.com") },
  { name: "Vans", logoUrl: logo("vans.com") },
  { name: "Dr. Martens", logoUrl: logo("drmartens.com") },
  { name: "Dickies", logoUrl: logo("dickies.com") },
  { name: "Levi's", logoUrl: logo("levi.com") },
]

// ── Size options ─────────────────────────────────────────────────────────────

export const SIZE_OPTIONS = {
  Tops: ["UK XS", "UK S", "UK M", "UK L", "UK XL", "UK XXL"],
  Bottoms: ["UK 28", "UK 30", "UK 32", "UK 34", "UK 36", "UK 38"],
  Shoes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
}

// ── Colour palette options ───────────────────────────────────────────────────

export const COLOUR_OPTIONS = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f8f8f8" },
  { name: "Navy", hex: "#1e3a5f" },
  { name: "Grey", hex: "#808080" },
  { name: "Olive", hex: "#556b2f" },
  { name: "Cream", hex: "#f5f0e1" },
  { name: "Stone", hex: "#c2b280" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Forest", hex: "#228B22" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Camel", hex: "#C19A6B" },
  { name: "Charcoal", hex: "#36454F" },
]
