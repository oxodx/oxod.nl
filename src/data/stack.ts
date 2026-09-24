import type { StackItem } from "@/types/stack"

export const STACK: StackItem[] = [
  // Languages
  { key: "typescript", title: "TypeScript", category: "Languages", level: 4 },
  { key: "javascript", title: "JavaScript", category: "Languages", level: 4 },
  { key: "python", title: "Python", category: "Languages", level: 3 },
  { key: "sql", title: "SQL", category: "Languages", level: 3 },

  // Frontend
  { key: "react", title: "React", category: "Frontend", level: 4 },
  { key: "nextjs", title: "Next.js", category: "Frontend", level: 4 },
  { key: "vite", title: "Vite", category: "Frontend", level: 4 },
  { key: "tailwindcss", title: "Tailwind CSS", category: "Frontend", level: 4 },
  { key: "shadcn", title: "shadcn/ui", category: "Frontend", level: 4 },
  { key: "html", title: "HTML", category: "Frontend", level: 4 },
  { key: "css", title: "CSS", category: "Frontend", level: 3 },

  // Backend & Data
  { key: "nodejs", title: "Node.js", category: "Backend & Data", level: 4 },
  { key: "bun", title: "Bun", category: "Backend & Data", level: 3 },
  { key: "postgresql", title: "PostgreSQL", category: "Backend & Data", level: 3 },
  { key: "mongodb", title: "MongoDB", category: "Backend & Data", level: 3 },
  { key: "redis", title: "Redis", category: "Backend & Data", level: 3 },

  // DevOps & Cloud
  { key: "git", title: "Git", category: "DevOps & Cloud", level: 4 },
  { key: "github", title: "GitHub", category: "DevOps & Cloud", level: 4 },
  { key: "docker", title: "Docker", category: "DevOps & Cloud", level: 3 },
  { key: "nginx", title: "nginx", category: "DevOps & Cloud", level: 3 },
  { key: "vercel", title: "Vercel", category: "DevOps & Cloud", level: 4 },

  // Tools & AI
  { key: "cursor", title: "Cursor", category: "Tools & AI", level: 4 },
  { key: "claude", title: "Claude", category: "Tools & AI", level: 4 },
  { key: "gemini", title: "Gemini", category: "Tools & AI", level: 3 },
  { key: "chatgpt", title: "ChatGPT", category: "Tools & AI", level: 4 },
]

export function groupByCategory(items: StackItem[]): Record<string, StackItem[]> {
  const groups: Record<string, StackItem[]> = {}
  for (const item of items) {
    groups[item.category] ??= []
    groups[item.category].push(item)
  }
  return groups
}