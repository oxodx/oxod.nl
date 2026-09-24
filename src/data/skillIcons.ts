import {
  siBun,
  siClaude,
  siCss,
  siCursor,
  siDocker,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siMongodb,
  siNginx,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siShadcnui,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons"
import type { StackItem } from "@/types/stack"

export type SkillGlyph = { path: string; hex: string }

const ICONS: Partial<Record<StackItem["key"], SkillGlyph>> = {
  typescript: { path: siTypescript.path, hex: `#${siTypescript.hex}` },
  javascript: { path: siJavascript.path, hex: `#${siJavascript.hex}` },
  python: { path: siPython.path, hex: `#${siPython.hex}` },
  react: { path: siReact.path, hex: `#${siReact.hex}` },
  nextjs: { path: siNextdotjs.path, hex: `#${siNextdotjs.hex}` },
  vite: { path: siVite.path, hex: `#${siVite.hex}` },
  tailwindcss: { path: siTailwindcss.path, hex: `#${siTailwindcss.hex}` },
  shadcn: { path: siShadcnui.path, hex: `#${siShadcnui.hex}` },
  html: { path: siHtml5.path, hex: `#${siHtml5.hex}` },
  css: { path: siCss.path, hex: `#${siCss.hex}` },
  nodejs: { path: siNodedotjs.path, hex: `#${siNodedotjs.hex}` },
  bun: { path: siBun.path, hex: `#${siBun.hex}` },
  postgresql: { path: siPostgresql.path, hex: `#${siPostgresql.hex}` },
  mongodb: { path: siMongodb.path, hex: `#${siMongodb.hex}` },
  redis: { path: siRedis.path, hex: `#${siRedis.hex}` },
  git: { path: siGit.path, hex: `#${siGit.hex}` },
  github: { path: siGithub.path, hex: `#${siGithub.hex}` },
  docker: { path: siDocker.path, hex: `#${siDocker.hex}` },
  nginx: { path: siNginx.path, hex: `#${siNginx.hex}` },
  vercel: { path: siVercel.path, hex: `#${siVercel.hex}` },
  cursor: { path: siCursor.path, hex: `#${siCursor.hex}` },
  claude: { path: siClaude.path, hex: `#${siClaude.hex}` },
  gemini: { path: siGooglegemini.path, hex: `#${siGooglegemini.hex}` },
}

export function getSkillIcon(key: string): SkillGlyph | null {
  return ICONS[key] ?? null
}