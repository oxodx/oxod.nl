import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Bot, Database } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { Panel, PanelHeader, PanelTitle } from "@/components/Panel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { STACK } from "@/data/stack";
import { getSkillIcon } from "@/data/skillIcons";
import { scheduleWeighted } from "@/lib/marqueeScheduler";
import type { StackItem } from "@/types/stack";

const ID = "stack";

const FALLBACK_ICONS: Record<string, typeof Box> = {
  sql: Database,
  chatgpt: Bot,
};

const FAST_SPEED = 140;
const SLOW_SPEED = 45;
const NEAR_DISTANCE = 150;
const SPEED_FACTORS = [1, 0.98, 0.95];

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
};

function SkillCell({ item }: { item: StackItem }) {
  const glyph = getSkillIcon(item.key);
  const Fallback = FALLBACK_ICONS[item.key] ?? Box;
  const icon = glyph ? (
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
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.title} — ${item.category}`}
          className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-input bg-card px-3.5 font-mono text-sm text-foreground/90 transition-colors hover:border-ring/50 hover:bg-accent hover:text-foreground"
        >
          {icon}
          {item.title}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col gap-1.5">
          <span className="font-medium">{item.title}</span>
          {item.level ? (
            <span className="text-xs text-muted-foreground">
              {item.category} · {LEVEL_LABELS[item.level]}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              {item.category}
            </span>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function StackSection() {
  const rows = useMemo(() => {
    const first = 8;
    const second = 17;
    return [
      STACK.slice(0, first),
      STACK.slice(first, second),
      STACK.slice(second),
    ];
  }, []);

  const wrapRef = useRef<HTMLDivElement>(null);

  const sequences = useMemo(
    () =>
      rows.map((row) =>
        scheduleWeighted(
          row,
          (i) => i.key,
          (i) => i.level ?? 1,
          3,
        ),
      ),
    [rows],
  );

  const [speeds, setSpeeds] = useState<number[]>(() =>
    SPEED_FACTORS.map((f) => FAST_SPEED * f),
  );

  useEffect(() => {
    let raf = 0;
    let latestY: number | null = null;
    const apply = () => {
      raf = 0;
      if (latestY === null) return;
      const y = latestY;
      const wrap = wrapRef.current;
      if (!wrap) return;
      setSpeeds((prev) => {
        const next = SPEED_FACTORS.map((factor, i) => {
          const rowsEl = Array.from(
            wrap.querySelectorAll<HTMLElement>("[data-marquee]"),
          )[i];
          if (!rowsEl) return FAST_SPEED * factor;
          const rect = rowsEl.getBoundingClientRect();
          const over = y >= rect.top && y <= rect.bottom;
          const near =
            y >= rect.top - NEAR_DISTANCE && y <= rect.bottom + NEAR_DISTANCE;
          if (over) return 0;
          if (near) return SLOW_SPEED * factor;
          return FAST_SPEED * factor;
        });
        return prev.every((s, i) => s === next[i]) ? prev : next;
      });
    };
    const onMove = (e: MouseEvent) => {
      latestY = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Panel id={ID} className="scroll-mt-14">
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>Stack</PanelTitle>
        </div>
      </PanelHeader>
      <div ref={wrapRef} className="space-y-3 p-4">
        <TooltipProvider delayDuration={100}>
          <Marquee speed={speeds[0]}>
            {sequences[0].map((item, i) => (
              <SkillCell key={`${item.key}-${i}`} item={item} />
            ))}
          </Marquee>
          <Marquee reverse speed={speeds[1]}>
            {sequences[1].map((item, i) => (
              <SkillCell key={`${item.key}-${i}`} item={item} />
            ))}
          </Marquee>
          <Marquee speed={speeds[2]}>
            {sequences[2].map((item, i) => (
              <SkillCell key={`${item.key}-${i}`} item={item} />
            ))}
          </Marquee>
        </TooltipProvider>
      </div>
    </Panel>
  );
}
