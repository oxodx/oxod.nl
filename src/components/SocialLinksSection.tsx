import { Mail, GitGraph } from "lucide-react"
import { Panel, PanelContent } from "@/components/Panel"
import { USER } from "@/data/user"

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const links = [
  { name: "mail", title: "Email", href: `mailto:${USER.email}`, icon: Mail },
  { name: "github", title: "GitHub", href: USER.github, icon: GitGraph },
  { name: "x", title: "X", href: USER.twitter, icon: XIcon },
] as const

export function SocialLinksSection() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  target={link.name === "mail" ? undefined : "_blank"}
                  rel={link.name === "mail" ? undefined : "noopener"}
                  className="group relative inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground/80 shadow-none hover:bg-accent hover:text-foreground transition-colors [&_svg:not([class*='size-'])]:size-4.5"
                >
                  <Icon />
                  <span className="sr-only">{link.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </PanelContent>
    </Panel>
  )
}
