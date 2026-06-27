import { type ReactNode, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollapsibleList<T>({
  items,
  max = 3,
  keyExtractor,
  renderItem,
}: {
  items: T[]
  max?: number
  keyExtractor?: (item: T) => string
  renderItem: (item: T) => ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="group/collapsible">
      <ul>
        {items.slice(0, max).map((item, index) => (
          <li
            key={keyExtractor ? keyExtractor(item) : index}
            className="border-b border-line"
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>

      {open && (
        <ul>
          {items.slice(max).map((item, index) => (
            <li
              key={keyExtractor ? keyExtractor(item) : max + index}
              className="border-b border-line"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}

      {items.length > max && (
        <div className="screen-line-top -mt-px flex h-12 items-center justify-center">
          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-input bg-background pr-2.5 pl-3 py-1.5",
              "text-sm font-medium text-muted-foreground shadow-none",
              "hover:bg-accent hover:text-foreground transition-colors"
            )}
          >
            <span className="hidden group-data-[open=false]/collapsible:block">
              Show more
            </span>
            <span className="hidden group-data-[open=true]/collapsible:block">
              Show less
            </span>
            <ChevronDown
              className={cn("size-4 transition-transform", open && "rotate-180")}
            />
          </button>
        </div>
      )}
    </div>
  )
}
