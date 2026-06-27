import type { StackItem } from "@/types/stack"

export const STACK: StackItem[] = [
  { key: "html", title: "HTML", categories: ["Frontend"] },
  { key: "css", title: "CSS", categories: ["Frontend"] },
  { key: "javascript", title: "JavaScript", categories: ["Frontend"] },
  { key: "typescript", title: "TypeScript", categories: ["Frontend", "Backend"] },
  { key: "react", title: "React", categories: ["Frontend"] },
  { key: "tailwindcss", title: "Tailwind CSS", categories: ["Frontend"] },
  { key: "nextjs", title: "Next.js", categories: ["Frontend"] },
  { key: "vite", title: "Vite", categories: ["Frontend", "Tools"] },
  { key: "python", title: "Python", categories: ["Backend"] },
  { key: "nodejs", title: "Node.js", categories: ["Backend"] },
  { key: "express", title: "Express", categories: ["Backend"] },
  { key: "mongodb", title: "MongoDB", categories: ["Backend"] },
  { key: "postgresql", title: "PostgreSQL", categories: ["Backend"] },
  { key: "graphql", title: "GraphQL", categories: ["Backend"] },
  { key: "git", title: "Git", categories: ["Tools"] },
  { key: "github-actions", title: "GitHub Actions", categories: ["Tools"] },
  { key: "docker", title: "Docker", categories: ["Tools"] },
  { key: "vscode", title: "VS Code", categories: ["Tools"] },
]

export function groupByCategory(items: StackItem[]): Record<string, StackItem[]> {
  return items.reduce<Record<string, StackItem[]>>((acc, item) => {
    for (const category of item.categories) {
      (acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
