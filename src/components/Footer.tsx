import { Mail, GitGraph } from "lucide-react"
import { USER } from "@/data/user"

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="px-2">
      <div className="mx-auto md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom flex w-full">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-line bg-background px-4 py-3">
            <a
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              href={`mailto:${USER.email}`}
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>
            <div className="h-5 w-px bg-line" />
            <a
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              href={USER.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GitGraph className="size-4" />
            </a>
            <div className="h-5 w-px bg-line" />
            <a
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              href={USER.twitter}
              target="_blank"
              rel="noopener"
              aria-label="X"
            >
              <XIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
