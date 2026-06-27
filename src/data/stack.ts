import type { StackItem } from "@/types/stack";

export const STACK: StackItem[] = [
  // Language
  { key: "typescript", title: "TypeScript", category: "Language" },
  { key: "javascript", title: "JavaScript", category: "Language" },
  { key: "python", title: "Python", category: "Language" },

  // Frontend
  { key: "react", title: "React", category: "Frontend" },
  { key: "nextjs", title: "Next.js", category: "Frontend" },
  { key: "vite", title: "Vite", category: "Frontend" },
  { key: "tailwindcss", title: "Tailwind CSS", category: "Frontend" },
  { key: "shadcn", title: "shadcn/ui", category: "Frontend" },
  { key: "html", title: "HTML", category: "Frontend" },
  { key: "css", title: "CSS", category: "Frontend" },

  // Backend & Database & Database
  { key: "nodejs", title: "Node.js", category: "Backend & Database" },
  { key: "nodejs", title: "Bun", category: "Backend & Database" },
  { key: "postgresql", title: "PostgreSQL", category: "Backend & Database" },
  { key: "mongodb", title: "MongoDB", category: "Backend & Database" },
  { key: "redis", title: "Redis", category: "Backend & Database" },
  { key: "nginx", title: "nginx", category: "Backend & Database" },

  // Workflow & AI
  { key: "cursor", title: "Cursor", category: "Workflow & AI" },
  { key: "claude", title: "Claude", category: "Workflow & AI" },
  { key: "gemini", title: "Gemini", category: "Workflow & AI" },
  { key: "chatgpt", title: "ChatGPT", category: "Workflow & AI" },
  { key: "git", title: "Git", category: "Workflow & AI" },
  { key: "github", title: "GitHub", category: "Workflow & AI" },
  { key: "docker", title: "Docker", category: "Workflow & AI" },
  { key: "vercel", title: "Vercel", category: "Workflow & AI" },
];

export function groupByCategory(items: StackItem[]): Record<string, StackItem[]> {
  return items.reduce<Record<string, StackItem[]>>((acc, item) => {
    const category = item.category;
    (acc[category] ??= []).push(item);
    return acc;
  }, {});
}
