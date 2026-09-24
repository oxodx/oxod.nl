import type { StackItem } from "@/types/stack"

export const STACK: StackItem[] = [
  // Languages
  { key: "typescript", title: "TypeScript", href: "https://www.typescriptlang.org", category: "Languages", level: 4 },
  { key: "javascript", title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", category: "Languages", level: 4 },
  { key: "python", title: "Python", href: "https://www.python.org", category: "Languages", level: 3 },
  { key: "rust", title: "Rust", href: "https://www.rust-lang.org", category: "Languages", level: 2 },
  { key: "go", title: "Go", href: "https://golang.org", category: "Languages", level: 3 },
  { key: "lua", title: "Lua", href: "https://www.lua.org", category: "Languages", level: 2 },
  { key: "sql", title: "SQL", href: "https://en.wikipedia.org/wiki/SQL", category: "Languages", level: 1 },

  // Frontend
  { key: "react", title: "React", href: "https://react.dev", category: "Frontend", level: 3 },
  { key: "nextjs", title: "Next.js", href: "https://nextjs.org", category: "Frontend", level: 1 },
  { key: "vite", title: "Vite", href: "https://vite.dev", category: "Frontend", level: 2 },
  { key: "tailwindcss", title: "Tailwind CSS", href: "https://tailwindcss.com", category: "Frontend", level: 3 },
  { key: "shadcn", title: "shadcn/ui", href: "https://ui.shadcn.com", category: "Frontend", level: 4 },
  { key: "html", title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "Frontend", level: 4 },
  { key: "css", title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "Frontend", level: 3 },

  // Backend & Data
  { key: "nodejs", title: "Node.js", href: "https://nodejs.org", category: "Backend & Data", level: 4 },
  { key: "bun", title: "Bun", href: "https://bun.sh", category: "Backend & Data", level: 3 },
  { key: "postgresql", title: "PostgreSQL", href: "https://www.postgresql.org", category: "Backend & Data", level: 1 },
  { key: "mongodb", title: "MongoDB", href: "https://www.mongodb.com", category: "Backend & Data", level: 1 },
  { key: "redis", title: "Redis", href: "https://redis.io", category: "Backend & Data", level: 1 },

  // DevOps & Cloud
  { key: "git", title: "Git", href: "https://git-scm.com", category: "DevOps & Cloud", level: 4 },
  { key: "github", title: "GitHub", href: "https://github.com", category: "DevOps & Cloud", level: 4 },
  { key: "docker", title: "Docker", href: "https://www.docker.com", category: "DevOps & Cloud", level: 3 },
  { key: "nginx", title: "nginx", href: "https://nginx.org", category: "DevOps & Cloud", level: 1 },
  { key: "vercel", title: "Vercel", href: "https://vercel.com", category: "DevOps & Cloud", level: 2 },

  // Tools & AI
  { key: "cursor", title: "Cursor", href: "https://cursor.com", category: "Tools & AI", level: 1 },
  { key: "claude", title: "Claude", href: "https://claude.ai", category: "Tools & AI", level: 3 },
  { key: "gemini", title: "Gemini", href: "https://deepmind.google/technologies/gemini", category: "Tools & AI", level: 4 },
  { key: "linux", title: "Linux", href: "https://www.kernel.org", category: "Tools & AI", level: 3 },
]

export function groupByCategory(items: StackItem[]): Record<string, StackItem[]> {
  const groups: Record<string, StackItem[]> = {}
  for (const item of items) {
    groups[item.category] ??= []
    groups[item.category].push(item)
  }
  return groups
}