import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

interface StylingRequest {
  productName: string
  brand: string
  userProfile?: {
    name?: string
    styleTags?: string[]
    sizes?: Record<string, string>
  }
}

// Curated fallback images by product type (when Gemini is unavailable)
const FALLBACK_IMAGES: Record<string, string> = {
  default:
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop&q=80",
  sneaker:
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=800&fit=crop&q=80",
  outerwear:
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop&q=80",
  beanie:
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop&q=80",
  outfit:
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=800&fit=crop&q=80",
}

function detectProductType(productName: string, brand: string): string {
  const combined = `${productName} ${brand}`.toLowerCase()
  if (combined.includes("max") || combined.includes("990") || combined.includes("shoe") || combined.includes("sneaker")) return "sneaker"
  if (combined.includes("coat") || combined.includes("jacket") || combined.includes("blazer")) return "outerwear"
  if (combined.includes("beanie") || combined.includes("hat") || combined.includes("cap")) return "beanie"
  if (combined.includes("outfit") || combined.includes("look")) return "outfit"
  return "default"
}

export async function POST(request: Request) {
  try {
    const { productName, brand, userProfile } = (await request.json()) as StylingRequest

    // If no API key, return fallback
    if (!process.env.GEMINI_API_KEY) {
      const productType = detectProductType(productName, brand)
      return NextResponse.json({
        imageUrl: FALLBACK_IMAGES[productType] ?? FALLBACK_IMAGES.default,
        fallback: true,
        description: `A styled look featuring the ${productName} by ${brand}`,
      })
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    // Build styling prompt
    const styleTags = userProfile?.styleTags?.join(", ") ?? "modern, clean, minimal"
    const sizeContext = userProfile?.sizes
      ? Object.entries(userProfile.sizes)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ")
      : ""
    const nameRef = userProfile?.name ? ` for ${userProfile.name}` : ""

    const prompt = `Create a fashion editorial photograph featuring the ${productName} by ${brand}, styled in a ${styleTags} aesthetic.${
      sizeContext ? ` The person wearing it is size ${sizeContext}.` : ""
    } Studio lighting, neutral background, high fashion magazine look. Clean, minimal composition. Full outfit styled around the featured piece. Professional model photography.`

    try {
      // Try Gemini image generation with Imagen model
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-preview-image-generation",
      })

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          // @ts-expect-error - responseModalities is valid for image generation
          responseModalities: ["TEXT", "IMAGE"],
        },
      })

      const response = result.response
      const candidates = response.candidates

      if (candidates && candidates.length > 0) {
        const parts = candidates[0].content?.parts
        if (parts) {
          // Look for inline image data
          for (const part of parts) {
            if (part.inlineData?.mimeType?.startsWith("image/")) {
              return NextResponse.json({
                imageData: part.inlineData.data,
                mimeType: part.inlineData.mimeType,
                fallback: false,
                description: `Styled look${nameRef}: ${productName} by ${brand}`,
              })
            }
          }

          // If text only came back, extract description
          const textPart = parts.find((p) => p.text)
          if (textPart?.text) {
            const productType = detectProductType(productName, brand)
            return NextResponse.json({
              imageUrl: FALLBACK_IMAGES[productType] ?? FALLBACK_IMAGES.default,
              fallback: true,
              description: textPart.text.slice(0, 200),
            })
          }
        }
      }

      // Fallback if no image generated
      const productType = detectProductType(productName, brand)
      return NextResponse.json({
        imageUrl: FALLBACK_IMAGES[productType] ?? FALLBACK_IMAGES.default,
        fallback: true,
        description: `A styled look featuring the ${productName} by ${brand}`,
      })
    } catch (genError) {
      console.error("Gemini image generation error:", genError)
      // Return fallback on Gemini error
      const productType = detectProductType(productName, brand)
      return NextResponse.json({
        imageUrl: FALLBACK_IMAGES[productType] ?? FALLBACK_IMAGES.default,
        fallback: true,
        description: `A styled look featuring the ${productName} by ${brand}`,
      })
    }
  } catch (error) {
    console.error("Styling API error:", error)
    return NextResponse.json(
      { error: "Failed to generate styling" },
      { status: 500 }
    )
  }
}
