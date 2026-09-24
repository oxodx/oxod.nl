export function scheduleWeighted<T>(
  items: T[],
  keyOf: (item: T) => string,
  countOf: (item: T) => number,
  maxCount = 4
): T[] {
  const groups = items.map((item) => ({
    item,
    key: keyOf(item),
    count: Math.max(1, Math.min(Math.floor(countOf(item)), maxCount)),
  }))
  const n = groups.reduce((sum, g) => sum + g.count, 0)
  if (n === 0 || groups.length === 0) return []

  // Most copies first so high-frequency skills get the pick of positions.
  groups.sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))

  // Evenly spread each skill's copies around the ring at ~stride-slot spacing,
  // never placing a copy next to another copy of the same skill. Collisions
  // are resolved to the nearest free slot on either side.
  const ring: (string | null)[] = Array<string | null>(n).fill(null)
  for (let s = 0; s < groups.length; s++) {
    const { key, count } = groups[s]
    const placed: number[] = []
    const stride = n / count
    const phase = (s / groups.length) * n
    for (let j = 0; j < count; j++) {
      const ideal = Math.round(((phase + j * stride) % n + n) % n)
      const notAdjacent = (p: number) =>
        placed.every((other) => {
          const d = Math.min(Math.abs(p - other), n - Math.abs(p - other))
          return d >= 1
        })
      let d = 0
      for (;;) {
        const candidates: number[] = []
        if (ring[(ideal + d) % n] === null) candidates.push((ideal + d) % n)
        if (d > 0 && ring[((ideal - d) % n + n) % n] === null)
          candidates.push(((ideal - d) % n + n) % n)
        if (candidates.length > 0) {
          const pick = candidates.find(notAdjacent) ?? candidates[0]
          ring[pick] = key
          placed.push(pick)
          break
        }
        d++
        if (d > n) break
      }
    }
  }

  const out: T[] = []
  for (let i = 0; i < n; i++) {
    const key = ring[i]
    out.push(groups.find((g) => g.key === key)!.item)
  }
  return out
}