import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/Panel"
import { USER } from "@/data/user"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 17) return "Good afternoon"
  return "Good evening"
}

const ID = "hello"

export function HelloSection() {
  const greeting = getGreeting()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <div className="p-4">
          <PanelTitle suppressHydrationWarning>{greeting}</PanelTitle>
        </div>
      </PanelHeader>
      <PanelContent>
        <div className="text-sm text-muted-foreground text-balance leading-relaxed space-y-2 [&>p]:my-[0.5em] [&>p]:first:mt-0 [&>p]:last:mb-0">
          {(USER.about || "").split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}
