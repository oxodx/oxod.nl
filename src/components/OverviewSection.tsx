import {
  BriefcaseBusiness,
  CodeXml,
  Lightbulb,
  MapPin,
  Link,
  Clock,
  Phone,
  Mail,
} from "lucide-react"
import { Panel, PanelContent } from "@/components/Panel"
import { USER } from "@/data/user"

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted ring-1 ring-line ring-offset-1 ring-offset-background [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:text-muted-foreground">
      {children}
    </div>
  )
}

function IntroItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm">
      {children}
    </div>
  )
}

function formatTime(timeZone: string) {
  const now = new Date()
  const time = now.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
  const viewerOffset = -now.getTimezoneOffset()
  const targetStr = now.toLocaleString("en-US", { timeZone })
  const utcStr = now.toLocaleString("en-US", { timeZone: "UTC" })
  const targetOffset =
    (new Date(targetStr).getTime() - new Date(utcStr).getTime()) / 60000
  const hoursDiff = Math.abs(targetOffset - viewerOffset) / 60
  const diff =
    hoursDiff < 1
      ? " // same time"
      : ` // ${Math.floor(hoursDiff)}h ${targetOffset > viewerOffset ? "ahead" : "behind"}`
  return { time, diff }
}

function jobIcon(title: string) {
  if (/(developer|engineer)/i.test(title)) return <CodeXml />
  if (/(founder|co-founder)/i.test(title)) return <Lightbulb />
  return <BriefcaseBusiness />
}

export function OverviewSection() {
  const clock = formatTime(USER.timeZone)
  const email = USER.emailB64
    ? atob(USER.emailB64)
    : USER.email

  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>
      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {USER.jobs.map((job, i) => (
          <IntroItem key={i}>
            <IconBox>{jobIcon(job.title)}</IconBox>
            <p className="text-balance">
              {job.title} <span aria-label="at">@</span>
              <a
                href={job.experienceId ? `#experience-${job.experienceId}` : job.website}
                className="ml-0.5 font-medium underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors text-muted-foreground"
              >
                {job.company}
              </a>
            </p>
          </IntroItem>
        ))}

        <IntroItem>
          <IconBox><MapPin /></IconBox>
          <p className="text-balance">{USER.address}</p>
        </IntroItem>

        <IntroItem>
          <IconBox>
            <Clock />
          </IconBox>
          <p className="text-balance">
            <span>{clock.time}</span>
            <span className="text-muted-foreground" aria-hidden>
              {clock.diff}
            </span>
          </p>
        </IntroItem>

        <IntroItem>
          <IconBox><Phone /></IconBox>
          <p className="text-balance">{USER.phoneNumber || "—"}</p>
        </IntroItem>

        <IntroItem>
          <IconBox><Mail /></IconBox>
          <a
            href={`mailto:${email}`}
            className="text-balance underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors text-muted-foreground"
          >
            {email}
          </a>
        </IntroItem>

        <IntroItem>
          <IconBox><Link /></IconBox>
          <a
            href={USER.website}
            target="_blank"
            rel="noopener"
            className="text-balance underline underline-offset-2 decoration-from-font hover:text-foreground transition-colors text-muted-foreground"
          >
            {USER.website.replace("https://", "")}
          </a>
        </IntroItem>

        <IntroItem>
          <IconBox>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </IconBox>
          <p className="text-balance">{USER.pronouns}</p>
        </IntroItem>
      </PanelContent>
      <div
        className="pointer-events-none absolute top-px bottom-0 left-1/2 -z-1 w-px -translate-x-2.25 bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
        aria-hidden
      />
    </Panel>
  )
}
