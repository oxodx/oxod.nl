import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/Panel"
import { USER } from "@/data/user"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""]
const LEVELS = [
  "fill-[oklch(1_0_0/6%)]",
  "fill-emerald-950",
  "fill-emerald-800",
  "fill-emerald-600",
  "fill-emerald-400",
]

type Day = { date: string; count: number; level: number }

type Contribution = { date?: string; count?: number; level?: number }
type ContributionsResponse = { contributions?: Contribution[] }

function getMonthLabelX(
  index: number,
  total: number,
  padLeft: number,
  gridWidth: number
) {
  if (total <= 1) return padLeft
  return padLeft + ((index + 0.5) / total) * gridWidth
}

function parseDate(d: string) {
  const [y, m, day] = d.split("-").map(Number)
  return new Date(y, m - 1, day)
}

function formatDayKey(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function buildGrid(days: Day[]) {
  const end = new Date()
  const start = new Date(end)
  start.setFullYear(start.getFullYear() - 1)
  start.setDate(start.getDate() - (start.getDay() || 7) + 1)

  const map = new Map(days.map((d) => [d.date, d]))
  const full: Day[] = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = formatDayKey(d)
    const existing = map.get(key)
    if (existing) {
      full.push(existing)
    } else {
      full.push({ date: key, count: 0, level: 0 })
    }
  }

  const weeks: Day[][] = []
  for (let i = 0; i < full.length; i += 7) weeks.push(full.slice(i, i + 7))
  const total = full.reduce((s, d) => s + d.count, 0)

  let bestStreak = 0
  let currentStreak = 0
  for (const day of full) {
    if (day.count > 0) {
      currentStreak++
      if (currentStreak > bestStreak) bestStreak = currentStreak
    } else {
      currentStreak = 0
    }
  }

  const monthLabels: { label: string; col: number }[] = []
  let last = -1
  for (let i = 0; i < full.length; i++) {
    const m = parseDate(full[i].date).getMonth()
    if (m !== last) {
      monthLabels.push({ label: MONTHS[m], col: Math.floor(i / 7) })
      last = m
    }
  }

  return { weeks, monthLabels, total, bestStreak }
}

export function GitHubContributionsSection() {
  const [days, setDays] = useState<Day[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [tooltip, setTooltip] = useState<{
    day: Day
    x: number
    y: number
  } | null>(null)

  const svgRef = useRef<SVGSVGElement>(null)

  const username = USER.github.replace(/https?:\/\/github\.com\//, "").replace(/\/$/, "")

  useEffect(() => {
    const controller = new AbortController()
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("API error")
        return r.json() as Promise<ContributionsResponse>
      })
      .then((json) => {
        const contributions: Day[] = (json.contributions ?? []).map((c) => ({
          date: c.date ?? "",
          count: c.count ?? 0,
          level: c.level ?? 0,
        }))
        setDays(contributions)
        setLoading(false)
      })
      .catch((err: unknown) => {
        const isAbort = err instanceof DOMException && err.name === "AbortError"
        if (!isAbort) {
          console.error("Failed to load contributions:", err)
          setError(true)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [username])

  const { weeks, monthLabels, total, bestStreak } = useMemo(() => {
    if (days.length === 0)
      return {
        weeks: [] as Day[][],
        monthLabels: [] as { label: string; col: number }[],
        total: 0,
        bestStreak: 0,
      }
    return buildGrid(days)
  }, [days])

  const cols = weeks.length
  const cell = 10
  const gap = 2
  const padLeft = 24
  const padTop = 14
  const gridW = cols * (cell + gap)
  const gridH = 7 * (cell + gap)
  const svgW = padLeft + gridW
  const svgH = padTop + gridH + 4

  function handleMouseEnter(e: React.MouseEvent<SVGRectElement>, day: Day) {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    setTooltip({ day, x: e.clientX - rect.left, y: e.clientY - rect.top - 8 })
  }

  function handleMouseLeave() {
    setTooltip(null)
  }

  const dayLabels = DAYS.map((d, i) =>
    d ? { label: d, row: i } : null
  ).filter(Boolean) as { label: string; row: number }[]

  return (
    <Panel>
      <PanelHeader>
        <div className="flex items-center justify-between gap-4 p-4">
          <PanelTitle>Contributions</PanelTitle>
          <a
            href={USER.github}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            @{username}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </PanelHeader>

      {error ? (
        <PanelContent>
          <p className="text-sm text-muted-foreground">
            Failed to load GitHub contributions for @{username}.
          </p>
        </PanelContent>
      ) : loading ? (
        <LoadingSkeleton />
      ) : total === 0 ? (
        <PanelContent>
          <p className="text-sm text-muted-foreground">
            No contributions in the past year — time to write some code.
          </p>
        </PanelContent>
      ) : (
        <PanelContent>
          <div className="relative">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full"
              aria-label="GitHub Contributions Graph"
            >
              {monthLabels.map(({ label }, index) => (
                <text
                  key={label + index}
                  x={getMonthLabelX(index, monthLabels.length, padLeft, gridW)}
                  y={10}
                  className="fill-muted-foreground text-[9px] font-mono"
                  textAnchor="middle"
                >
                  {label}
                </text>
              ))}

              {dayLabels.map(({ label, row }) => (
                <text
                  key={label}
                  x={padLeft - 4}
                  y={padTop + row * (cell + gap) + cell - 1}
                  className="fill-muted-foreground text-[9px] font-mono"
                  textAnchor="end"
                >
                  {label}
                </text>
              ))}

              {weeks.map((week, col) =>
                week.map((day, row) => (
                  <rect
                    key={day.date}
                    x={padLeft + col * (cell + gap)}
                    y={padTop + row * (cell + gap)}
                    width={cell}
                    height={cell}
                    rx={2}
                    className={`cursor-pointer transition-[filter] duration-150 hover:brightness-125 ${LEVELS[Math.min(day.level, LEVELS.length - 1)] ?? LEVELS[0]}`}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))
              )}
            </svg>

            {tooltip && (
              <div
                className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-sm"
                style={{ left: tooltip.x, top: tooltip.y }}
              >
                <p className="whitespace-nowrap">
                  <span className="font-semibold">{tooltip.day.count}</span>{" "}
                  contribution{tooltip.day.count !== 1 ? "s" : ""} on{" "}
                  {parseDate(tooltip.day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {total.toLocaleString()} contributions.
              <span className="mx-2 text-line">|</span>
              Best streak: {bestStreak} day{bestStreak !== 1 ? "s" : ""}.
            </p>
            <div className="flex items-center gap-1">
              <span className="mr-1 text-[10px] text-muted-foreground">Less</span>
              {LEVELS.map((c, i) => (
                <span
                  key={i}
                  className={`block size-3 rounded-[3px] ${c.replace("fill-", "bg-")}`}
                />
              ))}
              <span className="ml-1 text-[10px] text-muted-foreground">More</span>
            </div>
          </div>
        </PanelContent>
      )}
    </Panel>
  )
}

function LoadingSkeleton() {
  const skelEnd = new Date()
  const skelStart = new Date(skelEnd)
  skelStart.setFullYear(skelStart.getFullYear() - 1)
  skelStart.setDate(skelStart.getDate() - (skelStart.getDay() || 7) + 1)

  const skelCols = Math.ceil(
    ((skelEnd.getTime() - skelStart.getTime()) / (1000 * 60 * 60 * 24) + 1) / 7
  )
  const skelCell = 10
  const skelGap = 2
  const skelPadLeft = 24
  const skelPadTop = 14
  const skelGridW = skelCols * (skelCell + skelGap)
  const skelGridH = 7 * (skelCell + skelGap)
  const skelSvgW = skelPadLeft + skelGridW
  const skelSvgH = skelPadTop + skelGridH + 4

  const skelWeeks = Array.from({ length: skelCols }, (_, i) =>
    Array.from({ length: 7 }, (_, j) => `${i}-${j}`)
  )

  const skelMonthLabels: { label: string; col: number }[] = []
  {
    let last = -1
    let col = 0
    for (let d = new Date(skelStart); d <= skelEnd; d.setDate(d.getDate() + 7)) {
      const m = d.getMonth()
      if (m !== last) {
        skelMonthLabels.push({ label: MONTHS[m], col })
        last = m
      }
      col++
    }
  }

  const skelDayLabels = DAYS.map((d, i) =>
    d ? { label: d, row: i } : null
  ).filter(Boolean) as { label: string; row: number }[]

  return (
    <PanelContent>
      <div className="relative">
        <svg
          viewBox={`0 0 ${skelSvgW} ${skelSvgH}`}
          className="w-full"
          aria-label="Loading GitHub Contributions"
        >
          {skelMonthLabels.map(({ label }, index) => (
            <text
              key={label + index}
              x={getMonthLabelX(index, skelMonthLabels.length, skelPadLeft, skelGridW)}
              y={10}
              className="fill-muted-foreground text-[9px] font-mono"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}

          {skelDayLabels.map(({ label, row }) => (
            <text
              key={label}
              x={skelPadLeft - 4}
              y={skelPadTop + row * (skelCell + skelGap) + skelCell - 1}
              className="fill-muted-foreground text-[9px] font-mono"
              textAnchor="end"
            >
              {label}
            </text>
          ))}

          {skelWeeks.map((week, col) =>
            week.map((id, row) => (
              <rect
                key={id}
                x={skelPadLeft + col * (skelCell + skelGap)}
                y={skelPadTop + row * (skelCell + skelGap)}
                width={skelCell}
                height={skelCell}
                rx={2}
                className="animate-pulse fill-muted-foreground/15"
              />
            ))
          )}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-56 animate-pulse rounded bg-muted" />
        <div className="flex items-center gap-1">
          <span className="h-3 w-6 animate-pulse rounded bg-muted" />
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="block size-3 animate-pulse rounded-sm bg-muted" />
          ))}
          <span className="h-3 w-6 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </PanelContent>
  )
}