import type { Project } from "@/types/projects";

export const PROJECTS: Project[] = [
  {
    id: "oxod-nl",
    title: "oxod.nl",
    period: { start: "2026" },
    link: "https://oxod.nl",
    skills: ["React", "Tailwind CSS v4", "Vite", "TypeScript"],
    description: "My developer portfolio site.",
    isExpanded: false,
  },
  {
    id: "dotfiles",
    title: "dotfiles",
    period: { start: "2026" },
    link: "https://github.com/oxodx/dotfiles",
    skills: ["Nix", "NixOS", "Linux"],
    description: "My NixOS dotfiles.",
    isExpanded: false,
  },
];
