import { useEffect, useMemo, useRef, useState } from "react"
import { Panel } from "@/components/Panel"
import { USER } from "@/data/user"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""]
const LEVELS = [
  "fill-[oklch(0_0_0/8%)] dark:fill-[oklch(1_0_0/8%)]",
  "fill-emerald-200 dark:fill-emerald-900",
  "fill-emerald-400 dark:fill-emerald-700",
  "fill-emerald-500 dark:fill-emerald-500",
  "fill-emerald-600 dark:fill-emerald-400",
]

type Day = { date: string; count: number; level: number }

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

function buildGrid(days: Day[]) {
  const end = new Date()
  const start = new Date(end)
  start.setFullYear(start.getFullYear() - 1)
  start.setDate(start.getDate() - (start.getDay() || 7) + 1)

  const map = new Map(days.map((d) => [d.date, d]))
  const full: Day[] = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10)
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

  const monthLabels: { label: string; col: number }[] = []
  let last = -1
  for (let i = 0; i < full.length; i++) {
    const m = parseDate(full[i].date).getMonth()
    if (m !== last) {
      monthLabels.push({ label: MONTHS[m], col: Math.floor(i / 7) })
      last = m
    }
  }

  return { weeks, monthLabels, total }
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
        return r.json()
      })
      .then((json) => {
        const contributions: Day[] = (json.contributions || []).map(
          (c: { date?: string; count?: number; level?: number }) => ({
            date: c.date ?? "",
            count: c.count ?? 0,
            level: c.level ?? 0,
          })
        )
        setDays(contributions)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load contributions:", err)
          setError(true)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [username])

  const { weeks, monthLabels, total } = useMemo(() => {
    if (days.length === 0) return { weeks: [] as Day[][], monthLabels: [] as { label: string; col: number }[], total: 0 }
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

  if (error) {
    return (
      <Panel>
        <div className="p-4 text-sm text-muted-foreground">
          Failed to load GitHub contributions for @{username}.
        </div>
      </Panel>
    )
  }

  if (loading) {
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
      <Panel>
        <h2 className="sr-only">GitHub Contributions</h2>
        <div className="p-4">
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
        </div>
      </Panel>
    )
  }

  return (
    <Panel>
      <h2 className="sr-only">GitHub Contributions</h2>
      <div className="p-4">
        <div className="relative">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full"
            aria-label="GitHub Contributions Graph"
          >
            {/* Month labels */}
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

            {/* Day labels */}
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

            {/* Contribution cells */}
            {weeks.map((week, col) =>
              week.map((day, row) => (
                <rect
                  key={day.date}
                  x={padLeft + col * (cell + gap)}
                  y={padTop + row * (cell + gap)}
                  width={cell}
                  height={cell}
                  rx={2}
                  className={`cursor-pointer ${
                    day.level === 0
                      ? "fill-[oklch(0_0_0/8%)] dark:fill-[oklch(1_0_0/8%)]"
                      : day.level === 1
                        ? "fill-emerald-200 dark:fill-emerald-900"
                        : day.level === 2
                          ? "fill-emerald-400 dark:fill-emerald-700"
                          : day.level === 3
                            ? "fill-emerald-500 dark:fill-emerald-500"
                            : "fill-emerald-600 dark:fill-emerald-400"
                  }`}
                  onMouseEnter={(e) => handleMouseEnter(e, day)}
                  onMouseLeave={handleMouseLeave}
                />
              ))
            )}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-sm"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <p className="whitespace-nowrap">
                <span className="font-semibold">{tooltip.day.count}</span>{" "}
                contribution{tooltip.day.count !== 1 ? "s" : ""} on{" "}
                {new Date(tooltip.day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          )}
        </div>

        {/* Footer: total + legend */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {total.toLocaleString()} contributions in the past year.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-muted-foreground">Less</span>
            {LEVELS.map((c, i) => (
              <span
                key={i}
                className={`block size-3 rounded-sm ${c.replace("fill-", "bg-")}`}
              />
            ))}
            <span className="text-[10px] text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}
