// ─── Shared Types ──────────────────────────────────────────────────────────────

export type CardType =
  | "shopping"
  | "research"
  | "briefing"
  | "health"
  | "task"
  | "finance"
  | "sponsored"

export type Priority = "red" | "yellow" | "green"

export interface CardAction {
  label: string
  variant?: "default" | "outline" | "ghost"
}

export interface CardData {
  id: string
  type: CardType
  title: string
  summary: string
  timestamp: string
  priority: Priority
  actions: CardAction[]
  details?: Record<string, unknown>
}

// ─── Notification-specific types (for the side panel / briefing) ───────────────

export type NotificationType =
  | "research"
  | "shopping"
  | "calendar"
  | "health"
  | "task"

export interface Notification {
  id: string
  type: NotificationType
  iconName: string
  title: string
  summary: string
  timestamp: string
  details?: {
    journal?: string
    relevanceScore?: number
    keyFindings?: string[]
    productName?: string
    originalPrice?: string
    salePrice?: string
    imageUrl?: string
    taskList?: string[]
    metric?: string
    recommendation?: string
  }
}

// ─── Notifications (used in pill → panel → briefing flow) ──────────────────────

export const notifications: Notification[] = [
  {
    id: "1",
    type: "research",
    iconName: "document-text",
    title: "3 New Research Papers Found",
    summary: "Papers on transformer architectures matching your interests",
    timestamp: "3 hours ago",
    details: {
      journal: "Nature Machine Intelligence",
      relevanceScore: 94,
      keyFindings: [
        "Novel attention mechanism reduces compute by 40%",
        "State-of-the-art results on NLP benchmarks",
        "Open-source implementation available",
      ],
    },
  },
  {
    id: "2",
    type: "shopping",
    iconName: "tag",
    title: "Price Drop on Sony WH-1000XM5",
    summary: "Headphones dropped to $248 from $399 on Amazon",
    timestamp: "5 hours ago",
    details: {
      productName: "Sony WH-1000XM5 Wireless Headphones",
      originalPrice: "$399",
      salePrice: "$248",
    },
  },
  {
    id: "3",
    type: "calendar",
    iconName: "calendar-days",
    title: "2 Meetings Rescheduled",
    summary: "Your 10 AM standup moved to 11 AM, design review to Thursday",
    timestamp: "6 hours ago",
  },
  {
    id: "4",
    type: "health",
    iconName: "heart",
    title: "Weekly Health Insight Ready",
    summary: "Sleep quality improved 12% over the past week",
    timestamp: "8 hours ago",
    details: {
      metric: "Sleep quality score: 87/100",
      recommendation:
        "Your consistent 11 PM bedtime is paying off. Consider adding 10 min morning stretches.",
    },
  },
  {
    id: "5",
    type: "task",
    iconName: "check-circle",
    title: "2 Background Tasks Completed",
    summary: "Photo backup and email digest are done",
    timestamp: "9 hours ago",
    details: {
      taskList: [
        "Photo backup to cloud \u2014 342 new photos synced",
        "Weekly email digest compiled \u2014 23 important emails summarized",
      ],
    },
  },
  {
    id: "6",
    type: "research",
    iconName: "document-text",
    title: "New Blog Post in Your Feed",
    summary:
      '"Building AI Agents with Tool Use" by Anthropic engineering',
    timestamp: "10 hours ago",
    details: {
      journal: "Anthropic Engineering Blog",
      relevanceScore: 88,
      keyFindings: [
        "Practical patterns for tool-calling agents",
        "Error recovery and retry strategies",
        "Production deployment considerations",
      ],
    },
  },
]

export const categorySummary = [
  {
    type: "research" as NotificationType,
    iconName: "document-text",
    count: 3,
    label: "Research",
    headline: "3 papers & articles found",
  },
  {
    type: "shopping" as NotificationType,
    iconName: "tag",
    count: 1,
    label: "Shopping",
    headline: "1 price drop alert",
  },
  {
    type: "task" as NotificationType,
    iconName: "check-circle",
    count: 2,
    label: "Tasks",
    headline: "2 tasks completed",
  },
  {
    type: "health" as NotificationType,
    iconName: "heart",
    count: 1,
    label: "Health",
    headline: "1 new insight",
  },
]

// ─── Dashboard card data ───────────────────────────────────────────────────────

export const dashboardCards: CardData[] = [
  {
    id: "dash-research",
    type: "research",
    title: "Novel biomarkers for early-stage cancer detection",
    summary: "Nature Medicine · Zhang et al.",
    timestamp: "2 hours ago",
    priority: "green",
    actions: [
      { label: "Read Paper" },
      { label: "Save", variant: "outline" },
      { label: "Dismiss", variant: "ghost" },
    ],
    details: {
      relevanceScore: 94,
      tags: ["Liquid Biopsy", "ctDNA Markers", "Early Detection"],
    },
  },
  {
    id: "dash-shopping",
    type: "shopping",
    title: "Nike Dunk Low Retro",
    summary: "END Clothing",
    timestamp: "4 hours ago",
    priority: "yellow",
    actions: [
      { label: "Buy Now" },
      { label: "Compare", variant: "outline" },
      { label: "Save", variant: "outline" },
    ],
    details: {
      price: "£89.99",
      originalPrice: "£119.99",
      discount: "-25%",
      retailer: "END Clothing",
      note: "Found in your size · Only 2 left",
    },
  },
  {
    id: "dash-task",
    type: "task",
    title: "Gift Research Complete",
    summary: "Found 3 birthday gifts for your mum under £50",
    timestamp: "5 hours ago",
    priority: "green",
    actions: [
      { label: "View All" },
      { label: "Buy Top Pick", variant: "outline" },
      { label: "Refine", variant: "ghost" },
    ],
    details: {
      results: [
        { name: "Personalised Star Map Print", price: "£34.99", retailer: "Not On The High Street" },
        { name: "Jo Malone Miniatures Set", price: "£42.00", retailer: "John Lewis" },
        { name: "Spa Day Gift Voucher", price: "£49.00", retailer: "Treatwell" },
      ],
    },
  },
  {
    id: "dash-finance",
    type: "finance",
    title: "Price Drop Alert — Save £30",
    summary: "Sony WH-1000XM5",
    timestamp: "6 hours ago",
    priority: "green",
    actions: [
      { label: "Buy with Cashback" },
      { label: "Price History", variant: "outline" },
      { label: "Stop Tracking", variant: "ghost" },
    ],
    details: {
      currentPrice: "£269",
      previousPrice: "£299",
      cashback: "+£12.45 cashback via TopCashback",
    },
  },
  {
    id: "dash-health",
    type: "health",
    title: "Sleep Pattern Alert",
    summary: "You\u2019ve been up past midnight 4/5 nights this week",
    timestamp: "7 hours ago",
    priority: "red",
    actions: [
      { label: "Set Reminder" },
      { label: "Got It", variant: "outline" },
    ],
    details: {
      dataPoints: [
        { label: "Avg screen-off", value: "1:24 AM" },
        { label: "Tomorrow's first event", value: "9:00 AM" },
        { label: "Recommended bedtime", value: "11:30 PM" },
      ],
    },
  },
  {
    id: "dash-sponsored",
    type: "sponsored",
    title: "ASOS Winter Sale — Up to 50% Off",
    summary: "Sponsored",
    timestamp: "8 hours ago",
    priority: "yellow",
    actions: [
      { label: "Shop Now" },
      { label: "Not Interested", variant: "ghost" },
    ],
    details: {
      price: "£24.99",
      originalPrice: "£49.99",
      discount: "-50%",
    },
  },
]

// ─── Currently running agents ──────────────────────────────────────────────────

export const runningAgents = [
  { id: 1, text: "Researching cancer biomarkers...", progress: 67 },
  { id: 2, text: "Tracking prices for 3 items...", progress: 42 },
  { id: 3, text: "Scanning for birthday gift ideas...", progress: 88 },
]

// ─── Chat mock data ────────────────────────────────────────────────────────────

export const chatProducts = [
  { name: "Slim Fit Navy Blazer Set", price: "£149.99", retailer: "ASOS" },
  { name: "Charcoal Two-Piece Suit", price: "£189.00", retailer: "Next" },
  { name: "Linen Blend Summer Suit", price: "£165.00", retailer: "M&S" },
]

export const quickActions = [
  "Find deals",
  "Research update",
  "My schedule",
  "Price alerts",
  "New task",
]
