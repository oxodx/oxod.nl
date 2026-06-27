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
    return (
      <Panel>
        <div className="p-4 text-sm text-muted-foreground">
          Loading GitHub contributions...
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
            {monthLabels.map(({ label, col }) => (
              <text
                key={label + col}
                x={padLeft + col * (cell + gap)}
                y={10}
                className="fill-muted-foreground text-[9px] font-mono"
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
