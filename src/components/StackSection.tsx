import { useEffect, useMemo, useRef, useState } from "react"
import { Box, Bot, Database } from "lucide-react"
import { Marquee } from "@/components/ui/Marquee"
import { Panel, PanelHeader, PanelTitle } from "@/components/Panel"
import { STACK } from "@/data/stack"
import { getSkillIcon } from "@/data/skillIcons"
import type { StackItem } from "@/types/stack"

const ID = "stack"

const FALLBACK_ICONS: Record<string, typeof Box> = {
  sql: Database,
  chatgpt: Bot,
}

const FAST_SPEED = 140
const SLOW_SPEED = 45
const NEAR_DISTANCE = 150

type RowState = { speed: number }

const IDLE_STATE: RowState = { speed: FAST_SPEED }

function SkillPill({ item }: { item: StackItem }) {
  const glyph = getSkillIcon(item.key)
  const Fallback = FALLBACK_ICONS[item.key]

  return (
    <span
      className="inline-flex h-9 shrink-0 cursor-default items-center gap-2 rounded-full border border-input bg-card px-3.5 font-mono text-sm text-foreground/90 transition-colors hover:border-ring/50 hover:bg-accent hover:text-foreground"
      title={`${item.title} — ${item.category}${item.level ? ` · ${item.level}/4` : ""}`}
    >
      {glyph ? (
        <svg
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          aria-hidden
          fill={glyph.hex}
        >
          <path d={glyph.path} />
        </svg>
      ) : (
        <Fallback className="size-4 shrink-0" aria-hidden />
      )}
      {item.title}
    </span>
  )
}

export function StackSection() {
  const rows = useMemo(() => {
    const third = Math.ceil(STACK.length / 3)
    return [STACK.slice(0, third), STACK.slice(third, third * 2), STACK.slice(third * 2)]
  }, [])

  const wrapRef = useRef<HTMLDivElement>(null)
  const [states, setStates] = useState<RowState[]>(() => rows.map(() => IDLE_STATE))

  useEffect(() => {
    let raf = 0
    const update = (y: number) => {
      raf = 0
      const wrap = wrapRef.current
      if (!wrap) return
      const marquees = Array.from(wrap.querySelectorAll<HTMLElement>("[data-marquee]"))
      const next = marquees.map((el) => {
        const rect = el.getBoundingClientRect()
        const over = y >= rect.top && y <= rect.bottom
        const near = y >= rect.top - NEAR_DISTANCE && y <= rect.bottom + NEAR_DISTANCE
        if (over) return { speed: 0 }
        if (near) return { speed: SLOW_SPEED }
        return IDLE_STATE
      })
      setStates((prev) =>
        prev.length === next.length && prev.every((s, i) => s.speed === next[i].speed)
          ? prev
          : next
      )
    }
    const onMove = (e: MouseEvent) => {
      if (!raf) raf = requestAnimationFrame(() => update(e.clientY))
    }
    const onLeave = () => {
      setStates((prev) =>
        prev.every((s) => s.speed === FAST_SPEED) ? prev : rows.map(() => IDLE_STATE)
      )
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseout", onLeave, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [rows])

  return (
    <Panel id={ID} className="scroll-mt-14">
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>Stack</PanelTitle>
        </div>
      </PanelHeader>
      <div ref={wrapRef} className="space-y-3 p-4">
        <Marquee speed={states[0].speed}>
          {rows[0].map((item) => <SkillPill key={item.key} item={item} />)}
        </Marquee>
        <Marquee reverse speed={states[1].speed}>
          {rows[1].map((item) => <SkillPill key={item.key} item={item} />)}
        </Marquee>
        <Marquee speed={states[2].speed}>
          {rows[2].map((item) => <SkillPill key={item.key} item={item} />)}
        </Marquee>
      </div>
    </Panel>
  )
}