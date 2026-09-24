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
    id: "nekoclient",
    title: "nekoclient",
    period: { start: "2026" },
    link: "https://github.com/oxodx/nekoclient",
    skills: ["Java", "Minecraft"],
    description: "A Minecraft Fabric Utility Mod for anarchy servers.",
  },
  {
    id: "oxmines",
    title: "oxmines",
    period: { start: "2026" },
    link: "https://modrinth.com/plugin/oxmines",
    skills: ["Java", "Minecraft"],
    description: "A simple plugin for box-mining/prison servers.",
  },
  {
    id: "oxai",
    title: "oxai",
    period: { start: "2026" },
    link: "https://modrinth.com/mod/oxai",
    skills: ["Java", "Minecraft"],
    description: "Minecraft mod that adds AI chat via Ollama. Type `@ai` in chat to ask questions.",
  },
  {
    id: "x",
    title: "x",
    period: { start: "2026" },
    link: "https://github.com/oxodx/x",
    skills: ["Go"],
    description: "oxod's experimental packages.",
  },
]