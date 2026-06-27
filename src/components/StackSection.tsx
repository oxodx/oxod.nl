import { Panel, PanelHeader, PanelTitle } from "@/components/Panel"
import { Tag } from "@/components/ui/Tag"
import { STACK, groupByCategory } from "@/data/stack"

const ID = "stack"

export function StackSection() {
  const grouped = groupByCategory(STACK)

  return (
    <Panel id={ID}>
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>Stack</PanelTitle>
        </div>
      </PanelHeader>
      <div
        style={{ "--col-left": "var(--spacing-48)" } as React.CSSProperties}
        className="relative"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left) -z-1 w-px bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
          aria-hidden
        />
        {Object.entries(grouped).map(([category, items], index) => {
          const categoryId = `${ID}-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
          return (
            <div
              key={category}
              className="grid items-start gap-y-2 border-b border-line py-4 last:border-none sm:grid-cols-[var(--col-left)_1fr]"
            >
              <div
                id={categoryId}
                className="pl-4 text-sm/6 text-muted-foreground"
              >
                <span
                  className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                  aria-hidden
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                {category}
              </div>
              <ul
                aria-labelledby={categoryId}
                className="flex flex-wrap gap-1.5 px-4"
              >
                {items.map((item) => (
                  <li key={item.key} className="flex">
                    <Tag>{item.title}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
