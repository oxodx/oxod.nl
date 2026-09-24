import type { Project } from "@/types/projects"

export const PROJECTS: Project[] = [
  {
    id: "oxod-nl",
    title: "oxod.nl",
    period: { start: "2026" },
    link: "https://oxod.nl",
    skills: ["React", "Tailwind CSS v4", "Vite", "TypeScript"],
    description: "My developer portfolio site.",
  },
  {
    id: "dotfiles",
    title: "dotfiles",
    period: { start: "2026" },
    link: "https://github.com/oxodx/dotfiles",
    skills: ["Arch Linux", "Linux"],
    description: "My dotfiles.",
  },
  {
    id: "oxmines",
    title: "oxmines",
    period: { start: "2026" },
    link: "https://modrinth.com/plugin/oxmines",
    skills: ["Java", "Minecraft"],
    description: "A simple plugin for box-mining/prison servers.",
  },
]