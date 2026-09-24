import { Fragment } from "react"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/components/Panel"
import { USER } from "@/data/user"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 17) return "Good afternoon"
  return "Good evening"
}

const LINK_PATTERN = /\[([^\]]+)\]\(((?:https?|mailto):\/\/[^)]+|#[^)]+)\)/g

function renderParagraph(text: string) {
  const parts = text.split(LINK_PATTERN)
  if (parts.length === 1) return text

  return parts.map((part, index) => {
    if (index % 3 === 1) {
      return <a key={index} href={parts[index + 1]} className="underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors">{part}</a>
    }
    if (index % 3 === 2) return null
    return <Fragment key={index}>{part}</Fragment>
  })
}

const ID = "hello"

export function HelloSection() {
  const greeting = getGreeting()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <div className="p-4">
          <PanelTitle>{greeting}</PanelTitle>
        </div>
      </PanelHeader>
      <PanelContent>
        <div className="text-sm text-muted-foreground text-balance leading-relaxed space-y-2 [&>p]:my-[0.5em] [&>p]:first:mt-0 [&>p]:last:mb-0">
          {(USER.about || "").split("\n\n").map((paragraph, i) => (
            <p key={i}>{renderParagraph(paragraph)}</p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}